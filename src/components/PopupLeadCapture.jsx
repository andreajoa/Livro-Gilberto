import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, MessageCircle, Sparkles, Gift } from 'lucide-react'
import bookImg from '../assets/book/capa-livro.png'

const API_URL = 'https://gilberto-backend.onrender.com/api'

export default function PopupLeadCapture() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1) // 1: intro, 2: form
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Gerar ID único do visitante
  const visitorIdRef = useRef(localStorage.getItem('visitor_id') || `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const popupTimeoutRef = useRef(null)

  useEffect(() => {
    // Salvar ID do visitante
    localStorage.setItem('visitor_id', visitorIdRef.current)

    // Verificar se deve mostrar popup
    checkPopup()

    return () => {
      if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current)
    }
  }, [])

  const checkPopup = async () => {
    try {
      const response = await fetch(`${API_URL}/popup/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: visitorIdRef.current })
      })
      const data = await response.json()

      if (data.shouldShow) {
        // Mostrar após 15 segundos
        popupTimeoutRef.current = setTimeout(() => {
          setIsOpen(true)
          // Registrar visualização
          fetch(`${API_URL}/popup/view`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visitorId: visitorIdRef.current })
          })
        }, 15000)
      }
    } catch (error) {
      console.error('Erro ao verificar popup:', error)
      // Em caso de erro, não mostrar popup
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Salvar lead
      await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, consent: true })
      })

      // Marcar como inscrito
      await fetch(`${API_URL}/popup/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: visitorIdRef.current })
      })

      setSubmitted(true)

      // Fechar após 3 segundos
      setTimeout(() => setIsOpen(false), 3000)
    } catch (error) {
      console.error('Erro ao salvar lead:', error)
      alert('Erro ao salvar. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div style={{
        position:'fixed', inset:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        zIndex:9999,
        padding:'20px'
      }}>
        {/* Overlay */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          onClick={handleClose}
          style={{
            position:'absolute', inset:0,
            background:'rgba(6,12,24,0.85)',
            backdropFilter:'blur(8px)'
          }}
        />

        {/* Popup Card */}
        <motion.div
          initial={{ opacity:0, scale:0.9, y:20 }}
          animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:0.9, y:20 }}
          transition={{ type:'spring', damping:25 }}
          style={{
            position:'relative',
            width:'100%',
            maxWidth:420,
            maxHeight:'90vh',
            overflowY:'auto',
            background:'linear-gradient(145deg, #0D1B3E 0%, #152347 100%)',
            borderRadius:16,
            border:'1px solid rgba(0,196,212,0.3)',
            boxShadow:'0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,196,212,0.15)',
            zIndex:10000
          }}
        >
          {/* Close Button */}
          <button onClick={handleClose} style={{
            position:'absolute', top:16, right:16,
            background:'rgba(255,255,255,0.1)',
            border:'none', borderRadius:50,
            width:36, height:36,
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', color:'#fff',
            transition:'all 0.2s'
          }}>
            <X size={18} />
          </button>

          {/* Header */}
          <div style={{
            padding:'20px 20px 16px',
            textAlign:'center',
            background:'linear-gradient(180deg, rgba(0,196,212,0.1) 0%, transparent 100%)'
          }}>
            <motion.div
              animate={{ rotate:[0,10,-10,0] }}
              transition={{ duration:2, repeat:Infinity }}
              style={{
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                width:52, height:52, borderRadius:50,
                background:'linear-gradient(135deg, #00C4D4, #0099A8)',
                marginBottom:12
              }}
            >
              <Gift size={32} color="#0D1B3E" />
            </motion.div>
            <h2 style={{
              fontFamily:"'Playfair Display', serif",
              fontSize:22, fontWeight:700, color:'#fff', margin:'0 0 8px'
            }}>
              Ganhe um Desconto Especial!
            </h2>
            <p style={{ fontSize:14, color:'#8A9BBF', margin:0, lineHeight:1.6 }}>
              Deixe seu contato e receba ofertas exclusivas do livro
            </p>
          </div>

          {/* Content */}
          <div style={{ padding:'16px 20px 24px' }}>
            {submitted ? (
              <motion.div
                initial={{ opacity:0, scale:0.8 }}
                animate={{ opacity:1, scale:1 }}
                style={{ textAlign:'center', padding:'20px 0' }}
              >
                <div style={{
                  width:64, height:64, borderRadius:50, background:'rgba(0,196,212,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'
                }}>
                  <Sparkles size={32} color="#00C4D4" />
                </div>
                <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:20, color:'#fff', margin:'0 0 8px', fontWeight:700 }}>
                  Cadastro Realizado!
                </h3>
                <p style={{ fontSize:14, color:'#8A9BBF', margin:0 }}>
                  Em breve entraremos em contato com ofertas exclusivas.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom:16 }}>
                  <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#00C4D4', marginBottom:6 }}>
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Digite seu nome completo"
                    required
                    style={{
                      width:'100%', padding:'10px 14px',
                      background:'rgba(6,12,24,0.5)',
                      border:'1px solid rgba(255,255,255,0.1)',
                      borderRadius:8,
                      color:'#fff',
                      fontSize:14,
                      transition:'all 0.2s'
                    }}
                  />
                </div>

                <div style={{ marginBottom:16 }}>
                  <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#00C4D4', marginBottom:6 }}>
                    Seu Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="seu@email.com"
                    required
                    style={{
                      width:'100%', padding:'12px 16px',
                      background:'rgba(6,12,24,0.5)',
                      border:'1px solid rgba(255,255,255,0.1)',
                      borderRadius:8,
                      color:'#fff',
                      fontSize:14,
                      transition:'all 0.2s'
                    }}
                  />
                </div>

                <div style={{ marginBottom:16 }}>
                  <label style={{ display:'block', fontSize:12, fontWeight:600, color:'#00C4D4', marginBottom:6 }}>
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    placeholder="(11) 99999-9999"
                    required
                    style={{
                      width:'100%', padding:'12px 16px',
                      background:'rgba(6,12,24,0.5)',
                      border:'1px solid rgba(255,255,255,0.1)',
                      borderRadius:8,
                      color:'#fff',
                      fontSize:14,
                      transition:'all 0.2s'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width:'100%', padding:'12px',
                    background:isSubmitting ? 'rgba(0,196,212,0.5)' : 'linear-gradient(135deg, #00C4D4, #0099A8)',
                    border:'none', borderRadius:8,
                    color:'#0D1B3E',
                    fontSize:15, fontWeight:800,
                    cursor:isSubmitting ? 'not-allowed' : 'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                    transition:'all 0.2s'
                  }}
                >
                  {isSubmitting ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <MessageCircle size={18} />
                      <span>Quero Receber Ofertas</span>
                    </>
                  )}
                </button>

                <p style={{ fontSize:11, color:'#8A9BBF', textAlign:'center', margin:'16px 0 0' }}>
                  Ao se cadastrar, você concorda em receber comunicações por WhatsApp e email.
                </p>
              </form>
            )}

            {/* Book Preview */}
            <div style={{
              marginTop:16, paddingTop:16, borderTop:'1px solid rgba(255,255,255,0.08)',
              display:'flex', gap:16, alignItems:'center'
            }}>
              <img src={bookImg} alt="Capa do livro" style={{ width:48, borderRadius:3 }} />
              <div>
                <p style={{ fontSize:12, color:'#fff', fontWeight:600, margin:'0 0 4px' }}>
                  Como Vencer a Dor de Ser Trocado
                </p>
                <p style={{ fontSize:11, color:'#8A9BBF', margin:0 }}>por Gilberto de Souza</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
