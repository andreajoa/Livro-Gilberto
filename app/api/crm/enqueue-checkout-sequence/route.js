import { NextResponse } from 'next/server'
import { d1Query, nowIso, cleanText, normalizeLanguage } from '@/src/lib/d1'

export const dynamic = 'force-dynamic'

const SEQUENCES = {
  pt: {
    code: 'pt_checkout_abandoned',
    subjects: [
      'Seu acesso ainda está esperando por você',
      'Você chegou perto de começar',
      'Ainda pensando?',
      'O custo de continuar parado',
      'Quanto tempo você vai carregar isso?',
      'O que acontece quando você adia',
      'Uma mensagem pessoal para você',
      'Talvez este seja o momento certo',
      'Você merece paz',
      'Não espere mais um ano',
      'O livro que eu gostaria de ter lido antes',
      'Uma pergunta importante',
      'Seu próximo capítulo',
      'Última reflexão',
      'Último convite'
    ]
  },
  en: {
    code: 'en_checkout_abandoned',
    subjects: [
      'Your access is still waiting for you',
      'You were one step away',
      'Still thinking about it?',
      'The cost of staying stuck',
      'How long will you carry this pain?',
      'What happens when you postpone healing',
      'A personal message for you',
      'Maybe this is the right moment',
      'You deserve peace',
      'Do not lose another year',
      'The book I wish I had earlier',
      'One important question',
      'Your next chapter starts here',
      'A final reflection',
      'Last invitation'
    ]
  },
  es: {
    code: 'es_checkout_abandoned',
    subjects: [
      'Tu acceso todavía te está esperando',
      'Estuviste a un paso',
      '¿Todavía lo estás pensando?',
      'El costo de quedarse atrapado',
      '¿Cuánto tiempo más cargarás este dolor?',
      'Qué ocurre cuando pospones tu recuperación',
      'Un mensaje personal para ti',
      'Tal vez este sea el momento correcto',
      'Mereces paz',
      'No pierdas otro año',
      'El libro que me hubiera gustado leer antes',
      'Una pregunta importante',
      'Tu próximo capítulo comienza aquí',
      'Una última reflexión',
      'Última invitación'
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

    const visitorId = cleanText(body.visitorId || '',120)
    const email = cleanText(body.email || '',255).toLowerCase()
    const name = cleanText(body.name || '',180)
    const language = normalizeLanguage(body.language || 'pt')

    if (!email) {
      return NextResponse.json({ error:'email is required' }, { status:400 })
    }

    const now = nowIso()
    const sequence = SEQUENCES[language] || SEQUENCES.pt

    const existing = await d1Query(
      `SELECT id
       FROM email_queue
       WHERE email=?
         AND sequence_code=?
       LIMIT 1`,
      [email, sequence.code]
    )

    if (existing?.[0]?.results?.length) {
      return NextResponse.json({ success:true, existing:true })
    }

    for (let i=0;i<sequence.subjects.length;i++) {
      await d1Query(
        `INSERT INTO email_queue
         (visitor_id,email,name,language,sequence_code,email_number,subject,status,scheduled_at,created_at)
         VALUES (?,?,?,?,?,?,?,'pending',?,?)`,
        [
          visitorId,
          email,
          name,
          language,
          sequence.code,
          i + 1,
          sequence.subjects[i],
          addDays(1 + (i * 3)),
          now
        ]
      )
    }

    await d1Query(
      `INSERT INTO contact_status
       (email,language,checkout_started,updated_at)
       VALUES (?,?,1,?)
       ON CONFLICT(email) DO UPDATE SET
         checkout_started=1,
         updated_at=excluded.updated_at`,
      [email,language,now]
    )

    return NextResponse.json({
      success:true,
      sequence:sequence.code,
      emails:sequence.subjects.length
    })

  } catch (error) {
    return NextResponse.json({ error:error.message }, { status:500 })
  }
}
