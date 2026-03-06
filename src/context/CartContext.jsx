import { createContext, useContext, useState, useRef, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)
  const [shipping, setShipping] = useState(null)
  const [isFlying, setIsFlying] = useState(false)
  const [flyOrigin, setFlyOrigin] = useState({ x: 0, y: 0 })
  const [quantity, setQuantity] = useState(1)
  const [inCart, setInCart] = useState(false)
  const cartIconRef = useRef(null)

  const API_URL = 'https://gilberto-backend.onrender.com/api'

  const BOOK = {
    title: 'Como Vencer a Dor de Ser Trocado Por Outro',
    author: 'Gilberto de Souza',
    price: 119.00,
    comparePrice: 159.00,
    image: '/images/Whisk_e9acd35e6c0a93d998a4c0dbe160bba5dr.png'
  }

  const subtotal = BOOK.price * quantity
  const total = subtotal + (shipping?.price || 0)

  const saveCart = async () => {
    try {
      const visitorId = localStorage.getItem('visitor_id')
      if (!visitorId) return

      await fetch(`${API_URL}/cart/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId,
          quantity,
          shipping
        })
      })
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error)
    }
  }

  useEffect(() => {
    saveCart()
  }, [quantity, shipping])

  const triggerAddToCart = (buttonRef) => {
    if (!buttonRef?.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setFlyOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    })
    setIsFlying(true)
  }

  const onFlyComplete = () => {
    setIsFlying(false)
    setInCart(true)
    setCartOpen(true)
    if (cartIconRef.current) {
      cartIconRef.current.classList.add('cart-bounce')
      setTimeout(() => cartIconRef.current?.classList.remove('cart-bounce'), 600)
    }
  }

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1))
  const removeFromCart = () => {
    setQuantity(1)
    setInCart(false)
    setCartOpen(false)
    setShipping(null)
  }

  const handleCartClose = () => {
    setCartOpen(false)
  }

  const openCart = () => {
    setCartOpen(true)
  }

  const clearCart = async () => {
    try {
      const visitorId = localStorage.getItem('visitor_id')
      if (!visitorId) return

      await fetch(`${API_URL}/cart/clear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId })
      })

      setQuantity(1)
      setInCart(false)
      setShipping(null)
      setCartOpen(false)
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error)
    }
  }

  return (
    <CartContext.Provider value={{
      cartOpen, setCartOpen,
      shipping, setShipping,
      isFlying, flyOrigin,
      triggerAddToCart, onFlyComplete,
      cartIconRef,
      BOOK, total,
      quantity, setQuantity,
      increaseQuantity, decreaseQuantity,
      inCart,
      inCart,
      removeFromCart,
      handleCartClose,
      openCart,
      clearCart,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
