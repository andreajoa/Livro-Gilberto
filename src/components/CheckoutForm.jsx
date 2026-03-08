import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, MapPin, Phone, Mail, CreditCard, Lock, ChevronLeft, User } from 'lucide-react'
import { useCart } from '../context/CartContext'

const API_URL = 'https://gilberto-backend.onrender.com/api'

export default function CheckoutForm({ isOpen, onClose }) {
  const { BOOK, quantity, shipping, total, subtotal, setCartOpen, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: '', email: '', whatsapp: '',
    cep: '', address: '', neighborhood: '',
    city: '', state: '', complement: '', reference: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSaved, setOrderSaved] = useState(false)
  const [savedOrder, setSavedOrder] = useState(null)
  const [errors, setErrors] = useState({})

  const isEnglish = window.location.pathname.startsWith('/en');
  const isSpanish = window.location.pathname.startsWith('/es');
  const isInternational = isEnglish || isSpanish;
  const lang = isSpanish ? 'es' : isEnglish ? 'en' : 'pt';
  const displayPrice = isInternational ? 17.00 : total;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const formatWhatsApp = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 6) return `(${digits.slice(0,2)}) ${digits.slice(2)}`
    if (digits.length <= 10) return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`
  }

  const formatCEP = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 8)
    if (digits.length > 5) return `${digits.slice(0,5)}-${digits.slice(5)}`
    return digits
  }

  const validate = () => {
    const e = {}
    if (!formData.name.trim() || formData.name.trim().split(' ').length < 2) e.name = isInternational ? 'Full Name required' : 'Informe seu nome completo'
    if (!formData.email.includes('@')) e.email = 'Email invalido'
    
    if (!isInternational) {
      if (formData.whatsapp.replace(/\D/g,'').length < 10) e.whatsapp = 'WhatsApp invalido'
      if (formData.cep.replace(/\D/g,'').length < 8) e.cep = 'CEP invalido'
      if (!formData.address.trim()) e.address = 'Informe o endereco'
      if (!formData.city.trim()) e.city = 'Informe a cidade'
      if (!formData.state.trim()) e.state = 'Informe o estado'
    }
    
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSaveAndPay = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)

    try {
      const visitorId = localStorage.getItem('visitor_id')
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId,
          name: formData.name, email: formData.email, whatsapp: formData.whatsapp,
          quantity, shipping,
          cep: formData.cep, address: formData.address,
          neighborhood: formData.neighborhood, city: formData.city,
          state: formData.state, complement: formData.complement, reference: formData.reference
        })
      })

      const result = await response.json()

      if (result.success) {
        // --- INÍCIO DA INTEGRAÇÃO COM A STRIPE ---
        try {
          const stripeResponse = await fetch(`${API_URL}/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              total: total, 
              email: formData.email, 
              name: formData.name 
            })
          });
          
          const stripeResult = await stripeResponse.json();
          
          if (stripeResult.url) {
             window.location.href = stripeResult.url; // Vai para a Stripe!
          } else {
             // Caso a API da Stripe não devolva a URL
             setSavedOrder(result.order);
             setOrderSaved(true);
             clearCart();
          }
        } catch (stripeError) {
          console.error("Erro na comunicação com a Stripe:", stripeError);
          setSavedOrder(result.order);
          setOrderSaved(true);
          clearCart();
        }
        // --- FIM DA INTEGRAÇÃO COM A STRIPE ---
      } else {
        alert('Erro ao salvar pedido. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro global do formulário:', error)
      alert('Erro ao processar. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const inputStyle = (field) => ({
    width: '100%', padding: '11px 14px',
    background: errors[field] ? 'rgba(239,68,68,0.08)' : 'rgba(6,12,24,0.6)',
    border: `1px solid ${errors[field] ? '#ef4444' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box'
  })

  const labelStyle = {
    display: 'block', fontSize: 11, fontWeight: 700,
    color: '#8A9BBF', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5
  }

  return (
    <AnimatePresence>
      <motion.div
        key="checkout-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '20px 16px' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          style={{ width: '100%', maxWidth: 620, background: 'linear-gradient(160deg, #0D1B3E 0%, #0a1628 100%)', borderRadius: 16, border: '1px solid rgba(0,196,212,0.3)', overflow: 'hidden' }}
        >
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,196,212,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8A9BBF' }}><ChevronLeft size={18} /></button>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#fff', margin: 0 }}>Dados de Entrega</h2>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A9BBF' }}><X size={20} /></button>
          </div>
          {orderSaved ? (
             <div style={{ padding: '48px 32px', textAlign: 'center' }}>
               <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #00C4D4, #0099A8)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><CheckCircle size={36} color="#0D1B3E" /></div>
               <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#fff', margin: '0 0 8px' }}>Pedido Registrado!</h2>
               <p style={{ color: '#B8C8E0', fontSize: 14 }}>Ocorreu um erro ao abrir a tela de pagamento. Nosso time entrará em contato pelo WhatsApp para finalizar a cobrança do pedido <strong style={{color: '#00C4D4'}}>{savedOrder?.id}</strong>.</p>
               <button onClick={onClose} style={{ marginTop: 16, padding: '12px 32px', background: '#00C4D4', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#0D1B3E', fontWeight: 800 }}>Fechar</button>
             </div>
          ) : (
            <form onSubmit={handleSaveAndPay}>
              <div style={{ padding: '24px 24px 0' }}>
                <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
                  <div><label style={labelStyle}>Nome Completo *</label><input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle('name')} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Email *</label><div style={{position:'relative'}}><Mail size={14} style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#8A9BBF'}} /><input type="email" name="email" value={formData.email} onChange={handleChange} style={{...inputStyle('email'), paddingLeft:36}} /></div></div>
                    <div><label style={labelStyle}>WhatsApp *</label><div style={{position:'relative'}}><Phone size={14} style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#8A9BBF'}} /><input type="tel" name="whatsapp" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: formatWhatsApp(e.target.value) })} style={{...inputStyle('whatsapp'), paddingLeft:36}} /></div></div>
                  </div>
                  {!isInternational && (<><div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>CEP *</label><input type="text" name="cep" value={formData.cep} onChange={(e) => setFormData({ ...formData, cep: formatCEP(e.target.value) })} style={inputStyle('cep')} /></div>
                    <div><label style={labelStyle}>Endereço *</label><input type="text" name="address" value={formData.address} onChange={handleChange} style={inputStyle('address')} /></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><label style={labelStyle}>Bairro</label><input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} style={inputStyle('neighborhood')} /></div>
                    <div><label style={labelStyle}>Complemento</label><input type="text" name="complement" value={formData.complement} onChange={handleChange} style={inputStyle('complement')} /></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 12 }}><div><label style={labelStyle}>Cidade *</label><input type="text" name="city" value={formData.city} onChange={handleChange} style={inputStyle('city')} /></div><div><label style={labelStyle}>Estado *</label><input type="text" name="state" value={formData.state} onChange={handleChange} maxLength="2" style={{...inputStyle('state'), textTransform: 'uppercase'}} /></div></div></>)}</div></div>
                </div>
              </div>
              <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(6,12,24,0.5)' }}>
                <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #00C4D4, #0099A8)', border: 'none', borderRadius: 10, color: '#0D1B3E', fontSize: 16, fontWeight: 900, cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  {isSubmitting ? '...' : <><CreditCard size={20} /><span>{isInternational ? `Pay ${displayPrice} (Instant Access)` : `Confirmar e Pagar R$ ${total.toFixed(2)}`}</span></>}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
