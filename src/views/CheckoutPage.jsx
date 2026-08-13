"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Shield, Lock, Package, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { trackWebsiteEvent } from '@/src/lib/website/websiteTracker'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function money(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0)
}

function PayForm({ checkoutId, paymentIntentId, total, email }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    if (!stripe || !elements || loading) return
    setLoading(true)
    setError('')

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/obrigado?checkout=${encodeURIComponent(checkoutId)}&payment_intent=${encodeURIComponent(paymentIntentId)}`,
        receipt_email: email
      }
    })

    if (result.error) {
      setError(result.error.message || 'Não foi possível concluir o pagamento.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: 'tabs' }} />
      {error && <p role="alert" style={{ color: '#f87171', fontSize: 13, marginTop: 12 }}>{error}</p>}
      <button type="submit" disabled={loading || !stripe} style={{
        marginTop: 24, width: '100%', padding: 16,
        background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg,#00C4D4,#0099A8)',
        border: 'none', borderRadius: 8, color: loading ? '#8A9BBF' : '#0D1B3E',
        fontSize: 16, fontWeight: 900, cursor: loading ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
      }}>
        <Lock size={18} />{loading ? 'Processando...' : `Pagar ${money(total)}`}
      </button>
    </form>
  )
}

export default function CheckoutPage() {
  const params = useSearchParams()
  const checkoutId = params.get('id') || ''
  const [checkout, setCheckout] = useState(null)
  const [clientSecret, setClientSecret] = useState('')
  const [paymentIntentId, setPaymentIntentId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function initialize() {
      try {
        if (!checkoutId) throw new Error('Checkout não informado.')

        const summaryResponse = await fetch(`/api/commerce/checkout?id=${encodeURIComponent(checkoutId)}`, { cache: 'no-store' })
        const summary = await summaryResponse.json()
        if (!summaryResponse.ok || !summary.checkout) throw new Error(summary.error || 'Checkout não encontrado.')

        const paymentResponse = await fetch('/api/stripe/payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checkoutId })
        })
        const payment = await paymentResponse.json()
        if (!paymentResponse.ok || !payment.clientSecret) throw new Error(payment.error || 'Não foi possível preparar o pagamento.')

        await trackWebsiteEvent('checkout_payment_ready', {
          language: 'pt',
          bookId: 'gilberto_book_01',
          productId: 'gilberto_physical_pt',
          channel: 'stripe',
          metadata: { checkout_id: checkoutId, quantity: summary.checkout.quantity, total: payment.total, currency: 'BRL' }
        })

        if (active) {
          setCheckout({ ...summary.checkout, total: payment.total, shipping_amount: payment.shippingPrice, unit_price: payment.unitPrice })
          setClientSecret(payment.clientSecret)
          setPaymentIntentId(payment.paymentIntentId)
          setLoading(false)
        }
      } catch (failure) {
        if (active) {
          setError(failure.message || 'Erro ao carregar checkout.')
          setLoading(false)
        }
      }
    }

    initialize()
    return () => { active = false }
  }, [checkoutId])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060C18' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '3px solid rgba(0,196,212,0.3)', borderTop: '3px solid #00C4D4', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#8A9BBF' }}>Preparando pagamento seguro...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  if (error || !checkout || !clientSecret) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060C18' }}>
      <div style={{ textAlign: 'center', maxWidth: 520, padding: 24 }}>
        <p style={{ color: '#f87171', marginBottom: 16 }}>{error || 'Erro ao carregar checkout.'}</p>
        <Link href="/" style={{ color: '#00C4D4' }}>Voltar ao início</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#060C18,#0D1B3E)', paddingTop: 80 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 6vw', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40 }}>
        <div>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#8A9BBF', fontSize: 13, textDecoration: 'none', marginBottom: 24 }}>
            <ChevronLeft size={16} />Voltar
          </Link>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: '#fff', fontWeight: 900, marginBottom: 24 }}>Resumo do pedido</h2>
          <div style={{ background: 'rgba(13,27,62,0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 18 }}>
              <img src="/book-front.jpg" alt="Capa do livro" style={{ width: 70, borderRadius: 5, boxShadow: '0 8px 22px rgba(0,0,0,.4)' }} />
              <div>
                <p style={{ color: '#fff', fontWeight: 700, margin: '0 0 8px' }}>{checkout.product_name}</p>
                <p style={{ color: '#8A9BBF', fontSize: 13, margin: 0 }}>Gilberto de Souza — {checkout.quantity}x livro físico</p>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#8A9BBF', marginBottom: 8 }}><span>Subtotal</span><span>{money(checkout.subtotal)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#8A9BBF', marginBottom: 12 }}><span>{checkout.shipping_name}</span><span>{money(checkout.shipping_amount)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 900 }}><span style={{ color: '#fff' }}>Total</span><span style={{ color: '#00C4D4' }}>{money(checkout.total)}</span></div>
            </div>
          </div>
          <div style={{ background: 'rgba(13,27,62,0.5)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 16 }}>
            <p style={{ fontSize: 12, color: '#8A9BBF', marginBottom: 4 }}>📦 Entrega para:</p>
            <p style={{ fontSize: 13, color: '#B8C8E0', margin: '0 0 4px' }}>{checkout.address_street}, {checkout.address_number}{checkout.address_complement ? ` — ${checkout.address_complement}` : ''}</p>
            <p style={{ fontSize: 13, color: '#B8C8E0', margin: 0 }}>{checkout.address_city} — {checkout.address_state} — CEP {checkout.destination_cep}</p>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
            {[[Shield, 'Compra segura'], [Package, 'Entrega rastreável'], [Lock, 'Criptografia SSL']].map(([Icon, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8A9BBF' }}><Icon size={12} color="#00C4D4" />{label}</div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: '#fff', fontWeight: 900, marginBottom: 24 }}>Pagamento</h2>
          <div style={{ background: 'rgba(13,27,62,0.7)', border: '1px solid rgba(0,196,212,0.2)', borderRadius: 12, padding: 28 }}>
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', variables: { colorPrimary: '#00C4D4', colorBackground: '#0D1B3E', colorText: '#ffffff', borderRadius: '8px' } } }}>
              <PayForm checkoutId={checkoutId} paymentIntentId={paymentIntentId} total={checkout.total} email={checkout.customer_email} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  )
}
