import { useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function useCartAnimation() {
  const { isFlying, cartIconRef } = useCart()
  const { triggerAddToCart, onFlyComplete } = useCart()

  // Animação do ícone do carrinho - bounce após adicionar item
  useEffect(() => {
    if (!isFlying) return
    const timeoutId = setTimeout(() => {
      if (cartIconRef.current) {
        cartIconRef.current.classList.add('cart-bounce')
        setTimeout(() => cartIconRef.current?.classList.remove('cart-bounce'), 600)
      }
    }, 150)

    return () => clearTimeout(timeoutId)
  }, [isFlying])

  return { isFlying, triggerAddToCart, onFlyComplete, cartIconRef }
}
