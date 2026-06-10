import { NextResponse } from 'next/server'
import { d1Query, nowIso, cleanText, normalizeLanguage } from '@/src/lib/d1'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const body = await request.json()

    const visitorId = cleanText(body.visitorId || body.visitor_id || '', 120)
    const name = cleanText(body.name || '', 180)
    const email = cleanText(body.email || '', 255).toLowerCase()
    const whatsapp = cleanText(body.whatsapp || '', 50)
    const language = normalizeLanguage(body.language || body.lang)
    const product = cleanText(body.product || '', 180)
    const productType = cleanText(body.productType || body.product_type || 'digital', 80)
    const amount = Number(body.amount || 0)
    const currency = cleanText(body.currency || (language === 'pt' ? 'BRL' : 'USD'), 10)
    const paymentIntent = cleanText(body.stripePaymentIntent || body.stripe_payment_intent || '', 180)
    const accessToken = cleanText(body.accessToken || body.access_token || '', 180)
    const now = nowIso()

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    await d1Query(
      `INSERT INTO customers (visitor_id, name, email, whatsapp, language, product, product_type, amount, currency, stripe_payment_intent, access_token, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(stripe_payment_intent) DO NOTHING`,
      [visitorId, name, email, whatsapp, language, product, productType, amount, currency, paymentIntent, accessToken, now]
    )

    await d1Query(
      `INSERT INTO events (visitor_id, email, language, event_type, page, metadata, created_at)
       VALUES (?, ?, ?, 'purchase', ?, ?, ?)`,
      [
        visitorId,
        email,
        language,
        cleanText(body.page || '', 300),
        JSON.stringify({ product, productType, amount, currency, paymentIntent }),
        now
      ]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('CRM customer error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
