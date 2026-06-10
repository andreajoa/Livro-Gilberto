import { NextResponse } from 'next/server'
import { d1Query, nowIso, cleanText, normalizeLanguage } from '@/src/lib/d1'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const body = await request.json()

    const visitorId = cleanText(body.visitorId || body.visitor_id || '', 120)
    const name = cleanText(body.name || '', 180)
    const email = cleanText(body.email || '', 255).toLowerCase()
    const whatsapp = cleanText(body.whatsapp || '', 50)
    const language = normalizeLanguage(body.language || body.lang)
    const source = cleanText(body.source || 'popup', 120)
    const now = nowIso()

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    if (visitorId) {
      await d1Query(
        `INSERT INTO visitors (id, language, first_visit, last_visit, visits, source, created_at, updated_at)
         VALUES (?, ?, ?, ?, 1, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           language = excluded.language,
           last_visit = excluded.last_visit,
           updated_at = excluded.updated_at`,
        [visitorId, language, now, now, source, now, now]
      )
    }

    await d1Query(
      `INSERT INTO leads (visitor_id, name, email, whatsapp, language, source, consent, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 1, 'lead', ?, ?)
       ON CONFLICT(email, language) DO UPDATE SET
         visitor_id = COALESCE(excluded.visitor_id, leads.visitor_id),
         name = COALESCE(NULLIF(excluded.name, ''), leads.name),
         whatsapp = COALESCE(NULLIF(excluded.whatsapp, ''), leads.whatsapp),
         source = excluded.source,
         updated_at = excluded.updated_at`,
      [visitorId, name, email, whatsapp, language, source, now, now]
    )

    await d1Query(
      `INSERT INTO events (visitor_id, email, language, event_type, page, metadata, created_at)
       VALUES (?, ?, ?, 'lead_capture', ?, ?, ?)`,
      [
        visitorId,
        email,
        language,
        cleanText(body.page || '', 300),
        JSON.stringify({ source }),
        now
      ]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('CRM lead error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
