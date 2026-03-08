import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Mail, CreditCard, Lock, User } from 'lucide-react'

const API_URL = 'https://gilberto-backend.onrender.com/api'

export default function CheckoutDigital({ isOpen, onClose, lang = 'en' }) {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const isSpanish = lang === 'es';
  const price = isSpanish ? 17.00 : 17.00; // Preço em Dólar fixo

  const content = {
    title: isSpanish ? "Acceso Instantáneo" : "Instant Access",
    subtitle: isSpanish ? "Recibe el eBook + Audiolibro en tu email" : "Get the eBook + Audiobook in your email",
    nameLabel: isSpanish ? "Nombre Completo *" : "Full Name *",
    namePlaceholder: isSpanish ? "Ej: Juan Pérez" : "Ex: John Doe",
    emailLabel: "Email *",
    emailPlaceholder: "email@email.com",
    btnLoading: isSpanish ? "Procesando..." : "Processing...",
    btnPay: isSpanish ? `Pagar $${price} y Acceder` : `Pay $${price} & Get Access`,
    securityText: isSpanish ? "Pago 100% seguro a través de Stripe" : "100% secure payment via Stripe"
  };

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = isSpanish ? 'Nombre requerido' : 'Name required'
    if (!formData.email.includes('@')) e.email = isSpanish ? 'Email inválido' : 'Invalid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSaveAndPay = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)

    try {
      const visitorId = localStorage.getItem('visitor_id') || 'anonimo';
      
      // 1. Salva o pedido no banco de dados com a Tag do país
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId,
          name: formData.name, 
          email: formData.email, 
          whatsapp: 'digital_order', // Bypass de WhatsApp
          quantity: 1, 
          shipping: { price: 0, name: 'Digital Delivery' },
          cep: '00000', address: 'Digital', neighborhood: 'Digital', 
          city: 'Digital', state: 'DG', complement: '', reference: '',
          countryTag: lang // Manda a tag 'en' ou 'es' para o Painel Admin
        })
      })

      const result = await response.json()

      if (result.success) {
        // 2. Aciona a Stripe em Dólar
        try {
          const stripeRes = await fetch(API_URL + '/checkout-digital', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ total: price, email: formData.email, name: formData.name, lang })
          });
          const stripeData = await stripeRes.json();
          
          if (stripeData.url) {
            window.location.href = stripeData.url;
          } else {
            alert(isSpanish ? 'Error al contactar pasarela de pago.' : 'Checkout gateway error.');
          }
        } catch (e) {
          alert(isSpanish ? 'Error al procesar pago.' : 'Payment processing error.');
        }
      }
    } catch (error) {
      alert(isSpanish ? 'Error al procesar su solicitud.' : 'Error processing your request.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Escuta chamadas globais de botões
  const [forcedOpen, setForcedOpen] = useState(false);
  useEffect(() => {
    const handleForceOpen = () => setForcedOpen(true);
    window.addEventListener(`force-checkout-${lang}`, handleForceOpen);
    return () => window.removeEventListener(`force-checkout-${lang}`, handleForceOpen);
  }, [lang]);

  const realIsOpen = isOpen || forcedOpen;
  const realOnClose = () => { setForcedOpen(false); if(onClose) onClose(); };

  if (!realIsOpen) return null

  const inputStyle = (field) => ({
    width: '100%', padding: '12px 16px', background: 'rgba(6,12,24,0.6)',
    border: `1px solid ${errors[field] ? '#ef4444' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none'
  })

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
          style={{ width: '100%', maxWidth: 450, background: 'linear-gradient(160deg, #0D1B3E 0%, #0a1628 100%)', borderRadius: 16, border: '1px solid rgba(0,196,212,0.3)', overflow: 'hidden' }}>
          
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 18, color: '#fff', margin: 0, fontFamily: "'Playfair Display', serif" }}>{content.title}</h2>
              <p style={{ fontSize: 12, color: '#8A9BBF', margin: 0 }}>{content.subtitle}</p>
            </div>
            <button onClick={realOnClose} style={{ background: 'none', border: 'none', color: '#8A9BBF', cursor: 'pointer' }}><X size={20} /></button>
          </div>

          <form onSubmit={handleSaveAndPay}>
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 11, color: '#8A9BBF', marginBottom: 5, textTransform: 'uppercase' }}>{content.nameLabel}</label>
                <div style={{ position: 'relative' }}>
                  <User size={14} style={{ position: 'absolute', left: 12, top: 14, color: '#8A9BBF' }} />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={content.namePlaceholder} style={{...inputStyle('name'), paddingLeft: 36}} />
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 11, color: '#8A9BBF', marginBottom: 5, textTransform: 'uppercase' }}>{content.emailLabel}</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={14} style={{ position: 'absolute', left: 12, top: 14, color: '#8A9BBF' }} />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={content.emailPlaceholder} style={{...inputStyle('email'), paddingLeft: 36}} />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #00C4D4, #0099A8)', border: 'none', borderRadius: 10, color: '#0D1B3E', fontSize: 16, fontWeight: 900, cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                 {isSubmitting ? content.btnLoading : <><CreditCard size={20} /><span>{content.btnPay}</span></>}
              </button>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 16, color: '#8A9BBF', fontSize: 11 }}>
                 <Lock size={12} color="#00C4D4" /> <span>{content.securityText}</span>
              </div>
            </div>
          </form>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
