import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Enviar email com o PDF
    const emailResponse = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Gilberto de Souza <contato@gilberto-souza.com>',
      to: email,
      subject: 'Your Free Guide is Ready! 📚',
      html: `
        <div style="margin:0;padding:0;background:#060C18;font-family:Arial,sans-serif;color:#ffffff;">
          <div style="max-width:620px;margin:0 auto;padding:32px 20px;">
            <div style="background:#0D1B3E;border:1px solid rgba(0,196,212,0.25);border-radius:18px;padding:32px;">
              <p style="color:#00C4D4;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 18px;font-weight:bold;">Gilberto de Souza</p>
              <h1 style="font-size:28px;line-height:1.15;margin:0 0 18px;color:#ffffff;">Your Free Guide is Here!</h1>
              <p style="font-size:16px;line-height:1.8;color:#B8C8E0;margin:0 0 18px;">
                Thank you for downloading the free guide. Inside you'll find the first steps to overcome the pain of betrayal and start rebuilding your life.
              </p>
              <p style="font-size:16px;line-height:1.8;color:#B8C8E0;margin:0 0 28px;">
                This is just the beginning. The complete book "How to Overcome the Pain of Being Replaced by Someone Else" contains the full journey from pain to victory.
              </p>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gilberto-souza.com'}/pdfs/free-guide.pdf" 
                 style="display:inline-block;background:#00C4D4;color:#06101f;text-decoration:none;font-weight:bold;padding:14px 22px;border-radius:10px;">
                Download Your Free Guide
              </a>
              <p style="font-size:12px;line-height:1.6;color:#7182A6;margin:28px 0 0;">
                You received this email because you requested the free guide on Gilberto de Souza's official website.
              </p>
            </div>
          </div>
        </div>
      `
    })

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}
