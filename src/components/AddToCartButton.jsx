import { useRef } from 'react'
import { useCart } from '../context/CartContext'
import { ShoppingBag } from 'lucide-react'

export default function AddToCartButton({ label = 'Adicionar ao Carrinho' }) {
  const { triggerAddToCart } = useCart()
  const buttonRef = useRef(null)

  const handleClick = () => {
    triggerAddToCart(buttonRef)
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
