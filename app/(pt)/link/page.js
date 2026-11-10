'use client'
import { useState, useEffect } from 'react'

export default function LinkPage() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const ebook_links = [
    { icon: "🌎", title: "Ler Livro + Audiobook",   sub: "Português · Ebook & Audiobook",   href: "https://www.gilberto-souza.com" },
    { icon: "🌎", title: "Read Book + Audiobook",   sub: "English · Ebook & Audiobook",    href: "https://www.gilberto-souza.com/en" },
    { icon: "🌎", title: "Leer Libro + Audiolibro", sub: "Español · Ebook & Audiolibro",  href: "https://www.gilberto-souza.com/es" },
  ]

  const pb_links = [
    { icon: "🇧🇷", lang: "Português", hrefa: "https://www.amazon.com/dp/B0H2LM4TXH", hrefb: "https://www.barnesandnoble.com/w/como-vencer-a-dor-de-ser-trocado-por-outro-gilberto-de-souza/1150279850?ean=9798256373542" },
    { icon: "🇺🇸", lang: "English",    hrefa: "https://www.amazon.com/dp/B0H2LXHCH4", hrefb: "https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504" },
    { icon: "🇪🇸", lang: "Español",   hrefa: "https://www.amazon.com/dp/B0H2LHZT7X", hrefb: "https://www.barnesandnoble.com/w/como-vencer-el-dolor-de-ser-reemplazado-por-otro-gilberto-de-souza/1150279538?ean=9786584622050" },
  ]

  const divider = (label) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.20))' }} />
      <span style={{ fontSize: 9, letterSpacing: 2.5, color: 'rgba(255,255,255,0.50)', fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(255,255,255,0.20),transparent)' }} />
    </div>
  )

  const cardStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 18, padding: '18px 22px', textDecoration: 'none', cursor: 'pointer' }
  const pbCard   = { display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '15px 16px', textDecoration: 'none', cursor: 'pointer' }

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#0A1420 0%,#0F1E30 50%,#0D1A28 100%)', fontFamily: 'Inter,Helvetica Neue,sans-serif', overflowX: 'hidden' }}>

      {/* HERO — mobile 1024x1536 (150%) | desktop 1536x1024 (66.67%) — sem corte */}
      <section style={{ position: 'relative', width: '100%', paddingBottom: isMobile ? '150%' : '66.67%', overflow: 'hidden' }}>

        <img
          src={isMobile ? '/links-assets/hero-mobile-pt.png' : '/links-assets/hero-desktop-pt.png'}
          alt='Gilberto Souza — Autor'
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
        />

        <div style={{ position: 'absolute', inset: 0,
          background: isMobile
            ? 'linear-gradient(to top, rgba(8,16,28,0.97) 0%, rgba(8,16,28,0.55) 35%, rgba(8,16,28,0.10) 60%, transparent 100%)'
            : 'linear-gradient(to right, rgba(8,16,28,0.93) 0%, rgba(8,16,28,0.70) 32%, rgba(8,16,28,0.20) 58%, transparent 100%)'
        }} />

        {isMobile ? (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: 10, letterSpacing: 4, color: '#7EC8E8', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 3px', textAlign: 'center' }}>GILBERTO SOUZA</p>
            <p style={{ fontSize: 9, letterSpacing: 3, color: '#5AAAC8', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 12px', textAlign: 'center' }}>AUTOR</p>
            <div style={{ width: 40, height: 2, background: 'linear-gradient(90deg,#1A90C8,#4BBCD8)', margin: '0 auto 16px', borderRadius: 2 }} />
            <h1 style={{ fontSize: 30, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1, margin: '0 0 10px', letterSpacing: -0.5, textAlign: 'center', textShadow: '0 2px 14px rgba(0,0,0,0.7)' }}>Ela escolheu<br/>outra pessoa.</h1>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#7EC8E8', lineHeight: 1.3, margin: '0 0 14px', fontStyle: 'italic', textAlign: 'center' }}>Eu escrevi sobre<br/>o que aconteceu depois.</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 10, color: 'rgba(255,255,255,0.55)', fontWeight: 700, letterSpacing: 1 }}>
              <span>EBOOK</span><span style={{ color: '#3A6A8A' }}>|</span>
              <span>AUDIOBOOK</span><span style={{ color: '#3A6A8A' }}>|</span>
              <span>IMPRESSO</span>
            </div>
          </div>
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
            <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', padding: '0 64px' }}>
              <div style={{ maxWidth: 500 }}>
                <p style={{ fontSize: 11, letterSpacing: 4.5, color: '#7EC8E8', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 4px' }}>GILBERTO SOUZA</p>
                <p style={{ fontSize: 10, letterSpacing: 3, color: '#5AAAC8', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 16px' }}>AUTOR</p>
                <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg,#1A90C8,#4BBCD8)', marginBottom: 28, borderRadius: 2 }} />
                <h1 style={{ fontSize: 'clamp(36px,4.5vw,58px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.08, margin: '0 0 16px', letterSpacing: -1.2, textShadow: '0 3px 20px rgba(0,0,0,0.6)' }}>Ela escolheu<br/>outra pessoa.</h1>
                <h2 style={{ fontSize: 'clamp(22px,2.8vw,34px)', fontWeight: 700, color: '#7EC8E8', lineHeight: 1.3, margin: '0 0 20px', fontStyle: 'italic' }}>Eu escrevi sobre<br/>o que aconteceu depois.</h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, margin: '0 0 26px' }}>Um livro sobre traição, desgosto<br/>e como reconstruir sua vida.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 11, color: 'rgba(255,255,255,0.50)', fontWeight: 700, letterSpacing: 1.5 }}>
                  <span>EBOOK</span><span style={{ color: '#2A5A7A' }}>|</span>
                  <span>AUDIOBOOK</span><span style={{ color: '#2A5A7A' }}>|</span>
                  <span>IMPRESSO</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* LINKS */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: isMobile ? '32px 16px 0' : '44px 20px 0' }}>
        {divider('LEIA O LIVRO + AUDIOBOOK')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {ebook_links.map((item, i) => (
            <a key={i} href={item.href} target='_blank' rel='noopener noreferrer' style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 26 }}>{item.icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: isMobile ? 15 : 16, fontWeight: 800, color: '#FFFFFF' }}>{item.title}</p>
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#5AB8DC', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 3 }}>{item.sub}</p>
                </div>
              </div>
              <span style={{ color: '#4A90B8', fontSize: 26, fontWeight: 200, flexShrink: 0 }}>&#x203A;</span>
            </a>
          ))}
        </div>

        {divider('LIVRO IMPRESSO')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 44 }}>
          {pb_links.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <a href={row.hrefa} target='_blank' rel='noopener noreferrer' style={pbCard}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{row.icon}</span>
                <div><p style={{ margin: 0, fontSize: isMobile ? 13 : 14, fontWeight: 800, color: '#FFFFFF' }}>Amazon</p><p style={{ margin: 0, fontSize: 10, color: '#5AB8DC', fontWeight: 600, marginTop: 2 }}>{row.lang}</p></div>
              </a>
              <a href={row.hrefb} target='_blank' rel='noopener noreferrer' style={pbCard}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{row.icon}</span>
                <div><p style={{ margin: 0, fontSize: isMobile ? 13 : 14, fontWeight: 800, color: '#FFFFFF' }}>Barnes & Noble</p><p style={{ margin: 0, fontSize: 10, color: '#5AB8DC', fontWeight: 600, marginTop: 2 }}>{row.lang}</p></div>
              </a>
            </div>
          ))}
        </div>

        {/* SUPERAÇÃO AMAZON START */}
        <div style={{
          marginTop: isMobile ? 42 : 54,
          marginBottom: isMobile ? 44 : 58
        }}>
          {divider('CONHEÇA TAMBÉM · SUPERAÇÃO')}

          <div style={{
            padding: isMobile ? '18px 16px 16px' : '24px 24px 22px',
            background: 'linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.035))',
            border: '1px solid rgba(255,255,255,0.13)',
            borderRadius: isMobile ? 20 : 24,
            boxShadow: '0 22px 55px rgba(0,0,0,0.22)',
            overflow: 'hidden'
          }}>
            <div style={{
              maxWidth: 560,
              margin: '0 auto 22px',
              textAlign: 'center'
            }}>
              <p style={{
                margin: '0 0 7px',
                color: '#6EC7E8',
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 2.8,
                textTransform: 'uppercase'
              }}>
                O novo livro de Gilberto de Souza
              </p>

              <h2 style={{
                margin: '0 0 9px',
                color: '#FFFFFF',
                fontFamily: 'Georgia,serif',
                fontSize: isMobile ? 27 : 33,
                fontWeight: 500,
                lineHeight: 1.18
              }}>
                Superação
              </h2>

              <p style={{
                margin: 0,
                color: 'rgba(255,255,255,0.62)',
                fontSize: isMobile ? 13 : 14,
                lineHeight: 1.65
              }}>
                Uma história real de dor, fé, luta e vitória.
                Escolha a edição e compre diretamente na Amazon.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 14
            }}>
              <a
                href="https://www.amazon.com.br/Supera%C3%A7%C3%A3o-futuro-hist%C3%B3ria-vit%C3%B3ria-Portuguese-ebook/dp/B0H9N93T5J"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Comprar o eBook Superação na Amazon"
                style={{
                  display: 'block',
                  position: 'relative',
                  borderRadius: 16,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.14)',
                  background: '#111C29',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.24)',
                  transition: 'transform .2s ease, border-color .2s ease'
                }}
              >
                <img
                  src="/images/superacao/email/banner-amazon-ebook.jpg"
                  alt="Superação — eBook disponível na Amazon"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto'
                  }}
                />

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 14,
                  padding: '15px 17px 16px'
                }}>
                  <div>
                    <p style={{
                      margin: '0 0 3px',
                      color: '#FFFFFF',
                      fontSize: isMobile ? 14 : 15,
                      fontWeight: 800
                    }}>
                      eBook Superação
                    </p>

                    <p style={{
                      margin: 0,
                      color: '#63BDE0',
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase'
                    }}>
                      Comprar na Amazon
                    </p>
                  </div>

                  <span style={{
                    flexShrink: 0,
                    color: '#6EC7E8',
                    fontSize: 25,
                    fontWeight: 300
                  }}>
                    &#x203A;
                  </span>
                </div>
              </a>

              <a
                href="https://www.amazon.com.br/dp/B0H9R8ZK7T"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Comprar o livro físico Superação na Amazon"
                style={{
                  display: 'block',
                  position: 'relative',
                  borderRadius: 16,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.14)',
                  background: '#111C29',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.24)',
                  transition: 'transform .2s ease, border-color .2s ease'
                }}
              >
                <img
                  src="/images/superacao/email/banner-amazon-fisico.jpg"
                  alt="Superação — livro físico disponível na Amazon"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto'
                  }}
                />

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 14,
                  padding: '15px 17px 16px'
                }}>
                  <div>
                    <p style={{
                      margin: '0 0 3px',
                      color: '#FFFFFF',
                      fontSize: isMobile ? 14 : 15,
                      fontWeight: 800
                    }}>
                      Livro físico Superação
                    </p>

                    <p style={{
                      margin: 0,
                      color: '#63BDE0',
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase'
                    }}>
                      Comprar na Amazon
                    </p>
                  </div>

                  <span style={{
                    flexShrink: 0,
                    color: '#6EC7E8',
                    fontSize: 25,
                    fontWeight: 300
                  }}>
                    &#x203A;
                  </span>
                </div>
              </a>
            </div>

            <a
              href="/superacao"
              style={{
                display: 'block',
                marginTop: 15,
                padding: '12px 16px',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.62)',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                textDecoration: 'none'
              }}
            >
              Conheça a história do livro →
            </a>
          </div>
        </div>
        {/* SUPERAÇÃO AMAZON END */}
      </section>

      {/* QUOTE */}
      <section style={{ maxWidth: 700, margin: '0 auto 44px', padding: '0 20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.11)', borderRadius: 22, overflow: 'hidden', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 140px', minHeight: 170 }}>
          <div style={{ padding: isMobile ? '28px 22px 24px' : '32px 28px 28px' }}>
            <div style={{ fontSize: 42, color: '#1A90C8', lineHeight: 1, marginBottom: 12, fontFamily: 'Georgia,serif' }}>“</div>
            <p style={{ fontSize: isMobile ? 15 : 16, color: 'rgba(255,255,255,0.88)', lineHeight: 1.75, fontStyle: 'italic', fontWeight: 400, margin: '0 0 16px' }}>Não escrevi este livro porque tinha respostas. Escrevi porque eu mesmo estava tentando sobreviver à dor.</p>
            <p style={{ fontSize: 10, letterSpacing: 2, color: '#5AB8DC', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>— GILBERTO SOUZA</p>
          </div>
          {!isMobile && (
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img src='/links-assets/hero-desktop-pt.png' alt='' style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', opacity: 0.40 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(12,20,32,0.95) 0%,transparent 55%)' }} />
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '28px 20px', textAlign: 'center', background: 'rgba(0,0,0,0.30)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 16, fontSize: 10, color: 'rgba(255,255,255,0.38)', fontWeight: 700, letterSpacing: 1.8, textTransform: 'uppercase' }}>
          <span>Disponível no Mundo Todo</span><span>Ebook · Audiobook · Impresso</span>
        </div>
        <p style={{ fontFamily: 'Georgia,serif', fontStyle: 'italic', fontSize: 24, color: '#FFFFFF', margin: '0 0 4px', fontWeight: 400 }}>Gilberto Souza</p>
        <p style={{ fontSize: 9, letterSpacing: 3.5, color: '#5AB8DC', textTransform: 'uppercase', margin: 0 }}>AUTOR</p>
      </footer>

    </main>
  )
}