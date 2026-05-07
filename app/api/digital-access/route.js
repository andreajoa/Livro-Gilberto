import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const CHAPTER_TITLES = {
  pt: [
    'Capítulo 1 — Introdução',
    'Capítulo 2 — Entendendo a dor',
    'Capítulo 3 — O processo de cura',
    'Capítulo 4 — Reconstruindo sua autoestima',
    'Capítulo 5 — Cicatrizando a rejeição',
    'Capítulo 6 — Quando o amor não escolheu ficar',
    'Capítulo 7 — Recuperando sua identidade',
    'Capítulo 8 — A força de seguir em frente',
    'Capítulo 9 — O silêncio que cura',
    'Capítulo 10 — Recomeçando com dignidade',
    'Capítulo 11 — Libertando-se da comparação',
    'Capítulo 12 — Construindo amor-próprio',
    'Capítulo 13 — Uma nova versão de você',
    'Capítulo 14 — Conclusão'
  ],
  en: [
    'Chapter 1 — Introduction',
    'Chapter 2 — Understanding the Pain',
    'Chapter 3 — The Healing Process',
    'Chapter 4 — Rebuilding Your Self-Esteem',
    'Chapter 5 — Healing Rejection',
    'Chapter 6 — When Love Did Not Choose to Stay',
    'Chapter 7 — Recovering Your Identity',
    'Chapter 8 — The Strength to Move Forward',
    'Chapter 9 — The Silence That Heals',
    'Chapter 10 — Starting Again with Dignity',
    'Chapter 11 — Freeing Yourself from Comparison',
    'Chapter 12 — Building Self-Love',
    'Chapter 13 — A New Version of You',
    'Chapter 14 — Conclusion'
  ],
  es: [
    'Capítulo 1 — Introducción',
    'Capítulo 2 — Entendiendo el dolor',
    'Capítulo 3 — El proceso de sanación',
    'Capítulo 4 — Reconstruyendo tu autoestima',
    'Capítulo 5 — Sanando el rechazo',
    'Capítulo 6 — Cuando el amor no eligió quedarse',
    'Capítulo 7 — Recuperando tu identidad',
    'Capítulo 8 — La fuerza de seguir adelante',
    'Capítulo 9 — El silencio que sana',
    'Capítulo 10 — Empezando de nuevo con dignidad',
    'Capítulo 11 — Liberándote de la comparación',
    'Capítulo 12 — Construyendo amor propio',
    'Capítulo 13 — Una nueva versión de ti',
    'Capítulo 14 — Conclusión'
  ]
}

function normalizeLang(value) {
  const lang = String(value || 'pt').toLowerCase()
  if (lang.startsWith('en')) return 'en'
  if (lang.startsWith('es')) return 'es'
  return 'pt'
}

function getAdminLangFromToken(token) {
  if (token && token === process.env.DIGITAL_ADMIN_TOKEN_PT) return 'pt'
  if (token && token === process.env.DIGITAL_ADMIN_TOKEN_EN) return 'en'
  if (token && token === process.env.DIGITAL_ADMIN_TOKEN_ES) return 'es'
  return null
}

function encodeObjectKey(key) {
  return key
    .split('/')
    .map((part) => encodeURIComponent(part).replace(/\(/g, '%28').replace(/\)/g, '%29'))
    .join('/')
}

function getAudioFileName(index) {
  if (index === 0) return '00 download.wav'
  return `download (${index}).wav`
}

function getFilesForLang(lang) {
  const upper = lang.toUpperCase()

  const baseUrl = (
    process.env.R2_BASE_URL ||
    process.env.NEXT_PUBLIC_R2_BASE_URL ||
    ''
  ).replace(/\/$/, '')

  const folder = process.env[`AUDIO_${upper}_FOLDER`] || upper
  const count = Number(process.env[`AUDIO_${upper}_COUNT`] || 0)

  const ebookUrl =
    process.env[`EBOOK_${upper}_URL`] ||
    process.env[`NEXT_PUBLIC_EBOOK_${upper}_URL`] ||
    ''

  const audiobook = baseUrl && count > 0
    ? Array.from({ length: count }, (_, index) => {
        const filename = getAudioFileName(index)
        const objectKey = `${folder}/${filename}`
        const chapterNumber = index + 1

        return {
          title:
            CHAPTER_TITLES[lang]?.[index] ||
            `${lang === 'en' ? 'Chapter' : 'Capítulo'} ${chapterNumber}`,
          url: `${baseUrl}/${encodeObjectKey(objectKey)}`,
          filename
        }
      })
    : []

  return {
    ebook: {
      url: ebookUrl,
      filename: `ebook-${lang}.pdf`
    },
    audiobook
  }
}

function buildOrderFromPaymentIntent(paymentIntent, token) {
  const meta = paymentIntent.metadata || {}
  const lang = normalizeLang(meta.lang)

  return {
    id: `DIG-${paymentIntent.id}`,
    type: 'digital',
    status: paymentIntent.status === 'succeeded' ? 'paid' : paymentIntent.status,
    accessToken: token,
    stripePaymentIntentId: paymentIntent.id,
    customer: {
      name: meta.customer_name || 'Cliente',
      email: paymentIntent.receipt_email || ''
    },
    name: meta.customer_name || 'Cliente',
    email: paymentIntent.receipt_email || '',
    lang,
    files: getFilesForLang(lang),
    createdAt: new Date((paymentIntent.created || Date.now() / 1000) * 1000).toISOString()
  }
}

function buildAdminOrder(token, lang) {
  return {
    id: `admin-preview-${lang}`,
    type: 'digital',
    status: 'paid',
    adminPreview: true,
    accessToken: token,
    stripePaymentIntentId: 'admin-preview',
    customer: {
      name: 'Admin',
      email: process.env.OWNER_EMAIL || ''
    },
    name: 'Admin',
    email: process.env.OWNER_EMAIL || '',
    lang,
    files: getFilesForLang(lang),
    createdAt: new Date().toISOString()
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const paymentIntentId = searchParams.get('payment_intent') || searchParams.get('pi')
  const langFromUrl = normalizeLang(searchParams.get('lang'))

  if (!token) {
    return NextResponse.json({ success: false, error: 'Token missing' }, { status: 400 })
  }

  const adminLang = getAdminLangFromToken(token)
  if (adminLang) {
    return NextResponse.json({
      success: true,
      order: buildAdminOrder(token, adminLang || langFromUrl)
    })
  }

  if (!paymentIntentId) {
    return NextResponse.json(
      { success: false, error: 'Payment intent missing' },
      { status: 404 }
    )
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const meta = paymentIntent.metadata || {}

    const tokenMatches = meta.access_token === token
    const isDigital = String(meta.product || '').includes('Digital')
    const isPaid = paymentIntent.status === 'succeeded'

    if (!tokenMatches || !isDigital || !isPaid) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      order: buildOrderFromPaymentIntent(paymentIntent, token)
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Not found' },
      { status: 404 }
    )
  }
}
