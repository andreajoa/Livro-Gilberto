import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import fs from 'fs/promises'
import path from 'path'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const DIGITAL_FILE = path.join(process.cwd(), 'data', 'digital-orders.json')
const ORDERS_FILE  = path.join(process.cwd(), 'data', 'orders.json')

export async function POST(request) {
  const body = await request.text()
  const sig  = request.headers.get('stripe-signature')
  let event
  try {
    event = process.env.STRIPE_WEBHOOK_SECRET
      ? stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
      : JSON.parse(body)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi   = event.data.object
    const meta = pi.metadata || {}
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })

    // ── DIGITAL ──────────────────────────────────────────────────────────
    if (meta.product?.includes('Digital') && meta.access_token) {
      let data = { orders: [] }
      try { data = JSON.parse(await fs.readFile(DIGITAL_FILE, 'utf8')) } catch {}
      const exists = data.orders.find(o => o.accessToken === meta.access_token)
      if (!exists) {
        const lang = meta.lang || 'pt'
        const order = {
          id: `DIG-${Date.now()}`,
          accessToken: meta.access_token,
          stripePaymentIntentId: pi.id,
          customer: { name: meta.customer_name, email: pi.receipt_email },
          lang,
          status: 'pago',
          files: {
            ebook: { url: process.env[`EBOOK_${lang.toUpperCase()}_URL`] || '', filename: `ebook-${lang}.pdf` },
            audiobook: [1,2,3,4,5].map(n => ({
              url: process.env[`AUDIO_${lang.toUpperCase()}_0${n}`] || '',
              title: `Capítulo ${n}`
            })).filter(a => a.url)
          },
          createdAt: new Date().toISOString(),
        }
        data.orders.push(order)
        await fs.writeFile(DIGITAL_FILE, JSON.stringify(data, null, 2))

        // Enviar email
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gilbertosouza.com'
        await fetch(`${baseUrl}/api/send-order-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'digital',
            order: {
              name: meta.customer_name,
              email: pi.receipt_email,
              lang,
              paymentIntentId: pi.id,
              accessUrl: `${baseUrl}/acesso/${meta.access_token}`
            }
          })
        })
      }
    }

    // ── FÍSICO ───────────────────────────────────────────────────────────
    if (meta.product === 'Livro Fisico PT') {
      let data = { orders: [] }
      try { data = JSON.parse(await fs.readFile(ORDERS_FILE, 'utf8')) } catch {}
      const exists = data.orders.find(o => o.stripePaymentIntentId === pi.id)
      if (!exists) {
        const order = {
          id: `ORD-${Date.now()}`,
          stripePaymentIntentId: pi.id,
          customer: {
            name:         meta.customer_name,
            email:        pi.receipt_email,
            whatsapp:     meta.whatsapp     || '',
            cep:          meta.cep          || '',
            address:      meta.address      || '',
            complement:   meta.complement   || '',
            neighborhood: meta.neighborhood || '',
            city:         meta.city         || '',
            state:        meta.state        || '',
          },
          shipping: {
            name:  meta.shipping_name  || '',
            price: meta.shipping_price || '',
          },
          quantity: meta.quantity || '1',
          total: (pi.amount / 100).toFixed(2),
          status: 'pago',
          createdAt: new Date().toISOString(),
        }
        data.orders.push(order)
        await fs.writeFile(ORDERS_FILE, JSON.stringify(data, null, 2))

        // Enviar email
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gilbertosouza.com'
        await fetch(`${baseUrl}/api/send-order-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'physical',
            order: {
              name:         meta.customer_name,
              email:        pi.receipt_email,
              whatsapp:     meta.whatsapp     || '',
              cep:          meta.cep          || '',
              address:      meta.address      || '',
              complement:   meta.complement   || '',
              neighborhood: meta.neighborhood || '',
              city:         meta.city         || '',
              state:        meta.state        || '',
              shippingName:  meta.shipping_name  || '',
              shippingPrice: meta.shipping_price || '',
              quantity:      meta.quantity || '1',
              total:        (pi.amount / 100).toFixed(2),
              paymentIntentId: pi.id,
            }
          })
        })
      }
    }
  }

  return NextResponse.json({ received: true })
}
