import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
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

export default function App() {
  return (
    <HelmetProvider>
      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        <Navbar />
        <ScrollToTop />
        <div style={{ flex:'1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/o-livro" element={<Book />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="/entrega" element={<Delivery />} />
            <Route path="/devolucao" element={<Return />} />
          </Routes>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </HelmetProvider>
  );
}
