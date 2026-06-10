"use client"

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lock, Download, Headphones } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const COPY = {
  pt: {
    title: 'eBook + Audiobook',
    subtitle: 'Acesso imediato após o pagamento',
    product: 'eBook + Audiobook — Português',
    price: 'R$ 97,00',
    name: 'Nome completo',
    email: 'Email',
    namePlaceholder: 'Seu nome completo',
    emailPlaceholder: 'seu@email.com',
    prepare: 'Preparar pagamento seguro',
    preparing: 'Preparando pagamento...',
    pay: 'Pagar',
    processing: 'Processando...',
    requiredName: 'Informe seu nome.',
    requiredEmail: 'Informe um email válido.'
  },
  en: {
    title: 'eBook + Audiobook',
    subtitle: 'Instant access after payment',
    product: 'eBook + Audiobook — English',
    price: '$24.99 USD',
    name: 'Full name',
    email: 'Email',
    namePlaceholder: 'Your full name',
    emailPlaceholder: 'you@email.com',
    prepare: 'Prepare secure payment',
    preparing: 'Preparing payment...',
    pay: 'Pay',
    processing: 'Processing...',
    requiredName: 'Enter your name.',
    requiredEmail: 'Enter a valid email.'
  },
  es: {
    title: 'eBook + Audiolibro',
    subtitle: 'Acceso inmediato después del pago',
    product: 'eBook + Audiolibro — Español',
    price: '$24.99 USD',
    name: 'Nombre completo',
    email: 'Email',
    namePlaceholder: 'Tu nombre completo',
    emailPlaceholder: 'tu@email.com',
    prepare: 'Preparar pago seguro',
    preparing: 'Preparando pago...',
    pay: 'Pagar',
    processing: 'Procesando...',
    requiredName: 'Ingresa tu nombre.',
    requiredEmail: 'Ingresa un email válido.'
  }
}

function normalizeLang(value) {
  const lang = String(value || 'pt').toLowerCase()
  if (lang.startsWith('en')) return 'en'
  if (lang.startsWith('es')) return 'es'
  return 'pt'
}

function PayForm({ lang, accessToken, orderData }) {
  const stripe = useStripe()
  const elements = useElements()
  const t = COPY[lang]
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/acesso/${accessToken}?lang=${lang}`,
        receipt_email: orderData.email
      }
    })

    if (stripeError) {
      setError(stripeError.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.productBox}>
        <p style={styles.productName}>{t.product}</p>
        <p style={styles.price}>{t.price}</p>
      </div>

      <PaymentElement options={{ layout: 'tabs' }} />

      {error && <p style={styles.error}>{error}</p>}

      <button type="submit" disabled={loading || !stripe} style={{
        ...styles.payButton,
        opacity: loading || !stripe ? 0.65 : 1,
        cursor: loading || !stripe ? 'not-allowed' : 'pointer'
      }}>
        <Lock size={18} />
        {loading ? t.processing : `${t.pay} ${t.price}`}
      </button>
    </form>
  )
}

export default function CheckoutDigitalPage() {
  const params = useSearchParams()
  const lang = normalizeLang(params.get('lang'))
  const t = COPY[lang]
  const total = lang === 'pt' ? 47 : 24.99

  const [formData, setFormData] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [clientSecret, setClientSecret] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(false)

  const parsedOrder = useMemo(() => {
    try {
      const raw = params.get('order')
      if (!raw) return null
      return JSON.parse(decodeURIComponent(raw))
    } catch {
      return null
    }
  }, [params])

  useEffect(() => {
    if (parsedOrder?.name || parsedOrder?.email) {
      const nextOrder = {
        name: parsedOrder.name || '',
        email: parsedOrder.email || '',
        lang
      }
      setFormData({ name: nextOrder.name, email: nextOrder.email })
      createPaymentIntent(nextOrder)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function validate() {
    const nextErrors = {}

    if (!formData.name.trim()) nextErrors.name = t.requiredName
    if (!formData.email.includes('@') || !formData.email.includes('.')) nextErrors.email = t.requiredEmail

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function createPaymentIntent(order) {
    setLoading(true)
    setErrors({})

    try {
      const response = await fetch('/api/stripe/payment-intent-digital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total, email: order.email, name: order.name, lang, visitorId: getVisitorId() })
      })

      const data = await response.json()

      if (!response.ok || !data.clientSecret || !data.accessToken) {
        throw new Error(data.error || 'Unable to prepare payment.')
      }

      setClientSecret(data.clientSecret)
      setAccessToken(data.accessToken)
      setOrderData(order)
    } catch (error) {
      setErrors({ general: error.message })
    } finally {
      setLoading(false)
    }
  }

  function handleStart(e) {
    e.preventDefault()
    if (!validate()) return

    createPaymentIntent({
      name: formData.name.trim(),
      email: formData.email.trim(),
      lang
    })
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.icons}>
            <div style={styles.icon}><Download size={22} color="#00C4D4" /></div>
            <div style={styles.icon}><Headphones size={22} color="#00C4D4" /></div>
          </div>
          <h1 style={styles.title}>{t.title}</h1>
          <p style={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div style={styles.card}>
          {!clientSecret || !orderData ? (
            <form onSubmit={handleStart}>
              <div style={styles.productBox}>
                <p style={styles.productName}>{t.product}</p>
                <p style={styles.price}>{t.price}</p>
              </div>

              <label style={styles.label}>
                {t.name}
                <input
                  value={formData.name}
                  onChange={(e) => setFormData((current) => ({ ...current, name: e.target.value }))}
                  placeholder={t.namePlaceholder}
                  autoComplete="name"
                  style={styles.input}
                />
                {errors.name && <span style={styles.error}>{errors.name}</span>}
              </label>

              <label style={styles.label}>
                {t.email}
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((current) => ({ ...current, email: e.target.value }))}
                  placeholder={t.emailPlaceholder}
                  autoComplete="email"
                  style={styles.input}
                />
                {errors.email && <span style={styles.error}>{errors.email}</span>}
              </label>

              {errors.general && <p style={styles.error}>{errors.general}</p>}

              <button type="submit" disabled={loading} style={{
                ...styles.payButton,
                opacity: loading ? 0.65 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}>
                <Lock size={18} />
                {loading ? t.preparing : t.prepare}
              </button>
            </form>
          ) : (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'night',
                  variables: {
                    colorPrimary: '#00C4D4',
                    colorBackground: '#0D1B3E',
                    colorText: '#ffffff',
                    borderRadius: '8px'
                  }
                }
              }}
            >
              <PayForm lang={lang} accessToken={accessToken} orderData={orderData} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg,#060C18,#0D1B3E)',
    paddingTop: 80,
    paddingBottom: 80
  },
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '40px 6vw'
  },
  header: {
    textAlign: 'center',
    marginBottom: 32
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16
  },
  icon: {
    width: 48,
    height: 48,
    background: 'rgba(0,196,212,0.15)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 30,
    color: '#fff',
    fontWeight: 900,
    marginBottom: 8
  },
  subtitle: {
    color: '#8A9BBF',
    fontSize: 14
  },
  card: {
    background: 'rgba(13,27,62,0.7)',
    border: '1px solid rgba(0,196,212,0.2)',
    borderRadius: 12,
    padding: 28
  },
  productBox: {
    background: 'rgba(0,196,212,0.08)',
    border: '1px solid rgba(0,196,212,0.2)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24
  },
  productName: {
    color: '#fff',
    fontWeight: 700,
    margin: '0 0 4px'
  },
  price: {
    color: '#00C4D4',
    fontSize: 22,
    fontWeight: 900,
    margin: 0
  },
  label: {
    display: 'block',
    color: '#fff',
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 16
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    marginTop: 8,
    background: '#152347',
    border: '1px solid #1E3160',
    borderRadius: 8,
    color: '#fff',
    padding: '13px 14px',
    fontSize: 15
  },
  payButton: {
    marginTop: 24,
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg,#00C4D4,#0099A8)',
    border: 'none',
    borderRadius: 8,
    color: '#0D1B3E',
    fontSize: 16,
    fontWeight: 900,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  error: {
    color: '#f87171',
    fontSize: 13,
    marginTop: 8,
    display: 'block'
  }
}
