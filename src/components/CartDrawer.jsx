import { motion, AnimatePresence } from 'framer-motion'
import { X, Package, ShieldCheck, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ShippingCalculator from './ShippingCalculator'
import bookImg from '../assets/book/capa-livro.png'

export default function CartDrawer() {
  const { cartOpen, setCartOpen, BOOK, shipping, total } = useCart()

  const handleCheckout = () => {
    const msg = `Olá! Quero comprar o livro "${BOOK.title}".\n\nFrete: ${
      shipping ? `${shipping.name} — R$ ${shipping.price.toFixed(2)} (${shipping.days} dias úteis)` : 'a calcular'
    }\n\nTotal: R$ ${total.toFixed(2)}`
    window.location.href = `mailto:contato@gilbertosouza.com?subject=Pedido do Livro&body=${encodeURIComponent(msg)}`
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setCartOpen(false)}
            style={{
              position:'fixed', inset:0, background:'rgba(0,0,0,0.65)',
              backdropFilter:'blur(4px)', zIndex:998
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
            transition={{ type:'spring', stiffness:320, damping:32 }}
            style={{
              position:'fixed', top:0, right:0, bottom:0,
              width:'min(440px,100vw)',
              background:'#0D1B3E',
              borderLeft:'1px solid rgba(0,196,212,0.2)',
              zIndex:999,
              display:'flex',
              flexDirection:'column',
              overflowY:'auto'
            }}
          >
            {/* Header */}
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'24px 28px',
              borderBottom:'1px solid rgba(255,255,255,0.08)',
              background:'rgba(6,12,24,0.5)',
              position:'sticky', top:0, zIndex:2
            }}>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:20, color:'#fff', fontWeight:700, margin:0 }}>
                🛒 Seu Pedido
              </h2>
              <button onClick={() => setCartOpen(false)} style={{
                background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)',
                borderRadius:6, width:36, height:36, display:'flex', alignItems:'center',
                justifyContent:'center', cursor:'pointer', color:'#fff', transition:'all 0.2s'
              }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ flex:1, padding:'24px 28px', display:'flex', flexDirection:'column', gap:24 }}>

              {/* Item do livro */}
              <div style={{
                display:'flex', gap:16, alignItems:'flex-start',
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.07)',
                borderRadius:8, padding:'16px'
              }}>
                <motion.img
                  src={bookImg} alt={BOOK.title}
                  initial={{ scale:0.7, opacity:0 }}
                  animate={{ scale:1, opacity:1 }}
                  transition={{ delay:0.15, type:'spring', stiffness:260, damping:20 }}
                  style={{ width:72, borderRadius:4, boxShadow:'0 8px 24px rgba(0,0,0,0.5)', flexShrink:0 }}
                />
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:15, fontWeight:700, color:'#fff', margin:'0 0 4px', lineHeight:1.3 }}>{BOOK.title}</p>
                  <p style={{ fontSize:12, color:'#8A9BBF', margin:'0 0 10px' }}>{BOOK.author}</p>
                  <p style={{ fontSize:22, fontWeight:900, color:'#00C4D4', margin:'0 0 10px' }}>
                    R$ {BOOK.price.toFixed(2)}
                  </p>
                  <span style={{
                    fontSize:11, background:'rgba(0,196,212,0.1)',
                    border:'1px solid rgba(0,196,212,0.25)',
                    color:'#00C4D4', padding:'4px 10px', borderRadius:4
                  }}>📖 Livro Físico</span>
                </div>
              </div>

              {/* Calculadora de frete */}
              <div style={{
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.07)',
                borderRadius:8, padding:'20px'
              }}>
                <p style={{ fontSize:13, fontWeight:700, color:'#fff', margin:'0 0 14px', display:'flex', alignItems:'center', gap:8 }}>
                  <Package size={15} color="#00C4D4" /> Calcular Frete
                </p>
                <ShippingCalculator />
              </div>

              {/* Resumo total */}
              <div style={{
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.07)',
                borderRadius:8, padding:'20px',
                display:'flex', flexDirection:'column', gap:10
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'#8A9BBF' }}>
                  <span>Subtotal</span>
                  <span>R$ {BOOK.price.toFixed(2)}</span>
                </div>
                {shipping && (
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'#8A9BBF' }}>
                    <span>{shipping.name}</span>
                    <span>R$ {shipping.price.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ height:1, background:'rgba(255,255,255,0.08)', margin:'4px 0' }} />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:16, fontWeight:700, color:'#fff' }}>Total</span>
                  <span style={{ fontSize:24, fontWeight:900, color:'#00C4D4' }}>R$ {total.toFixed(2)}</span>
                </div>
              </div>

            </div>

            {/* Footer do drawer */}
            <div style={{ padding:'20px 28px', borderTop:'1px solid rgba(255,255,255,0.08)', background:'rgba(6,12,24,0.5)' }}>
              <button
                onClick={handleCheckout}
                disabled={!shipping}
                style={{
                  width:'100%', padding:'16px',
                  background: shipping ? 'linear-gradient(135deg, #00C4D4, #0099A8)' : 'rgba(255,255,255,0.08)',
                  border:'none', borderRadius:8,
                  color: shipping ? '#0D1B3E' : '#8A9BBF',
                  fontSize:15, fontWeight:800,
                  cursor: shipping ? 'pointer' : 'not-allowed',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                  transition:'all 0.2s',
                  letterSpacing:0.5
                }}
              >
                {shipping ? <><span>Finalizar Pedido</span><ChevronRight size={18}/></> : 'Calcule o frete para continuar'}
              </button>

              <div style={{ display:'flex', justifyContent:'center', gap:24, marginTop:14 }}>
                {[
                  [<ShieldCheck size={13} key="s"/>, 'Compra Segura'],
                  [<Package size={13} key="p"/>, 'Correios'],
                ].map(([icon, text]) => (
                  <span key={text} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'#8A9BBF' }}>
                    <span style={{ color:'#00C4D4' }}>{icon}</span>{text}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
