"use client"
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Shield, Lock, Package, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import {
  getWebsiteContext,
  trackWebsiteEvent
} from '@/src/lib/website/websiteTracker'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function PayForm({ clientSecret, orderData, total }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
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
        return_url: `${window.location.origin}/obrigado?name=${encodeURIComponent(orderData.name)}&email=${encodeURIComponent(orderData.email)}`,
      },
    })
    if (stripeError) {
      setError(stripeError.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: 'tabs' }} />
      {error && <p style={{ color:'#f87171', fontSize:13, marginTop:12 }}>{error}</p>}
      <button type="submit" disabled={loading || !stripe} style={{
        marginTop:24, width:'100%', padding:'16px',
        background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg,#00C4D4,#0099A8)',
        border:'none', borderRadius:8, color: loading ? '#8A9BBF' : '#0D1B3E',
        fontSize:16, fontWeight:900, cursor: loading ? 'not-allowed' : 'pointer',
        display:'flex', alignItems:'center', justifyContent:'center', gap:10
      }}>
        <Lock size={18}/>{loading ? 'Processando...' : `Pagar R$ ${parseFloat(total).toFixed(2)}`}
      </button>
    </form>
  )
}

export default function CheckoutPage() {
  const params = useSearchParams()
  const [clientSecret, setClientSecret] = useState('')
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function initializeCheckout() {
      try {
        const raw =
          params.get('order')

        if (!raw) {
          if (active) {
            setLoading(false)
          }

          return
        }

        const order =
          JSON.parse(
            decodeURIComponent(raw)
          )

        const context =
          getWebsiteContext()

        const analytics = {
          visitorId:
            order.analytics?.visitorId ||
            context.visitorId ||
            '',

          sessionId:
            order.analytics?.sessionId ||
            context.sessionId ||
            '',

          attributionId:
            order.analytics?.attributionId ||
            context.attributionId ||
            '',

          source:
            order.analytics?.source ||
            context.lastTouch?.source ||
            '',

          utmSource:
            order.analytics?.utmSource ||
            context.lastTouch?.utmSource ||
            '',

          utmMedium:
            order.analytics?.utmMedium ||
            context.lastTouch?.utmMedium ||
            '',

          utmCampaign:
            order.analytics?.utmCampaign ||
            context.lastTouch?.utmCampaign ||
            '',

          utmContent:
            order.analytics?.utmContent ||
            context.lastTouch?.utmContent ||
            '',

          utmTerm:
            order.analytics?.utmTerm ||
            context.lastTouch?.utmTerm ||
            '',

          creativeId:
            order.analytics?.creativeId ||
            context.lastTouch?.creativeId ||
            '',

          campaignId:
            order.analytics?.campaignId ||
            context.lastTouch?.campaignId ||
            '',

          landingPage:
            order.analytics?.landingPage ||
            context.lastTouch?.landingPage ||
            '',

          bookId:
            order.analytics?.bookId ||
            'gilberto_book_01',

          productId:
            order.analytics?.productId ||
            'gilberto_physical_pt'
        }

        const enrichedOrder = {
          ...order,
          analytics
        }

        if (active) {
          setOrderData(
            enrichedOrder
          )
        }

        const response = await fetch(
          '/api/stripe/payment-intent',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body: JSON.stringify({
              total:
                order.total,

              name:
                order.name,

              email:
                order.email,

              quantity:
                order.quantity,

              shipping:
                order.shipping,

              address:
                order,

              ...analytics
            })
          }
        )

        const result =
          await response.json()

        if (
          !response.ok ||
          !result.clientSecret
        ) {
          throw new Error(
            result.error ||
            'Não foi possível preparar o pagamento.'
          )
        }

        await trackWebsiteEvent(
          'checkout_payment_ready',
          {
            language:
              'pt',

            bookId:
              analytics.bookId,

            productId:
              analytics.productId,

            channel:
              'stripe',

            creativeId:
              analytics.creativeId,

            metadata: {
              currency:
                'BRL',

              quantity:
                Number(
                  order.quantity || 1
                ),

              payment_intent_created:
                true
            }
          }
        )

        if (active) {
          setClientSecret(
            result.clientSecret
          )

          setLoading(false)
        }
      } catch (error) {
        console.error(
          'Erro ao preparar checkout:',
          error
        )

        if (active) {
          setLoading(false)
        }
      }
    }

    initializeCheckout()

    return () => {
      active = false
    }
  }, [params])

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#060C18' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:48,height:48,border:'3px solid rgba(0,196,212,0.3)',borderTop:'3px solid #00C4D4',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 16px' }}/>
        <p style={{ color:'#8A9BBF' }}>Preparando pagamento...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  if (!orderData || !clientSecret) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#060C18' }}>
      <div style={{ textAlign:'center' }}>
        <p style={{ color:'#f87171', marginBottom:16 }}>Erro ao carregar checkout.</p>
        <Link href="/" style={{ color:'#00C4D4' }}>Voltar ao início</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#060C18,#0D1B3E)', paddingTop:80 }}>
      <div style={{ maxWidth:1000, margin:'0 auto', padding:'40px 6vw', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:40 }}>

        {/* Resumo do pedido */}
        <div>
          <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:6, color:'#8A9BBF', fontSize:13, textDecoration:'none', marginBottom:24 }}>
            <ChevronLeft size={16}/>Voltar
          </Link>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:'#fff', fontWeight:900, marginBottom:24 }}>Resumo do Pedido</h2>
          <div style={{ background:'rgba(13,27,62,0.7)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:24, marginBottom:16 }}>
            <p style={{ color:'#fff', fontWeight:700, marginBottom:8 }}>Como Vencer a Dor de Ser Trocado Por Outro</p>
            <p style={{ color:'#8A9BBF', fontSize:13, marginBottom:16 }}>por Gilberto de Souza — {orderData.quantity}x livro físico</p>
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'#8A9BBF', marginBottom:8 }}>
                <span>Subtotal</span><span>R$ {(119 * (orderData.quantity||1)).toFixed(2)}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'#8A9BBF', marginBottom:12 }}>
                <span>{orderData.shipping?.name || 'Frete'}</span><span>R$ {parseFloat(orderData.shipping?.price || 0).toFixed(2)}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:18, fontWeight:900 }}>
                <span style={{ color:'#fff' }}>Total</span>
                <span style={{ color:'#00C4D4' }}>R$ {parseFloat(orderData.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div style={{ background:'rgba(13,27,62,0.5)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, padding:16 }}>
            <p style={{ fontSize:12, color:'#8A9BBF', marginBottom:4 }}>📦 Entrega para:</p>
            <p style={{ fontSize:13, color:'#B8C8E0' }}>{orderData.address}{orderData.complement ? ', '+orderData.complement : ''}</p>
            <p style={{ fontSize:13, color:'#B8C8E0' }}>{orderData.city} — {orderData.state} — CEP {orderData.cep}</p>
          </div>
          <div style={{ display:'flex', gap:16, marginTop:16, flexWrap:'wrap' }}>
            {[[Shield,'Compra Segura'],[Package,'Enviado pelos Correios'],[Lock,'Criptografia SSL']].map(([Icon,t]) => (
              <div key={t} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#8A9BBF' }}>
                <Icon size={12} color="#00C4D4"/>{t}
              </div>
            ))}
          </div>
        </div>

        {/* Stripe Elements */}
        <div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:'#fff', fontWeight:900, marginBottom:24 }}>Pagamento</h2>
          <div style={{ background:'rgba(13,27,62,0.7)', border:'1px solid rgba(0,196,212,0.2)', borderRadius:12, padding:28 }}>
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme:'night', variables:{ colorPrimary:'#00C4D4', colorBackground:'#0D1B3E', colorText:'#ffffff', borderRadius:'8px' } } }}>
              <PayForm clientSecret={clientSecret} orderData={orderData} total={orderData.total} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  )
}
