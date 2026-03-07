import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LeadProvider } from './context/LeadContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AIChatbot from './components/AIChatbot';
import Home from './pages/Home';
import HomeEN from './pages/HomeEN';
import HomeES from './pages/HomeES';
import About from './pages/Sobre';
import Book from './pages/OLivro';
import Contact from './pages/Contato';
import Privacy from './pages/Privacidade';
import Terms from './pages/Termos';
import Delivery from './pages/Entrega';
import Return from './pages/Devolucao';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PTLayout({ children }) {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <CartProvider>      <Navbar />
      <div style={{ flex:'1' }}>{children}
      </CartProvider>
    </div>
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    
      </CartProvider>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LeadProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/en" element={<HomeEN />} />
          <Route path="/es" element={<HomeES />} />
          <Route path="/" element={<PTLayout><Home /></PTLayout>} />
          <Route path="/sobre" element={<PTLayout><About /></PTLayout>} />
          <Route path="/o-livro" element={<PTLayout><Book /></PTLayout>} />
          <Route path="/contato" element={<PTLayout><Contact /></PTLayout>} />
          <Route path="/privacidade" element={<PTLayout><Privacy /></PTLayout>} />
          <Route path="/termos" element={<PTLayout><Terms /></PTLayout>} />
          <Route path="/entrega" element={<PTLayout><Delivery /></PTLayout>} />
          <Route path="/devolucao" element={<PTLayout><Return /></PTLayout>} />
        </Routes>
      </LeadProvider>
    </HelmetProvider>
  );
}
