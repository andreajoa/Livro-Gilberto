"use client"
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, Mail, Phone, MapPin, CreditCard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useRouter } from 'next/navigation'

export default function CheckoutForm({ isOpen, onClose }) {
  const { BOOK, quantity, shipping, total } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({ name:'', email:'', whatsapp:'', cep:'', address:'', neighborhood:'', city:'', state:'', complement:'' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (!formData.city.trim()) e.city = 'Informe a cidade'
    if (!formData.state.trim()) e.state = 'Informe o estado'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    const order = {
      ...formData,
      quantity,
      shipping,
      total: total.toFixed(2),
    }
    router.push(`/checkout?order=${encodeURIComponent(JSON.stringify(order))}`)
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
                  <input value={formData.address} onChange={e=>setFormData({...formData,address:e.target.value})} style={inp('address')} placeholder="Rua, número"/>
                  {errors.address && <p style={{color:'#f87171',fontSize:11,marginTop:4}}>{errors.address}</p>}
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div>
                  <label style={lbl}>Bairro</label>
                  <input value={formData.neighborhood} onChange={e=>setFormData({...formData,neighborhood:e.target.value})} style={inp('neighborhood')} placeholder="Bairro"/>
                </div>
                <div>
                  <label style={lbl}>Complemento</label>
                  <input value={formData.complement} onChange={e=>setFormData({...formData,complement:e.target.value})} style={inp('complement')} placeholder="Apto, bloco..."/>
                </div>
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
