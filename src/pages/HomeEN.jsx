import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, Star, ChevronDown, ArrowRight, Menu, X as XIcon } from 'lucide-react';
import { useLead } from '../context/LeadContext';
import useIsMobile from '../hooks/useIsMobile';
import LeadPopupEN from '../components/LeadPopupEN';
import AbandonedPopupEN from '../components/AbandonedPopupEN';
import AIChatbotEN from '../components/AIChatbotEN';

import heroBg from '../assets/en/hero-bg.jpeg';
import heroLoop from '../assets/en/hero-loop.gif';
import authorImg from '../assets/en/author.png';
import manStrong from '../assets/en/man-strong.png';
import ebookBg from '../assets/en/ebook-bg.jpeg';
import guarantee from '../assets/en/guarantee.png';
import menGroup from '../assets/en/men-group.gif';
import argument from '../assets/en/argument.gif';
import bookCoverEN from '../assets/book/capa-livro.png';

const faq = [
  { q: 'What format is the book in?', a: 'You get an instant download: a PDF eBook you can read on any device, plus an MP3 audiobook you can listen to anywhere — in the car, at the gym, or late at night when your mind won\'t stop.' },
  { q: 'How do I receive my purchase?', a: 'Immediately after payment, you\'ll receive an email with your download links. No waiting, no shipping — it\'s yours in under 60 seconds.' },
  { q: 'Is this book only for men who were cheated on?', a: 'No. This book is for any man who gave everything to a relationship and was left feeling like it wasn\'t enough — whether through betrayal, breakup, or being replaced.' },
  { q: 'What if it doesn\'t help me?', a: 'You\'re covered by a 30-day money-back guarantee. No questions asked. If you don\'t feel this book moved the needle for you, email us and we\'ll refund you in full.' },
  { q: 'Is the audiobook the full book or just a summary?', a: 'It\'s the complete book, word for word, read in a calm and direct voice designed for men going through exactly what you\'re going through.' },
];

const testimonials = [
  { name: 'Marcus T.', city: 'Atlanta, GA', stars: 5, text: 'I found this book at 2am when I couldn\'t sleep. Three hours later I\'d read half of it and cried for the first time in years. This hit differently.' },
  { name: 'James R.', city: 'Toronto, ON', stars: 5, text: 'I thought I was the only one who felt this way. The chapter on "the mental loop" described my exact experience. I\'ve already recommended this to 4 friends.' },
  { name: 'Daniel M.', city: 'London, UK', stars: 5, text: 'The audiobook got me through three weeks of daily commutes. By the end I felt like a different man. Worth every penny and more.' },
];

export default function HomeEN() {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { markCartAbandoned } = useLead();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleBuy = () => {
    markCartAbandoned();
    window.open('https://buy.stripe.com/PLACEHOLDER_EN', '_blank');
  };

  const px = isMobile ? '20px' : '6vw';
  const sectionPad = isMobile ? '64px 20px' : '100px 6vw';

  return (
    <div style={{ background: '#060C18', fontFamily: "'Inter', 'Helvetica Neue', sans-serif", overflowX: 'hidden' }}>

      {/* ══ STICKY NAVBAR ══ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? 'rgba(6,12,24,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,196,212,0.15)' : 'none',
        transition: 'all 0.3s',
        padding: isMobile ? '12px 20px' : '14px 6vw',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: '#00C4D4', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontWeight: 900, fontSize: 12, color: '#0D1B3E' }}>G·S</span>
          </div>
          {!isMobile && <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Gilberto de Souza</span>}
        </div>

        {isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={handleBuy} style={{
              background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
              border: 'none', borderRadius: 6, padding: '8px 16px',
              color: '#0D1B3E', fontSize: 12, fontWeight: 700, cursor: 'pointer'
            }}>
              Get The Book
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 6,
              width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff'
            }}>
              {menuOpen ? <XIcon size={18} /> : <Menu size={18} />}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate('/es')} style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 6, padding: '6px 14px', color: '#8A9BBF', fontSize: 12,
              cursor: 'pointer'
            }}>
              🇪🇸 Español
            </button>
            <button onClick={handleBuy} style={{
              background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
              border: 'none', borderRadius: 6, padding: '8px 20px',
              color: '#0D1B3E', fontSize: 13, fontWeight: 700, cursor: 'pointer'
            }}>
              Get The Book
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: 58, left: 0, right: 0, zIndex: 499,
              background: 'rgba(6,12,24,0.98)', backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(0,196,212,0.2)',
              padding: '20px', display: 'flex', flexDirection: 'column', gap: 12
            }}
          >
            <button onClick={() => { navigate('/es'); setMenuOpen(false); }} style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '14px', color: '#fff', fontSize: 15,
              cursor: 'pointer', textAlign: 'left'
            }}>🇪🇸 Ver en Español</button>
            <button onClick={() => { handleBuy(); setMenuOpen(false); }} style={{
              background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
              border: 'none', borderRadius: 8, padding: '16px',
              color: '#0D1B3E', fontSize: 15, fontWeight: 800, cursor: 'pointer'
            }}>Get Instant Access — $17</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO ══ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {/* Static image on mobile (saves bandwidth), GIF on desktop */}
        {isMobile
          ? <img src={heroBg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          : <img src={heroLoop} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        }
        <div style={{ position: 'absolute', inset: 0, background: isMobile
          ? 'linear-gradient(180deg, rgba(6,12,24,0.75) 0%, rgba(6,12,24,0.96) 60%, rgba(6,12,24,1) 100%)'
          : 'linear-gradient(105deg, rgba(6,12,24,0.97) 0%, rgba(6,12,24,0.9) 45%, rgba(6,12,24,0.3) 100%)'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,12,24,1) 0%, transparent 35%)' }} />

        <div style={{ position: 'relative', zIndex: 3, padding: `0 ${px}`, width: '100%', boxSizing: 'border-box', marginTop: isMobile ? 60 : 0 }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            style={{ maxWidth: isMobile ? '100%' : 680 }}>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,196,212,0.12)', border: '1px solid rgba(0,196,212,0.25)',
              borderRadius: 20, padding: '5px 14px', marginBottom: 20
            }}>
              <span style={{ width: 6, height: 6, background: '#00C4D4', borderRadius: 50, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: isMobile ? 10 : 12, color: '#00C4D4', fontWeight: 600, letterSpacing: 0.5 }}>NEW RELEASE 2026 — eBook + Audiobook</span>
            </div>

            <h1 style={{
              fontSize: isMobile ? '42px' : 'clamp(36px,5.5vw,76px)',
              fontWeight: 900, color: '#fff', lineHeight: 1.05,
              marginBottom: 20, letterSpacing: -1.5
            }}>
              You Gave Her<br />
              <span style={{ color: '#00C4D4' }}>Everything.</span><br />
              She Chose<br />Someone Else.
            </h1>

            <p style={{ fontSize: isMobile ? 15 : 'clamp(16px,1.8vw,20px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 28, maxWidth: isMobile ? '100%' : 520 }}>
              This book was written by a man who lived through exactly that — and came out the other side. It will show you how to stop surviving and start <strong style={{ color: '#fff' }}>living again.</strong>
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#FFB800" color="#FFB800" />)}
              </div>
              <span style={{ fontSize: 12, color: '#8A9BBF' }}>Trusted by men across US, Canada, UK & Australia</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleBuy}
              style={{
                background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
                border: 'none', borderRadius: 8,
                padding: isMobile ? '16px 28px' : '18px 36px',
                fontSize: isMobile ? 16 : 17, fontWeight: 800,
                color: '#0D1B3E', cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(0,196,212,0.4)',
                display: 'flex', alignItems: 'center', gap: 10,
                width: isMobile ? '100%' : 'auto',
                justifyContent: 'center'
              }}
            >
              Get Instant Access — $17
              <ArrowRight size={18} />
            </motion.button>

            <p style={{ fontSize: 11, color: '#8A9BBF', marginTop: 12 }}>
              ~~$34~~ Today only · 📖 eBook + 🎧 Audiobook · 30-day guarantee
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ EPIPHANY BRIDGE ══ */}
      <section style={{ background: '#060C18', padding: sectionPad }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: 4, color: '#00C4D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>A letter from Gilberto</p>
          <h2 style={{ fontSize: isMobile ? '26px' : 'clamp(28px,3.5vw,46px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 32 }}>
            "I gave her 7 years.<br />
            <span style={{ color: '#00C4D4' }}>She chose someone else."</span>
          </h2>
          {[
            "I remember the exact moment I found out. I was standing in my kitchen, phone in hand, reading words that felt like they were written about someone else's life. But they weren't.",
            "I had done everything right. I built a business from scratch in a country that wasn't mine. I worked hard. I loved deeply. And none of it mattered, because she still walked out the door — and into someone else's arms.",
            "The worst part wasn't the betrayal itself. It was the silence after. The empty apartment. The 3am thoughts that wouldn't stop. The question that played on repeat: What's wrong with me?",
            "I spent months looking for answers. I bought books. I watched videos. I talked to friends. Most of it was useless — written by people who'd never actually been through this kind of specific, gut-wrenching pain.",
            "So I wrote the book I wish someone had given me.",
            "Not a book full of platitudes or 'move on' advice. A real manual for the man who gave everything and is now sitting in the rubble of what he thought was his life — trying to figure out how to stand back up.",
            "If that's you, this book was written for you.",
          ].map((p, i) => (
            <p key={i} style={{ fontSize: isMobile ? 15 : 17, color: i === 6 ? '#fff' : 'rgba(255,255,255,0.7)', lineHeight: 1.9, marginBottom: 20 }}>
              {p}
            </p>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 36, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
            <img src={authorImg} alt="Gilberto de Souza" style={{ width: 56, height: 56, borderRadius: 50, objectFit: 'cover', border: '2px solid rgba(0,196,212,0.4)', flexShrink: 0 }} />
            <div>
              <p style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: 15 }}>Gilberto de Souza</p>
              <p style={{ color: '#8A9BBF', margin: 0, fontSize: 13 }}>Author · Entrepreneur · Survivor</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ PAIN AMPLIFICATION ══ */}
      <section style={{ background: '#0A1628', padding: sectionPad }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '24px' : 'clamp(26px,3vw,42px)', fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: 12 }}>
            If you've been here, <span style={{ color: '#00C4D4' }}>you know.</span>
          </h2>
          <p style={{ fontSize: 15, color: '#8A9BBF', textAlign: 'center', marginBottom: 40, lineHeight: 1.7 }}>
            No one tells you that being replaced feels like this.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))', gap: isMobile ? 2 : 3 }}>
            {[
              { icon: '💔', title: 'The paralysis', text: 'Some mornings you can\'t get out of bed. Not because you\'re lazy — because the weight is real.' },
              { icon: '🔄', title: 'The mental loop', text: 'You replay the relationship in your head looking for the moment you lost her. You never find it.' },
              { icon: '😶', title: 'The silence', text: 'You can\'t explain to friends how deep this goes. They say "you\'ll be fine." You know it\'s not that simple.' },
              { icon: '❓', title: 'The comparison', text: '"What does he have that I don\'t?" This question eats men alive — and nobody talks about it.' },
              { icon: '😰', title: 'The fear', text: 'Will you ever trust someone again? Will you ever feel whole? The doubt is exhausting.' },
              { icon: '🪞', title: 'The identity crisis', text: 'You built your life around her. Now that she\'s gone — who are you? That question is terrifying.' },
            ].map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                style={{
                  background: 'rgba(13,27,62,0.6)',
                  border: '1px solid rgba(0,196,212,0.08)',
                  padding: '24px 20px'
                }}>
                <span style={{ fontSize: 26, display: 'block', marginBottom: 12 }}>{c.icon}</span>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: '#8A9BBF', lineHeight: 1.7, margin: 0 }}>{c.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ VIDEO SECTION — Argument ══ */}
      <section style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 280 : 'min(480px,55vh)' }}>
        <img src={argument} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,12,24,0.72)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: `0 ${px}` }}>
          <h2 style={{ fontSize: isMobile ? '22px' : 'clamp(28px,4vw,56px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, maxWidth: 600 }}>
            There is a moment<br />when everything <span style={{ color: '#00C4D4' }}>changes.</span>
          </h2>
          <p style={{ fontSize: isMobile ? 13 : 16, color: 'rgba(255,255,255,0.6)', marginTop: 14, maxWidth: 460, lineHeight: 1.7 }}>
            This book starts exactly there — and walks you out the other side.
          </p>
        </motion.div>
      </section>

      {/* ══ WHAT'S INSIDE ══ */}
      <section style={{ background: '#060C18', padding: sectionPad }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px,1fr))', gap: isMobile ? 36 : 72, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'center', order: isMobile ? -1 : 0 }}>
            <img src={bookCoverEN} alt="How to Overcome the Pain of Being Replaced"
              style={{ width: isMobile ? 180 : 'min(300px,100%)', borderRadius: 8, boxShadow: '0 40px 80px rgba(0,0,0,0.8)', display: 'block' }} />
          </div>

          <div>
            <p style={{ fontSize: 10, letterSpacing: 4, color: '#00C4D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>What's inside</p>
            <h2 style={{ fontSize: isMobile ? '24px' : 'clamp(28px,3.5vw,46px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 10 }}>
              How to Overcome<br />the Pain of Being<br /><span style={{ color: '#00C4D4' }}>Replaced by Someone Else</span>
            </h2>
            <p style={{ fontSize: 13, color: '#8A9BBF', marginBottom: 24 }}>by <strong style={{ color: '#fff' }}>Gilberto de Souza</strong></p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {[
                'Why being replaced hits men differently — and what to do about it',
                'The 5-step framework for breaking the mental loop for good',
                'How to rebuild your identity after a long relationship ends',
                'The truth about "no contact" — what works and what backfires',
                'How to trust again without becoming emotionally closed off',
                'The mindset shift that separates men who recover from men who don\'t',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <CheckCircle size={15} style={{ color: '#00C4D4', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: '#B8C8E0', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>

            <motion.button whileTap={{ scale: 0.98 }} onClick={handleBuy}
              style={{
                background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
                border: 'none', borderRadius: 8,
                padding: isMobile ? '16px' : '16px 32px',
                fontSize: 15, fontWeight: 800, color: '#0D1B3E',
                cursor: 'pointer', boxShadow: '0 8px 30px rgba(0,196,212,0.4)',
                display: 'flex', alignItems: 'center', gap: 10,
                width: isMobile ? '100%' : 'auto', justifyContent: 'center'
              }}>
              Get Instant Access — $17 <ArrowRight size={16} />
            </motion.button>
            <p style={{ fontSize: 11, color: '#8A9BBF', marginTop: 8 }}>~~$34~~ · Instant download · 30-day guarantee</p>
          </div>
        </motion.div>
      </section>

      {/* ══ SOCIAL PROOF ══ */}
      <section style={{ background: '#0A1628', padding: sectionPad }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '22px' : 'clamp(24px,3vw,40px)', fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: 8 }}>
            Real men. Real results.
          </h2>
          <p style={{ fontSize: 14, color: '#8A9BBF', textAlign: 'center', marginBottom: 40 }}>They were exactly where you are now.</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px,1fr))', gap: 16 }}>
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                style={{
                  background: 'rgba(13,27,62,0.7)', border: '1px solid rgba(0,196,212,0.12)',
                  borderRadius: 12, padding: '24px 20px'
                }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#FFB800" color="#FFB800" />)}
                </div>
                <p style={{ fontSize: 14, color: '#B8C8E0', lineHeight: 1.8, marginBottom: 18, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 50, background: 'rgba(0,196,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, margin: 0 }}>{t.name}</p>
                    <p style={{ color: '#8A9BBF', fontSize: 12, margin: 0 }}>{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ MEN GROUP BANNER ══ */}
      <section style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 260 : 'min(420px,50vh)' }}>
        <img src={menGroup} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,12,24,0.78)' }} />
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}
          style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: `0 ${px}` }}>
          <h2 style={{ fontSize: isMobile ? '20px' : 'clamp(26px,4vw,52px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>
            You Are Not Alone.<br /><span style={{ color: '#00C4D4' }}>Thousands of men have been here.</span>
          </h2>
          <p style={{ fontSize: isMobile ? 13 : 16, color: 'rgba(255,255,255,0.65)', maxWidth: 520, lineHeight: 1.7 }}>
            The difference between the ones who recover and the ones who don't is simple: they found the right guide at the right time.
          </p>
        </motion.div>
      </section>

      {/* ══ ABOUT AUTHOR ══ */}
      <section style={{ background: '#0D1B3E', padding: sectionPad }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px,1fr))', gap: isMobile ? 36 : 72, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
          {!isMobile && (
            <div style={{ position: 'relative' }}>
              <img src={authorImg} alt="Gilberto de Souza" style={{ width: '100%', maxWidth: 420, borderRadius: 8, display: 'block', filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.7))' }} />
            </div>
          )}
          <div>
            {isMobile && (
              <img src={authorImg} alt="Gilberto de Souza" style={{ width: 80, height: 80, borderRadius: 50, objectFit: 'cover', border: '2px solid rgba(0,196,212,0.4)', marginBottom: 20 }} />
            )}
            <p style={{ fontSize: 10, letterSpacing: 4, color: '#00C4D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>About The Author</p>
            <h2 style={{ fontSize: isMobile ? '32px' : 'clamp(32px,4vw,52px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 24 }}>
              Gilberto<br /><span style={{ color: '#00C4D4' }}>de Souza</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                { emoji: '🇧🇷', text: 'Born in Brazil. Living in the United States for 23 years.' },
                { emoji: '💼', text: 'Entrepreneur — founded his own construction company from zero.' },
                { emoji: '💔', text: 'Went through betrayal at the height of his success.' },
                { emoji: '📖', text: 'Chose to rebuild — and wrote the book he wished existed.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{item.emoji}</span>
                  <p style={{ fontSize: 13, color: '#B8C8E0', margin: 0, lineHeight: 1.7 }}>{item.text}</p>
                </div>
              ))}
            </div>
            <blockquote style={{
              borderLeft: '3px solid #00C4D4', paddingLeft: 16,
              fontStyle: 'italic', fontSize: isMobile ? 16 : 18, color: '#fff',
              lineHeight: 1.6, margin: 0
            }}>
              "I wrote this book because I wanted someone to have written it for me when I needed it most."
            </blockquote>
          </div>
        </motion.div>
      </section>

      {/* ══ BUY SECTION ══ */}
      <section id="buy" style={{ background: 'linear-gradient(180deg, #060C18 0%, #0D1B3E 100%)', padding: sectionPad }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 10, letterSpacing: 4, color: '#00C4D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>You're Ready</p>
          <h2 style={{ fontSize: isMobile ? '28px' : 'clamp(30px,4vw,52px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 12 }}>
            Get The Book.<br /><span style={{ color: '#00C4D4' }}>Start Today.</span>
          </h2>
          <p style={{ fontSize: 14, color: '#8A9BBF', lineHeight: 1.7, marginBottom: 36 }}>
            You've already survived the hardest part. Now let this book show you what comes next.
          </p>

          <div style={{
            background: 'rgba(13,27,62,0.8)', border: '1px solid rgba(0,196,212,0.25)',
            borderRadius: 16, padding: isMobile ? '28px 20px' : '40px 36px', textAlign: 'left'
          }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-start' }}>
              <img src={bookCoverEN} alt="Book" style={{ width: isMobile ? 80 : 100, borderRadius: 6, boxShadow: '0 12px 40px rgba(0,0,0,0.6)', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: isMobile ? 15 : 17, fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.3 }}>
                  How to Overcome the Pain of Being Replaced by Someone Else
                </h3>
                <p style={{ fontSize: 12, color: '#8A9BBF', marginBottom: 10 }}>by Gilberto de Souza</p>
                {['📖 Full eBook (PDF)', '🎧 Full Audiobook (MP3)', '✅ Instant download'].map(item => (
                  <div key={item} style={{ fontSize: 12, color: '#B8C8E0', marginBottom: 4 }}>{item}</div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 24 }}>
              <span style={{ fontSize: isMobile ? 42 : 52, fontWeight: 900, color: '#00C4D4', lineHeight: 1 }}>$17</span>
              <span style={{ fontSize: 18, color: '#8A9BBF', textDecoration: 'line-through' }}>$34</span>
              <span style={{ fontSize: 11, background: 'rgba(0,196,212,0.15)', border: '1px solid rgba(0,196,212,0.3)', color: '#00C4D4', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>50% OFF</span>
            </div>

            <motion.button whileTap={{ scale: 0.98 }} onClick={handleBuy}
              style={{
                width: '100%', padding: isMobile ? '18px' : '20px',
                background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
                border: 'none', borderRadius: 8,
                color: '#0D1B3E', fontSize: isMobile ? 16 : 18, fontWeight: 900,
                cursor: 'pointer', boxShadow: '0 8px 30px rgba(0,196,212,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                marginBottom: 14
              }}>
              Get Instant Access — $17
              <ArrowRight size={18} />
            </motion.button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, marginBottom: 14 }}>
              <Shield size={14} style={{ color: '#00C4D4', flexShrink: 0 }} />
              <p style={{ fontSize: 11, color: '#8A9BBF', margin: 0 }}>Secure payment via Stripe · Visa · Mastercard · Amex · Apple Pay</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 12 : 20, flexWrap: 'wrap' }}>
              {['🔒 SSL Secure', '💰 30-Day Guarantee', '⚡ Instant Access'].map(b => (
                <span key={b} style={{ fontSize: 11, color: '#8A9BBF' }}>{b}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ GUARANTEE ══ */}
      <section style={{ background: '#0A1628', padding: sectionPad }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
          <img src={guarantee} alt="30-Day Money Back Guarantee" style={{ width: 100, marginBottom: 24, display: 'block', margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: isMobile ? '22px' : 'clamp(24px,3vw,36px)', fontWeight: 900, color: '#fff', marginBottom: 14 }}>
            30-Day Money-Back Guarantee
          </h2>
          <p style={{ fontSize: 14, color: '#8A9BBF', lineHeight: 1.8 }}>
            Read the book. Listen to the audiobook. If within 30 days you don't feel it gave you something real — email us and we will refund every cent. No questions, no hassle.
          </p>
        </motion.div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: '#060C18', padding: sectionPad }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
          style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '22px' : 'clamp(26px,3vw,40px)', fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: 8 }}>
            Frequently Asked<br /><span style={{ color: '#00C4D4' }}>Questions</span>
          </h2>
          <div style={{ width: 40, height: 2, background: '#00C4D4', margin: '14px auto 36px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {faq.map((item, i) => (
              <div key={i} style={{ background: 'rgba(13,27,62,0.5)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: '#fff', fontSize: isMobile ? 14 : 15, fontWeight: 600, cursor: 'pointer', textAlign: 'left', gap: 12 }}>
                  {item.q}
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} style={{ color: '#00C4D4', flexShrink: 0 }}>
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '0 18px 16px', fontSize: 13, color: '#8A9BBF', lineHeight: 1.8 }}>{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ FINAL CTA BANNER ══ */}
      <section style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 300 : 'min(440px,55vh)' }}>
        <img src={manStrong} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,12,24,0.72)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: `0 ${px}` }}>
          <h2 style={{ fontSize: isMobile ? '24px' : 'clamp(28px,4.5vw,60px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 24, maxWidth: 600 }}>
            You Survived the Pain.<br /><span style={{ color: '#00C4D4' }}>Now It's Time to Live.</span>
          </h2>
          <motion.button whileTap={{ scale: 0.96 }} onClick={handleBuy}
            style={{
              background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
              border: 'none', borderRadius: 8,
              padding: isMobile ? '16px 32px' : '18px 44px',
              fontSize: isMobile ? 15 : 17, fontWeight: 800, color: '#0D1B3E',
              cursor: 'pointer', boxShadow: '0 8px 40px rgba(0,196,212,0.5)',
              display: 'flex', alignItems: 'center', gap: 10
            }}>
            Get Instant Access — $17 <ArrowRight size={16} />
          </motion.button>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 14 }}>30-day money-back guarantee · Instant download</p>
        </motion.div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: '#030810', borderTop: '1px solid rgba(255,255,255,0.06)', padding: isMobile ? '40px 20px' : '48px 6vw' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 20, marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, background: '#00C4D4', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 900, fontSize: 12, color: '#0D1B3E' }}>G·S</span>
              </div>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 13, margin: 0 }}>Gilberto de Souza</p>
                <p style={{ color: '#8A9BBF', fontSize: 11, margin: 0, fontStyle: 'italic' }}>You are not alone</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: isMobile ? 16 : 24, flexWrap: 'wrap' }}>
              {[['Privacy Policy','/en/privacy'],['Terms','/en/terms'],['Contact','/en/contact'],['🇧🇷 PT','/' ],['🇪🇸 ES','/es']].map(([label, href]) => (
                <a key={label} href={href} style={{ color: '#8A9BBF', textDecoration: 'none', fontSize: 12 }}>{label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 8 }}>
            <p style={{ fontSize: 11, color: '#4A5A7B', margin: 0 }}>© 2026 Gilberto de Souza. All rights reserved.</p>
            <p style={{ fontSize: 11, color: '#4A5A7B', margin: 0 }}>⚡ Digital product — instant download worldwide</p>
          </div>
        </div>
      </footer>

      {/* ══ STICKY BOTTOM CTA (mobile only) ══ */}
      {isMobile && (
        <motion.div
          initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 2, type: 'spring' }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 490,
            background: 'rgba(6,12,24,0.97)', backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(0,196,212,0.2)',
            padding: '12px 20px', display: 'flex', gap: 12, alignItems: 'center'
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ color: '#fff', fontSize: 13, fontWeight: 700, margin: 0 }}>eBook + Audiobook</p>
            <p style={{ color: '#00C4D4', fontSize: 12, margin: 0 }}><s style={{ color: '#8A9BBF' }}>$34</s> $17 today</p>
          </div>
          <button onClick={handleBuy} style={{
            background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
            border: 'none', borderRadius: 8, padding: '13px 22px',
            color: '#0D1B3E', fontSize: 14, fontWeight: 800, cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}>
            Get Now →
          </button>
        </motion.div>
      )}

      <LeadPopupEN lang="en" />
      <AbandonedPopupEN lang="en" />
      <AIChatbotEN lang="en" />
    </div>
  );
}
