'use client'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { CartProvider } from '@/src/context/CartContext'
import { LeadProvider } from '@/src/context/LeadContext'

import Navbar from '@/src/components/Navbar'
import Footer from '@/src/components/Footer'
const CartDrawer = dynamic(() => import('@/src/components/CartDrawer'), { ssr: false })
const WebsiteBehaviorTracker = dynamic(
  () => import('@/src/components/WebsiteBehaviorTracker'),
  { ssr: false }
)

export default function ClientWrapper({ children }) {
  return (
    <LeadProvider>
      <CartProvider>
        <Suspense fallback={null}>
          <WebsiteBehaviorTracker />
          <Navbar />
          <CartDrawer />
          <div style={{flex:'1', paddingTop:64}}>{children}</div>
          <Footer />
        </Suspense>
      </CartProvider>
    </LeadProvider>
  )
}
