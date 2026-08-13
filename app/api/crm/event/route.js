import { NextResponse } from 'next/server'
import { d1Query, nowIso, cleanText, normalizeLanguage } from '@/src/lib/d1'
import { ensureCrmSchema } from '@/src/lib/crm/crmSchema'
import { isSameOriginOrInternal } from '@/src/lib/server/internalAuth'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    if (!isSameOriginOrInternal(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await request.json()
    await ensureCrmSchema(d1Query)

    const visitorId = cleanText(body.visitorId || body.visitor_id || '', 120)
    const language = normalizeLanguage(body.language || body.lang)
    const eventType = cleanText(body.eventType || body.event_type || 'unknown', 80)
    const page = cleanText(body.page || '', 300)
    const email = cleanText(body.email || '', 255)
    const metadata = JSON.stringify(body.metadata || {})
    const now = nowIso()

    if (!visitorId) {
      return NextResponse.json({ error: 'visitorId is required' }, { status: 400 })
    }

    await d1Query(
      `INSERT INTO visitors (id, language, first_visit, last_visit, visits, source, utm_source, utm_medium, utm_campaign, created_at, updated_at)
       VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         language = excluded.language,
         last_visit = excluded.last_visit,
         visits = visits + 1,
         updated_at = excluded.updated_at`,
      [
        visitorId,
        language,
        now,
        now,
        cleanText(body.source || '', 120),
        cleanText(body.utm_source || '', 120),
        cleanText(body.utm_medium || '', 120),
        cleanText(body.utm_campaign || '', 120),
        now,
        now
      ]
    )

    await d1Query(
      `INSERT INTO events (visitor_id, email, language, event_type, page, metadata, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [visitorId, email, language, eventType, page, metadata, now]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('CRM event error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
