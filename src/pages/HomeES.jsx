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
import heroVideo from '../assets/en/hero-video.mp4';
import authorImg from '../assets/en/author.png';
import manStrong from '../assets/en/man-strong.png';
import ebookBg from '../assets/en/ebook-bg.jpeg';
import guarantee from '../assets/en/guarantee.png';
import helpingGroupVideo from '../assets/en/ajudando.mp4';
import argument from '../assets/en/argument.gif';
import emboraVideo from '../assets/en/embora.mp4';
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

export default function HomeES() {
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

  const SectionBlend = ({ flip = false }) => (
    <div
      style={{
        position: 'relative',
        height: isMobile ? 42 : 72,
        marginTop: isMobile ? -18 : -28,
        marginBottom: isMobile ? -18 : -28,
        zIndex: 3,
        pointerEvents: 'none',
        background: flip
          ? 'linear-gradient(180deg, rgba(6,12,24,0) 0%, rgba(8,18,37,0.72) 42%, rgba(10,22,40,1) 100%)'
          : 'linear-gradient(180deg, rgba(10,22,40,1) 0%, rgba(8,18,37,0.72) 58%, rgba(6,12,24,0) 100%)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: flip
            ? 'radial-gradient(circle at 50% 0%, rgba(0,196,212,0.10) 0%, rgba(0,196,212,0.03) 28%, transparent 60%)'
            : 'radial-gradient(circle at 50% 100%, rgba(0,196,212,0.10) 0%, rgba(0,196,212,0.03) 28%, transparent 60%)'
        }}
      />
    </div>
  );

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
              Obtén el libro
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
            <button onClick={() => navigate('/en')} style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 6, padding: '6px 14px', color: '#8A9BBF', fontSize: 12,
              cursor: 'pointer'
            }}>
              🇺🇸 English
            </button>
            <button onClick={handleBuy} style={{
              background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
              border: 'none', borderRadius: 6, padding: '8px 20px',
              color: '#0D1B3E', fontSize: 13, fontWeight: 700, cursor: 'pointer'
            }}>
              Obtén el libro
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
            }}>🇺🇸 Ver en inglés</button>
            <button onClick={() => { handleBuy(); setMenuOpen(false); }} style={{
              background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
              border: 'none', borderRadius: 8, padding: '16px',
              color: '#0D1B3E', fontSize: 15, fontWeight: 800, cursor: 'pointer'
            }}>Obtén acceso inmediato — $17</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO ══ */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #07111f 0%, #0b1830 100%)'
      }}>
        {isMobile ? (
          <img
            src={heroBg}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroBg}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}

        <div style={{
          position: 'absolute',
          inset: 0,
          background: isMobile
            ? 'linear-gradient(180deg, rgba(7,17,31,0.60) 0%, rgba(7,17,31,0.86) 38%, rgba(7,17,31,0.96) 72%, rgba(7,17,31,1) 100%)'
            : 'linear-gradient(90deg, rgba(7,17,31,0.92) 0%, rgba(7,17,31,0.76) 42%, rgba(7,17,31,0.35) 72%, rgba(7,17,31,0.18) 100%)'
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 20%, rgba(255,184,0,0.18) 0%, rgba(255,184,0,0.06) 22%, transparent 42%), radial-gradient(circle at 85% 18%, rgba(0,196,212,0.16) 0%, rgba(0,196,212,0.04) 22%, transparent 42%)'
        }} />

        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: isMobile ? 180 : 220,
          background: 'linear-gradient(to top, #07111f 0%, rgba(7,17,31,0.92) 35%, transparent 100%)'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          padding: isMobile ? '110px 20px 70px' : '120px 6vw 90px',
          boxSizing: 'border-box'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            style={{ maxWidth: isMobile ? '100%' : 760 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,184,0,0.14)',
              border: '1px solid rgba(255,184,0,0.30)',
              borderRadius: 999,
              padding: isMobile ? '6px 12px' : '7px 14px',
              marginBottom: 18,
              boxShadow: '0 8px 24px rgba(255,184,0,0.10)'
            }}>
              <span style={{ width: 8, height: 8, background: '#FFB800', borderRadius: 999, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: isMobile ? 10 : 12, color: '#FFE29A', fontWeight: 800, letterSpacing: 0.8 }}>
                FOR MEN HEALING FROM BETRAYAL, HEARTBREAK & REJECTION
              </span>
            </div>

            <h1 style={{
              fontSize: isMobile ? '40px' : 'clamp(48px, 6vw, 82px)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: isMobile ? 1.02 : 0.98,
              letterSpacing: -2,
              marginBottom: 18,
              maxWidth: 840
            }}>
              Ella se fue.<br />
              <span style={{ color: '#FFB800' }}>You broke.</span><br />
              Now rebuild<br />
              <span style={{ color: '#00C4D4' }}>stronger.</span>
            </h1>

            <p style={{
              fontSize: isMobile ? 16 : 'clamp(18px, 2vw, 22px)',
              color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.65,
              marginBottom: 26,
              maxWidth: 640
            }}>
              A raw, practical book for men who were betrayed, replaced, or left trying to make sense of the pain. Learn how to stop the mental spiral, reclaim your self-respect, and start living with strength again.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 24
            }}>
              {[
                '📖 Full eBook download',
                '🎧 Full audiobook included',
                '⚡ Instant access after purchase',
                '🛡️ 30-day money-back guarantee'
              ].map((item) => (
                <div key={item} style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 999,
                  padding: isMobile ? '8px 12px' : '9px 14px',
                  fontSize: isMobile ? 12 : 13,
                  color: '#EAF4FF',
                  fontWeight: 600
                }}>
                  {item}
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: 14,
              marginBottom: 18
            }}>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleBuy}
                style={{
                  background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
                  border: 'none',
                  borderRadius: 10,
                  padding: isMobile ? '18px 24px' : '20px 34px',
                  fontSize: isMobile ? 17 : 18,
                  fontWeight: 900,
                  color: '#0B1325',
                  cursor: 'pointer',
                  boxShadow: '0 18px 40px rgba(255,138,0,0.30)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                Obtén acceso inmediato — $17
                <ArrowRight size={18} />
              </motion.button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={15} fill="#FFB800" color="#FFB800" />)}
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)' }}>
                  Trusted by readers across the US, Canada, UK & Australia
                </span>
              </div>
            </div>

            <p style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.60)',
              marginBottom: 26
            }}>
              <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>$34</span> today only · Includes eBook + audiobook · Secure checkout
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(160px, 1fr))',
              gap: 12,
              maxWidth: isMobile ? '100%' : 760
            }}>
              {[
                {
                  title: 'Know what this is',
                  text: 'This is not generic breakup advice. It is written for men dealing with betrayal, rejection and being replaced.'
                },
                {
                  title: 'Feel understood fast',
                  text: 'The page should immediately show him: this book understands the exact pain he is carrying right now.'
                },
                {
                  title: 'Move him to action',
                  text: 'Clear promise. Emotional clarity. Strong CTA. That is what makes this style convert.'
                }
              ].map((item) => (
                <div key={item.title} style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 16,
                  padding: isMobile ? '16px' : '18px 18px 16px',
                  backdropFilter: 'blur(8px)'
                }}>
                  <p style={{
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontWeight: 800,
                    margin: '0 0 8px'
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: 13,
                    lineHeight: 1.65,
                    margin: 0
                  }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
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

      {/* ══ RAW IDENTIFICATION ══ */}
      <section style={{
        background: 'linear-gradient(180deg, #081221 0%, #0C1B33 100%)',
        padding: sectionPad,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 20%, rgba(255,184,0,0.10) 0%, transparent 35%), radial-gradient(circle at 80% 10%, rgba(0,196,212,0.10) 0%, transparent 30%)'
        }} />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}
        >
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 42px' }}>
            <p style={{
              fontSize: 11,
              letterSpacing: 4,
              color: '#FFB800',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: 14
            }}>
              If this feels familiar, keep reading
            </p>

            <h2 style={{
              fontSize: isMobile ? '28px' : 'clamp(32px,4vw,56px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.08,
              marginBottom: 16
            }}>
              What being <span style={{ color: '#FFB800' }}>replaced</span><br />
              does to a man.
            </h2>

            <p style={{
              fontSize: isMobile ? 15 : 18,
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.75,
              margin: 0
            }}>
              This is the part most people never understand. It is not just heartbreak. It is humiliation, obsession, identity collapse, comparison, and the exhausting feeling that someone else stepped into the life you thought was yours.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
            gap: 18,
            marginBottom: 34
          }}>
            {[
              'You replay the breakup every night, trying to find the exact moment you lost her.',
              'You compare yourself to the man she chose and wonder what he has that you do not.',
              'You look normal in public, but your mind falls apart when you are alone.',
              'You keep checking her profile even when you know it will ruin your day.',
              'Part of you still wants her back. Another part of you wants your pride back.',
              'You are not just grieving her. You are grieving the version of yourself that existed before this happened.',
              'People tell you to move on, but they have no idea how deep this actually cut.',
              'You do not need empty motivation. You need a way to think clearly again.'
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: isMobile ? '18px 16px' : '20px 20px',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.14)'
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
                  color: '#0B1325',
                  fontSize: 14,
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2
                }}>
                  !
                </div>
                <p style={{
                  fontSize: isMobile ? 14 : 15,
                  color: '#EAF4FF',
                  lineHeight: 1.75,
                  margin: 0
                }}>
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

          <div style={{
            maxWidth: 780,
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(255,184,0,0.12), rgba(0,196,212,0.10))',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 18,
            padding: isMobile ? '22px 18px' : '28px 28px',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: isMobile ? 18 : 22,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.5,
              margin: '0 0 10px'
            }}>
              If you saw yourself in even half of this, this book was written for you.
            </p>
            <p style={{
              fontSize: isMobile ? 14 : 15,
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.7,
              margin: 0
            }}>
              Not for the man who wants theory. For the man who wants to stop spiraling, regain control, and rebuild with dignity.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ══ BREAKING POINT VIDEO BRIDGE ══ */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        height: isMobile ? 360 : 'min(680px,78vh)',
        background: '#081221'
      }}>
        {isMobile ? (
          <img
            src={argument}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          >
            <source src={emboraVideo} type="video/mp4" />
          </video>
        )}

        <div style={{
          position: 'absolute',
          inset: 0,
          background: isMobile
            ? 'linear-gradient(180deg, rgba(8,18,33,0.55) 0%, rgba(8,18,33,0.76) 30%, rgba(8,18,33,0.84) 100%)'
            : 'linear-gradient(90deg, rgba(8,18,33,0.68) 0%, rgba(8,18,33,0.36) 40%, rgba(8,18,33,0.58) 100%)'
        }} />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0,196,212,0.08) 0%, transparent 34%), radial-gradient(circle at 20% 20%, rgba(255,184,0,0.10) 0%, transparent 26%)'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: `0 ${px}`
          }}
        >
          <p style={{
            fontSize: 11,
            letterSpacing: 4,
            color: '#FFB800',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: 16
          }}>
            The breaking point
          </p>

          <h2 style={{
            fontSize: isMobile ? '30px' : 'clamp(42px,5.8vw,82px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.04,
            maxWidth: 900,
            marginBottom: 18,
            letterSpacing: -1.4
          }}>
            She tells you to leave.<br />
            The door closes.<br />
            The spiral <span style={{ color: '#00C4D4' }}>starts.</span>
          </h2>

          <p style={{
            fontSize: isMobile ? 14 : 18,
            color: 'rgba(255,255,255,0.76)',
            maxWidth: 700,
            lineHeight: 1.7,
            margin: 0
          }}>
            This is the moment the pain stops being a story and starts becoming your everyday life.
          </p>
        </motion.div>
      </section>

      {/* ══ WHAT'S INSIDE ══ */}
      <section style={{ background: 'linear-gradient(180deg, #060C18 0%, #081225 100%)', padding: sectionPad }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(320px, 420px) minmax(0, 1fr)',
            gap: isMobile ? 34 : 76,
            alignItems: 'center',
            maxWidth: 1160,
            margin: '0 auto'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            order: isMobile ? -1 : 0
          }}>
            <div style={{
              width: isMobile ? '100%' : 380,
              maxWidth: 380,
              borderRadius: 26,
              padding: isMobile ? '26px 22px' : '34px 28px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(0,196,212,0.14)',
              boxShadow: '0 28px 90px rgba(0,0,0,0.42), 0 0 80px rgba(0,196,212,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={bookCoverEN}
                alt="How to Overcome the Pain of Being Replaced"
                style={{
                  width: isMobile ? 220 : 290,
                  maxWidth: '100%',
                  borderRadius: 10,
                  boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
                  display: 'block'
                }}
              />
            </div>
          </div>

          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,184,0,0.10)',
              border: '1px solid rgba(255,184,0,0.22)',
              color: '#FFB800',
              borderRadius: 999,
              padding: '7px 12px',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              marginBottom: 18
            }}>
              Instant access + audiobook included
            </div>

            <p style={{
              fontSize: 11,
              letterSpacing: 4,
              color: '#00C4D4',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: 14
            }}>
              What's inside
            </p>

            <h2 style={{
              fontSize: isMobile ? '30px' : 'clamp(38px,4.7vw,62px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.04,
              marginBottom: 14,
              letterSpacing: -1.2,
              maxWidth: 760
            }}>
              Detén la espiral.<br />
              Rebuild with a <span style={{ color: '#00C4D4' }}>clear plan.</span>
            </h2>

            <p style={{
              fontSize: isMobile ? 15 : 18,
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.75,
              marginBottom: 14,
              maxWidth: 760
            }}>
              This is not vague advice. It is a practical recovery guide for the man who cannot stop replaying what happened and needs a way forward now.
            </p>

            <p style={{
              fontSize: 13,
              color: '#8A9BBF',
              marginBottom: 26
            }}>
              by <strong style={{ color: '#fff' }}>Gilberto de Souza</strong>
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0,1fr))',
              gap: 12,
              marginBottom: 28
            }}>
              {[
                'Break the mental loop and stop obsessing over her.',
                'Rebuild your identity after the relationship collapses.',
                'Use the 5-step framework to regain emotional control.',
                'Know what actually works with no contact and what backfires.',
                'Start trusting again without becoming cold or shut down.',
                'Get the full eBook + full audiobook instantly after payment.'
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 14,
                  padding: '14px 14px'
                }}>
                  <CheckCircle size={16} style={{ color: '#00C4D4', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: '#D7E4F7', lineHeight: 1.65 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              gap: 14,
              flexDirection: isMobile ? 'column' : 'row',
              marginBottom: 18
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: isMobile ? 44 : 56, fontWeight: 900, color: '#FFB800', lineHeight: 1 }}>$17</span>
                <span style={{ fontSize: 19, color: 'rgba(255,255,255,0.38)', textDecoration: 'line-through' }}>$34</span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#FFB800',
                  background: 'rgba(255,184,0,0.12)',
                  border: '1px solid rgba(255,184,0,0.22)',
                  padding: '4px 8px',
                  borderRadius: 999
                }}>
                  50% OFF TODAY
                </span>
              </div>

              <p style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.58)',
                margin: 0
              }}>
                One-time payment · No subscription
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleBuy}
              style={{
                background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
                border: 'none',
                borderRadius: 12,
                padding: isMobile ? '18px' : '18px 34px',
                fontSize: isMobile ? 16 : 17,
                fontWeight: 900,
                color: '#0D1322',
                cursor: 'pointer',
                boxShadow: '0 16px 40px rgba(255,138,0,0.28)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: isMobile ? '100%' : 'auto',
                justifyContent: 'center',
                marginBottom: 14
              }}
            >
              Obtén acceso inmediato — $17
              <ArrowRight size={17} />
            </motion.button>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: isMobile ? 10 : 16,
              marginBottom: 10
            }}>
              {['⚡ Instant download', '💰 30-day guarantee', '🔒 Secure checkout', '🎧 Full audiobook included'].map(item => (
                <span key={item} style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.68)'
                }}>
                  {item}
                </span>
              ))}
            </div>

            <p style={{
              fontSize: 12,
              color: '#8A9BBF',
              margin: 0
            }}>
              Start reading and listening today — access is delivered immediately after payment.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ══ SOCIAL PROOF ══ */}
      <section style={{ background: 'linear-gradient(180deg, #0A1628 0%, #091422 100%)', padding: sectionPad }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ maxWidth: 1120, margin: '0 auto' }}
        >
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 42px' }}>
            <p style={{
              fontSize: 11,
              letterSpacing: 4,
              color: '#FFB800',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: 14
            }}>
              Social proof
            </p>

            <h2 style={{
              fontSize: isMobile ? '30px' : 'clamp(34px,4.2vw,58px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.06,
              marginBottom: 14,
              letterSpacing: -1.1
            }}>
              Hombres reales. <span style={{ color: '#00C4D4' }}>Resultados reales.</span>
            </h2>

            <p style={{
              fontSize: isMobile ? 14 : 17,
              color: 'rgba(255,255,255,0.70)',
              lineHeight: 1.75,
              marginBottom: 18
            }}>
              These men were stuck in the same mental loop, the same sleepless nights, and the same self-doubt you may be living through right now.
            </p>

            <div style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 999,
              padding: '10px 16px'
            }}>
              {['★★★★★ Rated by readers', '🇺🇸 🇨🇦 🇬🇧 🇦🇺 Trusted internationally', '🎧 Audiobook praised by listeners'].map(item => (
                <span key={item} style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)' }}>{item}</span>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.25fr 0.95fr 0.95fr',
            gap: 18,
            alignItems: 'stretch'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              viewport={{ once: true }}
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                border: '1px solid rgba(0,196,212,0.18)',
                borderRadius: 18,
                padding: isMobile ? '24px 20px' : '30px 28px',
                boxShadow: '0 24px 70px rgba(0,0,0,0.26)'
              }}
            >
              <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={15} fill="#FFB800" color="#FFB800" />)}
              </div>

              <p style={{
                fontSize: isMobile ? 18 : 22,
                color: '#fff',
                lineHeight: 1.6,
                marginBottom: 22,
                fontStyle: 'italic',
                fontWeight: 500
              }}>
                "{testimonials[0].text}"
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                paddingTop: 18,
                borderTop: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  background: 'rgba(0,196,212,0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 800,
                  flexShrink: 0
                }}>
                  {testimonials[0].name[0]}
                </div>
                <div>
                  <p style={{ color: '#fff', fontSize: 15, fontWeight: 700, margin: 0 }}>{testimonials[0].name}</p>
                  <p style={{ color: '#8A9BBF', fontSize: 13, margin: 0 }}>{testimonials[0].city}</p>
                </div>
              </div>
            </motion.div>

            {testimonials.slice(1).map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i + 1) * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(13,27,62,0.74)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: '24px 20px'
                }}
              >
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#FFB800" color="#FFB800" />)}
                </div>

                <p style={{
                  fontSize: 15,
                  color: '#D6E3F7',
                  lineHeight: 1.85,
                  marginBottom: 18,
                  fontStyle: 'italic'
                }}>
                  "{t.text}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: 50,
                    background: 'rgba(0,196,212,0.16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                    color: '#fff',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontSize: 13, fontWeight: 700, margin: 0 }}>{t.name}</p>
                    <p style={{ color: '#8A9BBF', fontSize: 12, margin: 0 }}>{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleBuy}
              style={{
                background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
                border: 'none',
                borderRadius: 12,
                padding: isMobile ? '18px' : '18px 34px',
                fontSize: isMobile ? 16 : 17,
                fontWeight: 900,
                color: '#0D1322',
                cursor: 'pointer',
                boxShadow: '0 16px 40px rgba(255,138,0,0.28)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                justifyContent: 'center'
              }}
            >
              Únete a ellos — Obtén acceso inmediato
              <ArrowRight size={17} />
            </motion.button>

            <p style={{ fontSize: 12, color: '#8A9BBF', marginTop: 10, marginBottom: 0 }}>
              Instant download · Full audiobook included · 30-day guarantee
            </p>
          </div>
        </motion.div>
      </section>

      <SectionBlend />

      {/* ══ MEN GROUP BANNER ══ */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? 420 : 620, background: '#08111D' }}>
        <video
          src={helpingGroupVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(3,8,16,0.58) 0%, rgba(6,12,24,0.74) 45%, rgba(6,12,24,0.92) 100%)'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 38%, rgba(0,196,212,0.14) 0%, rgba(0,196,212,0.04) 24%, transparent 52%)'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{
            position: 'relative',
            zIndex: 2,
            minHeight: isMobile ? 420 : 620,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: isMobile ? '48px 20px' : '70px 6vw'
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 999,
            padding: '8px 14px',
            marginBottom: 18
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#00C4D4', display: 'inline-block' }} />
            <span style={{ fontSize: 11, color: '#D8E6F7', fontWeight: 700, letterSpacing: 1.1, textTransform: 'uppercase' }}>
              Brotherhood. Support. Rebuilding.
            </span>
          </div>

          <h2 style={{
            fontSize: isMobile ? '32px' : 'clamp(44px,5.6vw,82px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.03,
            maxWidth: 980,
            marginBottom: 18,
            letterSpacing: -1.5
          }}>
            No eres el único hombre<br />
            tratando de <span style={{ color: '#00C4D4' }}>volver a levantarse.</span>
          </h2>

          <p style={{
            fontSize: isMobile ? 15 : 20,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: 820,
            lineHeight: 1.75,
            marginBottom: 20
          }}>
            Thousands of men have lived through the same humiliation, silence, obsessive thoughts, and self-doubt. The ones who recover do not do it by pretending they are fine.
          </p>

          <p style={{
            fontSize: isMobile ? 14 : 17,
            color: '#B8C8E0',
            maxWidth: 760,
            lineHeight: 1.75,
            marginBottom: 26
          }}>
            They recover when they find language for their pain, a path through the mental loop, and a guide that understands exactly what this kind of loss does to a man.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: isMobile ? 10 : 16,
            marginBottom: 26
          }}>
            {['Men across US, Canada, UK & Australia', 'Practical guidance, not empty advice', 'Read it. Listen to it. Start today.'].map(item => (
              <span key={item} style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.72)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 999,
                padding: '8px 12px'
              }}>
                {item}
              </span>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleBuy}
            style={{
              background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
              border: 'none',
              borderRadius: 12,
              padding: isMobile ? '18px 20px' : '18px 34px',
              fontSize: isMobile ? 16 : 17,
              fontWeight: 900,
              color: '#0D1322',
              cursor: 'pointer',
              boxShadow: '0 16px 40px rgba(255,138,0,0.28)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              justifyContent: 'center'
            }}
          >
            Únete a ellos — Obtén acceso inmediato
            <ArrowRight size={17} />
          </motion.button>

          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.56)',
            marginTop: 12,
            marginBottom: 0
          }}>
            Instant download · Full audiobook included · 30-day guarantee
          </p>
        </motion.div>
      </section>

      <SectionBlend flip />

      {/* ══ ABOUT AUTHOR ══ */}
      <section style={{ background: 'linear-gradient(180deg, #0D1B3E 0%, #09162B 100%)', padding: sectionPad }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(340px, 430px) minmax(0, 1fr)',
            gap: isMobile ? 34 : 78,
            alignItems: 'center',
            maxWidth: 1180,
            margin: '0 auto'
          }}
        >
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: isMobile ? '100%' : 420,
              maxWidth: 420,
              padding: isMobile ? '14px' : '18px',
              borderRadius: 28,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(0,196,212,0.16)',
              boxShadow: '0 32px 90px rgba(0,0,0,0.38), 0 0 90px rgba(0,196,212,0.08)'
            }}>
              <img
                src={authorImg}
                alt="Gilberto de Souza"
                style={{
                  width: '100%',
                  display: 'block',
                  borderRadius: 20,
                  objectFit: 'cover',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.32)'
                }}
              />

              <div style={{
                position: 'absolute',
                left: isMobile ? 26 : -16,
                bottom: isMobile ? 26 : 26,
                background: 'rgba(8,18,37,0.92)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 18,
                padding: '14px 16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.24)'
              }}>
                <p style={{ margin: 0, fontSize: 11, color: '#8A9BBF', textTransform: 'uppercase', letterSpacing: 1.2 }}>Written by</p>
                <p style={{ margin: '4px 0 0 0', fontSize: 16, fontWeight: 800, color: '#fff' }}>A man who lived it</p>
              </div>
            </div>
          </div>

          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,184,0,0.10)',
              border: '1px solid rgba(255,184,0,0.24)',
              color: '#FFB800',
              borderRadius: 999,
              padding: '7px 12px',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.1,
              textTransform: 'uppercase',
              marginBottom: 18
            }}>
              Not theory. Lived experience.
            </div>

            <p style={{
              fontSize: 10,
              letterSpacing: 4,
              color: '#00C4D4',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: 14
            }}>
              Sobre el autor
            </p>

            <h2 style={{
              fontSize: isMobile ? '34px' : 'clamp(42px,5vw,72px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 0.98,
              marginBottom: 20,
              letterSpacing: -1.4
            }}>
              Gilberto<br />
              <span style={{ color: '#00C4D4' }}>de Souza</span>
            </h2>

            <p style={{
              fontSize: isMobile ? 15 : 18,
              color: 'rgba(255,255,255,0.76)',
              lineHeight: 1.8,
              marginBottom: 16,
              maxWidth: 760
            }}>
              This book was not written by a therapist guessing what heartbreak feels like. It was written by a man who built a life, gave everything to a relationship, got betrayed, and had to find a way to stand back up with his dignity intact.
            </p>

            <p style={{
              fontSize: isMobile ? 14 : 17,
              color: '#B8C8E0',
              lineHeight: 1.8,
              marginBottom: 26,
              maxWidth: 760
            }}>
              Gilberto turned that collapse into a practical guide for men who are stuck in the mental loop, questioning their value, and trying to understand how to move forward without becoming bitter, numb, or lost.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0,1fr))',
              gap: 12,
              marginBottom: 26
            }}>
              {[
                { emoji: '🇧🇷', title: 'Brazilian roots', text: 'Born in Brazil and living in the United States for 23 years.' },
                { emoji: '💼', title: 'Built from zero', text: 'Created his own construction company through hard work and discipline.' },
                { emoji: '💔', title: 'Lived the betrayal', text: 'Went through deep emotional pain at the height of his success.' },
                { emoji: '📖', title: 'Wrote the missing guide', text: 'Created the book he wishes had existed when he needed it most.' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: '16px 16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 17 }}>{item.emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{item.title}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: '#C7D6EA', lineHeight: 1.7 }}>{item.text}</p>
                </div>
              ))}
            </div>

            <blockquote style={{
              margin: 0,
              padding: isMobile ? '18px 18px' : '22px 22px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(0,196,212,0.16)',
              borderRadius: 18,
              color: '#fff',
              fontStyle: 'italic',
              fontSize: isMobile ? 18 : 24,
              lineHeight: 1.6,
              boxShadow: '0 18px 50px rgba(0,0,0,0.18)'
            }}>
              “I wrote this book because I wanted someone to have written it for me when I needed it most.”
            </blockquote>

            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: 14,
              marginTop: 24
            }}>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleBuy}
                style={{
                  background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
                  border: 'none',
                  borderRadius: 12,
                  padding: isMobile ? '18px' : '18px 30px',
                  fontSize: isMobile ? 16 : 17,
                  fontWeight: 900,
                  color: '#0D1322',
                  cursor: 'pointer',
                  boxShadow: '0 16px 40px rgba(255,138,0,0.28)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10
                }}
              >
                Read Gilberto’s Guide
                <ArrowRight size={17} />
              </motion.button>

              <p style={{
                margin: 0,
                fontSize: 12,
                color: 'rgba(255,255,255,0.58)'
              }}>
                Instant access · Full audiobook included · 30-day guarantee
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <SectionBlend />

      {/* ══ BUY SECTION ══ */}
      <section id="buy" style={{ background: 'linear-gradient(180deg, #060C18 0%, #0D1B3E 100%)', padding: sectionPad }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 10, letterSpacing: 4, color: '#00C4D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>You're Ready</p>
          <h2 style={{ fontSize: isMobile ? '28px' : 'clamp(30px,4vw,52px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 12 }}>
            Obtén el libro.<br /><span style={{ color: '#00C4D4' }}>Start Today.</span>
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
                <p style={{ fontSize: 12, color: '#8A9BBF', marginBottom: 10 }}>por Gilberto de Souza</p>
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
              Obtén acceso inmediato — $17
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
      <section style={{ background: 'linear-gradient(180deg, #0A1628 0%, #081321 100%)', padding: sectionPad }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ maxWidth: 940, margin: '0 auto' }}
        >
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, rgba(13,27,62,0.86) 0%, rgba(9,19,33,0.92) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            padding: isMobile ? '28px 20px' : '40px 38px',
            textAlign: 'center',
            boxShadow: '0 28px 80px rgba(0,0,0,0.28)'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 0%, rgba(0,196,212,0.12) 0%, rgba(0,196,212,0.03) 28%, transparent 60%)'
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,184,0,0.10)',
                border: '1px solid rgba(255,184,0,0.24)',
                color: '#FFB800',
                borderRadius: 999,
                padding: '8px 14px',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.1,
                textTransform: 'uppercase',
                marginBottom: 18
              }}>
                Zero risk purchase
              </div>

              <img
                src={guarantee}
                alt="30-Day Money Back Guarantee"
                style={{ width: isMobile ? 90 : 110, display: 'block', margin: '0 auto 22px' }}
              />

              <h2 style={{
                fontSize: isMobile ? '30px' : 'clamp(34px,4vw,54px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.08,
                marginBottom: 14,
                letterSpacing: -1
              }}>
                Try it for 30 days.<br />
                <span style={{ color: '#00C4D4' }}>If it does not help, you pay nothing.</span>
              </h2>

              <p style={{
                fontSize: isMobile ? 14 : 17,
                color: 'rgba(255,255,255,0.74)',
                lineHeight: 1.8,
                maxWidth: 700,
                margin: '0 auto 24px'
              }}>
                Read the book. Listen to the full audiobook. If within 30 days you do not feel it gave you clarity, direction, or something real to hold on to, email us and we will refund every cent.
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: isMobile ? 10 : 14,
                marginBottom: 22
              }}>
                {['No questions asked', 'Full refund policy', 'Instant access after payment', 'Full audiobook included'].map(item => (
                  <span key={item} style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.76)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 999,
                    padding: '8px 12px'
                  }}>
                    {item}
                  </span>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleBuy}
                style={{
                  background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
                  border: 'none',
                  borderRadius: 12,
                  padding: isMobile ? '18px' : '18px 34px',
                  fontSize: isMobile ? 16 : 17,
                  fontWeight: 900,
                  color: '#0D1322',
                  cursor: 'pointer',
                  boxShadow: '0 16px 40px rgba(255,138,0,0.28)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  width: isMobile ? '100%' : 'auto',
                  maxWidth: isMobile ? 340 : 'none'
                }}
              >
                Start Risk-Free — $17
                <ArrowRight size={17} />
              </motion.button>

              <p style={{
                fontSize: 12,
                color: '#8A9BBF',
                marginTop: 12,
                marginBottom: 0
              }}>
                One-time payment · 30-day guarantee · Secure checkout
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: 'linear-gradient(180deg, #060C18 0%, #071120 100%)', padding: sectionPad }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ maxWidth: 860, margin: '0 auto' }}
        >
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 34px' }}>
            <p style={{
              fontSize: 11,
              letterSpacing: 4,
              color: '#FFB800',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: 14
            }}>
              Last objections
            </p>

            <h2 style={{
              fontSize: isMobile ? '30px' : 'clamp(36px,4vw,56px)',
              fontWeight: 900,
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1.08,
              marginBottom: 14,
              letterSpacing: -1.1
            }}>
              Questions that usually stop men<br />
              <span style={{ color: '#00C4D4' }}>from buying.</span>
            </h2>

            <p style={{
              fontSize: isMobile ? 14 : 16,
              color: '#8A9BBF',
              lineHeight: 1.8,
              margin: '0 auto'
            }}>
              If you are close to buying but still have one or two doubts, this section is for that exact moment.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {faq.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(180deg, rgba(13,27,62,0.72) 0%, rgba(10,20,38,0.88) 100%)',
                  border: openFaq === i ? '1px solid rgba(0,196,212,0.28)' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 14,
                  overflow: 'hidden',
                  boxShadow: openFaq === i ? '0 12px 34px rgba(0,196,212,0.08)' : 'none'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: isMobile ? '16px 16px' : '18px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: isMobile ? 15 : 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: 12
                  }}
                >
                  {item.q}
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    style={{ color: openFaq === i ? '#00C4D4' : '#8A9BBF', flexShrink: 0 }}
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 20px 18px',
                        fontSize: 14,
                        color: '#B8C8E0',
                        lineHeight: 1.8,
                        borderTop: '1px solid rgba(255,255,255,0.06)'
                      }}>
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 18,
            padding: isMobile ? '20px 16px' : '24px 22px'
          }}>
            <p style={{
              fontSize: isMobile ? 15 : 16,
              color: '#fff',
              fontWeight: 700,
              marginTop: 0,
              marginBottom: 8
            }}>
              Still unsure?
            </p>

            <p style={{
              fontSize: 13,
              color: '#8A9BBF',
              lineHeight: 1.75,
              maxWidth: 620,
              margin: '0 auto 16px'
            }}>
              Buy it, read it, listen to it, and decide after you have actually experienced it. You are still protected by the 30-day guarantee.
            </p>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleBuy}
              style={{
                background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
                border: 'none',
                borderRadius: 12,
                padding: isMobile ? '16px 18px' : '16px 28px',
                fontSize: isMobile ? 15 : 16,
                fontWeight: 900,
                color: '#0D1322',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                width: isMobile ? '100%' : 'auto',
                maxWidth: isMobile ? 320 : 'none'
              }}
            >
              Continue Risk-Free
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      <SectionBlend flip />

      {/* ══ FINAL CTA BANNER ══ */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? 470 : 640, background: '#060C18' }}>
        <img
          src={manStrong}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: isMobile ? 'center top' : 'center 18%'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(6,12,24,0.24) 0%, rgba(6,12,24,0.68) 38%, rgba(6,12,24,0.95) 100%)'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 34%, rgba(0,196,212,0.16) 0%, rgba(0,196,212,0.05) 24%, transparent 54%)'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{
            position: 'relative',
            zIndex: 2,
            minHeight: isMobile ? 470 : 640,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: isMobile ? '48px 20px 56px' : '84px 6vw'
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,184,0,0.12)',
            border: '1px solid rgba(255,184,0,0.22)',
            borderRadius: 999,
            padding: '8px 14px',
            marginBottom: 18
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#FFB800', display: 'inline-block' }} />
            <span style={{ fontSize: 11, color: '#FFE7A3', fontWeight: 800, letterSpacing: 1.1, textTransform: 'uppercase' }}>
              Your next chapter starts here
            </span>
          </div>

          <h2 style={{
            fontSize: isMobile ? '34px' : 'clamp(48px,5.6vw,84px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.02,
            marginBottom: 18,
            maxWidth: 940,
            letterSpacing: -1.5
          }}>
            She broke you.<br />
            <span style={{ color: '#00C4D4' }}>You do not have to stay broken.</span>
          </h2>

          <p style={{
            fontSize: isMobile ? 15 : 20,
            color: 'rgba(255,255,255,0.80)',
            lineHeight: 1.8,
            maxWidth: 760,
            marginBottom: 16
          }}>
            You have suffered enough. This is where you stop replaying the loss, stop questioning your value, and start rebuilding with clarity.
          </p>

          <p style={{
            fontSize: isMobile ? 14 : 16,
            color: '#B8C8E0',
            lineHeight: 1.75,
            maxWidth: 720,
            marginBottom: 26
          }}>
            Get the full eBook and audiobook now, and take the first real step out of the spiral today.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: isMobile ? 10 : 14,
            marginBottom: 26
          }}>
            {['Instant download', 'Full audiobook included', '30-day guarantee', 'One-time payment'].map(item => (
              <span key={item} style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.74)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 999,
                padding: '8px 12px'
              }}>
                {item}
              </span>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleBuy}
            style={{
              background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
              border: 'none',
              borderRadius: 12,
              padding: isMobile ? '18px 22px' : '20px 42px',
              fontSize: isMobile ? 16 : 18,
              fontWeight: 900,
              color: '#0D1322',
              cursor: 'pointer',
              boxShadow: '0 18px 50px rgba(255,138,0,0.34)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? 340 : 'none'
            }}
          >
            Obtén acceso inmediato — $17
            <ArrowRight size={17} />
          </motion.button>

          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.58)',
            marginTop: 12,
            marginBottom: 0
          }}>
            Read today. Listen today. Start rebuilding today.
          </p>
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
              {[['Política de Privacidad','/es/privacy'],['Términos','/es/terms'],['Contacto','/es/contact'],['🇧🇷 PT','/' ],['🇺🇸 EN','/en']].map(([label, href]) => (
                <a key={label} href={href} style={{ color: '#8A9BBF', textDecoration: 'none', fontSize: 12 }}>{label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 8 }}>
            <p style={{ fontSize: 11, color: '#4A5A7B', margin: 0 }}>© 2026 Gilberto de Souza. Todos los derechos reservados.</p>
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

      <LeadPopupEN lang="es" />
      <AbandonedPopupEN lang="es" />
      <AIChatbotEN lang="es" />
    </div>
  );
}
