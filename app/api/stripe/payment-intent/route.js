import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { total, name, email, quantity, shipping, address } = await request.json()
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(total) * 100),
      currency: 'brl',
      receipt_email: email || undefined,
      metadata: {
        customer_name:  name          || '',
        quantity:       String(quantity || 1),
        product:        'Livro Fisico PT',
        whatsapp:       address?.whatsapp     || '',
        cep:            address?.cep          || '',
        address:        address?.address      || '',
        complement:     address?.complement   || '',
        neighborhood:   address?.neighborhood || '',
        city:           address?.city         || '',
        state:          address?.state        || '',
        shipping_name:  shipping?.name        || '',
        shipping_price: String(shipping?.price || 0),
      },
    })
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
