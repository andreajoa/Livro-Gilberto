"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { openCart, quantity, inCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname() || '/'

  const isEN = pathname === '/en' || pathname.startsWith('/en/')
  const isES = pathname === '/es' || pathname.startsWith('/es/')
  const lang = isEN ? 'en' : isES ? 'es' : 'pt'
  const isInternational = lang !== 'pt'

  const homeHref = lang === 'pt' ? '/' : `/${lang}`
  const ctaHref = lang === 'pt' ? '/#comprar' : `/checkout-digital?lang=${lang}`

  const labels = {
    pt: {
      home: 'Início',
      book: 'O Livro',
      author: 'Sobre o Autor',
      contact: 'Contato',
      buy: 'Comprar →'
    },
    en: {
      home: 'Home',
      book: 'The Book',
      author: 'Author',
      contact: 'Contact',
      buy: 'Buy →'
    },
    es: {
      home: 'Inicio',
      book: 'El Libro',
      author: 'Autor',
      contact: 'Contacto',
      buy: 'Comprar →'
    }
  }[lang]

  const links = lang === 'pt'
    ? [
        { href: '/', label: labels.home },
        { href: '/o-livro', label: labels.book },
        { href: '/sobre', label: labels.author },
        { href: '/contato', label: labels.contact }
      ]
    : [
        { href: homeHref, label: labels.home },
        { href: `${homeHref}#book`, label: labels.book },
        { href: `${homeHref}#author`, label: labels.author },
        { href: `${homeHref}#contact`, label: labels.contact }
      ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      background: 'rgba(6,12,24,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0,196,212,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 6vw', height: 64
    }}>
      <Link href={homeHref} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: 0.5 }}>
          Gilberto de Souza
        </span>
        <span style={{ fontSize: 10, color: '#00C4D4', letterSpacing: 2, textTransform: 'uppercase' }}>
          {lang === 'en' ? 'Official Book' : lang === 'es' ? 'Libro Oficial' : 'Livro Oficial'}
        </span>
      </Link>

      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="nav-desktop">
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            color: '#B8C8E0', fontSize: 13, fontWeight: 500,
            textDecoration: 'none', letterSpacing: 0.5,
            transition: 'color 0.2s'
          }}
            onMouseEnter={e => e.target.style.color = '#00C4D4'}
            onMouseLeave={e => e.target.style.color = '#B8C8E0'}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {!isInternational && (
          <button onClick={openCart} style={{
            position: 'relative', background: 'rgba(0,196,212,0.1)',
            border: '1px solid rgba(0,196,212,0.3)', borderRadius: 8,
            width: 40, height: 40, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: '#00C4D4'
          }}>
            <ShoppingBag size={18} />
            {inCart && quantity > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                background: '#00C4D4', color: '#0D1B3E',
                fontSize: 10, fontWeight: 900, width: 18, height: 18,
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{quantity}</span>
            )}
          </button>
        )}

        <Link href={ctaHref} style={{
          background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
          color: '#0D1B3E', padding: '9px 20px', borderRadius: 6,
          fontSize: 13, fontWeight: 800, textDecoration: 'none',
          whiteSpace: 'nowrap'
        }}>
          {labels.buy}
        </Link>

        <button onClick={() => setMobileOpen(!mobileOpen)} style={{
          background: 'none', border: 'none', color: '#fff',
          cursor: 'pointer', display: 'none', padding: 4
        }} className="nav-hamburger">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div style={{
          position: 'absolute', top: 64, left: 0, right: 0,
          background: 'rgba(6,12,24,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,196,212,0.15)',
          padding: '20px 6vw', display: 'flex', flexDirection: 'column', gap: 16
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{ color: '#B8C8E0', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
              {l.label}
            </Link>
          ))}

          <Link href={ctaHref}
            onClick={() => setMobileOpen(false)}
            style={{
              background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
              color: '#0D1B3E',
              padding: '13px 18px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 900,
              textDecoration: 'none',
              textAlign: 'center'
            }}>
            {labels.buy}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
