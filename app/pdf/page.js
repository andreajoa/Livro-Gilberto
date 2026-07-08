'use client'

import { useState, useRef, useEffect } from 'react'

export default function PdfPage() {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime
      const duration = video.duration
      if (duration && currentTime >= duration * 0.9) {
        setShowForm(true)
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setSuccess(true)
        // Abrir PDF em nova aba
        window.open('/pdfs/free-guide.pdf', '_blank')
      } else {
        alert('Erro ao enviar. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: '#F4EEE0',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      color: '#131822'
    }}>
      {/* Topbar */}
      <div style={{
        background: '#122B4F',
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '13px 16px'
      }}>
        Free Guide — Limited Time
      </div>

      <div style={{
        maxWidth: '1080px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        {/* Hero */}
        <section style={{
          textAlign: 'center',
          padding: '52px 0 6px'
        }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(30px, 4.8vw, 46px)',
            color: '#131822',
            lineHeight: 1.14,
            maxWidth: '860px',
            margin: '0 auto',
            letterSpacing: '-0.01em'
          }}>
            Watch The Video & Grab Your <span style={{
              position: 'relative',
              whiteSpace: 'nowrap',
              display: 'inline-block'
            }}>
              Free Guide
              <svg 
                viewBox="0 0 200 14" 
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: '-10px',
                  width: '100%',
                  height: '14px'
                }}
              >
                <path 
                  d="M2 10 Q 50 2, 100 8 T 198 6" 
                  stroke="#48C7EE" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <span style={{
            display: 'inline-block',
            background: '#48C7EE',
            color: '#122B4F',
            fontWeight: 600,
            fontSize: 'clamp(14px, 1.9vw, 18px)',
            padding: '9px 20px',
            borderRadius: '3px',
            margin: '22px auto 0',
            maxWidth: '720px',
            transform: 'rotate(-0.6deg)',
            boxShadow: '3px 3px 0 #131822'
          }}>
            Learn the entire method in minutes — 100% free, no fluff.
          </span>
        </section>

        {/* Video + Copy */}
        <section style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '44px',
          alignItems: 'center',
          padding: '48px 0 24px'
        }}>
          <div style={{
            flex: '1 1 420px',
            minWidth: '300px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-18px',
              left: '-14px',
              zIndex: 4,
              background: '#CAB49C',
              color: '#131822',
              fontFamily: "'Caveat', cursive",
              fontWeight: 700,
              fontSize: '22px',
              padding: '6px 16px 8px',
              borderRadius: '4px',
              transform: 'rotate(-7deg)',
              boxShadow: '2px 3px 0 rgba(19,24,34,0.25)'
            }}>
              watch first ►
            </div>
            <div style={{
              position: 'relative',
              borderRadius: '6px',
              overflow: 'hidden',
              background: '#A0A3A1',
              aspectRatio: '16/10',
              boxShadow: '8px 10px 0 #122B4F',
              border: '3px solid #131822'
            }}>
              <video
                ref={videoRef}
                controls
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              >
                <source src="/videos/video1.mp4" type="video/mp4" />
                Seu navegador não suporta vídeo.
              </video>
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '42px',
                textAlign: 'center',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '18px',
                letterSpacing: '0.03em',
                color: '#FFFFFF',
                background: 'linear-gradient(90deg, #122B4F, #48C7EE)',
                padding: '8px 0'
              }}>
                WATCH BEFORE YOU DOWNLOAD
              </div>
            </div>
          </div>

          <div style={{
            flex: '1 1 380px',
            minWidth: '300px'
          }}>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.65,
              color: '#131822',
              marginBottom: '18px'
            }}>
              <strong>The Free Guide</strong> is for anyone who wants to master the method <em>(the easy way)</em>. Get the full step-by-step and start applying it today.
            </p>

            <ul style={{
              listStyle: 'none',
              margin: '0 0 26px',
              padding: 0
            }}>
              <li style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                fontSize: '15.5px',
                lineHeight: 1.5,
                marginBottom: '10px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12.5L9.5 18L20 6" stroke="#48C7EE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Complete step-by-step PDF
              </li>
              <li style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                fontSize: '15.5px',
                lineHeight: 1.5,
                marginBottom: '10px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12.5L9.5 18L20 6" stroke="#48C7EE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Straight to the point, zero fluff
              </li>
              <li style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                fontSize: '15.5px',
                lineHeight: 1.5,
                marginBottom: '10px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12.5L9.5 18L20 6" stroke="#48C7EE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                100% free, instant download
              </li>
            </ul>

            {!showForm && !success && (
              <div style={{
                padding: '20px',
                background: 'rgba(72, 199, 238, 0.1)',
                border: '2px dashed #48C7EE',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '14px',
                color: '#122B4F',
                fontWeight: 600
              }}>
                🎥 Watch the video to unlock the download form...
              </div>
            )}

            {showForm && !success && (
              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxWidth: '420px',
                animation: 'fadeIn 0.5s ease-in'
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your best email"
                  required
                  style={{
                    width: '100%',
                    padding: '15px 16px',
                    borderRadius: '6px',
                    border: '2px solid #131822',
                    background: '#FFFFFF',
                    color: '#131822',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '17px 22px',
                    border: '3px solid #131822',
                    borderRadius: '999px',
                    background: '#48C7EE',
                    color: '#122B4F',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '5px 5px 0 #131822',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Sending...' : 'Send Me My Free PDF!'}
                </button>
                <p style={{
                  fontSize: '12.5px',
                  color: '#6b6555',
                  marginTop: '6px'
                }}>
                  No spam. Your email is 100% safe.
                </p>
              </form>
            )}

            {success && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                background: '#FFFFFF',
                border: '3px solid #131822',
                borderRadius: '8px',
                padding: '18px 20px',
                maxWidth: '420px',
                boxShadow: '5px 6px 0 #48C7EE'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12.5L9.5 18L20 6" stroke="#122B4F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <strong>You're all set! Your PDF is ready.</strong>
                </div>
                <a
                  href="/pdfs/free-guide.pdf"
                  download
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '15px 22px',
                    border: '3px solid #131822',
                    borderRadius: '999px',
                    background: '#122B4F',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '14.5px',
                    boxShadow: '4px 4px 0 #131822'
                  }}
                >
                  Download PDF now ↓
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Benefits */}
        <div style={{
          background: '#122B4F',
          color: '#FFFFFF',
          borderRadius: '10px',
          padding: '34px 30px 36px',
          margin: '30px 0 60px',
          textAlign: 'center',
          position: 'relative',
          transform: 'rotate(-0.35deg)',
          boxShadow: '8px 10px 0 #131822'
        }}>
          <div style={{
            fontFamily: "'Caveat', cursive",
            fontWeight: 700,
            color: '#48C7EE',
            fontSize: '24px',
            marginBottom: '4px'
          }}>
            No experience needed!
          </div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(20px, 3vw, 26px)',
            marginBottom: '24px'
          }}>
            Here's What You'll Learn Inside The Guide:
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '18px',
            textAlign: 'left',
            maxWidth: '780px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              fontSize: '14.5px',
              lineHeight: 1.5
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 12.5L9.5 18L20 6" stroke="#48C7EE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              The full method, start to finish
            </div>
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              fontSize: '14.5px',
              lineHeight: 1.5
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 12.5L9.5 18L20 6" stroke="#48C7EE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Common mistakes that trip up beginners
            </div>
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              fontSize: '14.5px',
              lineHeight: 1.5
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 12.5L9.5 18L20 6" stroke="#48C7EE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Recommended tools & resources
            </div>
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              fontSize: '14.5px',
              lineHeight: 1.5
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 12.5L9.5 18L20 6" stroke="#48C7EE" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              A quick checklist to apply today
            </div>
          </div>
        </div>

        
        {/* ========== SEÇÃO ANTES E DEPOIS ========== */}
        <section style={{
          padding: '60px 0',
          background: '#122B4F',
          borderRadius: '12px',
          margin: '60px 0',
          color: '#FFFFFF'
        }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 38px)',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#48C7EE'
          }}>
            From Pain to Victory
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '16px',
            marginBottom: '48px',
            color: '#B8C8E0',
            maxWidth: '680px',
            margin: '0 auto 48px'
          }}>
            Gilberto's transformation after being replaced — from the depths of depression to a restored, stronger man
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 24px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: '#CAB49C',
                color: '#131822',
                fontFamily: "'Caveat', cursive",
                fontSize: '28px',
                fontWeight: 700,
                padding: '8px 24px',
                borderRadius: '6px',
                display: 'inline-block',
                marginBottom: '20px',
                transform: 'rotate(-3deg)',
                boxShadow: '3px 3px 0 rgba(0,0,0,0.3)'
              }}>
                When She Left
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <img src="/images/before-after/antes2.jpeg" alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '8px', border: '4px solid #48C7EE', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }} />
              </div>
              <p style={{ marginTop: '20px', fontSize: '14px', color: '#B8C8E0', fontStyle: 'italic' }}>
                Lost 23kg in 6 months • Depression • Lost hope
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: '#48C7EE',
                color: '#122B4F',
                fontFamily: "'Caveat', cursive",
                fontSize: '28px',
                fontWeight: 700,
                padding: '8px 24px',
                borderRadius: '6px',
                display: 'inline-block',
                marginBottom: '20px',
                transform: 'rotate(2deg)',
                boxShadow: '3px 3px 0 rgba(0,0,0,0.3)'
              }}>
                Restored Man
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <img src="/images/before-after/depois.jpg" alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '8px', border: '4px solid #C9A84C', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }} />
              </div>
              <p style={{ marginTop: '20px', fontSize: '14px', color: '#B8C8E0', fontStyle: 'italic' }}>
                Business recovered • Healthy body • New purpose • Strong faith
              </p>
            </div>
          </div>
        </section>

        {/* ========== SEÇÃO COMPRA DO LIVRO ========== */}
        <section style={{
          padding: '60px 0',
          background: 'linear-gradient(135deg, #F5F0E8 0%, #E7DCC3 100%)',
          borderRadius: '12px',
          margin: '60px 0'
        }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 38px)',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#122B4F'
          }}>
            Get The Complete Book
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '16px',
            marginBottom: '48px',
            color: '#131822',
            maxWidth: '680px',
            margin: '0 auto 48px'
          }}>
            The full journey from betrayal to victory — available in Portuguese, English, and Spanish
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 24px'
          }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              border: '3px solid #122B4F'
            }}>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '24px',
                color: '#122B4F',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                🛒 Amazon
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="https://www.amazon.com/dp/B0H2LM4TXH" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#232F3E', color: '#FFFFFF', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 0 #122B4F' }}>
                  <span>🇧🇷 Portuguese</span><span>→</span>
                </a>
                <a href="https://www.amazon.com/dp/B0H2LXHCH4" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#232F3E', color: '#FFFFFF', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 0 #122B4F' }}>
                  <span>🇺🇸 English</span><span>→</span>
                </a>
                <a href="https://www.amazon.com/dp/B0H2LHZT7X" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#232F3E', color: '#FFFFFF', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 0 #122B4F' }}>
                  <span>🇪🇸 Spanish</span><span>→</span>
                </a>
              </div>
            </div>

            <div style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              border: '3px solid #C9A84C'
            }}>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '24px',
                color: '#122B4F',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                📚 Barnes & Noble
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="https://www.barnesandnoble.com/w/como-vencer-a-dor-de-ser-trocado-por-outro-gilberto-de-souza/1150279850?ean=9798256373542" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#122B4F', color: '#FFFFFF', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 0 #0D1B3E' }}>
                  <span>🇧🇷 Portuguese</span><span>→</span>
                </a>
                <a href="https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#122B4F', color: '#FFFFFF', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 0 #0D1B3E' }}>
                  <span>🇺🇸 English</span><span>→</span>
                </a>
                <a href="https://www.barnesandnoble.com/w/como-vencer-el-dolor-de-ser-reemplazado-por-otro-gilberto-de-souza/1150279538?ean=9786584622050" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#122B4F', color: '#FFFFFF', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 0 #0D1B3E' }}>
                  <span>🇪🇸 Spanish</span><span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>


        <footer style={{
          padding: '30px 0 46px',
          borderTop: '1px solid #E7DCC3'
        }}>
          <p style={{
            maxWidth: '760px',
            margin: '0 auto',
            fontSize: '10.5px',
            lineHeight: 1.6,
            color: '#8a8371',
            textAlign: 'center',
            letterSpacing: '0.01em'
          }}>
            <strong style={{ color: '#6b6555' }}>Usage & Copyright Notice —</strong> This guide is © 2026 Gilberto de Souza. All rights reserved.
            This PDF is provided free of charge for personal and educational use only. You may not resell, repackage,
            relabel, or claim authorship of this content, in whole or in part. You are welcome to share the original,
            unmodified file with others for genuinely useful, non-commercial purposes, provided this notice and the
            author's name remain fully intact. Redistribution for profit, inclusion in paid bundles or courses, and
            removal or alteration of attribution are strictly prohibited.
          </p>
          <p style={{
            textAlign: 'center',
            fontSize: '11px',
            color: '#a39c88',
            marginTop: '10px'
          }}>
            Free Guide by Gilberto de Souza &nbsp;•&nbsp; © 2026 &nbsp;•&nbsp; All rights reserved.
          </p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
