import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  getLeadEmailHtml,
  getLeadEmailSubject,
  getManualEmailHtml,
  getManualEmailSubject,
  getCheckoutEmailHtml,
  getCheckoutEmailSubject,
  getCustomerEmailHtml,
  getCustomerEmailSubject
} from '@/src/lib/email/leadEmailTemplates'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_TYPES = {
  lead: {
    max: 15,
    getSubject: getLeadEmailSubject,
    getHtml: getLeadEmailHtml
  },
  manual: {
    max: 15,
    getSubject: getManualEmailSubject,
    getHtml: getManualEmailHtml
  },
  checkout: {
    max: 15,
    getSubject: getCheckoutEmailSubject,
    getHtml: getCheckoutEmailHtml
  },
  customer: {
    max: 3,
    getSubject: getCustomerEmailSubject,
    getHtml: getCustomerEmailHtml
  }
}

function normalizeLanguage(value) {
  const language = String(value || 'pt').toLowerCase()

  if (language === 'en') return 'en'
  if (language === 'es') return 'es'

  return 'pt'
}

function normalizeType(value) {
  const type = String(value || 'lead').toLowerCase()
  return EMAIL_TYPES[type] ? type : 'lead'
}

export async function GET(request) {
  try {
    const url = new URL(request.url)

    const token = url.searchParams.get('token')
    const to =
      url.searchParams.get('to') ||
      'andremuseu@gmail.com'

    const language = normalizeLanguage(
      url.searchParams.get('language')
    )

    const type = normalizeType(
      url.searchParams.get('type')
    )

    const emailNumber = Number(
      url.searchParams.get('email') || '1'
    )

    if (
      !process.env.EMAIL_CRON_TOKEN ||
      token !== process.env.EMAIL_CRON_TOKEN
    ) {
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

    const template = EMAIL_TYPES[type]

    if (
      !Number.isInteger(emailNumber) ||
      emailNumber < 1 ||
      emailNumber > template.max
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            `Invalid email number for type ${type}. ` +
            `Use a number from 1 to ${template.max}.`
        },
        {
          status: 400
        }
      )
    }

    const subject = template.getSubject({
      language,
      emailNumber
    })

    const html = template.getHtml({
      language,
      name: language === 'es' ? 'Andrés' : 'Andre',
      emailNumber,
      email: to
    })

    const preview =
      url.searchParams.get('preview') === '1'

    if (preview) {
      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0',
          'X-Robots-Tag': 'noindex, nofollow'
        }
      })
    }

    const { data, error } = await resend.emails.send({
      from:
        process.env.EMAIL_FROM ||
        'Gilberto de Souza <contato@gilberto-souza.com>',
      to,
      subject,
      html
    })

    if (error) {
      console.error('Resend test send error:', error)

      return NextResponse.json(
        {
          success: false,
          error
        },
        {
          status: 400
        }
      )
    }

    return NextResponse.json({
      success: true,
      type,
      language,
      email_number: emailNumber,
      to,
      subject,
      resend_id: data?.id || null
    })
  } catch (error) {
    console.error('Test email error:', error)

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
