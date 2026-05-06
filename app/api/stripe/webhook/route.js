import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import fs from 'fs/promises'
import path from 'path'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const DIGITAL_FILE = path.join(process.cwd(), 'data', 'digital-orders.json')
const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json')

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

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object
    const meta = pi.metadata || {}
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })

    if (meta.product?.includes('Digital') && meta.access_token) {
      let data = { orders: [] }
      try { data = JSON.parse(await fs.readFile(DIGITAL_FILE, 'utf8')) } catch {}
      if (!data.orders.find(o => o.accessToken === meta.access_token)) {
        data.orders.push({
          id: `DIG-${Date.now()}`,
          accessToken: meta.access_token,
          stripePaymentIntentId: pi.id,
          customer: { name: meta.customer_name, email: pi.receipt_email },
          lang: meta.lang,
          status: 'pago',
          files: {
            ebook: { url: process.env[`EBOOK_${(meta.lang||'pt').toUpperCase()}_URL`] || '', name: 'eBook', filename: `ebook-${meta.lang||'pt'}.pdf` },
            audiobook: [1,2,3].map(n => ({ url: process.env[`AUDIO_${(meta.lang||'pt').toUpperCase()}_0${n}`] || '', title: `Capítulo ${n}` }))
          },
          createdAt: new Date().toISOString(),
        })
        await fs.writeFile(DIGITAL_FILE, JSON.stringify(data, null, 2))
      }
    }
  }
  return NextResponse.json({ received: true })
}
