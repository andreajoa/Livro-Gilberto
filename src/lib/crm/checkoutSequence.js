import { cleanText, d1Query, nowIso, normalizeLanguage } from '@/src/lib/d1'
import { ensureCrmSchema } from '@/src/lib/crm/crmSchema'

const SEQUENCES = {
  pt: {
    code: 'pt_checkout_abandoned',
    subjects: ['Seu pedido ainda está esperando por você', 'Você chegou perto de começar', 'Ainda pensando?', 'O custo de continuar parado', 'Quanto tempo você vai carregar isso?', 'O que acontece quando você adia', 'Uma mensagem pessoal para você', 'Talvez este seja o momento certo', 'Você merece paz', 'Não espere mais um ano', 'O livro que eu gostaria de ter lido antes', 'Uma pergunta importante', 'Seu próximo capítulo', 'Última reflexão', 'Último convite']
  },
  en: {
    code: 'en_checkout_abandoned',
    subjects: ['Your order is still waiting for you', 'You were one step away', 'Still thinking about it?', 'The cost of staying stuck', 'How long will you carry this pain?', 'What happens when you postpone healing', 'A personal message for you', 'Maybe this is the right moment', 'You deserve peace', 'Do not lose another year', 'The book I wish I had earlier', 'One important question', 'Your next chapter starts here', 'A final reflection', 'Last invitation']
  },
  es: {
    code: 'es_checkout_abandoned',
    subjects: ['Tu pedido todavía te está esperando', 'Estuviste a un paso', '¿Todavía lo estás pensando?', 'El costo de quedarse atrapado', '¿Cuánto tiempo más cargarás este dolor?', 'Qué ocurre cuando pospones tu recuperación', 'Un mensaje personal para ti', 'Tal vez este sea el momento correcto', 'Mereces paz', 'No pierdas otro año', 'El libro que me hubiera gustado leer antes', 'Una pregunta importante', 'Tu próximo capítulo comienza aquí', 'Una última reflexión', 'Última invitación']
  }
}

function schedule(index) {
  return new Date(Date.now() + (24 + index * 72) * 60 * 60 * 1000).toISOString()
}

export async function queueCheckoutSequence(input) {
  await ensureCrmSchema(d1Query)
  const visitorId = cleanText(input.visitorId, 120)
  const email = cleanText(input.email, 255).toLowerCase()
  const name = cleanText(input.name, 180)
  const language = normalizeLanguage(input.language)
  if (!email || !email.includes('@')) throw new Error('email is required')
  const sequence = SEQUENCES[language] || SEQUENCES.pt

  const blocked = await d1Query(
    `SELECT email FROM contact_status WHERE email=? AND (unsubscribed=1 OR bounced=1 OR complained=1) LIMIT 1`,
    [email]
  )
  if (blocked?.[0]?.results?.length) return { skipped: true, reason: 'suppressed' }

  const existing = await d1Query(`SELECT id FROM email_queue WHERE email=? AND sequence_code=? LIMIT 1`, [email, sequence.code])
  if (existing?.[0]?.results?.length) return { existing: true, sequence: sequence.code }

  const now = nowIso()
  for (let index = 0; index < sequence.subjects.length; index += 1) {
    await d1Query(
      `INSERT INTO email_queue
       (visitor_id,email,name,language,sequence_code,email_number,subject,status,scheduled_at,created_at)
       VALUES (?,?,?,?,?,?,?,'pending',?,?)`,
      [visitorId, email, name, language, sequence.code, index + 1, sequence.subjects[index], schedule(index), now]
    )
  }

  await d1Query(
    `INSERT INTO contact_status (email,language,checkout_started,updated_at)
     VALUES (?,?,1,?) ON CONFLICT(email) DO UPDATE SET checkout_started=1,updated_at=excluded.updated_at`,
    [email, language, now]
  )
  return { queued: true, sequence: sequence.code, emails: sequence.subjects.length }
}
