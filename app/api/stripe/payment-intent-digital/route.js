import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import crypto from 'crypto'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
)

function normalizeLang(value) {
  if (value === 'en') return 'en'
  if (value === 'es') return 'es'

  return 'pt'
}

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

export async function POST(request) {
  try {
    const body =
      await request.json()

    const lang =
      normalizeLang(body.lang)

    const requestedProductId =
      text(
        body.productId ||
          `gilberto_digital_${lang}`,
        120
      )

    const isSuperacao =
      requestedProductId ===
        'superacao_digital_pt'

    /*
     * Superação possui preço definido exclusivamente
     * no servidor. Os demais produtos mantêm o fluxo
     * atual para não alterar o website principal.
     */
    const total =
      isSuperacao
        ? 65.99
        : Number(body.total)

    if (
      !Number.isFinite(total) ||
      total <= 0
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid digital order total'
        },
        {
          status: 400
        }
      )
    }

    const currency =
      lang === 'pt'
        ? 'brl'
        : 'usd'

    const email =
      text(
        body.email,
        255
      ).toLowerCase()

    if (
      !email ||
      !email.includes('@')
    ) {
      return NextResponse.json(
        {
          error:
            'Valid email is required'
        },
        {
          status: 400
        }
      )
    }

    const accessToken =
      crypto
        .randomBytes(32)
        .toString('hex')

    const productId =
      requestedProductId

    const paymentIntent =
      await stripe.paymentIntents.create({
        amount:
          Math.round(
            total * 100
          ),

        currency,

        receipt_email:
          email,

        metadata: {
          customer_name:
            text(
              body.name,
              180
            ),

          lang,

          access_token:
            accessToken,

          product:
            isSuperacao
              ? 'Superacao Digital eBook'
              : 'Digital eBook Audiobook',

          book_id:
            text(
              body.bookId ||
              'gilberto_book_01',
              120
            ),

          product_id:
            productId,

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

          checkout_amount:
            total.toFixed(2),

          checkout_currency:
            currency.toUpperCase(),

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

      accessToken,

      productId,

      amount:
        total,

      currency:
        currency.toUpperCase()
    })
  } catch (error) {
    console.error(
      'Digital payment intent error:',
      error
    )

    return NextResponse.json(
      {
        error:
          'Unable to create digital payment intent'
      },
      {
        status: 500
      }
    )
  }
}
