import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import {
  ensureWebsiteIntelligenceSchema
} from '@/src/lib/website/websiteIntelligenceSchema'

import {
  beginStripeWebhookEvent,
  completeStripeWebhookEvent,
  completeStripeWebhookStep,
  failStripeWebhookEvent,
  hasStripeWebhookStep,
  recordStripeConversion
} from '@/src/lib/website/websiteConversionServer'

import {
  d1Query
} from '@/src/lib/d1'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
)

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://www.gilberto-souza.com'
  ).replace(/\/$/, '')
}

async function postInternal(
  url,
  payload
) {
  const response = await fetch(
    url,
    {
      method: 'POST',

      headers: {
        'Content-Type':
          'application/json'
      },

      body: JSON.stringify(payload)
    }
  )

  if (!response.ok) {
    const body = await response
      .text()
      .catch(() => '')

    throw new Error(
      `Internal request failed ${response.status}: ${body.slice(0, 500)}`
    )
  }

  return response
}

function verifyStripeEvent(
  rawBody,
  signature
) {
  const secret =
    process.env.STRIPE_WEBHOOK_SECRET

  if (!secret) {
    if (
      process.env.NODE_ENV === 'production'
    ) {
      throw new Error(
        'STRIPE_WEBHOOK_SECRET is required in production'
      )
    }

    return JSON.parse(rawBody)
  }

  if (!signature) {
    throw new Error(
      'Missing Stripe signature'
    )
  }

  return stripe.webhooks.constructEvent(
    rawBody,
    signature,
    secret
  )
}

export async function POST(request) {
  const rawBody =
    await request.text()

  const signature =
    request.headers.get(
      'stripe-signature'
    )

  let stripeEvent

  try {
    stripeEvent = verifyStripeEvent(
      rawBody,
      signature
    )
  } catch (error) {
    console.error(
      'Stripe signature verification failed:',
      error
    )

    return NextResponse.json(
      {
        received: false,
        error:
          'Invalid Stripe webhook'
      },
      {
        status: 400
      }
    )
  }

  if (
    stripeEvent.type !==
    'payment_intent.succeeded'
  ) {
    return NextResponse.json({
      received: true,
      ignored: true,
      event_type:
        stripeEvent.type
    })
  }

  const paymentIntent =
    stripeEvent.data.object

  const metadata =
    paymentIntent.metadata || {}

  try {
    await ensureWebsiteIntelligenceSchema(
      d1Query
    )

    const processing =
      await beginStripeWebhookEvent({
        stripeEventId:
          stripeEvent.id,

        stripeEventType:
          stripeEvent.type,

        paymentIntentId:
          paymentIntent.id
      })

    if (!processing.shouldProcess) {
      return NextResponse.json({
        received: true,
        duplicate: true,
        stripe_event_id:
          stripeEvent.id
      })
    }

    const conversion =
      await recordStripeConversion({
        paymentIntent,
        metadata
      })

    const baseUrl =
      getBaseUrl()

    if (
      metadata.product?.includes(
        'Digital'
      ) &&
      metadata.access_token
    ) {
      const lang =
        metadata.lang || 'pt'

      const accessUrl =
        `${baseUrl}/acesso/` +
        `${metadata.access_token}` +
        `?lang=${lang}` +
        `&payment_intent=${paymentIntent.id}`

      const digitalEmailCompleted =
        await hasStripeWebhookStep({
          stripeEventId:
            stripeEvent.id,

          stepCode:
            'order_email_sent'
        })

      if (!digitalEmailCompleted) {
        await postInternal(
          (
            metadata.product ===
              'Superacao Digital eBook'
              ? `${baseUrl}/api/send-superacao-order-email`
              : `${baseUrl}/api/send-order-email`
          ),
          {
            type: 'digital',

          order: {
            name:
              metadata.customer_name ||
              'Cliente',

            email:
              paymentIntent.receipt_email ||
              '',

            lang,

            paymentIntentId:
              paymentIntent.id,

              accessUrl
            }
          }
        )

        await completeStripeWebhookStep({
          stripeEventId:
            stripeEvent.id,

          stepCode:
            'order_email_sent'
        })
      }

      const digitalCrmCompleted =
        await hasStripeWebhookStep({
          stripeEventId:
            stripeEvent.id,

          stepCode:
            'crm_customer_saved'
        })

      if (!digitalCrmCompleted) {
        await postInternal(
          `${baseUrl}/api/crm/customer`,
        {
          visitorId:
            metadata.visitor_id || '',

          name:
            metadata.customer_name ||
            'Cliente',

          email:
            paymentIntent.receipt_email ||
            '',

          language:
            lang,

          product:
            metadata.product ===
              'Superacao Digital eBook'
              ? 'Superação — eBook'
              : 'eBook + Audiobook',

          productType:
            'digital',

          amount:
            (
              paymentIntent.amount_received ||
              paymentIntent.amount ||
              0
            ) / 100,

          currency:
            String(
              paymentIntent.currency ||
              ''
            ).toUpperCase(),

          stripePaymentIntent:
            paymentIntent.id,

            accessToken:
              metadata.access_token || ''
          }
        )

        await completeStripeWebhookStep({
          stripeEventId:
            stripeEvent.id,

          stepCode:
            'crm_customer_saved'
        })
      }
    }

    if (
      (
        metadata.product ===
          'Livro Fisico PT' ||
        metadata.product ===
          'Superacao Livro Fisico PT'
      )
    ) {
      const physicalEmailCompleted =
        await hasStripeWebhookStep({
          stripeEventId:
            stripeEvent.id,

          stepCode:
            'order_email_sent'
        })

      if (!physicalEmailCompleted) {
        await postInternal(
          (
            metadata.product ===
              'Superacao Livro Fisico PT'
              ? `${baseUrl}/api/send-superacao-order-email`
              : `${baseUrl}/api/send-order-email`
          ),
          {
            type: 'physical',

          order: {
            name:
              metadata.customer_name ||
              'Cliente',

            email:
              paymentIntent.receipt_email ||
              '',

            whatsapp:
              metadata.whatsapp || '',

            cep:
              metadata.cep || '',

            address:
              metadata.address || '',

            complement:
              metadata.complement || '',

            neighborhood:
              metadata.neighborhood || '',

            city:
              metadata.city || '',

            state:
              metadata.state || '',

            shippingName:
              metadata.shipping_name || '',

            shippingPrice:
              metadata.shipping_price || '',

            quantity:
              metadata.quantity || '1',

            total:
              (
                (
                  paymentIntent.amount_received ||
                  paymentIntent.amount ||
                  0
                ) / 100
              ).toFixed(2),

              paymentIntentId:
                paymentIntent.id
            }
          }
        )

        await completeStripeWebhookStep({
          stripeEventId:
            stripeEvent.id,

          stepCode:
            'order_email_sent'
        })
      }

      const physicalCrmCompleted =
        await hasStripeWebhookStep({
          stripeEventId:
            stripeEvent.id,

          stepCode:
            'crm_customer_saved'
        })

      if (!physicalCrmCompleted) {
        await postInternal(
          `${baseUrl}/api/crm/customer`,
        {
          visitorId:
            metadata.visitor_id || '',

          name:
            metadata.customer_name ||
            'Cliente',

          email:
            paymentIntent.receipt_email ||
            '',

          whatsapp:
            metadata.whatsapp || '',

          language:
            'pt',

          product:
            metadata.product ===
              'Superacao Livro Fisico PT'
              ? 'Superação — Livro físico'
              : 'Livro físico PT',

          productType:
            'physical',

          amount:
            (
              paymentIntent.amount_received ||
              paymentIntent.amount ||
              0
            ) / 100,

          currency:
            String(
              paymentIntent.currency ||
              ''
            ).toUpperCase(),

            stripePaymentIntent:
              paymentIntent.id
          }
        )

        await completeStripeWebhookStep({
          stripeEventId:
            stripeEvent.id,

          stepCode:
            'crm_customer_saved'
        })
      }
    }

    await completeStripeWebhookEvent(
      stripeEvent.id
    )

    return NextResponse.json({
      received: true,
      processed: true,

      stripe_event_id:
        stripeEvent.id,

      payment_intent:
        paymentIntent.id,

      conversion
    })
  } catch (error) {
    console.error(
      'Stripe webhook processing failed:',
      error
    )

    try {
      await failStripeWebhookEvent(
        stripeEvent.id,
        error
      )
    } catch (stateError) {
      console.error(
        'Unable to persist Stripe webhook failure:',
        stateError
      )
    }

    return NextResponse.json(
      {
        received: false,
        retryable: true,
        error:
          'Stripe webhook processing failed'
      },
      {
        status: 500
      }
    )
  }
}
