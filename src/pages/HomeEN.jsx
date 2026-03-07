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
import menGroup from '../assets/en/men-group.gif';
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
              She left.<br />
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
                Get Instant Access — $17
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

      {/* ══ SOLUTION REVEAL ══ */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #06101D 0%, #08172A 45%, #0A1D36 100%)',
        padding: sectionPad
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 25% 45%, rgba(0,196,212,0.12) 0%, transparent 28%), radial-gradient(circle at 78% 20%, rgba(255,184,0,0.10) 0%, transparent 24%)'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(300px, 0.9fr) minmax(380px, 1.1fr)',
            gap: isMobile ? 40 : 72,
            alignItems: 'center',
            maxWidth: 1180,
            margin: '0 auto',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            order: isMobile ? -1 : 0,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              width: isMobile ? 220 : 360,
              height: isMobile ? 220 : 360,
              borderRadius: 999,
              background: 'radial-gradient(circle, rgba(0,196,212,0.22) 0%, rgba(0,196,212,0.10) 35%, transparent 70%)',
              filter: 'blur(8px)'
            }} />
            <img
              src={bookCoverEN}
              alt="How to Overcome the Pain of Being Replaced"
              style={{
                width: isMobile ? 210 : 'min(340px,100%)',
                borderRadius: 10,
                display: 'block',
                position: 'relative',
                zIndex: 2,
                filter: 'drop-shadow(0 34px 70px rgba(0,0,0,0.55))'
              }}
            />
          </div>

          <div>
            <p style={{
              fontSize: 11,
              letterSpacing: 4,
              color: '#FFB800',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: 14
            }}>
              The solution starts here
            </p>

            <h2 style={{
              fontSize: isMobile ? '28px' : 'clamp(34px,4.8vw,64px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.05,
              marginBottom: 16,
              letterSpacing: -1.2
            }}>
              This is the book that helps you stop <span style={{ color: '#00C4D4' }}>spiraling</span> and start rebuilding.
            </h2>

            <p style={{
              fontSize: isMobile ? 15 : 18,
              color: 'rgba(255,255,255,0.74)',
              lineHeight: 1.75,
              marginBottom: 24,
              maxWidth: 720
            }}>
              Not generic breakup advice. Not empty motivation. This is a direct guide for men who feel rejected, replaced, mentally exhausted, and ready to get control of their mind back.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              marginBottom: 30
            }}>
              {[
                'Break the obsessive mental loop and start thinking clearly again.',
                'Rebuild your identity without begging for closure or validation.',
                'Understand what actually helps after betrayal — and what keeps you stuck.',
                'Regain self-respect, emotional control, and direction.'
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14,
                  padding: isMobile ? '14px 14px' : '15px 16px'
                }}>
                  <CheckCircle2 size={18} color="#00C4D4" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{
                    fontSize: isMobile ? 14 : 15,
                    color: '#EAF4FF',
                    lineHeight: 1.7,
                    margin: 0
                  }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: 14
            }}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleBuy}
                style={{
                  background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
                  border: 'none',
                  borderRadius: 10,
                  padding: isMobile ? '18px 20px' : '19px 34px',
                  fontSize: isMobile ? 16 : 18,
                  fontWeight: 900,
                  color: '#0B1325',
                  cursor: 'pointer',
                  boxShadow: '0 18px 40px rgba(255,138,0,0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                Get Instant Access — $17
                <ArrowRight size={18} />
              </motion.button>

              <p style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.62)',
                margin: 0
              }}>
                <span style={{ textDecoration: 'line-through', opacity: 0.75 }}>$34</span> today only · eBook + audiobook · 30-day guarantee
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ BUY SECTION ══ */}
      <section id="buy" style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #07111F 0%, #0B1830 55%, #102142 100%)',
        padding: sectionPad
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 15%, rgba(0,196,212,0.10) 0%, transparent 26%), radial-gradient(circle at 80% 70%, rgba(255,184,0,0.10) 0%, transparent 24%)'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          <p style={{
            fontSize: 11,
            letterSpacing: 4,
            color: '#FFB800',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: 16
          }}>
            You are one step away
          </p>

          <h2 style={{
            fontSize: isMobile ? '30px' : 'clamp(36px,4.8vw,64px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.08,
            marginBottom: 14
          }}>
            Get the book.<br />
            Start <span style={{ color: '#00C4D4' }}>rebuilding now.</span>
          </h2>

          <p style={{
            fontSize: isMobile ? 15 : 17,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.75,
            marginBottom: 34,
            maxWidth: 620,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Secure your copy now and get immediate access to the exact guide designed to help you stop spiraling, think clearly again, and move forward with dignity.
          </p>

          <div style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 22,
            padding: isMobile ? '24px 18px' : '34px 30px',
            textAlign: 'left',
            boxShadow: '0 26px 70px rgba(0,0,0,0.24)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              gap: 18,
              marginBottom: 24,
              alignItems: 'flex-start',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <img
                src={bookCoverEN}
                alt="Book"
                style={{
                  width: isMobile ? 92 : 116,
                  borderRadius: 8,
                  boxShadow: '0 18px 44px rgba(0,0,0,0.45)',
                  flexShrink: 0
                }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: isMobile ? 17 : 20,
                  fontWeight: 900,
                  color: '#fff',
                  marginBottom: 6,
                  lineHeight: 1.3
                }}>
                  How to Overcome the Pain of Being Replaced by Someone Else
                </h3>

                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', marginBottom: 12 }}>
                  by Gilberto de Souza
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0,1fr))',
                  gap: 10
                }}>
                  {[
                    '📖 Full eBook (PDF)',
                    '🎧 Full Audiobook (MP3)',
                    '⚡ Instant access after payment',
                    '🛡️ 30-day money-back guarantee'
                  ].map(item => (
                    <div key={item} style={{
                      fontSize: 13,
                      color: '#DCEBFF',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 10,
                      padding: '10px 12px'
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexDirection: isMobile ? 'column' : 'row',
              marginBottom: 22
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: isMobile ? 46 : 58,
                  fontWeight: 900,
                  color: '#FFB800',
                  lineHeight: 1
                }}>
                  $17
                </span>
                <span style={{
                  fontSize: 20,
                  color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'line-through'
                }}>
                  $34
                </span>
                <span style={{
                  fontSize: 11,
                  background: 'rgba(255,184,0,0.14)',
                  border: '1px solid rgba(255,184,0,0.28)',
                  color: '#FFB800',
                  padding: '4px 9px',
                  borderRadius: 999,
                  fontWeight: 800,
                  letterSpacing: 0.4
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
                width: '100%',
                padding: isMobile ? '18px' : '20px',
                background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
                border: 'none',
                borderRadius: 12,
                color: '#0B1325',
                fontSize: isMobile ? 17 : 19,
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 18px 38px rgba(255,138,0,0.30)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                marginBottom: 14
              }}
            >
              Get Instant Access — $17
              <ArrowRight size={18} />
            </motion.button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '12px 14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10,
              marginBottom: 14,
              flexWrap: 'wrap'
            }}>
              <Shield size={15} style={{ color: '#00C4D4', flexShrink: 0 }} />
              <p style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.72)',
                margin: 0,
                textAlign: 'center'
              }}>
                Secure checkout powered by Stripe · Visa · Mastercard · Amex · Apple Pay
              </p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: isMobile ? 10 : 18,
              flexWrap: 'wrap'
            }}>
              {[
                '🔒 Secure payment',
                '⚡ Instant delivery',
                '💰 30-day guarantee',
                '📱 Mobile-friendly checkout'
              ].map(b => (
                <span key={b} style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.64)'
                }}>
                  {b}
                </span>
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
