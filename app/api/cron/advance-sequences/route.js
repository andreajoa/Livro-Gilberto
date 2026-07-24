import { NextResponse } from 'next/server'
import { d1Query, nowIso } from '@/src/lib/d1'
import { getManualEmailSubject } from '@/src/lib/email/leadEmailTemplates'

export const dynamic = 'force-dynamic'

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gilberto-souza.com').replace(/\/$/, '')
}

function nextSequenceFor(code) {
  const c = String(code || '')

  if (c.includes('lead_ebook')) return 'manual'
  if (c.includes('checkout_abandoned')) return 'manual'
  if (c.includes('manual') || c.includes('relationship') || c.includes('reconstruccion')) return 'completed'

  return null
}

async function isUnsubscribed(email) {
  const result = await d1Query(
    `SELECT email FROM contact_status WHERE email=? AND unsubscribed=1 LIMIT 1`,
    [email]
  )
  return Boolean(result?.[0]?.results?.length)
}

async function hasCustomer(email) {
  const customerResult = await d1Query(
    `SELECT id FROM customers WHERE email=? LIMIT 1`,
    [email]
  )

  if (customerResult?.[0]?.results?.length) {
    return true
  }

  const statusResult = await d1Query(
    `SELECT email
     FROM contact_status
     WHERE email=?
       AND customer=1
     LIMIT 1`,
    [email]
  )

  return Boolean(statusResult?.[0]?.results?.length)
}

async function hasPendingInSequence(email, sequenceCode) {
  const result = await d1Query(
    `SELECT id
     FROM email_queue
     WHERE email=?
       AND sequence_code=?
       AND status='pending'
     LIMIT 1`,
    [email, sequenceCode]
  )
  return Boolean(result?.[0]?.results?.length)
}

async function hasAnySequence(email, sequenceCode) {
  const result = await d1Query(
    `SELECT id
     FROM email_queue
     WHERE email=?
       AND sequence_code=?
     LIMIT 1`,
    [email, sequenceCode]
  )
  return Boolean(result?.[0]?.results?.length)
}

function manualCode(language) {
  if (language === 'en') return 'en_relationship_rebuild'
  if (language === 'es') return 'es_reconstruccion_hombre'
  return 'pt_manual_homem'
}

async function enqueueManual({ visitorId, email, name, language }) {
  const code = manualCode(language)

  if (await hasAnySequence(email, code)) {
    return { skipped: true, reason: 'manual_exists' }
  }

  const subjects = Array.from(
    { length: 15 },
    (_, index) =>
      getManualEmailSubject({
        language,
        emailNumber: index + 1
      })
  )

  const now = nowIso()

  for (let i = 0; i < subjects.length; i++) {
    const d = new Date()
    d.setDate(d.getDate() + (i * 3))

    await d1Query(
      `INSERT INTO email_queue
       (visitor_id,email,name,language,sequence_code,email_number,subject,status,scheduled_at,created_at)
       VALUES (?,?,?,?,?,?,?,'pending',?,?)`,
      [visitorId, email, name, language, code, i + 1, subjects[i], d.toISOString(), now]
    )
  }

  await d1Query(
    `INSERT INTO contact_status (email, language, manual_started, updated_at)
     VALUES (?, ?, 1, ?)
     ON CONFLICT(email) DO UPDATE SET
       language=excluded.language,
       manual_started=1,
       updated_at=excluded.updated_at`,
    [email, language, now]
  )

  await d1Query(
    `INSERT INTO events (visitor_id,email,language,event_type,page,metadata,created_at)
     VALUES (?,?,?,'manual_sequence_queued','/cron/advance-sequences',?,?)`,
    [visitorId, email, language, JSON.stringify({ sequence_code: code, emails: subjects.length }), now]
  )

  return { queued: true, code, emails: subjects.length }
}

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get('token')
    const authorization = request.headers.get('authorization')

    const authorizedByCron =
      process.env.CRON_SECRET &&
      authorization === `Bearer ${process.env.CRON_SECRET}`

    const authorizedByToken =
      process.env.EMAIL_CRON_TOKEN &&
      token === process.env.EMAIL_CRON_TOKEN

    if (!authorizedByCron && !authorizedByToken) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const completed = await d1Query(
      `SELECT
         email,
         language,
         sequence_code,
         MAX(visitor_id) AS visitor_id,
         MAX(name) AS name,
         COUNT(*) AS total,
         SUM(CASE WHEN status='sent' THEN 1 ELSE 0 END) AS sent_total,
         SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending_total
       FROM email_queue
       GROUP BY email, language, sequence_code
       HAVING total = sent_total
          AND pending_total = 0
       LIMIT 50`
    )

    const rows = completed?.[0]?.results || []
    const actions = []

    for (const row of rows) {
      const email = row.email
      const language = row.language || 'pt'
      const sequenceCode = row.sequence_code
      const next = nextSequenceFor(sequenceCode)

      if (!next) continue
      if (await isUnsubscribed(email)) continue
      if (await hasCustomer(email)) continue
      if (await hasPendingInSequence(email, sequenceCode)) continue

      const now = nowIso()

      if (next === 'manual') {
        const normalizedSequence = String(sequenceCode).toLowerCase()

        if (normalizedSequence.includes('lead_ebook')) {
          await d1Query(
            `INSERT INTO contact_status
             (email, language, lead_completed, updated_at)
             VALUES (?, ?, 1, ?)
             ON CONFLICT(email) DO UPDATE SET
               language=excluded.language,
               lead_completed=1,
               updated_at=excluded.updated_at`,
            [email, language, now]
          )
        }

        if (normalizedSequence.includes('checkout_abandoned')) {
          await d1Query(
            `INSERT INTO contact_status
             (email, language, checkout_completed, updated_at)
             VALUES (?, ?, 1, ?)
             ON CONFLICT(email) DO UPDATE SET
               language=excluded.language,
               checkout_completed=1,
               updated_at=excluded.updated_at`,
            [email, language, now]
          )
        }

        const result = await enqueueManual({
          visitorId: row.visitor_id || '',
          email,
          name: row.name || '',
          language
        })

        actions.push({
          email,
          completed: sequenceCode,
          next: 'manual',
          result
        })
      }

      if (next === 'completed') {
        await d1Query(
          `INSERT INTO contact_status (email, language, manual_completed, completed_all_sequences, updated_at)
           VALUES (?, ?, 1, 1, ?)
           ON CONFLICT(email) DO UPDATE SET
             language=excluded.language,
             manual_completed=1,
             completed_all_sequences=1,
             updated_at=excluded.updated_at`,
          [email, language, now]
        )

        actions.push({ email, completed: sequenceCode, next: 'standby' })
      }
    }

    return NextResponse.json({ success: true, checked: rows.length, actions })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
