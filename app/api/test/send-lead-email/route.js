import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  getLeadEmailHtml,
  getLeadEmailSubject
} from '@/src/lib/email/leadEmailTemplates'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get('token')
    const to = url.searchParams.get('to') || 'andremuseu@gmail.com'
    const language = url.searchParams.get('language') || 'pt'
    const emailNumber = Number(url.searchParams.get('email') || '1')

    if (
      !process.env.EMAIL_CRON_TOKEN ||
      token !== process.env.EMAIL_CRON_TOKEN
    ) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const subject = getLeadEmailSubject({
      language,
      emailNumber
    })

    const html = getLeadEmailHtml({
      language,
      name: 'André',
      emailNumber
    })

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
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      to,
      subject,
      resend_id: data?.id || null
    })
  } catch (error) {
    console.error('Test lead email error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    )
  }
}
