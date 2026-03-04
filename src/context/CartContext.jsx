import { createContext, useContext, useState, useRef } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)
  const [shipping, setShipping] = useState(null)
  const [isFlying, setIsFlying] = useState(false)
  const [flyOrigin, setFlyOrigin] = useState({ x: 0, y: 0 })
  const cartIconRef = useRef(null)

  const BOOK = {
    title: 'Como Vencer a Dor de Ser Trocado Por Outro',
    author: 'Gilberto de Souza',
    price: 49.90,
    image: '/images/Whisk_e9acd35e6c0a93d998a4c0dbe160bba5dr.png'
  }

  const total = BOOK.price + (shipping?.price || 0)

  // Chamado pelo botão "Adicionar ao Carrinho"
  // buttonRef = ref do botão clicado para calcular posição de origem
  const triggerAddToCart = (buttonRef) => {
    if (!buttonRef?.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setFlyOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    })
    setIsFlying(true)
  }

  // Chamado pelo FlyingBook quando a animação termina
  const onFlyComplete = () => {
    setIsFlying(false)
    setCartOpen(true)
    // Dispara bounce no ícone do carrinho
    if (cartIconRef.current) {
      cartIconRef.current.classList.add('cart-bounce')
      setTimeout(() => cartIconRef.current?.classList.remove('cart-bounce'), 600)
    }
  }

  return (
    <CartContext.Provider value={{
      cartOpen, setCartOpen,
      shipping, setShipping,
      isFlying, flyOrigin,
      triggerAddToCart, onFlyComplete,
      cartIconRef,
      BOOK, total
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
