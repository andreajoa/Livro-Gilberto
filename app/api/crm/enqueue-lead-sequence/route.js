import { NextResponse } from 'next/server'
import { d1Query, nowIso, cleanText, normalizeLanguage } from '@/src/lib/d1'
import { getLeadEmailSubject } from '@/src/lib/email/leadEmailTemplates'
import { ensureCrmSchema } from '@/src/lib/crm/crmSchema'
import { isSameOriginOrInternal } from '@/src/lib/server/internalAuth'

export const dynamic = 'force-dynamic'

const SEQUENCE_CODES = {
  pt: 'pt_lead_ebook',
  en: 'en_lead_ebook',
  es: 'es_lead_ebook'
}

function sequenceFor(language) {
  const lang = SEQUENCE_CODES[language] ? language : 'pt'

  return {
    code: SEQUENCE_CODES[lang],
    subjects: Array.from(
      { length: 15 },
      (_, index) =>
        getLeadEmailSubject({
          language: lang,
          emailNumber: index + 1
        })
    )
  }
}

function addDays(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

export async function POST(request) {
  try {
    if (!isSameOriginOrInternal(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await request.json()
    await ensureCrmSchema(d1Query)

    const visitorId = cleanText(body.visitorId || body.visitor_id || '', 120)
    const email = cleanText(body.email || '', 255).toLowerCase()
    const name = cleanText(body.name || '', 180)
    const language = normalizeLanguage(body.language || body.lang)
    const sequence = sequenceFor(language)

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    const existing = await d1Query(
      `SELECT id FROM email_queue
       WHERE email = ? AND language = ? AND sequence_code = ?
       LIMIT 1`,
      [email, language, sequence.code]
    )

    if (existing?.[0]?.results?.length) {
      return NextResponse.json({ success: true, existing: true })
    }

    const scheduleDays = sequence.subjects.map((_, index) => index * 3)
    const now = nowIso()

    for (let i = 0; i < sequence.subjects.length; i++) {
      await d1Query(
        `INSERT INTO email_queue
         (visitor_id, email, name, language, sequence_code, email_number, subject, status, scheduled_at, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
        [
          visitorId,
          email,
          name,
          language,
          sequence.code,
          i + 1,
          sequence.subjects[i],
          addDays(scheduleDays[i]),
          now
        ]
      )
    }

    await d1Query(
      `INSERT INTO contact_status (email, language, lead_started, updated_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(email) DO UPDATE SET
         language = excluded.language,
         lead_started = 1,
         updated_at = excluded.updated_at`,
      [email, language, now]
    )

    await d1Query(
      `INSERT INTO events (visitor_id, email, language, event_type, page, metadata, created_at)
       VALUES (?, ?, ?, 'email_sequence_queued', ?, ?, ?)`,
      [
        visitorId,
        email,
        language,
        cleanText(body.page || '', 300),
        JSON.stringify({ sequence_code: sequence.code, emails: sequence.subjects.length }),
        now
      ]
    )

    return NextResponse.json({ success: true, sequence: sequence.code, emails: sequence.subjects.length })
  } catch (error) {
    console.error('CRM enqueue lead sequence error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
