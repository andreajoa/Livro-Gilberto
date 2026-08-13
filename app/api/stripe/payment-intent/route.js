import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { d1Query, nowIso, cleanText } from '@/src/lib/d1'
import { ensureCommerceSchema } from '@/src/lib/commerce/commerceSchema'
import { getShippingQuote } from '@/src/lib/commerce/shippingServer'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const GILBERTO_UNIT_PRICE = 119
const SUPERACAO_UNIT_PRICE = 141.74

function rows(result) {
  return result?.[0]?.results || []
}

function metadataText(value, max = 450) {
  return cleanText(value, max).trim()
}

async function checkoutPaymentIntent(checkoutId) {
  await ensureCommerceSchema(d1Query)
  const checkout = rows(await d1Query(
    `SELECT * FROM commerce_checkout_sessions WHERE checkout_id=? LIMIT 1`,
    [checkoutId]
  ))[0]

  if (!checkout) throw new Error('Checkout não encontrado')
  if (new Date(checkout.expires_at).getTime() < Date.now()) throw new Error('Checkout expirado')
  if (checkout.status === 'paid') throw new Error('Este pedido já foi pago')

  if (checkout.stripe_payment_intent) {
    const existing = await stripe.paymentIntents.retrieve(checkout.stripe_payment_intent)
    if (!['canceled', 'succeeded'].includes(existing.status) && existing.client_secret) {
      return {
        clientSecret: existing.client_secret,
        paymentIntentId: existing.id,
        unitPrice: checkout.unit_price,
        shippingPrice: checkout.shipping_amount,
        total: checkout.total
      }
    }
  }

  const { quote } = await getShippingQuote(checkout.destination_cep, checkout.shipping_method)
  const unitPrice = GILBERTO_UNIT_PRICE
  const subtotal = unitPrice * Number(checkout.quantity)
  const total = subtotal + quote.amount

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100),
    currency: 'brl',
    receipt_email: checkout.customer_email,
    automatic_payment_methods: { enabled: true },
    metadata: {
      checkout_id: checkout.checkout_id,
      cart_id: checkout.cart_id,
      visitor_id: checkout.visitor_id || '',
      session_id: checkout.session_id || '',
      attribution_id: checkout.attribution_id || '',
      product: 'Livro Fisico PT',
      product_id: checkout.product_id,
      book_id: 'gilberto_book_01',
      quantity: String(checkout.quantity),
      unit_price: unitPrice.toFixed(2),
      shipping_type: quote.method,
      shipping_price: quote.amount.toFixed(2),
      calculated_total: total.toFixed(2),
      analytics_version: 'website-intelligence-v1'
    }
  }, { idempotencyKey: `checkout_${checkout.checkout_id}` })

  await d1Query(
    `UPDATE commerce_checkout_sessions
     SET status='payment_pending', stripe_payment_intent=?, unit_price=?, subtotal=?,
         shipping_amount=?, shipping_name=?, shipping_days=?, total=?, updated_at=?
     WHERE checkout_id=?`,
    [paymentIntent.id, unitPrice, subtotal, quote.amount, quote.name, quote.days, total, nowIso(), checkout.checkout_id]
  )

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    unitPrice,
    shippingPrice: quote.amount,
    total
  }
}

async function legacySuperacaoPayment(body) {
  if (metadataText(body.productId, 120) !== 'superacao_physical_pt') {
    throw new Error('Use o checkout seguro para este produto')
  }

  const address = body.address || {}
  const method = metadataText(body.shipping?.type, 20).toUpperCase()
  const { quote } = await getShippingQuote(address.cep, method)
  const total = SUPERACAO_UNIT_PRICE + quote.amount
  const addressLine = metadataText(address.address, 350)

  if (!metadataText(body.name, 180) || !metadataText(body.email, 255) || !addressLine) {
    throw new Error('Dados de entrega incompletos')
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100),
    currency: 'brl',
    receipt_email: metadataText(body.email, 255),
    automatic_payment_methods: { enabled: true },
    metadata: {
      customer_name: metadataText(body.name, 180),
      quantity: '1',
      product: 'Superacao Livro Fisico PT',
      book_id: 'superacao',
      product_id: 'superacao_physical_pt',
      visitor_id: metadataText(body.visitorId, 120),
      source: metadataText(body.source, 180),
      whatsapp: metadataText(address.whatsapp, 50),
      cep: metadataText(address.cep, 8).replace(/\D/g, ''),
      address: addressLine,
      complement: metadataText(address.complement, 180),
      neighborhood: metadataText(address.neighborhood, 180),
      city: metadataText(address.city, 180),
      state: metadataText(address.state, 2).toUpperCase(),
      shipping_type: quote.method,
      shipping_name: quote.name,
      shipping_price: quote.amount.toFixed(2),
      unit_price: SUPERACAO_UNIT_PRICE.toFixed(2),
      calculated_total: total.toFixed(2)
    }
  })

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    unitPrice: SUPERACAO_UNIT_PRICE,
    shippingPrice: quote.amount,
    total
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const checkoutId = metadataText(body.checkoutId, 120)
    const result = checkoutId
      ? await checkoutPaymentIntent(checkoutId)
      : await legacySuperacaoPayment(body)

    return NextResponse.json({ success: true, ...result }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Physical payment intent error:', error)
    return NextResponse.json(
      { error: error.message || 'Não foi possível criar o pagamento' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
