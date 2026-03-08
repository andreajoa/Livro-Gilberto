import { useRef } from 'react'
import { useCart } from '../context/CartContext'
import { ShoppingBag } from 'lucide-react'

export default function AddToCartButton({ label = 'Adicionar ao Carrinho' }) {
  const { setCartOpen } = useCart()
  const buttonRef = useRef(null)

  const handleClick = () => {
    // Abre a gaveta nativamente pelo contexto e mais nada!
    if (typeof setCartOpen === 'function') {
      setCartOpen(true);
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="add-to-cart-btn"
    >
      <ShoppingBag size={18} />
      {label}
    </button>
  )
}
