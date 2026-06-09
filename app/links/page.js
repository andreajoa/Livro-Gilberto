'use client'

export default function LinksPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#B8D6EE 0%,#E8F3FA 60%,#DCEcF5 100%)', fontFamily: 'Inter,Helvetica Neue,sans-serif', overflowX: 'hidden' }}>

      <style>{`
        @media (max-width: 640px) {
          .lhg { grid-template-columns: 1fr !important; }
          .lhg .lph { width: 130px !important; height: 185px !important; }
          .lhg .lbk { width: 110px !important; }
          .lph-wrap { display: flex !important; flex-direction: row !important; justify-content: center !important; gap: 20px !important; margin-bottom: 20px !important; }
          .lhc { order: 2 !important; }
          .lpbp { grid-template-columns: 1fr 1fr !important; }
          .lqg { grid-template-columns: 1fr !important; }
          .lqimg { display: none !important; }
        }
        .lcard:hover { box-shadow: 0 8px 30px rgba(0,100,180,0.18) !important; border-color: #1A90B8 !important; transform: translateY(-2px) !important; }
        .lcard { transition: all 0.18s ease !important; }
      `}</style>

      <section style={{ background: 'linear-gradient(160deg,#6AB0DC 0%,#96CCEC 28%,#BCE0F6 62%,#D8EEF8 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -150, right: -150, width: 650, height: 650, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.20) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,100,180,0.10) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div className='lhg' style={{ maxWidth: 1000, margin: '0 auto', padding: '52px 28px 48px', display: 'grid', gridTemplateColumns: '220px 1fr 175px', gap: 36, alignItems: 'flex-end' }}>

          <div style={{ width: 220, height: 320, borderRadius: 18, overflow: 'hidden', flexShrink: 0, boxShadow: '0 28px 72px rgba(0,40,110,0.32)', background: '#8AAEC8', border: '3px solid rgba(255,255,255,0.42)' }} className='lph'>
            <img src='/links-assets/author-en.png' alt='Gilberto Souza' style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>

          <div className='lhc' style={{ textAlign: 'center', paddingBottom: 12 }}>
            <p style={{ fontSize: 11, letterSpacing: 4, color: '#0E2E48', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 4px' }}>GILBERTO SOUZA</p>
            <p style={{ fontSize: 10, letterSpacing: 3, color: '#0F78A0', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 12px' }}>AUTHOR</p>
            <div style={{ width: 44, height: 2, background: 'linear-gradient(90deg,#1580A8,#4BBCD8)', margin: '0 auto 22px', borderRadius: 2 }} />
            <h1 style={{ fontSize: 'clamp(26px,4.5vw,46px)', fontWeight: 900, color: '#061420', lineHeight: 1.12, margin: '0 0 12px', letterSpacing: -0.8 }}>She chose<br/>someone else.</h1>
            <h2 style={{ fontSize: 'clamp(19px,3vw,30px)', fontWeight: 700, color: '#0D6888', lineHeight: 1.3, margin: '0 0 16px', fontStyle: 'italic' }}>I wrote about<br/>what happened next.</h2>
            <p style={{ fontSize: 14, color: '#1E4258', lineHeight: 1.7, margin: '0 0 22px' }}>A book about betrayal, heartbreak<br/>and rebuilding your life.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 11, color: '#1E4A6A', fontWeight: 700, letterSpacing: 1, flexWrap: 'wrap' }}>
              <span>EBOOK</span><span style={{ color: '#6AAAC8' }}>|</span>
              <span>AUDIOBOOK</span><span style={{ color: '#6AAAC8' }}>|</span>
              <span>PAPERBACK</span>
            </div>
          </div>

          <div className='lbk' style={{ width: 175, flexShrink: 0, filter: 'drop-shadow(0 24px 50px rgba(0,30,100,0.38))' }}>
            <img src='/links-assets/book-en.png' alt='How to Overcome the Pain of Being Replaced' style={{ width: '100%', display: 'block', borderRadius: 10 }} />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 0' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#80B8D8)' }} />
          <span style={{ fontSize: 9, letterSpacing: 2.5, color: '#0E3050', fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>READ THE BOOK + AUDIOBOOK</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#80B8D8,transparent)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          <a className='lcard' href='https://www.gilberto-souza.com/en' target='_blank' rel='noopener noreferrer' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', border: '1px solid #B8D8EE', borderRadius: 18, padding: '18px 22px', textDecoration: 'none', boxShadow: '0 3px 18px rgba(0,80,140,0.09)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 28 }}>🌎</span>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#061420', lineHeight: 1.3 }}>Read Book + Audiobook</p>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#1580A8', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 3 }}>English · Ebook & Audiobook</p>
              </div>
            </div>
            <span style={{ color: '#7AB0CC', fontSize: 26, fontWeight: 200, flexShrink: 0 }}>&#x203A;</span>
          </a>
          <a className='lcard' href='https://www.gilberto-souza.com/es' target='_blank' rel='noopener noreferrer' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', border: '1px solid #B8D8EE', borderRadius: 18, padding: '18px 22px', textDecoration: 'none', boxShadow: '0 3px 18px rgba(0,80,140,0.09)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 28 }}>🌎</span>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#061420', lineHeight: 1.3 }}>Leer Libro + Audiolibro</p>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#1580A8', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 3 }}>Español · Ebook & Audiolibro</p>
              </div>
            </div>
            <span style={{ color: '#7AB0CC', fontSize: 26, fontWeight: 200, flexShrink: 0 }}>&#x203A;</span>
          </a>
          <a className='lcard' href='https://www.gilberto-souza.com' target='_blank' rel='noopener noreferrer' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', border: '1px solid #B8D8EE', borderRadius: 18, padding: '18px 22px', textDecoration: 'none', boxShadow: '0 3px 18px rgba(0,80,140,0.09)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 28 }}>🌎</span>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#061420', lineHeight: 1.3 }}>Ler Livro + Audiobook</p>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#1580A8', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 3 }}>Português · Ebook & Audiobook</p>
              </div>
            </div>
            <span style={{ color: '#7AB0CC', fontSize: 26, fontWeight: 200, flexShrink: 0 }}>&#x203A;</span>
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,#80B8D8)' }} />
          <span style={{ fontSize: 9, letterSpacing: 2.5, color: '#0E3050', fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>PAPERBACK</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,#80B8D8,transparent)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
          <div className='lpbp' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <a className='lcard' href='https://www.amazon.com/dp/B0H2LXHCH4' target='_blank' rel='noopener noreferrer' style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #B8D8EE', borderRadius: 16, padding: '15px 16px', textDecoration: 'none', boxShadow: '0 2px 14px rgba(0,80,140,0.08)', cursor: 'pointer' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>🇺🇸</span>
              <div><p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#061420' }}>Amazon</p><p style={{ margin: 0, fontSize: 10, color: '#1580A8', fontWeight: 600, marginTop: 2 }}>English</p></div>
            </a>
            <a className='lcard' href='https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504' target='_blank' rel='noopener noreferrer' style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #B8D8EE', borderRadius: 16, padding: '15px 16px', textDecoration: 'none', boxShadow: '0 2px 14px rgba(0,80,140,0.08)', cursor: 'pointer' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>🇺🇸</span>
              <div><p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#061420' }}>Barnes & Noble</p><p style={{ margin: 0, fontSize: 10, color: '#1580A8', fontWeight: 600, marginTop: 2 }}>English</p></div>
            </a>
          </div>
          <div className='lpbp' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <a className='lcard' href='https://www.amazon.com/dp/B0H2LHZT7X' target='_blank' rel='noopener noreferrer' style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #B8D8EE', borderRadius: 16, padding: '15px 16px', textDecoration: 'none', boxShadow: '0 2px 14px rgba(0,80,140,0.08)', cursor: 'pointer' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>🇪🇸</span>
              <div><p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#061420' }}>Amazon</p><p style={{ margin: 0, fontSize: 10, color: '#1580A8', fontWeight: 600, marginTop: 2 }}>Español</p></div>
            </a>
            <a className='lcard' href='https://www.barnesandnoble.com/w/como-vencer-el-dolor-de-ser-reemplazado-por-otro-gilberto-de-souza/1150279538?ean=9786584622050' target='_blank' rel='noopener noreferrer' style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #B8D8EE', borderRadius: 16, padding: '15px 16px', textDecoration: 'none', boxShadow: '0 2px 14px rgba(0,80,140,0.08)', cursor: 'pointer' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>🇪🇸</span>
              <div><p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#061420' }}>Barnes & Noble</p><p style={{ margin: 0, fontSize: 10, color: '#1580A8', fontWeight: 600, marginTop: 2 }}>Español</p></div>
            </a>
          </div>
          <div className='lpbp' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <a className='lcard' href='https://www.amazon.com/dp/B0H2LM4TXH' target='_blank' rel='noopener noreferrer' style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #B8D8EE', borderRadius: 16, padding: '15px 16px', textDecoration: 'none', boxShadow: '0 2px 14px rgba(0,80,140,0.08)', cursor: 'pointer' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>🇧🇷</span>
              <div><p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#061420' }}>Amazon</p><p style={{ margin: 0, fontSize: 10, color: '#1580A8', fontWeight: 600, marginTop: 2 }}>Português</p></div>
            </a>
            <a className='lcard' href='https://www.barnesandnoble.com/w/como-vencer-a-dor-de-ser-trocado-por-outro-gilberto-de-souza/1150279850?ean=9798256373542' target='_blank' rel='noopener noreferrer' style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', border: '1px solid #B8D8EE', borderRadius: 16, padding: '15px 16px', textDecoration: 'none', boxShadow: '0 2px 14px rgba(0,80,140,0.08)', cursor: 'pointer' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>🇧🇷</span>
              <div><p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#061420' }}>Barnes & Noble</p><p style={{ margin: 0, fontSize: 10, color: '#1580A8', fontWeight: 600, marginTop: 2 }}>Português</p></div>
            </a>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 700, margin: '0 auto 44px', padding: '0 20px' }}>
        <div className='lqg' style={{ background: 'linear-gradient(135deg,#7ABCE0 0%,#AADCF4 100%)', border: '1px solid #80B8DC', borderRadius: 22, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 140px', minHeight: 170 }}>
          <div style={{ padding: '32px 28px 28px' }}>
            <div style={{ fontSize: 40, color: '#0A6090', lineHeight: 1, marginBottom: 12, fontFamily: 'Georgia,serif' }}>“</div>
            <p style={{ fontSize: 16, color: '#061420', lineHeight: 1.7, fontStyle: 'italic', fontWeight: 500, margin: '0 0 14px' }}>I did not write this book because I had answers. I wrote it because I was trying to survive the pain myself.</p>
            <p style={{ fontSize: 10, letterSpacing: 2, color: '#0A6090', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>— GILBERTO SOUZA</p>
          </div>
          <div className='lqimg' style={{ position: 'relative', overflow: 'hidden' }}>
            <img src='/links-assets/author-en.png' alt='' style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.50 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#7ABCE0 0%,transparent 55%)' }} />
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #90C0DC', padding: '26px 20px', textAlign: 'center', background: 'linear-gradient(180deg,#AACCE8 0%,#C0DCEE 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 16, fontSize: 10, color: '#1A3A55', fontWeight: 700, letterSpacing: 1.8, textTransform: 'uppercase' }}>
          <span>Available Worldwide</span>
          <span>Ebook · Audiobook · Paperback</span>
        </div>
        <p style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontSize: 24, color: '#061420', margin: '0 0 4px', fontWeight: 400 }}>Gilberto Souza</p>
        <p style={{ fontSize: 9, letterSpacing: 3.5, color: '#4A7A9A', textTransform: 'uppercase', margin: 0 }}>AUTHOR</p>
      </footer>

    </main>
  )
}