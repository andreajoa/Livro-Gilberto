import { useRef } from 'react'
import { useCart } from '../context/CartContext'
import { ShoppingBag } from 'lucide-react'

export default function AddToCartButton({ label = 'Adicionar ao Carrinho' }) {
  const { triggerAddToCart } = useCart()
  const buttonRef = useRef(null)

  const handleClick = () => {
    // Tenta primeiro abrir a gaveta normal
    if (typeof setCartOpen === 'function') setCartOpen(true);
    if (typeof openCart === 'function') openCart();
    
    // FORÇA BRUTA: Se o carrinho estiver quebrado, abre o formulário de Checkout direto na tela
    const checkoutEvent = new CustomEvent('force-open-checkout');
    window.dispatchEvent(checkoutEvent);
  } else {
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
