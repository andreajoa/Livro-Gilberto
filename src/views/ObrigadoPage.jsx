"use client"
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Package, Mail, Heart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ObrigadoPage() {
  const params = useSearchParams()
  const checkoutId = params.get('checkout') || ''
  const [order, setOrder] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const name = order?.customer_name || 'Amigo'
  const email = order?.customer_email || ''
  const firstName = name.split(' ')[0]

  useEffect(() => {
    let attempts = 0
    let timer
    async function check() {
      if (!checkoutId) return
      const response = await fetch(`/api/commerce/checkout?id=${encodeURIComponent(checkoutId)}`, { cache: 'no-store' })
      const body = await response.json().catch(() => ({}))
      if (body.checkout) {
        setOrder(body.checkout)
        if (body.checkout.status === 'paid') {
          setConfirmed(true)
          localStorage.removeItem('gs_cart_state')
          return
        }
      }
      attempts += 1
      if (attempts < 10) timer = setTimeout(check, 2000)
    }
    check()
    return () => clearTimeout(timer)
  }, [checkoutId])

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#060C18,#0D1B3E)', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 6vw' }}>
      <div style={{ maxWidth:640, width:'100%', textAlign:'center' }}>
        <div style={{ width:80,height:80,background:'linear-gradient(135deg,#00C4D4,#0099A8)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 32px',boxShadow:'0 0 40px rgba(0,196,212,0.4)' }}>
          <CheckCircle size={40} color="#0D1B3E"/>
        </div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(28px,4vw,48px)', color:'#fff', fontWeight:900, marginBottom:12 }}>
          {confirmed ? `Pagamento confirmado, ${firstName}!` : 'Estamos confirmando seu pagamento'}
        </h1>
        <p style={{ fontFamily:"'Cormorant Garant',serif", fontStyle:'italic', fontSize:20, color:'#00C4D4', marginBottom:40 }}>
          {confirmed ? 'Você deu um passo muito importante hoje.' : 'Isso costuma levar apenas alguns segundos.'}
        </p>

        {confirmed && <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:40 }}>
          <div style={{ background:'rgba(0,196,212,0.08)', border:'1px solid rgba(0,196,212,0.25)', borderRadius:10, padding:'20px 24px', display:'flex', alignItems:'flex-start', gap:16, textAlign:'left' }}>
            <Package size={22} color="#00C4D4" style={{ flexShrink:0, marginTop:2 }}/>
            <div>
              <p style={{ color:'#fff', fontWeight:700, marginBottom:4 }}>Postagem em até 2 dias úteis</p>
              <p style={{ color:'#B8C8E0', fontSize:14, lineHeight:1.7, margin:0 }}>Seu livro será cuidadosamente embalado e postado pelos Correios. Você receberá o código de rastreamento assim que for enviado.</p>
            </div>
          </div>
          <div style={{ background:'rgba(13,27,62,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:10, padding:'20px 24px', display:'flex', alignItems:'flex-start', gap:16, textAlign:'left' }}>
            <Mail size={22} color="#00C4D4" style={{ flexShrink:0, marginTop:2 }}/>
            <div>
              <p style={{ color:'#fff', fontWeight:700, marginBottom:4 }}>Confirmação enviada</p>
              <p style={{ color:'#B8C8E0', fontSize:14, lineHeight:1.7, margin:0 }}>Um email de confirmação foi enviado para <strong style={{ color:'#fff' }}>{email}</strong> com todos os detalhes do seu pedido e endereço de entrega.</p>
            </div>
          </div>
          <div style={{ background:'rgba(13,27,62,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:10, padding:'20px 24px', display:'flex', alignItems:'flex-start', gap:16, textAlign:'left' }}>
            <Heart size={22} color="#00C4D4" style={{ flexShrink:0, marginTop:2 }}/>
            <div>
              <p style={{ color:'#fff', fontWeight:700, marginBottom:4 }}>Uma mensagem de Gilberto</p>
              <p style={{ color:'#B8C8E0', fontSize:14, lineHeight:1.7, margin:0, fontStyle:'italic' }}>"Obrigado por confiar na minha história. Espero que cada página te ajude a encontrar a força que já existe dentro de você. Você não está sozinho nessa jornada."</p>
            </div>
          </div>
        </div>}

        <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:8, color:'#8A9BBF', fontSize:14, textDecoration:'none' }}>← Voltar ao início</Link>
      </div>
    </div>
  )
}
