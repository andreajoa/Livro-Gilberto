import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, Star, ChevronDown, ArrowRight } from 'lucide-react';
import { useLead } from '../context/LeadContext';
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
import bookCoverEN from '../assets/en/book-cover-en.jpeg';

const lang = 'en';

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
  const { markCartAbandoned } = useLead();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBuy = () => {
    markCartAbandoned();
    window.open('https://buy.stripe.com/PLACEHOLDER_EN', '_blank');
  };

  return (
    <div style={{ background: '#060C18', fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>

      {/* ══ STICKY NAVBAR ══ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: scrolled ? 'rgba(6,12,24,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,196,212,0.15)' : 'none',
        transition: 'all 0.3s',
        padding: '14px 6vw',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: '#00C4D4', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 900, fontSize: 13, color: '#0D1B3E' }}>G·S</span>
          </div>
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Gilberto de Souza</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/es')} style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6, padding: '6px 14px', color: '#8A9BBF', fontSize: 12,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
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
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <img src={heroLoop} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(6,12,24,0.97) 0%, rgba(6,12,24,0.9) 45%, rgba(6,12,24,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,12,24,1) 0%, transparent 35%)' }} />

        <div style={{ position: 'relative', zIndex: 3, padding: '0 6vw', maxWidth: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ maxWidth: 680 }}>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,196,212,0.12)', border: '1px solid rgba(0,196,212,0.25)',
              borderRadius: 20, padding: '6px 16px', marginBottom: 24
            }}>
              <span style={{ width: 6, height: 6, background: '#00C4D4', borderRadius: 50, display: 'inline-block' }} />
              <span style={{ fontSize: 12, color: '#00C4D4', fontWeight: 600, letterSpacing: 1 }}>NEW RELEASE 2026 — eBook + Audiobook</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(36px,5.5vw,76px)',
              fontWeight: 900, color: '#fff', lineHeight: 1.05,
              marginBottom: 24, letterSpacing: -1.5
            }}>
              You Gave Her<br />
              <span style={{ color: '#00C4D4' }}>Everything.</span><br />
              She Chose<br />Someone Else.
            </h1>

            <p style={{ fontSize: 'clamp(16px,1.8vw,20px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              This book was written by a man who lived through exactly that — and came out the other side. It will show you how to stop surviving and start <strong style={{ color: '#fff' }}>living again.</strong>
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#FFB800" color="#FFB800" />)}
              </div>
              <span style={{ fontSize: 13, color: '#8A9BBF' }}>Trusted by men across the US, Canada, UK & Australia</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(0,196,212,0.6)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBuy}
                style={{
                  background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
                  border: 'none', borderRadius: 8,
                  padding: '18px 36px', fontSize: 17, fontWeight: 800,
                  color: '#0D1B3E', cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(0,196,212,0.4)',
                  display: 'flex', alignItems: 'center', gap: 10
                }}
              >
                Get Instant Access — $17
                <ArrowRight size={18} />
              </motion.button>
              <div>
                <p style={{ fontSize: 11, color: '#8A9BBF', margin: 0 }}>~~$34~~ Today only</p>
                <p style={{ fontSize: 11, color: '#00C4D4', margin: 0, fontWeight: 600 }}>📖 eBook + 🎧 Audiobook included</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 24, marginTop: 28, flexWrap: 'wrap' }}>
              {['✅ Instant download', '🔒 Secure payment', '💰 30-day guarantee'].map(b => (
                <span key={b} style={{ fontSize: 12, color: '#8A9BBF' }}>{b}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0,10,0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: 3, textTransform: 'uppercase' }}>scroll</span>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(0,196,212,0.5), transparent)' }} />
        </motion.div>
      </section>

      {/* ══ EPIPHANY BRIDGE — Letter ══ */}
      <section style={{ background: '#060C18', padding: '100px 6vw' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontSize: 13, letterSpacing: 4, color: '#00C4D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: 20 }}>A letter from Gilberto</p>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 40 }}>
            "I gave her 7 years.<br />
            <span style={{ color: '#00C4D4' }}>She chose someone else."</span>
          </h2>
          {[
            "I remember the exact moment I found out. I was standing in my kitchen, phone in hand, reading words that felt like they were written about someone else's life. But they weren't.",
            "I had done everything right. I built a business from scratch in a country that wasn't mine. I worked hard. I loved deeply. And none of it mattered, because she still walked out the door — and into someone else's arms.",
            "The worst part wasn't the betrayal itself. It was the silence after. The empty apartment. The 3am thoughts that wouldn't stop. The question that played on repeat: *What's wrong with me?*",
            "I spent months looking for answers. I bought books. I watched videos. I talked to friends. Most of it was useless — written by people who'd never actually been through this kind of specific, gut-wrenching pain.",
            "So I wrote the book I wish someone had given me.",
            "Not a book full of platitudes or \"move on\" advice. A real manual for the man who gave everything and is now sitting in the rubble of what he thought was his life — trying to figure out how to stand back up.",
            "If that's you, this book was written for you.",
          ].map((p, i) => (
            <p key={i} style={{ fontSize: 17, color: i === 6 ? '#fff' : 'rgba(255,255,255,0.7)', lineHeight: 1.9, marginBottom: 24, fontStyle: p.includes('*') ? 'italic' : 'normal' }}>
              {p.replace(/\*/g, '')}
            </p>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <img src={authorImg} alt="Gilberto de Souza" style={{ width: 64, height: 64, borderRadius: 50, objectFit: 'cover', border: '2px solid rgba(0,196,212,0.4)' }} />
            <div>
              <p style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: 16 }}>Gilberto de Souza</p>
              <p style={{ color: '#8A9BBF', margin: 0, fontSize: 13 }}>Author · Entrepreneur · Survivor</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ PAIN AMPLIFICATION ══ */}
      <section style={{ background: '#0A1628', padding: '90px 6vw' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: 16 }}>
            If you've been here, <span style={{ color: '#00C4D4' }}>you know.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#8A9BBF', textAlign: 'center', marginBottom: 52, lineHeight: 1.7 }}>
            No one tells you that being replaced feels like this.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 3 }}>
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
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                style={{
                  background: 'rgba(13,27,62,0.6)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0,196,212,0.08)',
                  padding: '28px 22px', transition: 'border-color 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,196,212,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,196,212,0.08)'}
              >
                <span style={{ fontSize: 28, display: 'block', marginBottom: 14 }}>{c.icon}</span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: '#8A9BBF', lineHeight: 1.7, margin: 0 }}>{c.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ VIDEO SECTION — Argument ══ */}
      <section style={{ position: 'relative', overflow: 'hidden', height: 'min(480px,55vh)' }}>
        <img src={argument} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,12,24,0.72)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 6vw' }}>
          <p style={{ fontSize: 12, letterSpacing: 4, color: '#00C4D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: 20 }}>Every man who has been there knows</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,56px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, maxWidth: 700 }}>
            There is a moment<br />when everything <span style={{ color: '#00C4D4' }}>changes.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginTop: 20, maxWidth: 500, lineHeight: 1.7 }}>
            This book starts exactly there — and walks you out the other side.
          </p>
        </motion.div>
      </section>

      {/* ══ WHAT'S INSIDE ══ */}
      <section style={{ background: '#060C18', padding: '100px 6vw' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 72, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div animate={{ y: [0,-10,0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <img src={bookCoverEN} alt="How to Overcome the Pain of Being Replaced"
                style={{ width: 'min(320px,100%)', borderRadius: 8, boxShadow: '0 40px 80px rgba(0,0,0,0.8)', display: 'block' }} />
            </motion.div>
          </div>
          <div>
            <p style={{ fontSize: 11, letterSpacing: 5, color: '#00C4D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>What's inside</p>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 12 }}>
              How to Overcome<br />the Pain of Being<br /><span style={{ color: '#00C4D4' }}>Replaced by Someone Else</span>
            </h2>
            <p style={{ fontSize: 14, color: '#8A9BBF', marginBottom: 32 }}>by <strong style={{ color: '#fff' }}>Gilberto de Souza</strong></p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
              {[
                'Why being replaced hits men differently — and what to do about it',
                'The 5-step framework for breaking the mental loop for good',
                'How to rebuild your identity after a long relationship ends',
                'The truth about "no contact" — what works and what backfires',
                'How to trust again without becoming emotionally closed off',
                'The mindset shift that separates men who recover from men who don\'t',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <CheckCircle size={16} style={{ color: '#00C4D4', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: '#B8C8E0', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
              {['📖 Full eBook (PDF)', '🎧 Full Audiobook (MP3)', '📱 All devices', '🌍 EN / ES'].map(b => (
                <span key={b} style={{
                  background: 'rgba(0,196,212,0.08)', border: '1px solid rgba(0,196,212,0.2)',
                  borderRadius: 4, padding: '5px 12px', fontSize: 12, color: '#00C4D4'
                }}>{b}</span>
              ))}
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleBuy}
              style={{
                background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
                border: 'none', borderRadius: 8, padding: '16px 32px',
                fontSize: 16, fontWeight: 800, color: '#0D1B3E',
                cursor: 'pointer', boxShadow: '0 8px 30px rgba(0,196,212,0.4)',
                display: 'flex', alignItems: 'center', gap: 10
              }}>
              Get Instant Access — $17 <ArrowRight size={16} />
            </motion.button>
            <p style={{ fontSize: 12, color: '#8A9BBF', marginTop: 10 }}>~~$34~~ · Instant download · 30-day guarantee</p>
          </div>
        </motion.div>
      </section>

      {/* ══ SOCIAL PROOF ══ */}
      <section style={{ background: '#0A1628', padding: '90px 6vw' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: 8 }}>
            Real men. Real results.
          </h2>
          <p style={{ fontSize: 15, color: '#8A9BBF', textAlign: 'center', marginBottom: 52 }}>They were exactly where you are now.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                style={{
                  background: 'rgba(13,27,62,0.7)', border: '1px solid rgba(0,196,212,0.12)',
                  borderRadius: 12, padding: '28px 24px'
                }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#FFB800" color="#FFB800" />)}
                </div>
                <p style={{ fontSize: 14, color: '#B8C8E0', lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 50, background: 'rgba(0,196,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
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

      {/* ══ MEN GROUP VIDEO BANNER ══ */}
      <section style={{ position: 'relative', overflow: 'hidden', height: 'min(420px,50vh)' }}>
        <img src={menGroup} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,12,24,0.78)' }} />
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}
          style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 6vw' }}>
          <h2 style={{ fontSize: 'clamp(26px,4vw,52px)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            You Are Not Alone.<br /><span style={{ color: '#00C4D4' }}>Thousands of men have been here.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 560, lineHeight: 1.7 }}>
            The difference between the ones who recover and the ones who don't is simple: they found the right guide at the right time.
          </p>
        </motion.div>
      </section>

      {/* ══ ABOUT AUTHOR ══ */}
      <section style={{ background: '#0D1B3E', padding: '100px 6vw' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 72, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            <img src={authorImg} alt="Gilberto de Souza" style={{ width: '100%', maxWidth: 420, borderRadius: 8, display: 'block', filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.7))' }} />
            <div style={{ position: 'absolute', bottom: -16, right: -16, width: '65%', height: '65%', border: '2px solid rgba(0,196,212,0.15)', borderRadius: 8, zIndex: -1 }} />
          </div>
          <div>
            <p style={{ fontSize: 11, letterSpacing: 5, color: '#00C4D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>The Turning Point Begins Where Everything Seems to Have Ended</p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 28 }}>
              Gilberto<br /><span style={{ color: '#00C4D4' }}>de Souza</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              {[
                { emoji: '🇧🇷', text: 'Born in Brazil. Living in the United States for 23 years.' },
                { emoji: '💼', text: 'Entrepreneur — founded his own construction company from zero.' },
                { emoji: '💔', text: 'Went through betrayal at the height of his success.' },
                { emoji: '📖', text: 'Chose to rebuild — and wrote the book he wished existed.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.emoji}</span>
                  <p style={{ fontSize: 14, color: '#B8C8E0', margin: 0, lineHeight: 1.7 }}>{item.text}</p>
                </div>
              ))}
            </div>
            <blockquote style={{
              borderLeft: '3px solid #00C4D4', paddingLeft: 18,
              fontStyle: 'italic', fontSize: 18, color: '#fff',
              lineHeight: 1.6, margin: '0 0 28px'
            }}>
              "I wrote this book because I wanted someone to have written it for me when I needed it most."
            </blockquote>
          </div>
        </motion.div>
      </section>

      {/* ══ BUY SECTION ══ */}
      <section id="buy" style={{ background: 'linear-gradient(180deg, #060C18 0%, #0D1B3E 100%)', padding: '100px 6vw' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, letterSpacing: 5, color: '#00C4D4', fontWeight: 700, textTransform: 'uppercase', marginBottom: 20 }}>You're Ready</p>
          <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
            Get The Book.<br /><span style={{ color: '#00C4D4' }}>Start Today.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#8A9BBF', lineHeight: 1.7, marginBottom: 48 }}>
            You've already survived the hardest part. Now let this book show you what comes next.
          </p>

          <div style={{
            background: 'rgba(13,27,62,0.8)', border: '1px solid rgba(0,196,212,0.25)',
            borderRadius: 16, padding: '40px 36px', textAlign: 'left'
          }}>
            <div style={{ display: 'flex', gap: 24, marginBottom: 28, alignItems: 'flex-start' }}>
              <img src={bookCoverEN} alt="Book" style={{ width: 100, borderRadius: 6, boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }} />
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.3 }}>
                  How to Overcome the Pain of Being Replaced by Someone Else
                </h3>
                <p style={{ fontSize: 13, color: '#8A9BBF', marginBottom: 12 }}>by Gilberto de Souza</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['📖 Full eBook (PDF)', '🎧 Full Audiobook (MP3)', '✅ Instant download'].map(item => (
                    <span key={item} style={{ fontSize: 13, color: '#B8C8E0' }}>{item}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
              <span style={{ fontSize: 52, fontWeight: 900, color: '#00C4D4', lineHeight: 1 }}>$17</span>
              <span style={{ fontSize: 20, color: '#8A9BBF', textDecoration: 'line-through' }}>$34</span>
              <span style={{ fontSize: 12, background: 'rgba(0,196,212,0.15)', border: '1px solid rgba(0,196,212,0.3)', color: '#00C4D4', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>50% OFF</span>
            </div>

            <motion.button whileHover={{ scale: 1.02, boxShadow: '0 16px 50px rgba(0,196,212,0.6)' }}
              whileTap={{ scale: 0.98 }} onClick={handleBuy}
              style={{
                width: '100%', padding: '20px',
                background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
                border: 'none', borderRadius: 8,
                color: '#0D1B3E', fontSize: 18, fontWeight: 900,
                cursor: 'pointer', letterSpacing: 0.5,
                boxShadow: '0 8px 30px rgba(0,196,212,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                marginBottom: 16
              }}>
              Get Instant Access — $17
              <ArrowRight size={20} />
            </motion.button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, marginBottom: 16 }}>
              <Shield size={16} style={{ color: '#00C4D4', flexShrink: 0 }} />
              <p style={{ fontSize: 12, color: '#8A9BBF', margin: 0 }}>Secure payment via Stripe · Visa · Mastercard · Amex · Apple Pay</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
              {['🔒 SSL Secure', '💰 30-Day Guarantee', '⚡ Instant Access'].map(b => (
                <span key={b} style={{ fontSize: 12, color: '#8A9BBF' }}>{b}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ GUARANTEE ══ */}
      <section style={{ background: '#0A1628', padding: '80px 6vw' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <img src={guarantee} alt="30-Day Money Back Guarantee" style={{ width: 120, marginBottom: 28, display: 'block', margin: '0 auto 28px' }} />
          <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            30-Day Money-Back Guarantee
          </h2>
          <p style={{ fontSize: 15, color: '#8A9BBF', lineHeight: 1.8 }}>
            Read the book. Listen to the audiobook. If within 30 days you don't feel it gave you something real — a new perspective, a new tool, a moment of clarity — email us and we will refund every cent. No questions, no hassle. We stand behind this completely.
          </p>
        </motion.div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ background: '#060C18', padding: '90px 6vw' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
          style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: 8 }}>
            The Book for the Man<br /><span style={{ color: '#00C4D4' }}>Who Chose to Rebuild.</span>
          </h2>
          <div style={{ width: 48, height: 2, background: '#00C4D4', margin: '16px auto 48px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {faq.map((item, i) => (
              <div key={i} style={{ background: 'rgba(13,27,62,0.5)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                  {item.q}
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} style={{ color: '#00C4D4', flexShrink: 0 }}>
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '0 22px 18px', fontSize: 14, color: '#8A9BBF', lineHeight: 1.8 }}>{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ FINAL CTA BANNER ══ */}
      <section style={{ position: 'relative', overflow: 'hidden', height: 'min(440px,55vh)' }}>
        <img src={manStrong} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,12,24,0.72)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}
          style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 6vw' }}>
          <h2 style={{ fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 28, maxWidth: 700 }}>
            You Survived the Pain.<br /><span style={{ color: '#00C4D4' }}>Now It's Time to Live.</span>
          </h2>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={handleBuy}
            style={{
              background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
              border: 'none', borderRadius: 8, padding: '18px 44px',
              fontSize: 17, fontWeight: 800, color: '#0D1B3E',
              cursor: 'pointer', boxShadow: '0 8px 40px rgba(0,196,212,0.5)',
              display: 'flex', alignItems: 'center', gap: 10
            }}>
            Get Instant Access — $17 <ArrowRight size={18} />
          </motion.button>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>30-day money-back guarantee · Instant download</p>
        </motion.div>
      </section>

      {/* ══ FOOTER EN ══ */}
      <footer style={{ background: '#030810', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px 6vw' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24, marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, background: '#00C4D4', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 900, fontSize: 12, color: '#0D1B3E' }}>G·S</span>
              </div>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0 }}>Gilberto de Souza</p>
                <p style={{ color: '#8A9BBF', fontSize: 12, margin: 0, fontStyle: 'italic' }}>You are not alone</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[['Privacy Policy','/en/privacy'],['Terms of Use','/en/terms'],['Contact','/en/contact'],['🇧🇷 Português','/'],['🇪🇸 Español','/es']].map(([label, href]) => (
                <a key={label} href={href} style={{ color: '#8A9BBF', textDecoration: 'none', fontSize: 13 }}>{label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
            <p style={{ fontSize: 12, color: '#4A5A7B', margin: 0 }}>© 2026 Gilberto de Souza. All rights reserved.</p>
            <p style={{ fontSize: 12, color: '#4A5A7B', margin: 0 }}>⚡ Digital product — instant download worldwide</p>
          </div>
        </div>
      </footer>

      <LeadPopupEN lang="en" />
      <AbandonedPopupEN lang="en" />
      <AIChatbotEN lang="en" />
    </div>
  );
}
