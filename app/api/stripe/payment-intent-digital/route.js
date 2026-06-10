import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import crypto from 'crypto'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { total, name, email, lang, visitorId } = await request.json()
    const currency = lang === 'pt' ? 'brl' : 'usd'
    const accessToken = crypto.randomBytes(32).toString('hex')
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(total) * 100),
      currency,
      receipt_email: email || undefined,
      metadata: { customer_name: name || '', lang, access_token: accessToken, product: 'Digital eBook Audiobook', visitor_id: visitorId || '' },
    })
    return NextResponse.json({ clientSecret: paymentIntent.client_secret, accessToken })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
