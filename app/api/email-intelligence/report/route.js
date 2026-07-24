import { NextResponse } from 'next/server'
import { d1Query } from '@/src/lib/d1'
import {
  ensureEmailIntelligenceSchema
} from '@/src/lib/email/emailIntelligenceSchema'

export const dynamic = 'force-dynamic'

function isAuthorized(request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  const authorization = request.headers.get('authorization')

  const cronAuthorized =
    process.env.CRON_SECRET &&
    authorization === `Bearer ${process.env.CRON_SECRET}`

  const tokenAuthorized =
    process.env.EMAIL_CRON_TOKEN &&
    token === process.env.EMAIL_CRON_TOKEN

  return Boolean(cronAuthorized || tokenAuthorized)
}

function rows(response) {
  return response?.[0]?.results || []
}

function number(value) {
  return Number(value || 0)
}

function rate(numerator, denominator) {
  if (!denominator) return 0

  return Number(
    (number(numerator) / number(denominator)).toFixed(6)
  )
}

function enrichEmailMetrics(items) {
  return items.map(item => {
    const delivered = number(item.delivered)
    const opened = number(item.opened)
    const clicked = number(item.clicked)

    return {
      ...item,
      sent: number(item.sent),
      delivered,
      delayed: number(item.delayed),
      failed: number(item.failed),
      bounced: number(item.bounced),
      opened,
      clicked,
      complained: number(item.complained),
      estimated_open_rate: rate(opened, delivered),
      click_through_rate: rate(clicked, delivered),
      click_to_open_rate: rate(clicked, opened)
    }
  })
}

export async function GET(request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized'
        },
        {
          status: 401
        }
      )
    }

    await ensureEmailIntelligenceSchema(d1Query)

    const url = new URL(request.url)

    const requestedDays = Number(
      url.searchParams.get('days') || 30
    )

    const days = Number.isFinite(requestedDays)
      ? Math.min(365, Math.max(1, requestedDays))
      : 30

    const language = String(
      url.searchParams.get('language') || ''
    ).toLowerCase()

    const since = new Date(
      Date.now() - days * 24 * 60 * 60 * 1000
    ).toISOString()

    const languageFilter =
      language === 'pt' ||
      language === 'en' ||
      language === 'es'

    const eventWhere = languageFilter
      ? `event_created_at >= ? AND language = ?`
      : `event_created_at >= ?`

    const eventParams = languageFilter
      ? [since, language]
      : [since]

    const customerWhere = languageFilter
      ? `created_at >= ? AND language = ?`
      : `created_at >= ?`

    const customerParams = languageFilter
      ? [since, language]
      : [since]

    const totalsResponse = await d1Query(
      `SELECT
         COUNT(DISTINCT CASE
           WHEN event_type='email.sent'
           THEN resend_id
         END) AS sent,

         COUNT(DISTINCT CASE
           WHEN event_type='email.delivered'
           THEN resend_id
         END) AS delivered,

         COUNT(DISTINCT CASE
           WHEN event_type='email.delivery_delayed'
           THEN resend_id
         END) AS delayed,

         COUNT(DISTINCT CASE
           WHEN event_type='email.failed'
           THEN resend_id
         END) AS failed,

         COUNT(DISTINCT CASE
           WHEN event_type='email.bounced'
           THEN resend_id
         END) AS bounced,

         COUNT(DISTINCT CASE
           WHEN event_type='email.opened'
           THEN resend_id
         END) AS unique_opened,

         COUNT(CASE
           WHEN event_type='email.opened'
           THEN 1
         END) AS total_opens,

         COUNT(DISTINCT CASE
           WHEN event_type='email.clicked'
           THEN resend_id
         END) AS unique_clicked,

         COUNT(CASE
           WHEN event_type='email.clicked'
           THEN 1
         END) AS total_clicks,

         COUNT(DISTINCT CASE
           WHEN event_type='email.complained'
           THEN resend_id
         END) AS complained
       FROM email_webhook_events
       WHERE ${eventWhere}`,
      eventParams
    )

    const byEmailResponse = await d1Query(
      `SELECT
         language,
         sequence_code,
         email_number,
         MAX(subject) AS subject,
         MAX(template_version) AS template_version,

         COUNT(DISTINCT CASE
           WHEN event_type='email.sent'
           THEN resend_id
         END) AS sent,

         COUNT(DISTINCT CASE
           WHEN event_type='email.delivered'
           THEN resend_id
         END) AS delivered,

         COUNT(DISTINCT CASE
           WHEN event_type='email.delivery_delayed'
           THEN resend_id
         END) AS delayed,

         COUNT(DISTINCT CASE
           WHEN event_type='email.failed'
           THEN resend_id
         END) AS failed,

         COUNT(DISTINCT CASE
           WHEN event_type='email.bounced'
           THEN resend_id
         END) AS bounced,

         COUNT(DISTINCT CASE
           WHEN event_type='email.opened'
           THEN resend_id
         END) AS opened,

         COUNT(DISTINCT CASE
           WHEN event_type='email.clicked'
           THEN resend_id
         END) AS clicked,

         COUNT(DISTINCT CASE
           WHEN event_type='email.complained'
           THEN resend_id
         END) AS complained

       FROM email_webhook_events
       WHERE ${eventWhere}
       GROUP BY
         language,
         sequence_code,
         email_number
       ORDER BY
         language,
         sequence_code,
         email_number`,
      eventParams
    )

    const linksResponse = await d1Query(
      `SELECT
         language,
         sequence_code,
         email_number,
         link_type,
         link,
         COUNT(*) AS clicks,
         COUNT(DISTINCT resend_id) AS unique_emails_clicked

       FROM email_webhook_events

       WHERE event_type='email.clicked'
         AND ${eventWhere}

       GROUP BY
         language,
         sequence_code,
         email_number,
         link_type,
         link

       ORDER BY clicks DESC`,
      eventParams
    )

    const retailerResponse = await d1Query(
      `SELECT
         language,
         link_type,
         COUNT(*) AS total_clicks,
         COUNT(DISTINCT resend_id) AS unique_emails_clicked

       FROM email_webhook_events

       WHERE event_type='email.clicked'
         AND link_type IN (
           'amazon',
           'barnes',
           'site',
           'site_checkout',
           'unsubscribe',
           'external_other'
         )
         AND ${eventWhere}

       GROUP BY language, link_type
       ORDER BY total_clicks DESC`,
      eventParams
    )

    const purchasesResponse = await d1Query(
      `SELECT
         language,
         product,
         product_type,
         currency,
         COUNT(*) AS purchases,
         SUM(amount) AS revenue

       FROM customers

       WHERE ${customerWhere}

       GROUP BY
         language,
         product,
         product_type,
         currency

       ORDER BY purchases DESC`,
      customerParams
    )

    const unsubscribeResponse = await d1Query(
      `SELECT
         language,
         COUNT(*) AS unsubscribes

       FROM events

       WHERE event_type='unsubscribe'
         AND created_at >= ?
         ${
           languageFilter
             ? 'AND language = ?'
             : ''
         }

       GROUP BY language`,
      languageFilter
        ? [since, language]
        : [since]
    )

    const totalsRow = rows(totalsResponse)[0] || {}

    const sent = number(totalsRow.sent)
    const delivered = number(totalsRow.delivered)
    const opened = number(totalsRow.unique_opened)
    const clicked = number(totalsRow.unique_clicked)
    const bounced = number(totalsRow.bounced)
    const failed = number(totalsRow.failed)

    const purchases = rows(purchasesResponse).reduce(
      (sum, item) => sum + number(item.purchases),
      0
    )

    const totalUnsubscribes = rows(
      unsubscribeResponse
    ).reduce(
      (sum, item) => sum + number(item.unsubscribes),
      0
    )

    return NextResponse.json({
      success: true,
      project: 'livro_gilberto',
      period: {
        days,
        since,
        language: languageFilter
          ? language
          : 'all'
      },
      notes: {
        openings:
          'Open tracking is estimated and may be affected by privacy features and image blocking.',
        clicks:
          'Clicks are stronger evidence of engagement than opens.',
        website_purchases:
          'Purchases completed on the official website are recorded through Stripe and the customers table.',
        external_purchases:
          'Amazon and Barnes & Noble clicks are measurable. Confirmed external purchases require retailer or affiliate reporting.'
      },
      totals: {
        sent,
        delivered,
        delayed: number(totalsRow.delayed),
        failed,
        bounced,
        unique_opened: opened,
        total_opens: number(totalsRow.total_opens),
        unique_clicked: clicked,
        total_clicks: number(totalsRow.total_clicks),
        complained: number(totalsRow.complained),
        unsubscribes: totalUnsubscribes,
        site_purchases: purchases,
        delivery_rate: rate(delivered, sent),
        estimated_open_rate: rate(opened, delivered),
        click_through_rate: rate(clicked, delivered),
        click_to_open_rate: rate(clicked, opened),
        bounce_rate: rate(bounced, sent),
        failure_rate: rate(failed, sent),
        site_purchase_rate_from_delivered:
          rate(purchases, delivered),
        site_purchase_rate_from_clicked:
          rate(purchases, clicked)
      },
      by_email: enrichEmailMetrics(
        rows(byEmailResponse)
      ),
      clicked_links: rows(linksResponse).map(
        item => ({
          ...item,
          clicks: number(item.clicks),
          unique_emails_clicked:
            number(item.unique_emails_clicked)
        })
      ),
      channels: rows(retailerResponse).map(
        item => ({
          ...item,
          total_clicks: number(item.total_clicks),
          unique_emails_clicked:
            number(item.unique_emails_clicked)
        })
      ),
      site_purchases: rows(purchasesResponse).map(
        item => ({
          ...item,
          purchases: number(item.purchases),
          revenue: number(item.revenue)
        })
      ),
      unsubscribes_by_language:
        rows(unsubscribeResponse).map(
          item => ({
            ...item,
            unsubscribes:
              number(item.unsubscribes)
          })
        )
    })
  } catch (error) {
    console.error(
      'Email intelligence report error:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      {
        status: 500
      }
    )
  }
}
