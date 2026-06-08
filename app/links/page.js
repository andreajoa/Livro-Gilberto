'use client'

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Headphones, ShoppingBag, Star, Globe2 } from 'lucide-react';

import bookCoverEN from '@/src/assets/book/capa-livro.png';
import authorImg from '@/src/assets/en/author.png';

const digitalLinks = [
  {
    eyebrow: 'Best option',
    title: 'Read the Book + Audiobook',
    subtitle: 'English edition • Instant access • Digital download',
    price: 'Website exclusive',
    href: 'https://www.gilberto-souza.com/en',
    cta: 'Start Reading Today',
    flag: '🇺🇸'
  },
  {
    eyebrow: 'Spanish edition',
    title: 'Leer Libro + Audiolibro',
    subtitle: 'Spanish edition • Instant access • Digital download',
    price: 'Acceso inmediato',
    href: 'https://www.gilberto-souza.com/es',
    cta: 'Leer Ahora',
    flag: '🇪🇸'
  },
];

const amazonLinks = [
  ['🇺🇸', 'Amazon', 'English Paperback', 'https://www.amazon.com/dp/B0H2LXHCH4'],
  ['🇪🇸', 'Amazon', 'Spanish Paperback', 'https://www.amazon.com/dp/B0H2LHZT7X'],
  ['🇧🇷', 'Amazon', 'Portuguese Paperback', 'https://www.amazon.com/dp/B0H2LM4TXH'],
];

const barnesLinks = [
  ['🇺🇸', 'Barnes & Noble', 'English Edition', 'https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504'],
  ['🇪🇸', 'Barnes & Noble', 'Spanish Edition', 'https://www.barnesandnoble.com/w/como-vencer-el-dolor-de-ser-reemplazado-por-otro-gilberto-de-souza/1150279538?ean=9786584622050'],
  ['🇧🇷', 'Barnes & Noble', 'Portuguese Edition', 'https://www.barnesandnoble.com/w/como-vencer-a-dor-de-ser-trocado-por-outro-gilberto-de-souza/1150279850?ean=9798256373542'],
];

const isMobileQuery = `
@media (max-width: 768px) {
  .linksHeroGrid {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
    text-align: center !important;
  }
  .linksHeroText {
    order: 1 !important;
  }
  .linksBook {
    order: 2 !important;
  }
  .linksAuthor {
    order: 3 !important;
  }
  .linksHeroTitle {
    font-size: 42px !important;
    letter-spacing: -1.2px !important;
  }
  .linksDigitalGrid {
    grid-template-columns: 1fr !important;
  }
  .linksRetailGrid {
    grid-template-columns: 1fr !important;
  }
  .linksHeroSection {
    padding: 92px 20px 54px !important;
  }
  .linksContent {
    padding: 54px 20px !important;
  }
  .linksAuthorImg {
    max-width: 260px !important;
  }
  .linksBookImg {
    width: 230px !important;
  }
}
`;

function PrimaryDigitalCard({ item, index }) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      viewport={{ once: true }}
      style={{
        textDecoration: 'none',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.045) 100%)',
        border: '1px solid rgba(0,196,212,0.22)',
        borderRadius: 22,
        padding: 24,
        display: 'grid',
        gap: 18,
        boxShadow: '0 24px 70px rgba(0,0,0,0.24), 0 0 60px rgba(0,196,212,0.06)',
        color: '#fff'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start' }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,184,0,0.12)',
            border: '1px solid rgba(255,184,0,0.24)',
            color: '#FFB800',
            borderRadius: 999,
            padding: '7px 12px',
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            marginBottom: 16
          }}>
            {item.eyebrow}
          </div>

          <h2 style={{ margin: 0, color: '#fff', fontSize: 26, lineHeight: 1.15, fontWeight: 900 }}>
            {item.flag} {item.title}
          </h2>

          <p style={{ margin: '10px 0 0', color: 'rgba(255,255,255,0.68)', fontSize: 15, lineHeight: 1.65 }}>
            {item.subtitle}
          </p>
        </div>

        <ArrowRight size={24} color="#00C4D4" />
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        color: '#EAF4FF',
        fontSize: 13,
        fontWeight: 700
      }}>
        <span style={pillStyle}><BookOpen size={15} /> eBook</span>
        <span style={pillStyle}><Headphones size={15} /> Audiobook</span>
        <span style={pillStyle}>⚡ Instant access</span>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #FFB800, #FF8A00)',
        color: '#0B1325',
        borderRadius: 12,
        padding: '15px 18px',
        fontSize: 15,
        fontWeight: 950,
        textAlign: 'center',
        boxShadow: '0 16px 36px rgba(255,138,0,0.22)'
      }}>
        {item.cta}
      </div>
    </motion.a>
  );
}

function RetailCard({ item }) {
  return (
    <a
      href={item[3]}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.035) 100%)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 18,
        padding: 18,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        color: '#fff',
        minHeight: 92
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.08)',
        fontSize: 26,
        flexShrink: 0
      }}>
        {item[0]}
      </div>

      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, color: '#fff', fontSize: 17, fontWeight: 900 }}>{item[1]}</p>
        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.64)', fontSize: 13 }}>{item[2]}</p>
      </div>

      <ArrowRight size={18} color="#00C4D4" />
    </a>
  );
}

const pillStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 999,
  padding: '8px 12px'
};

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 30px' }}>
      <p style={{
        margin: '0 0 12px',
        color: '#FFB800',
        fontSize: 11,
        letterSpacing: 4,
        textTransform: 'uppercase',
        fontWeight: 900
      }}>
        {eyebrow}
      </p>
      <h2 style={{
        margin: 0,
        color: '#fff',
        fontSize: 'clamp(28px, 4vw, 48px)',
        lineHeight: 1.08,
        fontWeight: 950,
        letterSpacing: -1
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          margin: '14px auto 0',
          color: 'rgba(255,255,255,0.66)',
          fontSize: 16,
          lineHeight: 1.75
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function LinksPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#060C18',
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      overflowX: 'hidden'
    }}>
      <style dangerouslySetInnerHTML={{ __html: isMobileQuery }} />

      <section
        className="linksHeroSection"
        style={{
          position: 'relative',
          padding: '110px 6vw 74px',
          background: 'linear-gradient(180deg, #07111f 0%, #0b1830 100%)',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 18% 18%, rgba(255,184,0,0.16) 0%, rgba(255,184,0,0.05) 24%, transparent 42%), radial-gradient(circle at 84% 16%, rgba(0,196,212,0.18) 0%, rgba(0,196,212,0.045) 26%, transparent 46%)'
        }} />

        <div
          className="linksHeroGrid"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 1160,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '320px minmax(0, 1fr) 300px',
            gap: 54,
            alignItems: 'center'
          }}
        >
          <div className="linksBook" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(0,196,212,0.16)',
              borderRadius: 28,
              padding: 28,
              boxShadow: '0 28px 90px rgba(0,0,0,0.40), 0 0 80px rgba(0,196,212,0.10)'
            }}>
              <img
                className="linksBookImg"
                src={bookCoverEN.src}
                alt="How to Overcome the Pain of Being Replaced by Someone Else"
                style={{
                  width: 240,
                  maxWidth: '100%',
                  borderRadius: 10,
                  display: 'block',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.50)'
                }}
              />
            </div>
          </div>

          <div className="linksHeroText">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,184,0,0.14)',
              border: '1px solid rgba(255,184,0,0.30)',
              borderRadius: 999,
              padding: '7px 14px',
              marginBottom: 18
            }}>
              <span style={{ width: 8, height: 8, background: '#FFB800', borderRadius: 999, display: 'inline-block' }} />
              <span style={{ fontSize: 11, color: '#FFE29A', fontWeight: 900, letterSpacing: 1 }}>
                OFFICIAL BOOK LINKS
              </span>
            </div>

            <h1
              className="linksHeroTitle"
              style={{
                fontSize: 'clamp(50px, 6vw, 82px)',
                fontWeight: 950,
                color: '#FFFFFF',
                lineHeight: 0.98,
                letterSpacing: -2,
                margin: '0 0 20px'
              }}
            >
              She left.<br />
              <span style={{ color: '#FFB800' }}>You broke.</span><br />
              Now rebuild<br />
              <span style={{ color: '#00C4D4' }}>stronger.</span>
            </h1>

            <p style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.78)',
              lineHeight: 1.75,
              maxWidth: 650,
              margin: '0 0 26px'
            }}>
              Choose the format that fits you best. Read the book, listen to the audiobook, or order the paperback from Amazon or Barnes & Noble.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10
            }}>
              {['📖 eBook', '🎧 Audiobook', '📚 Paperback', '🌎 Worldwide'].map((item) => (
                <span key={item} style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 999,
                  padding: '9px 14px',
                  fontSize: 13,
                  color: '#EAF4FF',
                  fontWeight: 700
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="linksAuthor" style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              className="linksAuthorImg"
              src={authorImg.src}
              alt="Gilberto Souza"
              style={{
                width: '100%',
                maxWidth: 280,
                borderRadius: 28,
                objectFit: 'cover',
                boxShadow: '0 26px 80px rgba(0,0,0,0.36)',
                border: '1px solid rgba(0,196,212,0.16)'
              }}
            />
          </div>
        </div>
      </section>

      <section className="linksContent" style={{
        padding: '74px 6vw',
        background: 'linear-gradient(180deg, #060C18 0%, #081225 55%, #060C18 100%)'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionTitle
            eyebrow="Start here"
            title="Read it today. Listen tonight."
            subtitle="For most readers, the digital edition is the fastest way to start: eBook + full audiobook together."
          />

          <div className="linksDigitalGrid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 20,
            marginBottom: 70
          }}>
            {digitalLinks.map((item, index) => (
              <PrimaryDigitalCard key={item.href} item={item} index={index} />
            ))}
          </div>

          <SectionTitle
            eyebrow="Paperback editions"
            title="Want the physical book?"
            subtitle="Order your paperback through the retailer you already trust."
          />

          <div style={{ marginBottom: 34 }}>
            <p style={{
              color: '#00C4D4',
              fontSize: 12,
              letterSpacing: 3.5,
              fontWeight: 900,
              textTransform: 'uppercase',
              margin: '0 0 18px'
            }}>
              Amazon
            </p>

            <div className="linksRetailGrid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 16
            }}>
              {amazonLinks.map((item) => <RetailCard key={item[3]} item={item} />)}
            </div>
          </div>

          <div>
            <p style={{
              color: '#00C4D4',
              fontSize: 12,
              letterSpacing: 3.5,
              fontWeight: 900,
              textTransform: 'uppercase',
              margin: '0 0 18px'
            }}>
              Barnes & Noble
            </p>

            <div className="linksRetailGrid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 16
            }}>
              {barnesLinks.map((item) => <RetailCard key={item[3]} item={item} />)}
            </div>
          </div>

          <section style={{
            marginTop: 70,
            background: 'linear-gradient(135deg, rgba(255,184,0,0.12), rgba(0,196,212,0.10))',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 24,
            padding: '34px 24px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginBottom: 18 }}>
              {[1,2,3,4,5].map((i) => <Star key={i} size={18} fill="#FFB800" color="#FFB800" />)}
            </div>

            <p style={{
              color: '#fff',
              fontSize: 'clamp(22px, 3vw, 34px)',
              lineHeight: 1.45,
              maxWidth: 850,
              margin: '0 auto',
              fontWeight: 800
            }}>
              “I didn’t write this book because I had all the answers. I wrote it because I was trying to survive the pain myself.”
            </p>

            <p style={{
              margin: '20px 0 0',
              color: '#00C4D4',
              fontSize: 12,
              letterSpacing: 3,
              fontWeight: 900,
              textTransform: 'uppercase'
            }}>
              — Gilberto Souza
            </p>
          </section>

          <footer style={{
            marginTop: 44,
            paddingTop: 28,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 18,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.58)',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: 'uppercase'
          }}>
            <div><Globe2 size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Available worldwide</div>
            <div><BookOpen size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Ebook • Audiobook • Paperback</div>
            <div><ShoppingBag size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Official author links</div>
          </footer>
        </div>
      </section>
    </main>
  );
}
