"use client"
import { createContext, useContext, useState, useRef, useEffect } from 'react'
import { getWebsiteContext } from '@/src/lib/website/websiteTracker'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)
  const [shipping, setShipping] = useState(null)
  const [isFlying, setIsFlying] = useState(false)
  const [flyOrigin, setFlyOrigin] = useState({ x: 0, y: 0 })
  const [quantity, setQuantity] = useState(1)
  const [inCart, setInCart] = useState(false)
  const [cartId, setCartId] = useState('')
  const cartIconRef = useRef(null)

  const API_URL = '/api'

  const BOOK = {
    title: 'Como Vencer a Dor de Ser Trocado Por Outro',
    author: 'Gilberto de Souza',
    price: 119.00,
    comparePrice: 159.00,
    image: '/images/capa%20livro.png'
  }

  const subtotal = BOOK.price * quantity
  const total = subtotal + (shipping?.price || 0)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('gs_cart_state') || 'null')
      if (!saved?.inCart || !saved?.cartId) return
      setCartId(saved.cartId)
      setInCart(true)
      setQuantity(Math.min(20, Math.max(1, Number(saved.quantity) || 1)))
      setShipping(saved.shipping || null)
    } catch {
      localStorage.removeItem('gs_cart_state')
    }
  }, [])

  const createCartId = () => {
    const existing = cartId || localStorage.getItem('gs_cart_id')
    if (existing) {
      setCartId(existing)
      return existing
    }
    const next = `cart_${crypto.randomUUID()}`
    localStorage.setItem('gs_cart_id', next)
    setCartId(next)
    return next
  }

  const saveCart = async () => {
    try {
      if (!inCart || !cartId) return
      const context = getWebsiteContext()

      localStorage.setItem('gs_cart_state', JSON.stringify({ cartId, inCart: true, quantity, shipping }))

      await fetch(`${API_URL}/commerce/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          visitorId: context.visitorId || '',
          sessionId: context.sessionId || '',
          quantity,
          cep: shipping?.cep || '',
          shippingMethod: shipping?.type || '',
          subtotal,
          shippingAmount: shipping?.price || 0,
          total,
          status: 'active'
        })
      })
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error)
    }
  }

  useEffect(() => {
    saveCart()
  }, [quantity, shipping, inCart, cartId])

  const triggerAddToCart = (buttonRef) => {
    createCartId()
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
    localStorage.removeItem('gs_cart_state')
  }

  const handleCartClose = () => {
    setCartOpen(false)
  }

  const openCart = () => {
    if (inCart) setCartOpen(true)
  }

  const addToCart = () => {
    createCartId()
    setInCart(true)
    setCartOpen(true)
  }

  const clearCart = async () => {
    try {
      if (cartId) await fetch(`${API_URL}/commerce/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, quantity: 1, status: 'removed' })
      })

      setQuantity(1)
      setInCart(false)
      setShipping(null)
      setCartOpen(false)
      localStorage.removeItem('gs_cart_state')
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
      cartId,
      createCartId,
      removeFromCart,
      handleCartClose,
      openCart,
      addToCart,
      clearCart,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
