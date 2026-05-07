'use client'
import { CartProvider } from '@/src/context/CartContext'
import { LeadProvider } from '@/src/context/LeadContext'
import Navbar from '@/src/components/Navbar'
import Home from '@/src/views/Home'

export default function PagePT() {
  return (
    <LeadProvider>
      <CartProvider>
        <div style={{ minHeight: '100vh', background: '#0D1B3E', color: '#fff' }}>
          <Navbar />
          <Home />
        </div>
      </CartProvider>
    </LeadProvider>
  )
}
