import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Package, ShieldCheck, ChevronRight, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ShippingCalculator from './ShippingCalculator'
import CheckoutForm from './CheckoutForm'
import bookImg from '../assets/book/capa-livro.png'

export default function CartDrawer() {
  const { cartOpen, setCartOpen, BOOK, shipping, total, quantity, increaseQuantity, decreaseQuantity, removeFromCart, handleCartClose, subtotal } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  const handleCheckout = () => {
    setCartOpen(false)
    setTimeout(() => setShowCheckout(true), 300)
  }

  return (
    <>
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleCartClose}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(4px)', zIndex: 998
            }}
          />

          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(440px,100vw)',
              background: '#0D1B3E',
              borderLeft: '1px solid rgba(0,196,212,0.2)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto'
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '24px 28px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(6,12,24,0.5)',
              position: 'sticky', top: 0, zIndex: 2
            }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#fff', fontWeight: 700, margin: 0 }}>
                Seu Pedido
              </h2>
              <button onClick={handleCartClose} style={{
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 6, width: 36, height: 36, display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'all 0.2s'
              }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ flex: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>

              <div style={{
                display: 'flex', gap: 16, alignItems: 'flex-start',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8, padding: '16px'
              }}>
                <motion.img
                  src={bookImg} alt={BOOK.title}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
                  style={{ width: 72, borderRadius: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.5)', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 4px', lineHeight: 1.3 }}>{BOOK.title}</p>
                  <p style={{ fontSize: 12, color: '#8A9BBF', margin: '0 0 10px' }}>{BOOK.author}</p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: '#00C4D4' }}>
                      R$ {BOOK.price.toFixed(2)}
                    </span>
                    <span style={{ fontSize: 14, color: '#8A9BBF', textDecoration: 'line-through' }}>
                      R$ {BOOK.comparePrice?.toFixed(2)}
                    </span>
                    <span style={{ fontSize: 11, color: '#00C4D4', fontWeight: 700 }}>
                      -25%
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)' }}>
                      <button onClick={decreaseQuantity} disabled={quantity <= 1} style={{
                        background: 'none', border: 'none', width: 32, height: 32, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', cursor: quantity > 1 ? 'pointer' : 'not-allowed',
                        color: quantity > 1 ? '#fff' : '#8A9BBF', transition: 'all 0.2s'
                      }}>
                        <Minus size={14} />
                      </button>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', minWidth: 24, textAlign: 'center' }}>{quantity}</span>
                      <button onClick={increaseQuantity} style={{
                        background: 'none', border: 'none', width: 32, height: 32, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff',
                        transition: 'all 0.2s'
                      }}>
                        <Plus size={14} />
                      </button>
                    </div>

                    <button onClick={removeFromCart} style={{
                      background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6,
                      cursor: 'pointer', color: '#ef4444', fontSize: 11, fontWeight: 600, padding: '6px 10px',
                      borderRadius: 4, transition: 'all 0.2s'
                    }}>
                      <Trash2 size={12} />
                      Remover
                    </button>
                  </div>

                  <span style={{
                    fontSize: 11, background: 'rgba(0,196,212,0.1)',
                    border: '1px solid rgba(0,196,212,0.25)',
                    color: '#00C4D4', padding: '4px 10px', borderRadius: 4, marginTop: 10, display: 'inline-block'
                  }}>Livro Fisico</span>
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8, padding: '20px'
              }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Package size={15} color="#00C4D4" /> Calcular Frete
                </p>
                <ShippingCalculator />
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8, padding: '20px',
                display: 'flex', flexDirection: 'column', gap: 10
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#8A9BBF' }}>
                  <span>Subtotal ({quantity}x)</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {shipping && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#8A9BBF' }}>
                    <span>{shipping.name}</span>
                    <span>R$ {shipping.price.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Total</span>
                  <span style={{ fontSize: 24, fontWeight: 900, color: '#00C4D4' }}>R$ {total.toFixed(2)}</span>
                </div>
              </div>

            </div>

            <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(6,12,24,0.5)' }}>
              <button
                onClick={handleCheckout}
                disabled={!shipping}
                style={{
                  width: '100%', padding: '16px',
                  background: shipping ? 'linear-gradient(135deg, #00C4D4, #0099A8)' : 'rgba(255,255,255,0.08)',
                  border: 'none', borderRadius: 8,
                  color: shipping ? '#0D1B3E' : '#8A9BBF',
                  fontSize: 15, fontWeight: 800,
                  cursor: shipping ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'all 0.2s',
                  letterSpacing: 0.5
                }}
              >
                {shipping ? <><span>Ir para Pagamento</span><ChevronRight size={18} /></> : 'Calcule o frete para continuar'}
              </button>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 14 }}>
                {[
                  [<ShieldCheck size={13} />, 'Compra Segura'],
                  [<Package size={13} />, 'Correios'],
                ].map(([icon, text]) => (
                  <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8A9BBF' }}>
                    <span style={{ color: '#00C4D4' }}>{icon}</span>{text}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>

        </>
      )}
    </AnimatePresence>
    <CheckoutForm isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
    </>
  )
}
