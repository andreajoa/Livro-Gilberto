import { useCart } from '../context/CartContext'
import { ShoppingBag } from 'lucide-react'

export default function CartIcon() {
  const { cartIconRef, setCartOpen } = useCart()
  const hasItem = true // livro sempre disponível

  return (
    <>
      {/* CSS do bounce e badge — adicionar ao index.css */}
      <style>{`
        @keyframes cartBounce {
          0%   { transform: scale(1) rotate(0deg); }
          20%  { transform: scale(1.4) rotate(-10deg); }
          40%  { transform: scale(0.9) rotate(8deg); }
          60%  { transform: scale(0.9) rotate(-5deg); }
          80%  { transform: scale(1.2) rotate(-3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .cart-bounce { animation: cartBounce 0.6s ease forwards; }
      `}</style>

      <button
        ref={cartIconRef}
        onClick={() => setCartOpen(true)}
        style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
        aria-label="Abrir carrinho"
      >
        <ShoppingBag size={26} />
        {hasItem && (
          <span style={{
            position: 'absolute',
            top: -6, right: -6,
            background: '#00C4D4',
            color: '#0D1B3E',
            borderRadius: '50%',
            width: 18, height: 18,
            fontSize: 11,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            1
          </span>
        )}
      </button>
    </>
  )
}
