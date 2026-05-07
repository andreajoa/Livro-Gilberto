"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lock, Download, Headphones } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function PayForm({ total, lang, accessToken, orderData }) {
  const stripe = useStripe()
  const elements = useElements()
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
      },
    })
    if (stripeError) { setError(stripeError.message); setLoading(false) }
  }

  const price = lang === 'pt' ? 'R$ 47,00' : '$17.00 USD'
  const langLabel = lang === 'pt' ? 'Português' : lang === 'en' ? 'English' : 'Español'

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ background:'rgba(0,196,212,0.08)', border:'1px solid rgba(0,196,212,0.2)', borderRadius:8, padding:16, marginBottom:24 }}>
        <p style={{ color:'#fff', fontWeight:700, margin:'0 0 4px' }}>eBook + Audiobook — {langLabel}</p>
        <p style={{ color:'#00C4D4', fontSize:22, fontWeight:900, margin:0 }}>{price}</p>
      </div>
      <PaymentElement options={{ layout:'tabs' }} />
      {error && <p style={{ color:'#f87171', fontSize:13, marginTop:12 }}>{error}</p>}
      <button type="submit" disabled={loading || !stripe} style={{
        marginTop:24, width:'100%', padding:'16px',
        background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg,#00C4D4,#0099A8)',
        border:'none', borderRadius:8, color: loading ? '#8A9BBF' : '#0D1B3E',
        fontSize:16, fontWeight:900, cursor: loading ? 'not-allowed' : 'pointer',
        display:'flex', alignItems:'center', justifyContent:'center', gap:10
      }}>
        <Lock size={18}/>{loading ? 'Processando...' : `Pagar ${price} — Acesso Imediato`}
      </button>
    </form>
  )
}

export default function CheckoutDigitalPage() {
  const params = useSearchParams()
  const [clientSecret, setClientSecret] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  const lang = params.get('lang') || 'pt'
  const total = lang === 'pt' ? 47 : 17

  useEffect(() => {
    try {
      const raw = params.get('order')
      if (!raw) return
      const order = JSON.parse(decodeURIComponent(raw))
      setOrderData(order)
      fetch('/api/stripe/payment-intent-digital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total, email: order.email, name: order.name, lang })
      })
      .then(r => r.json())
      .then(d => { setClientSecret(d.clientSecret); setAccessToken(d.accessToken); setLoading(false) })
    } catch { setLoading(false) }
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

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#060C18,#0D1B3E)', paddingTop:80 }}>
      <div style={{ maxWidth:600, margin:'0 auto', padding:'40px 6vw' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ display:'flex', justifyContent:'center', gap:16, marginBottom:16 }}>
            <div style={{ width:48,height:48,background:'rgba(0,196,212,0.15)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center' }}><Download size={22} color="#00C4D4"/></div>
            <div style={{ width:48,height:48,background:'rgba(0,196,212,0.15)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center' }}><Headphones size={22} color="#00C4D4"/></div>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:'#fff', fontWeight:900, marginBottom:8 }}>eBook + Audiobook</h1>
          <p style={{ color:'#8A9BBF', fontSize:14 }}>Acesso imediato após o pagamento</p>
        </div>
        {clientSecret && orderData && (
          <div style={{ background:'rgba(13,27,62,0.7)', border:'1px solid rgba(0,196,212,0.2)', borderRadius:12, padding:28 }}>
            <Elements stripe={stripePromise} options={{ clientSecret, appearance:{ theme:'night', variables:{ colorPrimary:'#00C4D4', colorBackground:'#0D1B3E', colorText:'#ffffff', borderRadius:'8px' } } }}>
              <PayForm total={total} lang={lang} accessToken={accessToken} orderData={orderData} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  )
}
