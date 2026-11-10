"use client"
import CRMTracker, { trackCRMEvent } from '../components/CRMTracker';
import { useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const faq = [
  { q: 'What format is the book in?', a: 'You get an instant download: a PDF eBook you can read on any device, plus an MP3 audiobook you can listen to anywhere — in the car, at the gym, or late at night when your mind won\'t stop.' },
  { q: 'How do I receive my purchase?', a: 'Immediately after payment, you\'ll receive an email with your download links. No waiting, no shipping — it\'s yours in under 60 seconds.' },
  { q: 'Is this a Christian book?', a: 'Yes. Gilberto writes from his Christian faith. Each chapter opens with Scripture and the book includes prayers and reflection exercises. You do not need to be a churchgoer to read it, but faith is at the center of how he rebuilt.' },
  { q: 'Is this book only for men who were cheated on?', a: 'No. This book is for any man who gave everything to a relationship and was left feeling like it wasn\'t enough — whether through betrayal, breakup, or being replaced.' },
  { q: 'What if it doesn\'t help me?', a: 'You\'re covered by a 30-day money-back guarantee. No questions asked. If you don\'t feel this book moved the needle for you, email us and we\'ll refund you in full.' },
  { q: 'Is the audiobook the full book or just a summary?', a: 'It\'s the complete book, word for word, read in a calm and direct voice designed for men going through exactly what you\'re going through.' },
];

const chapters = [
  'The Impact',
  'The False Beliefs of a Hero',
  'The Cycle of Post-Abandonment Depression',
  'Rebuilding Your Identity',
  'Dealing with Anger and the Desire for Revenge',
  'In the Desert, New Purposes Are Born',
  'The Healing That Turns Pain into Strength',
  'Rise Up',
  'God Has Not Lost Control',
  'The Hope That Renews',
  'The Cell Is Open and the Podium Is Empty',
];

const signs = [
  'You replay the breakup every night, trying to find the exact moment you lost her.',
  'You compare yourself to the man she chose and wonder what he has that you do not.',
  'You look normal in public, but your mind falls apart when you are alone.',
  'You keep checking her profile even when you know it will ruin your day.',
  'Part of you still wants her back. Another part of you wants your pride back.',
  'People tell you to move on, but they have no idea how deep this actually cut.',
];

const excerpt = [
  "When a man is replaced by another, it's not just a relationship that ends. It feels as if an entire part of his story has been ripped away without warning, as if someone erased years of life with a single gesture.",
  "The impact doesn't come only from the news itself. It comes from what it means. You didn't just lose a partner, you lost the certainty that you knew the person with whom you shared your days.",
  "The weight that settles in your chest isn't visible to others, but you feel every gram of it. You wake up, and before even getting out of bed, it's already there.",
  "Then come the questions, the ones that cut through your mind like sharp knives: What does he have that I don't? Why wasn't I enough? Did she lie to me the whole time?",
  "The problem is, these questions aren't truly searching for answers. They exist only to feed the pain. And in that search, you begin to shrink, to believe you've lost value as a man, as a partner, as a human being.",
];

const AMAZON = 'https://www.amazon.com/dp/B0H2LXHCH4';
const BARNES = 'https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504';

const C = { navy: '#192A5C', ink: '#141B2D', paper: '#F7F4EE', card: '#FFFFFF', line: '#E2DCCF', mute: '#5B6478', cyan: '#3FF0FF', deep: '#0F1B3D' };
const serif = "Georgia, 'Times New Roman', serif";
const sans = "'Inter', 'Helvetica Neue', Arial, sans-serif";

export default function HomeEN() {
  const [openFaq, setOpenFaq] = useState(0);
  const isMobile = useIsMobile();
  const pad = isMobile ? '56px 20px' : '88px 24px';
  const wrap = { maxWidth: 1040, margin: '0 auto' };
  const narrow = { maxWidth: 720, margin: '0 auto' };

  const buyDigital = async () => {
    await trackCRMEvent('checkout_open', { language: 'en', metadata: { product: 'digital_bundle', price: 24.99, currency: 'USD' } });
    window.location.href = '/checkout-digital?lang=en';
  };

  const btn = (primary) => ({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 54, padding: '0 26px', borderRadius: 8,
    fontFamily: sans, fontSize: 16, fontWeight: 800, textDecoration: 'none', cursor: 'pointer', textAlign: 'center',
    border: primary ? 'none' : '1.5px solid rgba(255,255,255,0.55)',
    background: primary ? C.cyan : 'transparent', color: primary ? C.deep : '#FFFFFF', width: isMobile ? '100%' : 'auto',
  });
  const eyebrow = (dark) => ({ fontFamily: sans, fontSize: 12, letterSpacing: 2.5, fontWeight: 800, textTransform: 'uppercase', color: dark ? C.cyan : C.navy, margin: '0 0 14px' });
  const h2 = { fontFamily: serif, fontSize: isMobile ? 30 : 42, lineHeight: 1.15, fontWeight: 700, color: C.ink, margin: '0 0 18px', letterSpacing: -0.5 };

  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: sans, overflowX: 'hidden' }}>
      <CRMTracker language="en" />

      {/* HERO */}
      <header style={{ background: `linear-gradient(180deg, ${C.deep} 0%, ${C.navy} 100%)`, padding: isMobile ? '44px 20px 56px' : '72px 24px 88px' }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.25fr 0.75fr', gap: isMobile ? 36 : 56, alignItems: 'center' }}>
          <div>
            <p style={eyebrow(true)}>A faith-based book for men healing from betrayal</p>
            <h1 style={{ fontFamily: serif, fontSize: isMobile ? 38 : 60, lineHeight: 1.06, fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px', letterSpacing: -1 }}>
              She chose someone else.<br />This is how you stand back up.
            </h1>
            <p style={{ fontSize: isMobile ? 17 : 19, lineHeight: 1.65, color: 'rgba(255,255,255,0.84)', margin: '0 0 30px', maxWidth: 560 }}>
              Eleven chapters for the man who was betrayed, replaced, or left trying to make sense of it. Written from lived experience and Christian faith, with Scripture, prayer and reflection exercises to help you stop the spiral and rebuild.
            </p>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, marginBottom: 18 }}>
              <a href={AMAZON} target="_blank" rel="noopener noreferrer" style={btn(true)}>Get the paperback on Amazon</a>
              <button type="button" onClick={buyDigital} style={btn(false)}>eBook + audiobook · $24.99</button>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.66)', margin: 0, lineHeight: 1.6 }}>
              Also at <a href={BARNES} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.9)' }}>Barnes &amp; Noble</a> · Digital bundle has a 30-day money-back guarantee
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/books/en/book-front.png" alt="How to Overcome the Pain of Being Replaced by Someone Else, book cover"
              style={{ width: isMobile ? 210 : 300, height: 'auto', borderRadius: 4, boxShadow: '0 30px 60px rgba(0,0,0,0.45)' }} />
          </div>
        </div>
      </header>

      {/* IS THIS YOU */}
      <section style={{ padding: pad }}>
        <div style={wrap}>
          <p style={eyebrow(false)}>If this feels familiar</p>
          <h2 style={{ ...h2, maxWidth: 680 }}>Being replaced is not an ordinary breakup.</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: C.mute, margin: '0 0 30px', maxWidth: 680 }}>
            It is humiliation, comparison and the feeling that someone else stepped into the life you thought was yours.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
            {signs.map((t) => (
              <div key={t} style={{ background: C.card, border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.navy}`, borderRadius: 6, padding: '18px 20px', fontSize: 16, lineHeight: 1.55 }}>{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* EXCERPT */}
      <section style={{ padding: pad, background: C.card, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={narrow}>
          <p style={eyebrow(false)}>Read the opening · Chapter 1, The Impact</p>
          <blockquote style={{ margin: '0 0 28px', padding: 0, fontFamily: serif, fontStyle: 'italic', fontSize: isMobile ? 17 : 19, lineHeight: 1.6, color: C.mute }}>
            “Even my close friend, someone I trusted, one who shared my bread, has turned against me.”<br />
            <span style={{ fontStyle: 'normal', fontSize: 14 }}>Psalm 41:9</span>
          </blockquote>
          {excerpt.map((p, i) => (
            <p key={i} style={{ fontFamily: serif, fontSize: isMobile ? 18 : 20, lineHeight: 1.75, margin: '0 0 20px', color: C.ink }}>{p}</p>
          ))}
          <p style={{ fontSize: 15, color: C.mute, margin: '26px 0 22px' }}>That is how the book begins. The other ten chapters are about getting out.</p>
          <a href="#buy" style={{ ...btn(true), background: C.navy, color: '#FFFFFF' }}>Keep reading: get the book</a>
        </div>
      </section>

      {/* INSIDE */}
      <section style={{ padding: pad }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr', gap: isMobile ? 28 : 56 }}>
          <div>
            <p style={eyebrow(false)}>What is inside</p>
            <h2 style={h2}>Eleven chapters, from the impact to getting back up.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: C.mute, margin: 0 }}>
              Each chapter opens with Scripture. Along the way there are prayers and “Let's Reflect” exercises you do with a notebook, so the book is something you work through, not only read.
            </p>
          </div>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {chapters.map((c, i) => (
              <li key={c} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '13px 0', borderBottom: `1px solid ${C.line}` }}>
                <span style={{ fontFamily: serif, fontSize: 15, color: C.navy, fontWeight: 700, minWidth: 26 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 17, lineHeight: 1.4 }}>{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* AUTHOR */}
      <section style={{ padding: pad, background: C.deep, color: '#FFFFFF' }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '280px 1fr', gap: isMobile ? 28 : 56, alignItems: 'center' }}>
          <img src="/book-assets/gilberto-ingles.png" alt="Gilberto de Souza" style={{ width: isMobile ? 180 : 280, height: 'auto', borderRadius: 8, justifySelf: isMobile ? 'center' : 'start' }} />
          <div>
            <p style={eyebrow(true)}>About the author</p>
            <h2 style={{ ...h2, color: '#FFFFFF' }}>Written by a man who lived it.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.84)', margin: '0 0 18px' }}>
              Gilberto de Souza was born in Brazil and has lived in the United States for 23 years, where he built his own construction company. At the height of that success he went through betrayal and deep emotional pain, and his faith is what carried him through it.
            </p>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: isMobile ? 19 : 22, lineHeight: 1.5, color: '#FFFFFF', margin: 0, borderLeft: `3px solid ${C.cyan}`, paddingLeft: 18 }}>
              “I wrote this book because I wanted someone to have written it for me when I needed it most.”
            </p>
          </div>
        </div>
      </section>

      {/* BUY */}
      <section id="buy" style={{ padding: pad }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', marginBottom: 34 }}>
            <p style={eyebrow(false)}>Get the book</p>
            <h2 style={{ ...h2, margin: '0 auto 10px' }}>Choose how you want to read it.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 18, alignItems: 'stretch' }}>
            <div style={{ background: C.card, border: `2px solid ${C.navy}`, borderRadius: 10, padding: 26, display: 'flex', flexDirection: 'column' }}>
              <p style={{ ...eyebrow(false), fontSize: 11 }}>Paperback</p>
              <h3 style={{ fontFamily: serif, fontSize: 24, margin: '0 0 10px' }}>Amazon</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: '0 0 22px', flex: 1 }}>The printed book, sold and shipped by Amazon. Price and delivery shown at checkout there.</p>
              <a href={AMAZON} target="_blank" rel="noopener noreferrer" style={{ ...btn(true), background: C.navy, color: '#FFFFFF', width: '100%' }}>Buy on Amazon</a>
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 10, padding: 26, display: 'flex', flexDirection: 'column' }}>
              <p style={{ ...eyebrow(false), fontSize: 11 }}>Paperback</p>
              <h3 style={{ fontFamily: serif, fontSize: 24, margin: '0 0 10px' }}>Barnes &amp; Noble</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: '0 0 22px', flex: 1 }}>The same printed book through the official Barnes &amp; Noble listing.</p>
              <a href={BARNES} target="_blank" rel="noopener noreferrer" style={{ ...btn(true), background: 'transparent', color: C.navy, border: `1.5px solid ${C.navy}`, width: '100%' }}>Buy at Barnes &amp; Noble</a>
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 10, padding: 26, display: 'flex', flexDirection: 'column' }}>
              <p style={{ ...eyebrow(false), fontSize: 11 }}>Read and listen today</p>
              <h3 style={{ fontFamily: serif, fontSize: 24, margin: '0 0 6px' }}>eBook + audiobook</h3>
              <p style={{ fontFamily: serif, fontSize: 34, fontWeight: 700, margin: '0 0 10px', color: C.navy }}>$24.99</p>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: C.mute, margin: '0 0 22px', flex: 1 }}>PDF eBook and MP3 audiobook, delivered by email after payment. One-time payment, 30-day money-back guarantee.</p>
              <button type="button" onClick={buyDigital} style={{ ...btn(true), background: 'transparent', color: C.navy, border: `1.5px solid ${C.navy}`, width: '100%' }}>Get instant access</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: pad, background: C.card, borderTop: `1px solid ${C.line}` }}>
        <div style={narrow}>
          <p style={eyebrow(false)}>Questions</p>
          <h2 style={h2}>Before you buy</h2>
          {faq.map((item, i) => (
            <div key={item.q} style={{ borderBottom: `1px solid ${C.line}` }}>
              <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, background: 'none', border: 'none', padding: '18px 0', cursor: 'pointer', textAlign: 'left', fontFamily: sans, fontSize: 17, fontWeight: 700, color: C.ink }}>
                <span>{item.q}</span>
                <span aria-hidden="true" style={{ fontSize: 22, color: C.navy, lineHeight: 1 }}>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <p style={{ fontSize: 16, lineHeight: 1.7, color: C.mute, margin: '0 0 20px' }}>{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CLOSE */}
      <section style={{ padding: pad, background: `linear-gradient(180deg, ${C.navy} 0%, ${C.deep} 100%)`, textAlign: 'center' }}>
        <div style={narrow}>
          <h2 style={{ ...h2, color: '#FFFFFF' }}>You are not alone, and this is not the end of your story.</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.82)', margin: '0 0 28px' }}>Start with chapter one tonight.</p>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, justifyContent: 'center' }}>
            <a href={AMAZON} target="_blank" rel="noopener noreferrer" style={btn(true)}>Get the paperback on Amazon</a>
            <button type="button" onClick={buyDigital} style={btn(false)}>eBook + audiobook · $24.99</button>
          </div>
        </div>
      </section>

    </div>
  );
}
