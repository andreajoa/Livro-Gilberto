import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', to: '/', scroll: 'hero' },
    { name: 'O Livro', to: '/o-livro' },
    { name: 'Sobre', to: '/sobre' },
    { name: 'Contato', to: '/contato' },
  ];

  const handleNavClick = (to, scrollTarget) => {
    setIsMobileMenuOpen(false);
    if (isHome && scrollTarget) {
      document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(to);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy/90 navbar-blur shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan rounded-lg flex items-center justify-center">
              <span className="font-display font-bold text-xl text-navy">G·S</span>
            </div>
            <span className="font-display font-bold text-xl hidden sm:block">Gilberto de Souza</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => handleNavClick(link.to, link.scroll)}
                className={`font-body text-sm tracking-wide transition-colors relative ${
                  location.pathname === link.to ? 'text-cyan' : 'text-white hover:text-cyan'
                }`}
              >
                {link.name}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-cyan"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick('/', 'comprar')}
              className="btn-primary text-sm"
            >
              <BookOpen size={16} />
              Comprar Livro
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy/95 navbar-blur"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => handleNavClick(link.to, link.scroll)}
                  className={`block font-body text-sm tracking-wide ${
                    location.pathname === link.to ? 'text-cyan' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => handleNavClick('/', 'comprar')}
                className="w-full btn-primary"
              >
                Comprar Livro
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
