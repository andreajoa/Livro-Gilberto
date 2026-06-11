import { NextResponse } from 'next/server'
import { d1Query, nowIso, cleanText, normalizeLanguage } from '@/src/lib/d1'

export const dynamic = 'force-dynamic'

function pageHtml(language) {
  const copy = {
    pt: {
      title: 'Você foi removido da lista.',
      text: 'Você não receberá mais emails automáticos do Gilberto de Souza.',
      back: 'Voltar ao site'
    },
    en: {
      title: 'You have been unsubscribed.',
      text: 'You will no longer receive automated emails from Gilberto de Souza.',
      back: 'Back to website'
    },
    es: {
      title: 'Has sido removido de la lista.',
      text: 'Ya no recibirás emails automáticos de Gilberto de Souza.',
      back: 'Volver al sitio'
    }
  }[language] || {}

  return `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#060C18;color:white;font-family:Arial,sans-serif;">
  <div style="max-width:620px;margin:0 auto;padding:80px 24px;text-align:center;">
    <div style="border:1px solid rgba(95,211,227,.25);background:#0D1B3E;border-radius:18px;padding:42px;">
      <h1 style="font-family:Georgia,serif;font-size:34px;margin:0 0 16px;">${copy.title}</h1>
      <p style="font-size:17px;line-height:1.7;color:#B8C8E0;margin:0 0 28px;">${copy.text}</p>
      <a href="https://www.gilberto-souza.com" style="display:inline-block;background:#5FD3E3;color:#06101F;text-decoration:none;font-weight:800;padding:14px 22px;border-radius:10px;">${copy.back}</a>
    </div>
  </div>
</body>
</html>`
}

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const email = cleanText(url.searchParams.get('email') || '', 255).toLowerCase()
    const language = normalizeLanguage(url.searchParams.get('lang') || 'pt')
    const now = nowIso()

    if (!email || !email.includes('@')) {
      return new NextResponse('Invalid unsubscribe link.', { status: 400 })
    }

    await d1Query(
      `INSERT INTO contact_status (email, language, unsubscribed, updated_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(email) DO UPDATE SET
         language=excluded.language,
         unsubscribed=1,
         updated_at=excluded.updated_at`,
      [email, language, now]
    )

    await d1Query(
      `UPDATE email_queue
       SET status='stopped'
       WHERE email=?
         AND status='pending'`,
      [email]
    )

    await d1Query(
      `INSERT INTO events (visitor_id,email,language,event_type,page,metadata,created_at)
       VALUES ('', ?, ?, 'unsubscribe', '/api/unsubscribe', '{}', ?)`,
      [email, language, now]
    )

    return new NextResponse(pageHtml(language), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
