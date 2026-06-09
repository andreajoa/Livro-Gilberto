'use client'

export default function LinksPage() {
  const mainLinks = [
    { icon: '\U0001f310', title: 'Read Book + Audiobook', sub: 'English · ebook & audiobook', href: 'https://www.gilberto-souza.com/en' },
    { icon: '\U0001f310', title: 'Leer Libro + Audiolibro', sub: 'Español · ebook & audiolibro', href: 'https://www.gilberto-souza.com/es' },
  ]

  const gridLinks = [
    { icon: '\U0001f1fa\U0001f1f8', store: 'Amazon', lang: 'English', hrefa: 'https://www.amazon.com/dp/B0H2LXHCH4', storeb: 'Barnes & Noble', hrefb: 'https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504' },
    { icon: '\U0001f1ea\U0001f1f8', store: 'Amazon', lang: 'Español', hrefa: 'https://www.amazon.com/dp/B0H2LHZT7X', storeb: 'Barnes & Noble', hrefb: 'https://www.barnesandnoble.com/w/como-vencer-el-dolor-de-ser-reemplazado-por-otro-gilberto-de-souza/1150279538?ean=9786584622050' },
    { icon: '\U0001f1e7\U0001f1f7', store: 'Amazon', lang: 'Português', hrefa: 'https://www.amazon.com/dp/B0H2LM4TXH', storeb: 'Barnes & Noble', hrefb: 'https://www.barnesandnoble.com/w/como-vencer-a-dor-de-ser-trocado-por-outro-gilberto-de-souza/1150279850?ean=9798256373542' },
  ]

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#B8D4EC 0%,#EAF3FA 50%,#E0EDF7 100%)', fontFamily: 'Inter,Helvetica Neue,sans-serif', overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg,#A0C8E8 0%,#CCE6F8 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,150,210,0.14) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,100,180,0.10) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 44px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'flex-end' }}>

          {/* Author photo — GRANDE */}
          <div style={{ width: 180, height: 260, borderRadius: 16, overflow: 'hidden', flexShrink: 0, boxShadow: '0 20px 60px rgba(0,60,120,0.28)', background: '#9ABCD4' }}>
            <img src="/links-assets/author-en.png" alt="Gilberto Souza" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>

          {/* Center text */}
          <div style={{ textAlign: 'center', paddingBottom: 8 }}>
            <p style={{ fontSize: 11, letterSpacing: 3.5, color: '#1E4A68', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 4px' }}>GILBERTO SOUZA</p>
            <p style={{ fontSize: 10, letterSpacing: 2.5, color: '#1A90B8', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 12px' }}>AUTHOR</p>
            <div style={{ width: 40, height: 2, background: 'linear-gradient(90deg,#1A90B8,#5BC0D8)', margin: '0 auto 20px', borderRadius: 2 }} />
            <h1 style={{ fontSize: 'clamp(24px,4.5vw,40px)', fontWeight: 900, color: '#0A1E30', lineHeight: 1.15, margin: '0 0 10px', letterSpacing: -0.5 }}>She chose<br/>someone else.</h1>
            <h2 style={{ fontSize: 'clamp(18px,3.2vw,28px)', fontWeight: 700, color: '#1A7FAA', lineHeight: 1.3, margin: '0 0 14px', fontStyle: 'italic' }}>I wrote about<br/>what happened next.</h2>
            <p style={{ fontSize: 14, color: '#3A5A70', lineHeight: 1.65, margin: '0 0 20px' }}>A book about betrayal, heartbreak<br/>and rebuilding your life.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontSize: 11, color: '#3A6080', fontWeight: 700, letterSpacing: 0.5, flexWrap: 'wrap' }}>
              <span>EBOOK</span>
              <span style={{ color: '#90B8D0' }}>|</span>
              <span>AUDIOBOOK</span>
              <span style={{ color: '#90B8D0' }}>|</span>
              <span>PAPERBACK</span>
            </div>
          </div>

          {/* Book cover — GRANDE */}
          <div style={{ width: 150, flexShrink: 0, filter: 'drop-shadow(0 20px 40px rgba(0,50,120,0.32))' }}>
            <img src="/links-assets/book-en.png" alt="How to Overcome the Pain of Being Replaced" style={{ width: '100%', display: 'block', borderRadius: 8 }} />
          </div>
        </div>
      </section>

      {/* MAIN LINKS — EBOOK + AUDIOBOOK */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '36px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#9ABCD4)' }} />
          <span style={{ fontSize: 9, letterSpacing: 2.5, color: '#2A5878', fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>READ THE BOOK + AUDIOBOOK</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#9ABCD4,transparent)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {mainLinks.map((item, i) => (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', border: '1px solid #C0DCF0', borderRadius: 16, padding: '18px 22px', textDecoration: 'none', boxShadow: '0 3px 16px rgba(0,80,140,0.09)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 26 }}>{item.icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0A1E30', lineHeight: 1.3 }}>{item.title}</p>
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#1A90B8', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 3 }}>{item.sub}</p>
                </div>
              </div>
              <span style={{ color: '#88B4CC', fontSize: 24, fontWeight: 200, flexShrink: 0 }}>›</span>
            </a>
          ))}
        </div>

        {/* PAPERBACK SECTION */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#9ABCD4)' }} />
          <span style={{ fontSize: 9, letterSpacing: 2.5, color: '#2A5878', fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>PAPERBACK</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#9ABCD4,transparent)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
          {gridLinks.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <a href={row.hrefa} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #C0DCF0', borderRadius: 14, padding: '14px 16px', textDecoration: 'none', boxShadow: '0 2px 12px rgba(0,80,140,0.08)' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{row.icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: '#0A1E30' }}>Amazon</p>
                  <p style={{ margin: 0, fontSize: 10, color: '#1A90B8', fontWeight: 600, marginTop: 2 }}>{row.lang}</p>
                </div>
              </a>
              <a href={row.hrefb} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #C0DCF0', borderRadius: 14, padding: '14px 16px', textDecoration: 'none', boxShadow: '0 2px 12px rgba(0,80,140,0.08)' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{row.icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: '#0A1E30' }}>Barnes & Noble</p>
                  <p style={{ margin: 0, fontSize: 10, color: '#1A90B8', fontWeight: 600, marginTop: 2 }}>{row.lang}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ maxWidth: 680, margin: '0 auto 40px', padding: '0 20px' }}>
        <div style={{ background: 'linear-gradient(135deg,#A8CCEC 0%,#CCE4F5 100%)', border: '1px solid #98C0E4', borderRadius: 20, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 130px', minHeight: 160 }}>
          <div style={{ padding: '30px 26px 26px' }}>
            <div style={{ fontSize: 38, color: '#1A7FAA', lineHeight: 1, marginBottom: 10, fontFamily: 'Georgia,serif' }}>"</div>
            <p style={{ fontSize: 15, color: '#0A1E30', lineHeight: 1.7, fontStyle: 'italic', fontWeight: 500, margin: '0 0 14px' }}>I did not write this book because I had answers. I wrote it because I was trying to survive the pain myself.</p>
            <p style={{ fontSize: 10, letterSpacing: 2, color: '#1A7FAA', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>— GILBERTO SOUZA</p>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src="/links-assets/author-en.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.48 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#A8CCEC 0%,transparent 55%)' }} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #A8C8E0', padding: '24px 20px', textAlign: 'center', background: '#C0D8EE' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 14, fontSize: 10, color: '#3A5870', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
          <span>Available Worldwide</span>
          <span>Ebook · Audiobook · Paperback</span>
        </div>
        <p style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontSize: 22, color: '#0A1E30', margin: '0 0 4px', fontWeight: 400 }}>Gilberto Souza</p>
        <p style={{ fontSize: 9, letterSpacing: 3, color: '#6A8AA0', textTransform: 'uppercase', margin: 0 }}>AUTHOR</p>
      </footer>

    </main>
  )
}
