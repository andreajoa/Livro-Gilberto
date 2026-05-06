"use client"
import Home from '@/src/pages/Home'
import Navbar from '@/src/components/Navbar'
import Footer from '@/src/components/Footer'
import AIChatbot from '@/src/components/AIChatbot'
import CartDrawer from '@/src/components/CartDrawer'

export default function PagePT() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: '1' }}><Home /></div>
      <Footer />
      <AIChatbot />
      <CartDrawer />
    </div>
  )
}
