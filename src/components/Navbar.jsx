"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import CartIcon from './CartIcon'

const LANGUAGES = [
  { code: 'pt', label: 'PT', path: '/' },
  { code: 'en', label: 'EN', path: '/en' },
  { code: 'es', label: 'ES', path: '/es' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = usePathname();
  const router = useRouter();
  const isHome = location.pathname === '/';

  const currentLang = location.pathname.startsWith('/en') ? 'en'
    : location.pathname.startsWith('/es') ? 'es'
    : 'pt'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', to: '/', scroll: 'hero' },
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
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan rounded-lg flex items-center justify-center">
              <span className="font-display font-bold text-xl text-navy">G·S</span>
            </div>
            <span className="font-display font-bold text-xl hidden sm:block">Gilberto de Souza</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.to}
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

            <div className="flex items-center gap-1 border border-white/20 rounded-full px-2 py-1">
              {LANGUAGES.map((lang, i) => (
                <span key={lang.code} className="flex items-center">
                  <Link
                    href={lang.path}
                    className={`font-body text-xs font-semibold tracking-widest px-2 py-0.5 rounded-full transition-all ${
                      currentLang === lang.code
                        ? 'bg-cyan text-navy'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </Link>
                  {i < LANGUAGES.length - 1 && (
                    <span className="text-white/20 text-xs">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <CartIcon />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
                  href={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className="block font-body text-sm tracking-wide text-white"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/10">
                <p className="text-white/40 text-xs mb-3 tracking-widest uppercase">Idioma</p>
                <div className="flex items-center gap-2">
                  {LANGUAGES.map((lang) => (
                    <Link
                      key={lang.code}
                      href={lang.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`font-body text-sm font-semibold tracking-widest px-3 py-1.5 rounded-full transition-all ${
                        currentLang === lang.code
                          ? 'bg-cyan text-navy'
                          : 'border border-white/30 text-white/70 hover:text-white'
                      }`}
                    >
                      {lang.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
