import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, MapPin, Phone, Mail, CreditCard, Lock, ChevronLeft, Package, User } from 'lucide-react'
import { useCart } from '../context/CartContext'

const API_URL = 'https://gilberto-backend-production.up.railway.app/api'

export default function CheckoutForm({ isOpen, onClose }) {
  const { BOOK, quantity, shipping, total, subtotal, setCartOpen, clearCart } = useCart()

  const [formData, setFormData] = useState({
    name: '', email: '', whatsapp: '',
    cep: '', address: '', neighborhood: '',
    city: '', state: '', complement: '', reference: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [orderSaved, setOrderSaved] = useState(false)
  const [savedOrder, setSavedOrder] = useState(null)
  const [errors, setErrors] = useState({})

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
    if (!formData.name.trim() || formData.name.trim().split(' ').length < 2) e.name = 'Informe seu nome completo'
    if (!formData.email.includes('@')) e.email = 'Email invalido'
    if (formData.whatsapp.replace(/\D/g,'').length < 10) e.whatsapp = 'WhatsApp invalido'
    if (formData.cep.replace(/\D/g,'').length < 8) e.cep = 'CEP invalido'
    if (!formData.address.trim()) e.address = 'Informe o endereco'
    if (!formData.city.trim()) e.city = 'Informe a cidade'
    if (!formData.state.trim()) e.state = 'Informe o estado'
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
        setSavedOrder(result.order)
        setOrderSaved(true)
        clearCart()
      } else {
        alert('Erro ao salvar pedido. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao processar. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const inputStyle = (field) => ({
    width: '100%',
    padding: '11px 14px',
    background: errors[field] ? 'rgba(239,68,68,0.08)' : 'rgba(6,12,24,0.6)',
    border: `1px solid ${errors[field] ? '#ef4444' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: 8, color: '#fff', fontSize: 14,
    outline: 'none', boxSizing: 'border-box',
    transition: 'border 0.2s'
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
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          overflowY: 'auto', padding: '20px 16px'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          style={{
            width: '100%', maxWidth: 620,
            background: 'linear-gradient(160deg, #0D1B3E 0%, #0a1628 100%)',
            borderRadius: 16, border: '1px solid rgba(0,196,212,0.3)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 80px rgba(0,196,212,0.1)',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(0,196,212,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={onClose} style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, width: 34, height: 34, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#8A9BBF'
              }}>
                <ChevronLeft size={18} />
              </button>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#fff', margin: 0 }}>
                  Dados de Entrega
                </h2>
                <p style={{ fontSize: 12, color: '#8A9BBF', margin: 0 }}>Preencha para confirmar seu pedido</p>
              </div>
            </div>
            <button onClick={onClose} style={{
              background: 'none', border: 'none', cursor: 'pointer', color: '#8A9BBF'
            }}>
              <X size={20} />
            </button>
          </div>

          {orderSaved ? (
            /* TELA DE SUCESSO */
            <div style={{ padding: '48px 32px', textAlign: 'center' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <CheckCircle size={36} color="#0D1B3E" />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#fff', margin: '0 0 8px' }}>
                Pedido Registrado!
              </h2>
              <p style={{ fontSize: 14, color: '#B8C8E0', lineHeight: 1.7, margin: '0 0 8px' }}>
                Obrigado, <strong style={{ color: '#fff' }}>{formData.name.split(' ')[0]}</strong>!<br />
                Seu pedido foi salvo. Gilberto vai entrar em contato pelo WhatsApp para confirmar o pagamento e o envio.
              </p>
              <div style={{
                background: 'rgba(0,196,212,0.08)', border: '1px solid rgba(0,196,212,0.2)',
                borderRadius: 10, padding: '16px 20px', margin: '20px 0', textAlign: 'left'
              }}>
                <p style={{ fontSize: 12, color: '#8A9BBF', margin: '0 0 8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Resumo do pedido</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#B8C8E0', marginBottom: 4 }}>
                  <span>Livro x{quantity}</span><span>R$ {(BOOK.price * quantity).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#B8C8E0', marginBottom: 8 }}>
                  <span>Frete ({shipping?.name})</span><span>R$ {(shipping?.price || 0).toFixed(2)}</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: '#fff' }}>Total</span>
                  <span style={{ fontWeight: 900, fontSize: 18, color: '#00C4D4' }}>R$ {total.toFixed(2)}</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: '#8A9BBF' }}>
                Pedido: <strong style={{ color: '#00C4D4' }}>{savedOrder?.id}</strong>
              </p>
              <button onClick={onClose} style={{
                marginTop: 16, padding: '12px 32px',
                background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
                border: 'none', borderRadius: 8, color: '#0D1B3E',
                fontSize: 14, fontWeight: 800, cursor: 'pointer'
              }}>
                Fechar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveAndPay}>
              <div style={{ padding: '24px 24px 0' }}>

                {/* Resumo do pedido no topo */}
                <div style={{
                  background: 'rgba(0,196,212,0.06)', border: '1px solid rgba(0,196,212,0.15)',
                  borderRadius: 10, padding: '14px 18px', marginBottom: 24,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <p style={{ fontSize: 13, color: '#8A9BBF', margin: '0 0 2px' }}>{BOOK.title.substring(0,30)}...</p>
                    <p style={{ fontSize: 12, color: '#8A9BBF', margin: 0 }}>
                      {quantity}x livro + frete {shipping?.name}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 11, color: '#8A9BBF', margin: '0 0 2px' }}>Total a pagar</p>
                    <p style={{ fontSize: 22, fontWeight: 900, color: '#00C4D4', margin: 0 }}>R$ {total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Seção dados pessoais */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <User size={15} color="#00C4D4" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Seus dados</span>
                </div>

                <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Nome Completo *</label>
                    <input type="text" name="name" value={formData.name}
                      onChange={handleChange} placeholder="Ex: João da Silva"
                      style={inputStyle('name')} />
                    {errors.name && <p style={{ color: '#ef4444', fontSize: 11, margin: '4px 0 0' }}>{errors.name}</p>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#8A9BBF' }} />
                        <input type="email" name="email" value={formData.email}
                          onChange={handleChange} placeholder="seu@email.com"
                          style={{ ...inputStyle('email'), paddingLeft: 36 }} />
                      </div>
                      {errors.email && <p style={{ color: '#ef4444', fontSize: 11, margin: '4px 0 0' }}>{errors.email}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>WhatsApp *</label>
                      <div style={{ position: 'relative' }}>
                        <Phone size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#8A9BBF' }} />
                        <input type="tel" name="whatsapp" value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: formatWhatsApp(e.target.value) })}
                          placeholder="(11) 99999-9999"
                          style={{ ...inputStyle('whatsapp'), paddingLeft: 36 }} />
                      </div>
                      {errors.whatsapp && <p style={{ color: '#ef4444', fontSize: 11, margin: '4px 0 0' }}>{errors.whatsapp}</p>}
                    </div>
                  </div>
                </div>

                {/* Seção endereço */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <MapPin size={15} color="#00C4D4" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Endereço de entrega</span>
                </div>

                <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12 }}>
                    <div>
                      <label style={labelStyle}>CEP *</label>
                      <input type="text" name="cep" value={formData.cep}
                        onChange={(e) => setFormData({ ...formData, cep: formatCEP(e.target.value) })}
                        placeholder="00000-000" style={inputStyle('cep')} />
                      {errors.cep && <p style={{ color: '#ef4444', fontSize: 11, margin: '4px 0 0' }}>{errors.cep}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Endereço (Rua, Número) *</label>
                      <input type="text" name="address" value={formData.address}
                        onChange={handleChange} placeholder="Rua Exemplo, 123"
                        style={inputStyle('address')} />
                      {errors.address && <p style={{ color: '#ef4444', fontSize: 11, margin: '4px 0 0' }}>{errors.address}</p>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Bairro</label>
                      <input type="text" name="neighborhood" value={formData.neighborhood}
                        onChange={handleChange} placeholder="Centro" style={inputStyle('neighborhood')} />
                    </div>
                    <div>
                      <label style={labelStyle}>Complemento</label>
                      <input type="text" name="complement" value={formData.complement}
                        onChange={handleChange} placeholder="Apto 12, Bloco B" style={inputStyle('complement')} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Ponto de Referência</label>
                    <input type="text" name="reference" value={formData.reference}
                      onChange={handleChange} placeholder="Ex: Próximo ao mercado, portão azul..."
                      style={inputStyle('reference')} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Cidade *</label>
                      <input type="text" name="city" value={formData.city}
                        onChange={handleChange} placeholder="São Paulo"
                        style={inputStyle('city')} />
                      {errors.city && <p style={{ color: '#ef4444', fontSize: 11, margin: '4px 0 0' }}>{errors.city}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Estado *</label>
                      <input type="text" name="state" value={formData.state}
                        onChange={handleChange} placeholder="SP"
                        maxLength="2" style={{ ...inputStyle('state'), textTransform: 'uppercase' }} />
                      {errors.state && <p style={{ color: '#ef4444', fontSize: 11, margin: '4px 0 0' }}>{errors.state}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer com botão */}
              <div style={{
                padding: '20px 24px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(6,12,24,0.5)'
              }}>
                {/* Breakdown do total */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#8A9BBF', marginBottom: 4 }}>
                    <span>Livro x{quantity}</span><span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#8A9BBF', marginBottom: 8 }}>
                    <span>Frete {shipping?.name}</span><span>R$ {(shipping?.price || 0).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Total</span>
                    <span style={{ fontSize: 26, fontWeight: 900, color: '#00C4D4' }}>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} style={{
                  width: '100%', padding: '16px',
                  background: isSubmitting ? 'rgba(0,196,212,0.4)' : 'linear-gradient(135deg, #00C4D4, #0099A8)',
                  border: 'none', borderRadius: 10,
                  color: '#0D1B3E', fontSize: 16, fontWeight: 900,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  letterSpacing: 0.3
                }}>
                  {isSubmitting ? 'Salvando...' : (
                    <><CreditCard size={20} /><span>Confirmar e Ir para Pagamento — R$ {total.toFixed(2)}</span></>
                  )}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, fontSize: 11, color: '#8A9BBF' }}>
                  <Lock size={12} color="#00C4D4" />
                  <span>Seus dados estão protegidos e serão usados apenas para o envio</span>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
