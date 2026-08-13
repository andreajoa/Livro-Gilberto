import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { d1Query, nowIso, cleanText } from '@/src/lib/d1'
import { ensureCommerceSchema } from '@/src/lib/commerce/commerceSchema'
import { ensureCrmSchema } from '@/src/lib/crm/crmSchema'
import { getShippingQuote } from '@/src/lib/commerce/shippingServer'
import { queueCheckoutSequence } from '@/src/lib/crm/checkoutSequence'

export const dynamic = 'force-dynamic'

const UNIT_PRICE = 119
const MAX_QUANTITY = 20

function resultRows(result) {
  return result?.[0]?.results || []
}

function email(value) {
  const normalized = cleanText(value, 255).toLowerCase()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ? normalized : ''
}

function phone(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 13)
  return digits.length >= 10 ? digits : ''
}

function required(value, max, label) {
  const normalized = cleanText(value, max).trim()
  if (!normalized) throw new Error(`${label} é obrigatório`)
  return normalized
}

export async function POST(request) {
  try {
    const body = await request.json()
    const form = body.customer || {}
    const quantity = Math.min(MAX_QUANTITY, Math.max(1, Math.floor(Number(body.quantity) || 1)))
    const customerEmail = email(form.email)
    const whatsapp = phone(form.whatsapp)
    if (!customerEmail) throw new Error('E-mail inválido')
    if (!whatsapp) throw new Error('WhatsApp inválido')

    const { address: cepAddress, quote } = await getShippingQuote(form.cep, body.shippingMethod)
    const state = required(form.state || cepAddress.state, 2, 'Estado').toUpperCase()
    const city = required(form.city || cepAddress.city, 180, 'Cidade')
    if (state !== cepAddress.state || city.toLocaleLowerCase('pt-BR') !== cepAddress.city.toLocaleLowerCase('pt-BR')) {
      throw new Error('Cidade ou estado não correspondem ao CEP informado')
    }

    const name = required(form.name, 180, 'Nome completo')
    if (name.split(/\s+/).length < 2) throw new Error('Informe o nome completo')
    const street = required(form.street || form.address || cepAddress.street, 250, 'Endereço')
    const number = required(form.number, 40, 'Número')
    const neighborhood = required(form.neighborhood || cepAddress.neighborhood, 180, 'Bairro')
    const cartId = /^[a-z0-9_-]{16,120}$/i.test(String(body.cartId || '')) ? String(body.cartId) : `cart_${randomUUID()}`
    const checkoutId = `chk_${randomUUID()}`
    const subtotal = UNIT_PRICE * quantity
    const total = subtotal + quote.amount
    const now = nowIso()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    const analytics = body.analytics || {}
    const marketingConsent = body.marketingConsent === true ? 1 : 0

    await ensureCommerceSchema(d1Query, now)
    await ensureCrmSchema(d1Query)

    await d1Query(
      `INSERT INTO commerce_checkout_sessions
       (checkout_id, cart_id, visitor_id, session_id, attribution_id, status,
        customer_name, customer_email, customer_whatsapp, destination_cep,
        address_street, address_number, address_complement, address_neighborhood,
        address_city, address_state, product_id, product_name, quantity, unit_price,
        shipping_method, shipping_name, shipping_amount, shipping_days, subtotal, total,
        currency, marketing_consent, source, utm_source, utm_medium, utm_campaign,
        utm_content, utm_term, creative_id, campaign_id, landing_page,
        created_at, updated_at, expires_at)
       VALUES (?, ?, ?, ?, ?, 'created', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        'gilberto_physical_pt', 'Como Vencer a Dor de Ser Trocado Por Outro', ?, ?,
        ?, ?, ?, ?, ?, ?, 'BRL', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        checkoutId, cartId, cleanText(analytics.visitorId, 120), cleanText(analytics.sessionId, 120), cleanText(analytics.attributionId, 120),
        name, customerEmail, whatsapp, cepAddress.cep, street, number, cleanText(form.complement, 180), neighborhood, city, state,
        quantity, UNIT_PRICE, quote.method, quote.name, quote.amount, quote.days, subtotal, total, marketingConsent,
        cleanText(analytics.source, 180), cleanText(analytics.utmSource, 180), cleanText(analytics.utmMedium, 180), cleanText(analytics.utmCampaign, 250),
        cleanText(analytics.utmContent, 250), cleanText(analytics.utmTerm, 250), cleanText(analytics.creativeId, 120), cleanText(analytics.campaignId, 120),
        cleanText(analytics.landingPage, 450), now, now, expiresAt
      ]
    )

    await d1Query(
      `INSERT INTO commerce_carts
       (cart_id, visitor_id, session_id, status, product_id, quantity, destination_cep,
        shipping_method, subtotal, shipping_amount, total, currency, customer_name,
        customer_email, customer_whatsapp, marketing_consent, last_activity_at, created_at, updated_at)
       VALUES (?, ?, ?, 'checkout', 'gilberto_physical_pt', ?, ?, ?, ?, ?, ?, 'BRL', ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(cart_id) DO UPDATE SET
        status='checkout', quantity=excluded.quantity, destination_cep=excluded.destination_cep,
        shipping_method=excluded.shipping_method, subtotal=excluded.subtotal,
        shipping_amount=excluded.shipping_amount, total=excluded.total,
        customer_name=excluded.customer_name, customer_email=excluded.customer_email,
        customer_whatsapp=excluded.customer_whatsapp, marketing_consent=excluded.marketing_consent,
        last_activity_at=excluded.last_activity_at, updated_at=excluded.updated_at`,
      [cartId, cleanText(analytics.visitorId, 120), cleanText(analytics.sessionId, 120), quantity, cepAddress.cep, quote.method,
        subtotal, quote.amount, total, name, customerEmail, whatsapp, marketingConsent, now, now, now]
    )

    if (marketingConsent) {
      await d1Query(
        `INSERT INTO leads (visitor_id, name, email, whatsapp, language, source, consent, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, 'pt', 'physical_checkout', 1, 'checkout', ?, ?)
         ON CONFLICT(email, language) DO UPDATE SET
          visitor_id=excluded.visitor_id, name=excluded.name, whatsapp=excluded.whatsapp,
          consent=1, status='checkout', updated_at=excluded.updated_at`,
        [cleanText(analytics.visitorId, 120), name, customerEmail, whatsapp, now, now]
      )

      await queueCheckoutSequence({
        visitorId: cleanText(analytics.visitorId, 120),
        name,
        email: customerEmail,
        language: 'pt'
      })
    }

    return NextResponse.json({ success: true, checkoutId })
  } catch (error) {
    console.error('Checkout creation error:', error)
    return NextResponse.json({ error: error.message || 'Não foi possível iniciar o checkout' }, { status: 400 })
  }
}

export async function GET(request) {
  try {
    const checkoutId = cleanText(new URL(request.url).searchParams.get('id'), 120)
    if (!/^chk_[a-f0-9-]{36}$/i.test(checkoutId)) return NextResponse.json({ error: 'Checkout inválido' }, { status: 400 })
    await ensureCommerceSchema(d1Query)
    const rows = resultRows(await d1Query(
      `SELECT checkout_id, status, customer_name, customer_email, customer_whatsapp,
              destination_cep, address_street, address_number, address_complement,
              address_neighborhood, address_city, address_state, product_name,
              quantity, unit_price, shipping_name, shipping_amount, shipping_days,
              subtotal, total, currency, expires_at
       FROM commerce_checkout_sessions WHERE checkout_id=? LIMIT 1`,
      [checkoutId]
    ))
    if (!rows.length) return NextResponse.json({ error: 'Checkout não encontrado' }, { status: 404 })
    if (new Date(rows[0].expires_at).getTime() < Date.now()) return NextResponse.json({ error: 'Checkout expirado' }, { status: 410 })
    return NextResponse.json({ success: true, checkout: rows[0] }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    return NextResponse.json({ error: 'Não foi possível carregar o checkout' }, { status: 500 })
  }
}
