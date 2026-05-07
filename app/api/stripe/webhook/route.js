import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gilberto-souza.com').replace(/\/$/, '')
}

export async function POST(request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event

  try {
    event = process.env.STRIPE_WEBHOOK_SECRET
      ? stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
      : JSON.parse(body)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type !== 'payment_intent.succeeded') {
    return NextResponse.json({ received: true })
  }

  const pi = event.data.object
  const meta = pi.metadata || {}
  const baseUrl = getBaseUrl()

  if (meta.product?.includes('Digital') && meta.access_token) {
    const lang = meta.lang || 'pt'
    const accessUrl = `${baseUrl}/acesso/${meta.access_token}?lang=${lang}&payment_intent=${pi.id}`

    await fetch(`${baseUrl}/api/send-order-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'digital',
        order: {
          name: meta.customer_name || 'Cliente',
          email: pi.receipt_email || '',
          lang,
          paymentIntentId: pi.id,
          accessUrl
        }
      })
    })
  }

  if (meta.product === 'Livro Fisico PT') {
    await fetch(`${baseUrl}/api/send-order-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'physical',
        order: {
          name: meta.customer_name || 'Cliente',
          email: pi.receipt_email || '',
          whatsapp: meta.whatsapp || '',
          cep: meta.cep || '',
          address: meta.address || '',
          complement: meta.complement || '',
          neighborhood: meta.neighborhood || '',
          city: meta.city || '',
          state: meta.state || '',
          shippingName: meta.shipping_name || '',
          shippingPrice: meta.shipping_price || '',
          quantity: meta.quantity || '1',
          total: (pi.amount / 100).toFixed(2),
          paymentIntentId: pi.id
        }
      })
    })
  }

  return NextResponse.json({ received: true })
}
