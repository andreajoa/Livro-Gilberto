"use client"

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useRouter, useSearchParams } from 'next/navigation'
import { Shield, CheckCircle } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function PaymentForm({ clientSecret, orderId }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/superacao/obrigado?orderId=${orderId}`,
      },
    })

    if (stripeError) {
      setError(stripeError.message)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
      <PaymentElement options={{
        layout: 'tabs',
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#D4A574',
            colorBackground: 'rgba(255,255,255,0.03)',
            colorText: '#ffffff',
            borderRadius: '8px'
          }
        }
      }} />
      
      {error && (
        <div style={{
          background: 'rgba(248,113,113,0.1)',
          border: '1px solid rgba(248,113,113,0.3)',
          borderRadius: 8,
          padding: 12,
          marginTop: 16,
          color: '#f87171',
          fontSize: 13
        }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          width: '100%',
          padding: '18px',
          marginTop: 24,
          background: loading ? 'rgba(212,165,116,0.3)' : 'linear-gradient(135deg, #D4A574, #C9A962)',
          border: 'none',
          borderRadius: 12,
          color: loading ? '#888' : '#0a0a0a',
          fontSize: 15,
          fontWeight: 900,
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          boxShadow: '0 8px 24px rgba(212,165,116,0.3)'
        }}
      >
        {loading ? (
          <>
            <div style={{
              width: 18,
              height: 18,
              border: '2px solid rgba(0,0,0,0.2)',
              borderTop: '2px solid #0a0a0a',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Processando...
          </>
        ) : (
          <>
            Pagar Agora
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </>
        )}
      </button>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        marginTop: 24,
        fontSize: 12,
        color: '#888'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Shield size={12} color="#D4A574" />
          Pagamento Seguro
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <CheckCircle size={12} color="#D4A574" />
          SSL Criptografado
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [clientSecret, setClientSecret] = useState('')
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) {
      router.push('/superacao')
      return
    }

    // Buscar dados do pedido e criar payment intent
    const fetchOrderData = async () => {
      try {
        // Aqui você buscaria os dados do pedido do Cloudflare D1
        // Por enquanto, vamos criar o payment intent diretamente
        const response = await fetch('/api/create-payment-intent-superacao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            total: 141.97 + 15.00, // Livro + frete PAC (ajustar conforme necessário)
            email: 'cliente@email.com', // Buscar dos dados salvos
            name: 'Cliente',
            shipping: { type: 'PAC', price: 15.00 }
          })
        })

        const data = await response.json()
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else {
          throw new Error('Erro ao criar pagamento')
        }
      } catch (error) {
        console.error('Erro:', error)
        alert('Erro ao carregar checkout. Tente novamente.')
        router.push('/superacao')
      } finally {
        setLoading(false)
      }
    }

    fetchOrderData()
  }, [orderId, router])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #1a1410, #0a0a0a)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48,
            height: 48,
            border: '3px solid rgba(212,165,116,0.3)',
            borderTop: '3px solid #D4A574',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#D4A574' }}>Preparando pagamento...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #1a1410, #0a0a0a)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f87171', marginBottom: 16 }}>Erro ao carregar checkout.</p>
          <button
            onClick={() => router.push('/superacao')}
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #D4A574, #C9A962)',
              border: 'none',
              borderRadius: 10,
              color: '#0a0a0a',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1a1410, #0a0a0a)',
      paddingTop: 80
    }}>
      <div style={{
        maxWidth: 520,
        margin: '0 auto',
        padding: '0 20px 80px'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 32px',
          background: 'rgba(212,165,116,0.05)',
          border: '1px solid rgba(212,165,116,0.15)',
          borderRadius: 16,
          marginBottom: 24
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            color: '#fff',
            margin: '0 0 8px'
          }}>
            Finalizar Pedido
          </h1>
          <p style={{ fontSize: 13, color: '#888', margin: 0 }}>
            Pedido #{orderId}
          </p>
        </div>

        {/* Resumo do Pedido */}
        <div style={{
          padding: '24px 32px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          marginBottom: 24
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 18,
            color: '#fff',
            margin: '0 0 16px'
          }}>
            Resumo do Pedido
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: '#888' }}>Livro Superação</span>
            <span style={{ fontSize: 13, color: '#fff' }}>R$ 141,97</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: '#888' }}>Frete</span>
            <span style={{ fontSize: 13, color: '#fff' }}>R$ 15,00</span>
          </div>
          <div style={{
            borderTop: '1px solid rgba(212,165,116,0.2)',
            paddingTop: 16,
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Total</span>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#D4A574' }}>
              R$ 156,97
            </span>
          </div>
        </div>

        {/* Stripe Elements */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(212,165,116,0.15)',
          borderRadius: 16,
          overflow: 'hidden'
        }}>
          <Elements stripe={stripePromise} options={{ clientSecret, appearance: {
            theme: 'night',
            variables: {
              colorPrimary: '#D4A574',
              colorBackground: 'rgba(255,255,255,0.03)',
              colorText: '#ffffff',
              borderRadius: '8px'
            }
          } }}>
            <PaymentForm clientSecret={clientSecret} orderId={orderId} />
          </Elements>
        </div>
      </div>
    </div>
  )
}
