import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { total, name, email, quantity, shipping } = await request.json()
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(total) * 100),
      currency: 'brl',
      receipt_email: email || undefined,
      metadata: { customer_name: name || '', quantity: String(quantity || 1), product: 'Livro Fisico PT' },
    })
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
