"use client"
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, MapPin, CreditCard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useRouter } from 'next/navigation'
import {
  getWebsiteContext,
  trackWebsiteEvent
} from '@/src/lib/website/websiteTracker'

export default function CheckoutForm({ isOpen, onClose }) {
  const { quantity, shipping, total, cartId, createCartId } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({ name:'', email:'', whatsapp:'', cep:'', address:'', number:'', neighborhood:'', city:'', state:'', complement:'', marketingConsent:false })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (!isOpen || !shipping?.destination) return
    const destination = shipping.destination
    setFormData(current => ({
      ...current,
      cep: fmt.cep(destination.cep || ''),
      address: current.address || destination.street || '',
      neighborhood: current.neighborhood || destination.neighborhood || '',
      city: destination.city || current.city,
      state: destination.state || current.state
    }))
  }, [isOpen, shipping])

  const fmt = {
    whatsapp: v => { const d=v.replace(/\D/g,'').slice(0,11); if(d.length<=2)return d; if(d.length<=6)return `(${d.slice(0,2)}) ${d.slice(2)}`; if(d.length<=10)return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`; return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}` },
    cep: v => { const d=v.replace(/\D/g,'').slice(0,8); return d.length>5?`${d.slice(0,5)}-${d.slice(5)}`:d }
  }

  const validate = () => {
    const e = {}
    if (!formData.name.trim() || formData.name.trim().split(' ').length < 2) e.name = 'Informe nome completo'
    if (!formData.email.includes('@')) e.email = 'Email inválido'
    if (formData.whatsapp.replace(/\D/g,'').length < 10) e.whatsapp = 'WhatsApp inválido'
    if (formData.cep.replace(/\D/g,'').length < 8) e.cep = 'CEP inválido'
    if (!formData.address.trim()) e.address = 'Informe o endereço'
    if (!formData.number.trim()) e.number = 'Informe o número'
    if (!formData.neighborhood.trim()) e.neighborhood = 'Informe o bairro'
    if (!formData.city.trim()) e.city = 'Informe a cidade'
    if (!formData.state.trim()) e.state = 'Informe o estado'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const context = getWebsiteContext()

      const analytics = {
        visitorId:
          context.visitorId || '',

        sessionId:
          context.sessionId || '',

        attributionId:
          context.attributionId || '',

        source:
          context.lastTouch?.source || '',

        utmSource:
          context.lastTouch?.utmSource || '',

        utmMedium:
          context.lastTouch?.utmMedium || '',

        utmCampaign:
          context.lastTouch?.utmCampaign || '',

        utmContent:
          context.lastTouch?.utmContent || '',

        utmTerm:
          context.lastTouch?.utmTerm || '',

        creativeId:
          context.lastTouch?.creativeId || '',

        campaignId:
          context.lastTouch?.campaignId || '',

        landingPage:
          context.lastTouch?.landingPage || '',

        bookId:
          'gilberto_book_01',

        productId:
          'gilberto_physical_pt'
      }

      await trackWebsiteEvent(
        'checkout_started',
        {
          language: 'pt',
          bookId:
            analytics.bookId,
          productId:
            analytics.productId,
          elementId:
            'physical_checkout_form_submit',
          elementType:
            'form_submit',
          channel:
            'site_checkout',
          creativeId:
            analytics.creativeId,
          metadata: {
            quantity,
            total:
              Number(total.toFixed(2)),
            currency:
              'BRL',
            shipping_type:
              shipping?.type || '',
            shipping_name:
              shipping?.name || ''
          }
        }
      )

      const checkoutResponse = await fetch('/api/commerce/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: cartId || createCartId(),
          quantity,
          shippingMethod: shipping?.type,
          marketingConsent: formData.marketingConsent,
          customer: {
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            cep: formData.cep,
            street: formData.address,
            number: formData.number,
            complement: formData.complement,
            neighborhood: formData.neighborhood,
            city: formData.city,
            state: formData.state
          },
          analytics
        })
      })

      const checkout = await checkoutResponse.json()
      if (!checkoutResponse.ok || !checkout.checkoutId) {
        throw new Error(checkout.error || 'Não foi possível iniciar o checkout.')
      }

      await trackWebsiteEvent('checkout_created', {
        language: 'pt',
        bookId: analytics.bookId,
        productId: analytics.productId,
        channel: 'site_checkout',
        metadata: {
          quantity,
          total: Number(total.toFixed(2)),
          currency: 'BRL',
          marketing_consent: formData.marketingConsent
        }
      })

      router.push(`/checkout?id=${encodeURIComponent(checkout.checkoutId)}`)

    } catch (error) {
      console.error(
        'Erro ao iniciar checkout:',
        error
      )

      setSubmitError(error.message || 'Não foi possível iniciar o checkout.')
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const inp = (field) => ({
    width:'100%', padding:'11px 14px',
    background: errors[field] ? 'rgba(239,68,68,0.08)' : 'rgba(6,12,24,0.6)',
    border:`1px solid ${errors[field]?'#ef4444':'rgba(255,255,255,0.12)'}`,
    borderRadius:8, color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box'
  })
  const lbl = { display:'block', fontSize:11, fontWeight:700, color:'#8A9BBF', marginBottom:5, textTransform:'uppercase', letterSpacing:0.5 }

  return (
    <AnimatePresence>
      <motion.div key="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        style={{position:'fixed',inset:0,zIndex:9999,background:'rgba(0,0,0,0.85)',backdropFilter:'blur(10px)',display:'flex',alignItems:'flex-start',justifyContent:'center',overflowY:'auto',padding:'20px 16px'}}>
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} exit={{opacity:0,y:40}}
          style={{width:'100%',maxWidth:580,background:'linear-gradient(160deg,#0D1B3E,#0a1628)',borderRadius:16,border:'1px solid rgba(0,196,212,0.3)',overflow:'hidden'}}>

          {/* Header */}
          <div style={{padding:'20px 24px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(0,196,212,0.05)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <button onClick={onClose} style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,width:34,height:34,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#8A9BBF'}}><ChevronLeft size={18}/></button>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:'#fff',margin:0}}>Dados de Entrega</h2>
            </div>
            <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:'#8A9BBF'}}><X size={20}/></button>
          </div>

          {/* Resumo */}
          <div style={{padding:'16px 24px',background:'rgba(0,196,212,0.05)',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <p style={{fontSize:13,color:'#B8C8E0',margin:'0 0 2px'}}>Como Vencer a Dor... — {quantity}x livro</p>
              <p style={{fontSize:11,color:'#8A9BBF',margin:0}}>{shipping?.name} incluso</p>
            </div>
            <span style={{fontSize:22,fontWeight:900,color:'#00C4D4'}}>R$ {total.toFixed(2)}</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{padding:'20px 24px',display:'flex',flexDirection:'column',gap:14}}>
              <div>
                <label style={lbl}>Nome Completo *</label>
                <input value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} style={inp('name')} placeholder="Seu nome completo"/>
                {errors.name && <p style={{color:'#f87171',fontSize:11,marginTop:4}}>{errors.name}</p>}
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div>
                  <label style={lbl}>Email *</label>
                  <input type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} style={inp('email')} placeholder="seu@email.com"/>
                  {errors.email && <p style={{color:'#f87171',fontSize:11,marginTop:4}}>{errors.email}</p>}
                </div>
                <div>
                  <label style={lbl}>WhatsApp *</label>
                  <input value={formData.whatsapp} onChange={e=>setFormData({...formData,whatsapp:fmt.whatsapp(e.target.value)})} style={inp('whatsapp')} placeholder="(11) 99999-9999"/>
                  {errors.whatsapp && <p style={{color:'#f87171',fontSize:11,marginTop:4}}>{errors.whatsapp}</p>}
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8,margin:'8px 0 4px'}}><MapPin size={14} color="#00C4D4"/><span style={{fontSize:13,fontWeight:700,color:'#fff'}}>Endereço de entrega</span></div>
              <div style={{display:'grid',gridTemplateColumns:'150px 1fr',gap:12}}>
                <div>
                  <label style={lbl}>CEP *</label>
                  <input value={formData.cep} onChange={e=>setFormData({...formData,cep:fmt.cep(e.target.value)})} style={inp('cep')} placeholder="00000-000"/>
                  {errors.cep && <p style={{color:'#f87171',fontSize:11,marginTop:4}}>{errors.cep}</p>}
                </div>
                <div>
                  <label style={lbl}>Endereço *</label>
                  <input value={formData.address} onChange={e=>setFormData({...formData,address:e.target.value})} style={inp('address')} placeholder="Rua ou avenida"/>
                  {errors.address && <p style={{color:'#f87171',fontSize:11,marginTop:4}}>{errors.address}</p>}
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'120px 1fr',gap:12}}>
                <div>
                  <label style={lbl}>Número *</label>
                  <input value={formData.number} onChange={e=>setFormData({...formData,number:e.target.value})} style={inp('number')} placeholder="123"/>
                  {errors.number && <p style={{color:'#f87171',fontSize:11,marginTop:4}}>{errors.number}</p>}
                </div>
                <div>
                  <label style={lbl}>Bairro</label>
                  <input value={formData.neighborhood} onChange={e=>setFormData({...formData,neighborhood:e.target.value})} style={inp('neighborhood')} placeholder="Bairro"/>
                  {errors.neighborhood && <p style={{color:'#f87171',fontSize:11,marginTop:4}}>{errors.neighborhood}</p>}
                </div>
              </div>
              <div>
                  <label style={lbl}>Complemento</label>
                  <input value={formData.complement} onChange={e=>setFormData({...formData,complement:e.target.value})} style={inp('complement')} placeholder="Apto, bloco, referência..."/>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 80px',gap:12}}>
                <div>
                  <label style={lbl}>Cidade *</label>
                  <input value={formData.city} onChange={e=>setFormData({...formData,city:e.target.value})} style={inp('city')} placeholder="Cidade"/>
                  {errors.city && <p style={{color:'#f87171',fontSize:11,marginTop:4}}>{errors.city}</p>}
                </div>
                <div>
                  <label style={lbl}>Estado *</label>
                  <input value={formData.state} onChange={e=>setFormData({...formData,state:e.target.value.toUpperCase()})} style={inp('state')} maxLength={2} placeholder="SP"/>
                  {errors.state && <p style={{color:'#f87171',fontSize:11,marginTop:4}}>{errors.state}</p>}
                </div>
              </div>
            </div>
            <div style={{padding:'20px 24px',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
              <label style={{display:'flex',gap:10,alignItems:'flex-start',color:'#B8C8E0',fontSize:12,lineHeight:1.45,marginBottom:16,cursor:'pointer'}}>
                <input type="checkbox" checked={formData.marketingConsent} onChange={e=>setFormData({...formData,marketingConsent:e.target.checked})} style={{marginTop:3}}/>
                Aceito receber conteúdos e lembretes sobre este pedido por e-mail e WhatsApp. Posso cancelar quando quiser.
              </label>
              {submitError && <p role="alert" style={{color:'#f87171',fontSize:12,margin:'0 0 12px'}}>{submitError}</p>}
              <button type="submit" disabled={isSubmitting} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#00C4D4,#0099A8)',border:'none',borderRadius:10,color:'#0D1B3E',fontSize:16,fontWeight:900,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
                <CreditCard size={20}/>Ir para Pagamento — R$ {total.toFixed(2)}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
