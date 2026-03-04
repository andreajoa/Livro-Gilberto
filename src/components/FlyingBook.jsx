import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import bookImg from '../assets/book-front.jpg'

export default function FlyingBook() {
  const { isFlying, flyOrigin, onFlyComplete, cartIconRef } = useCart()

  // Posição destino = posição do ícone do carrinho na navbar
  const getCartPosition = () => {
    if (!cartIconRef?.current) return { x: window.innerWidth - 60, y: 20 }
    const rect = cartIconRef.current.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  }

  if (!isFlying) return null

  const dest = getCartPosition()

  // Ponto de controle da curva bezier — arco no topo da tela
  const controlX = (flyOrigin.x + dest.x) / 2
  const controlY = Math.min(flyOrigin.y, dest.y) - 200

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 80, height: 112,
        zIndex: 9999,
        pointerEvents: 'none',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
      }}
      initial={{
        x: flyOrigin.x - 40,
        y: flyOrigin.y - 56,
        scale: 1,
        opacity: 1,
        rotate: 0
      }}
      animate={{
        x: [flyOrigin.x - 40, controlX - 40, dest.x - 20],
        y: [flyOrigin.y - 56, controlY - 56, dest.y - 20],
        scale: [1, 0.8, 0.15],
        opacity: [1, 1, 0],
        rotate: [0, -15, -30]
      }}
      transition={{
        duration: 0.85,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.5, 1]
      }}
      onAnimationComplete={onFlyComplete}
    >
      <img
        src={bookImg}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </motion.div>
  )
}
