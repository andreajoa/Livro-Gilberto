import { useRef } from 'react'
import { useCart } from '../context/CartContext'
import { ShoppingBag } from 'lucide-react'

export default function AddToCartButton({ label = 'Adicionar ao Carrinho' }) {
  const { triggerAddToCart, openCart, setCartOpen } = useCart()
  const buttonRef = useRef(null)

  const handleClick = () => {
    // Tenta abrir a gaveta normal
    if (typeof setCartOpen === 'function') setCartOpen(true);
    if (typeof openCart === 'function') openCart();
    
    // Força bruta para abrir o checkout caso a gaveta não abra
    const checkoutEvent = new CustomEvent('force-open-checkout');
    window.dispatchEvent(checkoutEvent);
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
