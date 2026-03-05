import { Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider, useCart } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import FlyingBook from './components/FlyingBook'
import CartIcon from './components/CartIcon'
import PopupLeadCapture from './components/PopupLeadCapture'
import AIChatbot from './components/AIChatbot'
import AbandonedCartPopup from './components/AbandonedCartPopup'
import Home from './pages/Home'
import About from './pages/Sobre'
import Book from './pages/OLivro'
import Contact from './pages/Contato'
import Privacy from './pages/Privacidade'
import Terms from './pages/Termos'
import Delivery from './pages/Entrega'
import Return from './pages/Devolucao'

// Wrapper component to use openCart inside CartProvider
function AbandonedCartPopupWrapper() {
  const { openCart } = useCart()
  return <AbandonedCartPopup onOpenCart={openCart} />
}

const pageVariants = {
  initial: {
    opacity: 0,
    rotateY: -8,
    x: -40,
    transformOrigin: 'left center'
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    transformOrigin: 'left center',
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    rotateY: 8,
    x: 40,
    transformOrigin: 'right center',
    transition: {
      duration: 0.45,
      ease: [0.55, 0.32, 0.45, 0.94]
    }
  }
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <div style={{ perspective: '1200px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/o-livro" element={<Book />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="/entrega" element={<Delivery />} />
            <Route path="/devolucao" element={<Return />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <CartDrawer />
          <FlyingBook />
          <AnimatedRoutes />
          <Footer />
          <CartIcon />
          <PopupLeadCapture />
          <AIChatbot />
          <AbandonedCartPopupWrapper />
        </div>
      </CartProvider>
    </HelmetProvider>
  );
}
