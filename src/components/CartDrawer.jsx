import { motion, AnimatePresence } from 'framer-motion'
import { X, Package, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ShippingCalculator from './ShippingCalculator'
import bookImg from '../assets/book-front.jpg'

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
          {/* Overlay escuro */}
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="cart-header">
              <h2 className="cart-title">🛒 Seu Pedido</h2>
              <button onClick={() => setCartOpen(false)} className="cart-close">
                <X size={22} />
              </button>
            </div>

            {/* Item */}
            <div className="cart-item">
              <motion.div
                className="cart-book-img"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
              >
                <img src={bookImg} alt={BOOK.title} />
              </motion.div>
              <div className="cart-item-info">
                <p className="cart-item-title">{BOOK.title}</p>
                <p className="cart-item-author">{BOOK.author}</p>
                <p className="cart-item-price">R$ {BOOK.price.toFixed(2)}</p>
                <span className="cart-item-badge">📖 Livro Físico</span>
              </div>
            </div>

            <div className="cart-divider" />

            {/* Frete */}
            <ShippingCalculator />

            <div className="cart-divider" />

            {/* Total */}
            <div className="cart-total-row">
              <span>Subtotal</span>
              <span>R$ {BOOK.price.toFixed(2)}</span>
            </div>
            {shipping && (
              <div className="cart-total-row">
                <span>{shipping.type}</span>
                <span>R$ {shipping.price.toFixed(2)}</span>
              </div>
            )}
            <div className="cart-total-row grand">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>

            {/* CTA */}
            <button
              className="cart-checkout-btn"
              onClick={handleCheckout}
              disabled={!shipping}
            >
              {shipping ? 'Finalizar Pedido →' : 'Calcule o frete para continuar'}
            </button>

            {/* Selos */}
            <div className="cart-badges">
              <span><ShieldCheck size={14} /> Compra Segura</span>
              <span><Package size={14} /> Enviado pelos Correios</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
