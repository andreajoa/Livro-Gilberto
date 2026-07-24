import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
)

const DEFAULT_BOOK_UNIT_PRICE_BRL = 119
const SUPERACAO_UNIT_PRICE_BRL = 141.74

function getBookUnitPrice(productId) {
  return productId === 'superacao_physical_pt'
    ? SUPERACAO_UNIT_PRICE_BRL
    : DEFAULT_BOOK_UNIT_PRICE_BRL
}
const MAX_QUANTITY = 20
const MAX_TOTAL_BRL = 50000

function text(value, max = 450) {
  if (
    value === null ||
    value === undefined
  ) {
    return ''
  }

  return String(value)
    .trim()
    .slice(0, max)
}

function positiveNumber(value) {
  const number = Number(value)

  if (
    !Number.isFinite(number) ||
    number < 0
  ) {
    return 0
  }

  return number
}

function validQuantity(value) {
  const quantity =
    Math.floor(
      Number(value)
    )

  if (
    !Number.isFinite(quantity) ||
    quantity < 1
  ) {
    return 1
  }

  return Math.min(
    quantity,
    MAX_QUANTITY
  )
}

export async function POST(request) {
  try {
    const body =
      await request.json()

    const quantity =
      validQuantity(
        body.quantity
      )

    const productId =
      text(
        body.productId ||
          'gilberto_physical_pt',
        120
      )

    const bookUnitPrice =
      getBookUnitPrice(productId)

    const shippingPrice =
      positiveNumber(
        body.shipping?.price
      )

    const calculatedTotal =
      (
        bookUnitPrice *
        quantity
      ) +
      shippingPrice

    const requestedTotal =
      positiveNumber(
        body.total
      )

    if (
      calculatedTotal <= 0 ||
      calculatedTotal >
        MAX_TOTAL_BRL
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid order total'
        },
        {
          status: 400
        }
      )
    }

    /*
     * Mantém compatibilidade com o checkout atual,
     * mas rejeita divergências materiais entre
     * o valor exibido e o valor calculado.
     */
    if (
      requestedTotal > 0 &&
      Math.abs(
        requestedTotal -
        calculatedTotal
      ) > 0.01
    ) {
      return NextResponse.json(
        {
          error:
            'Order total mismatch'
        },
        {
          status: 400
        }
      )
    }

    const address =
      body.address || {}

    const paymentIntent =
      await stripe.paymentIntents.create({
        amount:
          Math.round(
            calculatedTotal * 100
          ),

        currency:
          'brl',

        receipt_email:
          text(body.email, 255) ||
          undefined,

        metadata: {
          customer_name:
            text(body.name, 180),

          quantity:
            String(quantity),

          product:
            productId ===
              'superacao_physical_pt'
              ? 'Superacao Livro Fisico PT'
              : 'Livro Fisico PT',

          book_id:
            text(
              body.bookId ||
              'gilberto_book_01',
              120
            ),

          product_id:
            text(
              productId,
              120
            ),

          visitor_id:
            text(
              body.visitorId,
              120
            ),

          session_id:
            text(
              body.sessionId,
              120
            ),

          attribution_id:
            text(
              body.attributionId,
              120
            ),

          source:
            text(
              body.source,
              180
            ),

          utm_source:
            text(
              body.utmSource,
              180
            ),

          utm_medium:
            text(
              body.utmMedium,
              180
            ),

          utm_campaign:
            text(
              body.utmCampaign,
              250
            ),

          utm_content:
            text(
              body.utmContent,
              250
            ),

          utm_term:
            text(
              body.utmTerm,
              250
            ),

          campaign_id:
            text(
              body.campaignId,
              120
            ),

          creative_id:
            text(
              body.creativeId,
              120
            ),

          landing_page:
            text(
              body.landingPage,
              450
            ),

          whatsapp:
            text(
              address.whatsapp,
              50
            ),

          cep:
            text(
              address.cep,
              30
            ),

          address:
            text(
              address.address,
              350
            ),

          complement:
            text(
              address.complement,
              180
            ),

          neighborhood:
            text(
              address.neighborhood,
              180
            ),

          city:
            text(
              address.city,
              180
            ),

          state:
            text(
              address.state,
              20
            ),

          shipping_type:
            text(
              body.shipping?.type,
              80
            ),

          shipping_name:
            text(
              body.shipping?.name,
              120
            ),

          shipping_price:
            shippingPrice.toFixed(2),

          unit_price:
            bookUnitPrice
              .toFixed(2),

          calculated_total:
            calculatedTotal
              .toFixed(2),

          analytics_version:
            'website-intelligence-v1'
        }
      })

    return NextResponse.json({
      success: true,

      clientSecret:
        paymentIntent.client_secret,

      paymentIntentId:
        paymentIntent.id,

      unitPrice:
        bookUnitPrice,

      shippingPrice:
        shippingPrice,

      total:
        calculatedTotal
    })
  } catch (error) {
    console.error(
      'Physical payment intent error:',
      error
    )

    return NextResponse.json(
      {
        error:
          'Unable to create payment intent'
      },
      {
        status: 500
      }
    )
  }
}
