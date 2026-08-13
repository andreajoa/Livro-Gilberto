import { NextResponse } from 'next/server'
import { d1Query, nowIso, cleanText, normalizeLanguage } from '@/src/lib/d1'
import { ensureCrmSchema } from '@/src/lib/crm/crmSchema'
import { isInternalRequest, internalHeaders } from '@/src/lib/server/internalAuth'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    if (!isInternalRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await request.json()
    await ensureCrmSchema(d1Query)

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

    await d1Query(
      `UPDATE email_queue
       SET status='stopped'
       WHERE email=?
         AND status='pending'
         AND sequence_code LIKE '%checkout_abandoned%'`,
      [email]
    )

    await d1Query(
      `INSERT INTO contact_status (email, language, checkout_completed, customer, updated_at)
       VALUES (?, ?, 1, 1, ?)
       ON CONFLICT(email) DO UPDATE SET
         language = excluded.language,
         checkout_completed = 1,
         customer = 1,
         updated_at = excluded.updated_at`,
      [email, language, now]
    )

    try {
      const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gilberto-souza.com').replace(/\/$/, '')
      await fetch(`${baseUrl}/api/crm/enqueue-customer-sequence`, {
        method: 'POST',
        headers: internalHeaders(),
        body: JSON.stringify({
          visitorId,
          name,
          email,
          language,
          product,
          productType,
          project:
            product
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
              .includes('superacao')
              ? 'superacao'
              : 'livro_gilberto',
          page: cleanText(body.page || '', 300)
        })
      })
    } catch (error) {
      console.warn('Customer sequence enqueue failed:', error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('CRM customer error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
