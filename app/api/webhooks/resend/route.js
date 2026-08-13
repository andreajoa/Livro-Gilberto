import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { d1Query, nowIso } from '@/src/lib/d1'
import {
  ensureEmailIntelligenceSchema
} from '@/src/lib/email/emailIntelligenceSchema'
import {
  classifyTrackedLink,
  firstRecipient,
  normalizeWebhookTags
} from '@/src/lib/email/emailTracking'
import { ensureCrmSchema } from '@/src/lib/crm/crmSchema'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

const SUPPORTED_EVENTS = new Set([
  'email.sent',
  'email.delivered',
  'email.delivery_delayed',
  'email.failed',
  'email.bounced',
  'email.opened',
  'email.clicked',
  'email.complained'
])

async function stopPendingEmails(email, reason, language) {
  if (!email) return

  await d1Query(
    `UPDATE email_queue
     SET status='stopped'
     WHERE email=?
       AND status='pending'`,
    [email]
  )

  const bounced = reason === 'email.bounced' ? 1 : 0
  const complained = reason === 'email.complained' ? 1 : 0
  await d1Query(
    `INSERT INTO contact_status
     (email, language, unsubscribed, bounced, complained, suppressed_reason, updated_at)
     VALUES (?, ?, 0, ?, ?, ?, ?)
     ON CONFLICT(email) DO UPDATE SET
      bounced=MAX(contact_status.bounced, excluded.bounced),
      complained=MAX(contact_status.complained, excluded.complained),
      suppressed_reason=excluded.suppressed_reason,
      updated_at=excluded.updated_at`,
    [email, language || 'pt', bounced, complained, reason, nowIso()]
  )

  await d1Query(
    `INSERT INTO events
     (
       visitor_id,
       email,
       language,
       event_type,
       page,
       metadata,
       created_at
     )
     VALUES ('', ?, ?, 'email_suppressed', '/api/webhooks/resend', ?, ?)`,
    [
      email,
      language || 'pt',
      JSON.stringify({ reason }),
      nowIso()
    ]
  )
}

export async function POST(request) {
  try {
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET

    if (!webhookSecret) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing RESEND_WEBHOOK_SECRET'
        },
        {
          status: 500
        }
      )
    }

    const payload = await request.text()

    const svixId = request.headers.get('svix-id')
    const svixTimestamp = request.headers.get('svix-timestamp')
    const svixSignature = request.headers.get('svix-signature')

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing webhook signature headers'
        },
        {
          status: 400
        }
      )
    }

    const event = resend.webhooks.verify({
      payload,
      headers: {
        id: svixId,
        timestamp: svixTimestamp,
        signature: svixSignature
      },
      webhookSecret
    })

    if (!SUPPORTED_EVENTS.has(event.type)) {
      return NextResponse.json({
        success: true,
        ignored: true,
        type: event.type
      })
    }

    await ensureEmailIntelligenceSchema(d1Query)
    await ensureCrmSchema(d1Query)

    const duplicateResult = await d1Query(
      `SELECT id
       FROM email_webhook_events
       WHERE svix_id=?
       LIMIT 1`,
      [svixId]
    )

    if (duplicateResult?.[0]?.results?.length) {
      return NextResponse.json({
        success: true,
        duplicate: true,
        svix_id: svixId
      })
    }

    const data = event.data || {}
    const tags = normalizeWebhookTags(data.tags)

    const email = firstRecipient(data)
    const resendId = String(data.email_id || '')
    const subject = String(data.subject || '')
    const language = String(tags.language || '')
    const sequenceCode = String(tags.sequence || '')
    const emailNumber =
      Number(tags.email_number || 0) || null
    const templateVersion = String(
      tags.template_version || ''
    )
    const project = String(
      tags.project || 'livro_gilberto'
    )

    const link = String(
      data.click?.link ||
      data.click?.url ||
      ''
    )

    const linkType = classifyTrackedLink(link)

    const ipAddress = String(
      data.click?.ipAddress ||
      data.click?.ip_address ||
      ''
    )

    const userAgent = String(
      data.click?.userAgent ||
      data.click?.user_agent ||
      ''
    )

    const receivedAt = nowIso()

    const eventCreatedAt = String(
      event.created_at ||
      data.created_at ||
      receivedAt
    )

    await d1Query(
      `INSERT INTO email_webhook_events
       (
         svix_id,
         event_type,
         resend_id,
         email,
         subject,
         language,
         sequence_code,
         email_number,
         template_version,
         project,
         link,
         link_type,
         ip_address,
         user_agent,
         event_created_at,
         received_at,
         raw_json
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        svixId,
        event.type,
        resendId,
        email,
        subject,
        language,
        sequenceCode,
        emailNumber,
        templateVersion,
        project,
        link,
        linkType,
        ipAddress,
        userAgent,
        eventCreatedAt,
        receivedAt,
        JSON.stringify(event)
      ]
    )

    const statusByEvent = {
      'email.sent': 'sent',
      'email.delivered': 'delivered',
      'email.delivery_delayed': 'delivery_delayed',
      'email.failed': 'failed',
      'email.bounced': 'bounced',
      'email.complained': 'complained'
    }

    const newStatus = statusByEvent[event.type]

    if (resendId && newStatus) {
      await d1Query(
        `UPDATE email_logs
         SET status=?
         WHERE resend_id=?`,
        [newStatus, resendId]
      )
    }

    if (
      event.type === 'email.bounced' ||
      event.type === 'email.complained'
    ) {
      await stopPendingEmails(
        email,
        event.type,
        language
      )
    }

    return NextResponse.json({
      success: true,
      type: event.type,
      resend_id: resendId || null,
      email: email || null,
      link_type: linkType || null
    })
  } catch (error) {
    console.error('Resend webhook error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid or unprocessable webhook'
      },
      {
        status: 400
      }
    )
  }
}
