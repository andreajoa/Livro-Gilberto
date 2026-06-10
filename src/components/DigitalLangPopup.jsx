"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Download, Headphones } from 'lucide-react'

function getVisitorId() {
  if (typeof window === "undefined") return ""
  let id = localStorage.getItem("visitor_id")
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
    localStorage.setItem("visitor_id", id)
  }
  return id
}

async function saveDigitalLeadToCRM({ name, email, lang }) {
  try {
    await fetch("/api/crm/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        name,
        email,
        language: lang,
        source: "digital_lang_popup",
        page: typeof window !== "undefined" ? window.location.pathname : ""
      })
    })
  } catch (error) {
    console.warn("CRM digital lead save failed:", error)
  }
}


const LANGS = [
  { code:'pt', flag:'🇧🇷', label:'Português', price:'R$ 97', sub:'eBook + Audiobook' },
  { code:'en', flag:'🇺🇸', label:'English',   price:'$24.99 USD', sub:'eBook + Audiobook' },
  { code:'es', flag:'🇪🇸', label:'Español',   price:'$24.99 USD', sub:'eBook + Audiobook' },
]

export default function DigitalLangPopup({ isOpen, onClose }) {
  const router = useRouter()
  const [selected, setSelected] = useState(null)
  const [step, setStep] = useState('lang') // 'lang' | 'form'
  const [form, setForm] = useState({ name:'', email:'' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSelectLang = (code) => {
    setSelected(code)
    setStep('form')
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().split(' ').length < 2) e.name = 'Informe nome completo'
    if (!form.email.includes('@')) e.email = 'Email inválido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    await saveDigitalLeadToCRM({
      name: form.name.trim(),
      email: form.email.trim(),
      lang: selected
    })

    const order = { name: form.name, email: form.email }
    router.push(`/checkout-digital?lang=${selected}&order=${encodeURIComponent(JSON.stringify(order))}`)
  }

  const inp = (f) => ({
    width:'100%', padding:'12px 14px',
    background: errors[f] ? 'rgba(239,68,68,0.08)' : 'rgba(6,12,24,0.7)',
    border:`1px solid ${errors[f]?'#ef4444':'rgba(255,255,255,0.12)'}`,
    borderRadius:8, color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box'
  })
  const lbl = { display:'block', fontSize:11, fontWeight:700, color:'#8A9BBF', marginBottom:6, textTransform:'uppercase', letterSpacing:0.5 }
  const lang = LANGS.find(l => l.code === selected)

  return (
    <div style={{ position:'fixed', inset:0, zIndex:10000, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div style={{ width:'100%', maxWidth:480, background:'linear-gradient(160deg,#0D1B3E,#0a1628)', borderRadius:16, border:'1px solid rgba(0,196,212,0.3)', overflow:'hidden' }}>

        {/* Header */}
        <div style={{ padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {step === 'form' && (
              <button onClick={()=>setStep('lang')} style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:6, width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#8A9BBF', fontSize:16 }}>←</button>
            )}
            <div style={{ display:'flex', gap:10 }}>
              <div style={{ width:32,height:32,background:'rgba(0,196,212,0.15)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center' }}><Download size={16} color="#00C4D4"/></div>
              <div style={{ width:32,height:32,background:'rgba(0,196,212,0.15)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center' }}><Headphones size={16} color="#00C4D4"/></div>
            </div>
            <div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:'#fff', margin:0 }}>eBook + Audiobook</h2>
              <p style={{ fontSize:11, color:'#8A9BBF', margin:0 }}>{step==='lang' ? 'Escolha o idioma' : 'Seus dados'}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'#8A9BBF' }}><X size={20}/></button>
        </div>

        {/* Step 1: Idioma */}
        {step === 'lang' && (
          <div style={{ padding:'24px' }}>
            <p style={{ color:'#B8C8E0', fontSize:14, marginBottom:20, textAlign:'center' }}>Em qual idioma você prefere o eBook + Audiobook?</p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {LANGS.map(l => (
                <button key={l.code} onClick={() => handleSelectLang(l.code)} style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.1)',
                  borderRadius:10, padding:'16px 20px', cursor:'pointer', color:'#fff',
                  transition:'all 0.2s', textAlign:'left'
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.border='1px solid rgba(0,196,212,0.4)'; e.currentTarget.style.background='rgba(0,196,212,0.07)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.border='1px solid rgba(255,255,255,0.1)'; e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                    <span style={{ fontSize:28 }}>{l.flag}</span>
                    <div>
                      <p style={{ margin:0, fontWeight:700, fontSize:15, color:'#fff' }}>{l.label}</p>
                      <p style={{ margin:0, fontSize:12, color:'#8A9BBF' }}>{l.sub}</p>
                    </div>
                  </div>
                  <span style={{ fontSize:16, fontWeight:900, color:'#00C4D4' }}>{l.price}</span>
                </button>
              ))}
            </div>
            <p style={{ fontSize:11, color:'#8A9BBF', textAlign:'center', marginTop:16 }}>Acesso imediato após o pagamento</p>
          </div>
        )}

        {/* Step 2: Dados + ir para pagamento */}
        {step === 'form' && lang && (
          <form onSubmit={handlePay}>
            <div style={{ padding:'24px' }}>
              <div style={{ background:'rgba(0,196,212,0.08)', border:'1px solid rgba(0,196,212,0.2)', borderRadius:8, padding:'12px 16px', marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ color:'#fff', fontWeight:600, fontSize:14 }}>{lang.flag} {lang.label} — eBook + Audiobook</span>
                <span style={{ color:'#00C4D4', fontWeight:900, fontSize:16 }}>{lang.price}</span>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div>
                  <label style={lbl}>Nome Completo *</label>
                  <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inp('name')} placeholder="Seu nome completo"/>
                  {errors.name && <p style={{ color:'#f87171', fontSize:11, marginTop:4 }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={lbl}>Email *</label>
                  <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inp('email')} placeholder="seu@email.com"/>
                  {errors.email && <p style={{ color:'#f87171', fontSize:11, marginTop:4 }}>{errors.email}</p>}
                  <p style={{ color:'#8A9BBF', fontSize:11, marginTop:6 }}>📧 O link de acesso será enviado para este email</p>
                </div>
              </div>
            </div>
            <div style={{ padding:'16px 24px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
              <button type="submit" disabled={loading} style={{ width:'100%', padding:'14px', background:'linear-gradient(135deg,#00C4D4,#0099A8)', border:'none', borderRadius:8, color:'#0D1B3E', fontSize:15, fontWeight:900, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                {loading ? 'Redirecionando...' : `Ir para Pagamento — ${lang.price}`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
