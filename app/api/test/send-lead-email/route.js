import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getLeadEmailHtml, getLeadEmailSubject } from '@/src/lib/email/leadEmailTemplates'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get('token')
    const to = url.searchParams.get('to') || 'andremuseu@gmail.com'
    const language = url.searchParams.get('language') || 'pt'
    const emailNumber = Number(url.searchParams.get('email') || '1')

    if (!process.env.EMAIL_CRON_TOKEN || token !== process.env.EMAIL_CRON_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subject = getLeadEmailSubject({ language, emailNumber })
    const html = getLeadEmailHtml({ language, name: 'André', emailNumber })

    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Gilberto de Souza <contato@gilberto-souza.com>',
      to,
      subject,
      html
    })

    return NextResponse.json({ success: true, to, subject, resend_id: response?.data?.id || null })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
