'use client'
import { useState, useEffect } from 'react'

export default function LinksPage() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const ebook_links = [
    { icon: "🌎", title: "Read Book + Audiobook",   sub: "English · Ebook & Audiobook",    href: "https://www.gilberto-souza.com/en" },
    { icon: "🌎", title: "Leer Libro + Audiolibro", sub: "Español · Ebook & Audiolibro",  href: "https://www.gilberto-souza.com/es" },
    { icon: "🌎", title: "Ler Livro + Audiobook",   sub: "Português · Ebook & Audiobook", href: "https://www.gilberto-souza.com" },
  ]

  const pb_links = [
    { icon: "🇺🇸", lang: "English",    hrefa: "https://www.amazon.com/dp/B0H2LXHCH4", hrefb: "https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504" },
    { icon: "🇪🇸", lang: "Español",   hrefa: "https://www.amazon.com/dp/B0H2LHZT7X", hrefb: "https://www.barnesandnoble.com/w/como-vencer-el-dolor-de-ser-reemplazado-por-otro-gilberto-de-souza/1150279538?ean=9786584622050" },
    { icon: "🇧🇷", lang: "Português", hrefa: "https://www.amazon.com/dp/B0H2LM4TXH", hrefb: "https://www.barnesandnoble.com/w/como-vencer-a-dor-de-ser-trocado-por-outro-gilberto-de-souza/1150279850?ean=9798256373542" },
  ]

  const cardStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', border: '1px solid #B8D8EE', borderRadius: 18, padding: '18px 22px', textDecoration: 'none', boxShadow: '0 3px 18px rgba(0,80,140,0.09)', cursor: 'pointer', marginBottom: 0 }
  const pbCard = { display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #B8D8EE', borderRadius: 16, padding: '15px 16px', textDecoration: 'none', boxShadow: '0 2px 14px rgba(0,80,140,0.08)', cursor: 'pointer' }
  const divider = (label) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#80B8D8)' }} />
      <span style={{ fontSize: 9, letterSpacing: 2.5, color: '#0E3050', fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#80B8D8,transparent)' }} />
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#B8D6EE 0%,#E8F3FA 60%,#DCEcF5 100%)', fontFamily: 'Inter,Helvetica Neue,sans-serif', overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg,#6AB0DC 0%,#96CCEC 28%,#BCE0F6 62%,#D8EEF8 100%)', position: 'relative', overflow: 'hidden', paddingBottom: 0 }}>
        <div style={{ position: 'absolute', top: -150, right: -150, width: 650, height: 650, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.20) 0%,transparent 65%)', pointerEvents: 'none' }} />

        {isMobile ? (
          /* ── MOBILE HERO ── */
          <div style={{ padding: '36px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* foto e livro lado a lado centralizados */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 20, marginBottom: 28 }}>
              <div style={{ width: 140, height: 200, borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 55px rgba(0,40,110,0.30)', border: '3px solid rgba(255,255,255,0.45)', background: '#8AAEC8', flexShrink: 0 }}>
                <img src='/links-assets/author-en.png' alt='Gilberto Souza' style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
              <div style={{ width: 110, flexShrink: 0, filter: 'drop-shadow(0 18px 36px rgba(0,30,100,0.36))', paddingBottom: 0 }}>
                <img src='/links-assets/book-en.png' alt='Book' style={{ width: '100%', display: 'block', borderRadius: 8 }} />
              </div>
            </div>
            {/* texto centralizado */}
            <p style={{ fontSize: 11, letterSpacing: 4, color: '#0E2E48', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 4px', textAlign: 'center' }}>GILBERTO SOUZA</p>
            <p style={{ fontSize: 10, letterSpacing: 3, color: '#0F78A0', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 10px', textAlign: 'center' }}>AUTHOR</p>
            <div style={{ width: 44, height: 2, background: 'linear-gradient(90deg,#1580A8,#4BBCD8)', margin: '0 auto 18px', borderRadius: 2 }} />
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#061420', lineHeight: 1.12, margin: '0 0 10px', letterSpacing: -0.5, textAlign: 'center' }}>She chose<br/>someone else.</h1>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0D6888', lineHeight: 1.3, margin: '0 0 14px', fontStyle: 'italic', textAlign: 'center' }}>I wrote about<br/>what happened next.</h2>
            <p style={{ fontSize: 14, color: '#1E4258', lineHeight: 1.7, margin: '0 0 18px', textAlign: 'center' }}>A book about betrayal, heartbreak and rebuilding your life.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 11, color: '#1E4A6A', fontWeight: 700, letterSpacing: 1 }}>
              <span>EBOOK</span><span style={{ color: '#6AAAC8' }}>|</span>
              <span>AUDIOBOOK</span><span style={{ color: '#6AAAC8' }}>|</span>
              <span>PAPERBACK</span>
            </div>
          </div>
        ) : (
          /* ── DESKTOP HERO ── */
          <div style={{ maxWidth: 1060, margin: '0 auto', padding: '56px 36px 52px', display: 'grid', gridTemplateColumns: '240px 1fr 190px', gap: 40, alignItems: 'flex-end' }}>
            <div style={{ width: 240, height: 350, borderRadius: 20, overflow: 'hidden', flexShrink: 0, boxShadow: '0 32px 80px rgba(0,40,110,0.34)', background: '#8AAEC8', border: '3px solid rgba(255,255,255,0.42)' }}>
              <img src='/links-assets/author-en.png' alt='Gilberto Souza' style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
            <div style={{ textAlign: 'center', paddingBottom: 16 }}>
              <p style={{ fontSize: 12, letterSpacing: 4, color: '#0E2E48', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 4px' }}>GILBERTO SOUZA</p>
              <p style={{ fontSize: 10, letterSpacing: 3, color: '#0F78A0', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 14px' }}>AUTHOR</p>
              <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg,#1580A8,#4BBCD8)', margin: '0 auto 26px', borderRadius: 2 }} />
              <h1 style={{ fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 900, color: '#061420', lineHeight: 1.1, margin: '0 0 14px', letterSpacing: -1 }}>She chose<br/>someone else.</h1>
              <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#0D6888', lineHeight: 1.3, margin: '0 0 18px', fontStyle: 'italic' }}>I wrote about<br/>what happened next.</h2>
              <p style={{ fontSize: 15, color: '#1E4258', lineHeight: 1.7, margin: '0 0 24px' }}>A book about betrayal, heartbreak<br/>and rebuilding your life.</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontSize: 12, color: '#1E4A6A', fontWeight: 700, letterSpacing: 1 }}>
                <span>EBOOK</span><span style={{ color: '#6AAAC8' }}>|</span>
                <span>AUDIOBOOK</span><span style={{ color: '#6AAAC8' }}>|</span>
                <span>PAPERBACK</span>
              </div>
            </div>
            <div style={{ width: 190, flexShrink: 0, filter: 'drop-shadow(0 28px 56px rgba(0,30,100,0.40))' }}>
              <img src='/links-assets/book-en.png' alt='How to Overcome the Pain of Being Replaced' style={{ width: '100%', display: 'block', borderRadius: 12 }} />
            </div>
          </div>
        )}
      </section>

      {/* LINKS */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: isMobile ? '32px 16px 0' : '40px 20px 0' }}>
        {divider("READ THE BOOK + AUDIOBOOK")}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {ebook_links.map((item, i) => (
            <a key={i} href={item.href} target='_blank' rel='noopener noreferrer' style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 26 }}>{item.icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: isMobile ? 15 : 16, fontWeight: 800, color: '#061420' }}>{item.title}</p>
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#1580A8', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 3 }}>{item.sub}</p>
                </div>
              </div>
              <span style={{ color: '#7AB0CC', fontSize: 26, fontWeight: 200, flexShrink: 0 }}>&#x203A;</span>
            </a>
          ))}
        </div>

        {divider("PAPERBACK")}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
          {pb_links.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <a href={row.hrefa} target='_blank' rel='noopener noreferrer' style={pbCard}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{row.icon}</span>
                <div><p style={{ margin: 0, fontSize: isMobile ? 13 : 14, fontWeight: 800, color: '#061420' }}>Amazon</p><p style={{ margin: 0, fontSize: 10, color: '#1580A8', fontWeight: 600, marginTop: 2 }}>{row.lang}</p></div>
              </a>
              <a href={row.hrefb} target='_blank' rel='noopener noreferrer' style={pbCard}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{row.icon}</span>
                <div><p style={{ margin: 0, fontSize: isMobile ? 13 : 14, fontWeight: 800, color: '#061420' }}>Barnes & Noble</p><p style={{ margin: 0, fontSize: 10, color: '#1580A8', fontWeight: 600, marginTop: 2 }}>{row.lang}</p></div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ maxWidth: 700, margin: '0 auto 44px', padding: '0 20px' }}>
        <div style={{ background: 'linear-gradient(135deg,#7ABCE0 0%,#AADCF4 100%)', border: '1px solid #80B8DC', borderRadius: 22, overflow: 'hidden', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 140px', minHeight: 170 }}>
          <div style={{ padding: isMobile ? '28px 22px 24px' : '32px 28px 28px' }}>
            <div style={{ fontSize: 40, color: '#0A6090', lineHeight: 1, marginBottom: 12, fontFamily: 'Georgia,serif' }}>“</div>
            <p style={{ fontSize: isMobile ? 15 : 16, color: '#061420', lineHeight: 1.7, fontStyle: 'italic', fontWeight: 500, margin: '0 0 14px' }}>I did not write this book because I had answers. I wrote it because I was trying to survive the pain myself.</p>
            <p style={{ fontSize: 10, letterSpacing: 2, color: '#0A6090', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>— GILBERTO SOUZA</p>
          </div>
          {!isMobile && (
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img src='/links-assets/author-en.png' alt='' style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.50 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#7ABCE0 0%,transparent 55%)' }} />
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #90C0DC', padding: '26px 20px', textAlign: 'center', background: 'linear-gradient(180deg,#AACCE8 0%,#C0DCEE 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 16, fontSize: 10, color: '#1A3A55', fontWeight: 700, letterSpacing: 1.8, textTransform: 'uppercase' }}>
          <span>Available Worldwide</span><span>Ebook · Audiobook · Paperback</span>
        </div>
        <p style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontSize: 24, color: '#061420', margin: '0 0 4px', fontWeight: 400 }}>Gilberto Souza</p>
        <p style={{ fontSize: 9, letterSpacing: 3.5, color: '#4A7A9A', textTransform: 'uppercase', margin: 0 }}>AUTHOR</p>
      </footer>

    </main>
  )
}
