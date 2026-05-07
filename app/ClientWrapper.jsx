'use client'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { CartProvider } from '@/src/context/CartContext'
import { LeadProvider } from '@/src/context/LeadContext'

const Navbar = dynamic(() => import('@/src/components/Navbar'), { ssr: false })
const Footer = dynamic(() => import('@/src/components/Footer'), { ssr: false })
const CartDrawer = dynamic(() => import('@/src/components/CartDrawer'), { ssr: false })

export default function ClientWrapper({ children }) {
  return (
    <LeadProvider>
      <CartProvider>
        <Suspense fallback={null}>
          <Navbar />
          <CartDrawer />
          <div style={{flex:'1', paddingTop:64}}>{children}</div>
          <Footer />
        </Suspense>
      </CartProvider>
    </LeadProvider>
  )
}
