import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
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

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
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
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HelmetProvider>
  );
}

export default App;
