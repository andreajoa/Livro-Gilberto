import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Clock } from 'lucide-react';
import { useLead } from '../context/LeadContext';
import bookCoverEN from '../assets/en/book-cover-en.jpeg';
import bookCoverES from '../assets/en/book-cover-es.jpeg';

export default function AbandonedPopupEN({ lang = 'en' }) {
  const { lead, cartAbandoned, clearCartAbandoned } = useLead();
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const triggered = useRef(false);

  const t = {
    en: {
      badge: '⚠️ You left something behind...',
      title: (name) => name ? `${name}, your order is waiting.` : 'Your order is waiting.',
      sub: 'You were this close. The book is still in your cart — but this price won\'t last forever.',
      price: '$17',
      oldPrice: '$34',
      includes: ['📖 Full eBook (PDF)', '🎧 Audiobook (MP3)', '✅ Instant Download', '💰 30-Day Guarantee'],
      cta: 'Complete My Order Now →',
      urgency: 'This offer expires in:',
      dismiss: 'No thanks, I don\'t need this book.',
    },
    es: {
      badge: '⚠️ Dejaste algo atrás...',
      title: (name) => name ? `${name}, tu pedido te espera.` : 'Tu pedido te espera.',
      sub: 'Estabas muy cerca. El libro sigue en tu carrito — pero este precio no durará para siempre.',
      price: '$17',
      oldPrice: '$34',
      includes: ['📖 eBook Completo (PDF)', '🎧 Audiolibro (MP3)', '✅ Descarga Instantánea', '💰 Garantía 30 Días'],
      cta: 'Completar Mi Pedido Ahora →',
      urgency: 'Esta oferta expira en:',
      dismiss: 'No gracias, no necesito este libro.',
    }
  }[lang];

  const cover = lang === 'es' ? bookCoverES : bookCoverEN;

  useEffect(() => {
    if (!cartAbandoned || !lead.captured || triggered.current) return;
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !triggered.current) {
        triggered.current = true;
        setTimeout(() => setShow(true), 500);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [cartAbandoned, lead.captured]);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  };

  const handleComplete = () => {
    clearCartAbandoned();
    setShow(false);
    window.location.href = `/${lang}#buy`;
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 22 }}
            style={{
              background: 'linear-gradient(145deg, #0a1220, #0D1B3E)',
              border: '2px solid rgba(0,196,212,0.5)',
              borderRadius: 16,
              padding: '36px',
              maxWidth: 540,
              width: '100%',
              position: 'relative',
              boxShadow: '0 40px 100px rgba(0,0,0,0.9), 0 0 60px rgba(0,196,212,0.2)'
            }}
          >
            <button onClick={() => setShow(false)} style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.08)', border: 'none',
              borderRadius: 8, width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#8A9BBF'
            }}>
              <X size={16} />
            </button>

            <div style={{
              background: 'rgba(255,68,68,0.15)', border: '1px solid rgba(255,68,68,0.3)',
              borderRadius: 8, padding: '8px 14px', fontSize: 12,
              color: '#ff6b6b', fontWeight: 700, display: 'inline-block', marginBottom: 20
            }}>
              {t.badge}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24, alignItems: 'start', marginBottom: 28 }}>
              <img src={cover} alt="Book" style={{
                width: 140, borderRadius: 8,
                boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
                display: 'block'
              }} />
              <div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22, fontWeight: 900, color: '#fff',
                  marginBottom: 10, lineHeight: 1.2
                }}>
                  {t.title(lead.name)}
                </h2>
                <p style={{ fontSize: 13, color: '#8A9BBF', lineHeight: 1.6, marginBottom: 16 }}>
                  {t.sub}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {t.includes.map((item, i) => (
                    <div key={i} style={{ fontSize: 13, color: '#B8C8E0', display: 'flex', alignItems: 'center', gap: 8 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(0,196,212,0.08)', border: '1px solid rgba(0,196,212,0.2)',
              borderRadius: 8, padding: '12px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8A9BBF' }}>
                <Clock size={14} style={{ color: '#00C4D4' }} />
                {t.urgency}
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, color: '#00C4D4', fontFamily: 'monospace' }}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 42, fontWeight: 900, color: '#00C4D4' }}>{t.price}</span>
              <span style={{ fontSize: 18, color: '#8A9BBF', textDecoration: 'line-through' }}>{t.oldPrice}</span>
              <span style={{
                fontSize: 11, background: 'rgba(0,196,212,0.15)',
                border: '1px solid rgba(0,196,212,0.3)',
                color: '#00C4D4', padding: '3px 8px', borderRadius: 4, fontWeight: 700
              }}>50% OFF</span>
            </div>

            <button onClick={handleComplete} style={{
              width: '100%', padding: '18px',
              background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
              border: 'none', borderRadius: 8,
              color: '#0D1B3E', fontSize: 16, fontWeight: 800,
              cursor: 'pointer', letterSpacing: 0.5,
              boxShadow: '0 8px 30px rgba(0,196,212,0.5)',
              marginBottom: 12, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 10
            }}>
              <ShoppingCart size={18} />
              {t.cta}
            </button>

            <button onClick={() => setShow(false)} style={{
              background: 'none', border: 'none', color: '#4A5A7B',
              fontSize: 12, cursor: 'pointer', display: 'block',
              margin: '0 auto', textDecoration: 'underline'
            }}>
              {t.dismiss}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
