import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { d1Query } from '@/src/lib/d1'
import { getLeadEmailHtml, getCustomerEmailHtml } from '@/src/lib/email/leadEmailTemplates'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gilberto-souza.com').replace(/\/$/, '')
}

function getEmailBody({ language, name, emailNumber }) {
  const baseUrl = getBaseUrl()
  const firstName = String(name || '').trim().split(' ')[0] || ''

  const content = {
    pt: {
      greeting: firstName ? `Olá, ${firstName}.` : 'Olá.',
      button: 'Conhecer o livro',
      footer: 'Você recebeu este email porque se cadastrou no site oficial de Gilberto de Souza.',
      emails: {
        1: {
          title: 'Você não precisa carregar essa dor sozinho',
          body: 'A dor de ser deixado ou substituído pode fazer um homem questionar seu valor. Mas essa dor não precisa definir o resto da sua vida. O primeiro passo é entender o que está acontecendo dentro de você.'
        },
        2: {
          title: 'O erro que mantém muitos homens presos ao passado',
          body: 'Muitos homens tentam superar tudo no silêncio. Eles fingem força, mas continuam presos à pergunta: por que ela me trocou? O problema é que essa pergunta mantém sua mente presa no passado.'
        },
        3: {
          title: 'Uma forma diferente de recomeçar',
          body: 'Recomeçar não significa esquecer tudo de uma vez. Significa recuperar clareza, respeito próprio e direção. Foi por isso que este livro foi criado.'
        }
      }
    },
    en: {
      greeting: firstName ? `Hi, ${firstName}.` : 'Hi.',
      button: 'Read the book',
      footer: 'You received this email because you signed up on Gilberto de Souza’s official website.',
      emails: {
        1: {
          title: 'You do not have to carry this pain alone',
          body: 'Being left or replaced can make a man question his worth. But this pain does not have to define the rest of your life. The first step is understanding what is happening inside you.'
        },
        2: {
          title: 'The mistake that keeps many men stuck in the past',
          body: 'Many men try to move on in silence. They pretend to be strong, but they stay trapped in the same question: why did she replace me? That question keeps your mind locked in the past.'
        },
        3: {
          title: 'A different way to start again',
          body: 'Starting again does not mean forgetting everything overnight. It means recovering clarity, self-respect, and direction. That is why this book was created.'
        }
      }
    },
    es: {
      greeting: firstName ? `Hola, ${firstName}.` : 'Hola.',
      button: 'Conocer el libro',
      footer: 'Recibiste este correo porque te registraste en el sitio oficial de Gilberto de Souza.',
      emails: {
        1: {
          title: 'No tienes que cargar este dolor solo',
          body: 'Ser dejado o reemplazado puede hacer que un hombre cuestione su valor. Pero este dolor no tiene que definir el resto de tu vida. El primer paso es entender lo que está pasando dentro de ti.'
        },
        2: {
          title: 'El error que mantiene a muchos hombres atrapados en el pasado',
          body: 'Muchos hombres intentan superar todo en silencio. Fingen estar fuertes, pero siguen atrapados en la pregunta: ¿por qué me reemplazó? Esa pregunta mantiene tu mente en el pasado.'
        },
        3: {
          title: 'Una forma diferente de empezar de nuevo',
          body: 'Empezar de nuevo no significa olvidar todo de un día para otro. Significa recuperar claridad, respeto propio y dirección. Por eso fue creado este libro.'
        }
      }
    }
  }[language] || content.pt

  const item = content.emails[emailNumber] || content.emails[1]

  return `
  <div style="margin:0;padding:0;background:#060C18;font-family:Arial,sans-serif;color:#ffffff;">
    <div style="max-width:620px;margin:0 auto;padding:32px 20px;">
      <div style="background:#0D1B3E;border:1px solid rgba(0,196,212,0.25);border-radius:18px;padding:32px;">
        <p style="color:#00C4D4;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 18px;font-weight:bold;">Gilberto de Souza</p>
        <h1 style="font-size:28px;line-height:1.15;margin:0 0 18px;color:#ffffff;">${item.title}</h1>
        <p style="font-size:16px;line-height:1.8;color:#B8C8E0;margin:0 0 18px;">${content.greeting}</p>
        <p style="font-size:16px;line-height:1.8;color:#B8C8E0;margin:0 0 28px;">${item.body}</p>
        <a href="${baseUrl}/${language === 'pt' ? '' : language}#buy" style="display:inline-block;background:#00C4D4;color:#06101f;text-decoration:none;font-weight:bold;padding:14px 22px;border-radius:10px;">
          ${content.button}
        </a>
        <p style="font-size:12px;line-height:1.6;color:#7182A6;margin:28px 0 0;">${content.footer}</p>
      </div>
    </div>
  </div>
  `
}

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get('token')

    if (!process.env.EMAIL_CRON_TOKEN || token !== process.env.EMAIL_CRON_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date().toISOString()

    const result = await d1Query(
      `SELECT *
       FROM email_queue
       WHERE status = 'pending'
         AND scheduled_at <= ?
       ORDER BY scheduled_at ASC
       LIMIT 10`,
      [now]
    )

    const pending = result?.[0]?.results || []
    const sent = []
    const failed = []

    for (const item of pending) {
      try {
        const html = String(item.sequence_code || '').includes('customer')
          ? getCustomerEmailHtml({
              language: item.language,
              name: item.name,
              emailNumber: item.email_number
            })
          : getLeadEmailHtml({
              language: item.language,
              name: item.name,
              emailNumber: item.email_number
            })

        const response = await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Gilberto de Souza <contato@gilberto-souza.com>',
          to: item.email,
          subject: item.subject,
          html
        })

        await d1Query(
          `UPDATE email_queue SET status='sent', sent_at=? WHERE id=?`,
          [new Date().toISOString(), item.id]
        )

        await d1Query(
          `INSERT INTO email_logs
           (queue_id, email, language, sequence_code, email_number, subject, status, resend_id, created_at)
           VALUES (?, ?, ?, ?, ?, ?, 'sent', ?, ?)`,
          [
            item.id,
            item.email,
            item.language,
            item.sequence_code,
            item.email_number,
            item.subject,
            response?.data?.id || '',
            new Date().toISOString()
          ]
        )

        sent.push(item.id)
      } catch (error) {
        await d1Query(
          `UPDATE email_queue SET status='failed' WHERE id=?`,
          [item.id]
        )

        await d1Query(
          `INSERT INTO email_logs
           (queue_id, email, language, sequence_code, email_number, subject, status, error, created_at)
           VALUES (?, ?, ?, ?, ?, ?, 'failed', ?, ?)`,
          [
            item.id,
            item.email,
            item.language,
            item.sequence_code,
            item.email_number,
            item.subject,
            error.message,
            new Date().toISOString()
          ]
        )

        failed.push({ id: item.id, error: error.message })
      }
    }

    return NextResponse.json({
      success: true,
      checked: pending.length,
      sent,
      failed
    })
  } catch (error) {
    console.error('Send emails cron error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
