import { NextResponse } from 'next/server'
import { d1Query, nowIso, cleanText, normalizeLanguage } from '@/src/lib/d1'

export const dynamic = 'force-dynamic'

const SEQUENCES = {
  pt: {
    code: 'pt_lead_ebook',
    subjects: [
      'Você não precisa carregar essa dor sozinho',
      'O erro que mantém muitos homens presos ao passado',
      'Uma forma diferente de recomeçar'
    ]
  },
  en: {
    code: 'en_lead_ebook',
    subjects: [
      'You do not have to carry this pain alone',
      'The mistake that keeps many men stuck in the past',
      'A different way to start again'
    ]
  },
  es: {
    code: 'es_lead_ebook',
    subjects: [
      'No tienes que cargar este dolor solo',
      'El error que mantiene a muchos hombres atrapados en el pasado',
      'Una forma diferente de empezar de nuevo'
    ]
  }
}

function addDays(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

export async function POST(request) {
  try {
    const body = await request.json()

    const visitorId = cleanText(body.visitorId || body.visitor_id || '', 120)
    const email = cleanText(body.email || '', 255).toLowerCase()
    const name = cleanText(body.name || '', 180)
    const language = normalizeLanguage(body.language || body.lang)
    const sequence = SEQUENCES[language] || SEQUENCES.pt

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

    const scheduleDays = [0, 1, 3]
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
