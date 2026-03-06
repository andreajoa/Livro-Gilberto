import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowRight, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import bookFront from '../assets/book-front.jpg'

const API_URL = 'https://gilberto-backend.onrender.com/api'

export default function AbandonedCartPopup({ onOpenCart }) {
  const [isOpen, setIsOpen] = useState(false)
  const visitorIdRef = useRef(localStorage.getItem('visitor_id') || '')

  useEffect(() => {
    const id = localStorage.getItem('visitor_id')
    if (!id) {
      localStorage.setItem('visitor_id', `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
    }
    checkAbandonedCart()
  }, [])

  const checkAbandonedCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/check-abandoned`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: localStorage.getItem('visitor_id') })
      })
      const data = await response.json()
      if (data.shouldShow) {
        setIsOpen(true)
        await fetch(`${API_URL}/cart/recover`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId: localStorage.getItem('visitor_id') })
        })
      }
    } catch (error) {
      console.error('Erro ao verificar carrinho:', error)
    }
  }

  const handleGoToCart = () => {
    setIsOpen(false)
    onOpenCart()
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 10000, padding: '20px'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(8px)'
      }} onClick={handleClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 500,
          background: 'linear-gradient(145deg, #0D1B3E 0%, #152347 100%)',
          borderRadius: 16,
          border: '2px solid #00C4D4',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,196,212,0.25)'
        }}
      >
        <button onClick={handleClose} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'rgba(255,255,255,0.1)',
          border: 'none', borderRadius: 50,
          width: 36, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff',
          transition: 'all 0.2s'
        }}>
          X
        </button>

        <div style={{ padding: '40px 32px', textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 50,
            background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
          </div>
          <div style={{
            width: '40%', maxWidth: 140, margin: '0 auto 20px',
            borderRadius: 8, overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
          }}>
            <img src={bookFront} alt='Livro' style={{width:'100%', height:'auto', display:'block'}} />
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24, fontWeight: 700, color: '#fff',
            margin: '0 0 12px'
          }}>
            Ainda pensando?
          </h2>

          <p style={{
            fontSize: 15, color: '#B8C8E0',
            lineHeight: 1.7, margin: '0 0 24px'
          }}>
            Vejo que voce deixou o livro no carrinho...<br /><br />
            <Heart size={14} style={{
              display: 'inline',
              color: '#00C4D4',
              verticalAlign: 'middle'
            }} />{" "}
            Sei que esse livro pode mudar sua vida. Gilberto escreveu cada palavra pensando em homens que passam exatamente pelo que voce esta passando agora.
          </p>

          <p style={{
            fontSize: 14, color: '#8A9BBF',
            lineHeight: 1.6, margin: '0 0 28px',
            fontStyle: 'italic'
          }}>
            "O primeiro passo para vencer essa dor e ter coragem de se reconstruir."
          </p>

          <button
            onClick={handleGoToCart}
            style={{
              width: '100%', padding: '18px 24px',
              background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
              border: 'none', borderRadius: 8,
              color: '#0D1B3E', fontSize: 16, fontWeight: 800,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s'
            }}
          >
            <span>Concluir meu pedido</span>
            <ArrowRight size={20} color="#0D1B3E" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
