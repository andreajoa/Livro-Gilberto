"use client"
import { useState, useRef, useEffect } from 'react'

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)

  // Detectar tamanho da tela
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  
  const handleMouseMove = (e) => {
    if (isDragging) handleMove(e.clientX)
  }
  
  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [isDragging])

  return (
    <>
      <style>{`
        .superacao-slider-wrapper {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          position: relative;
          overflow: hidden;
          cursor: col-resize;
          user-select: none;
          touch-action: none;
          background: #0a0a0a;
        }
        
        .superacao-slider-container {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 desktop */
          overflow: hidden;
        }
        
        @media (max-width: 1024px) {
          .superacao-slider-container {
            padding-bottom: 66.67%; /* 3:2 tablet */
          }
        }
        
        @media (max-width: 768px) {
          .superacao-slider-container {
            padding-bottom: 120%; /* 5:6 mobile (mais alto) */
          }
          .superacao-slider-text {
            font-size: 13px !important;
            max-width: 140px !important;
          }
          .superacao-slider-label {
            font-size: 9px !important;
            letter-spacing: 2px !important;
          }
          .superacao-slider-handle {
            width: 50px !important;
            height: 50px !important;
          }
          .superacao-slider-handle svg {
            width: 18px !important;
            height: 18px !important;
          }
          .superacao-slider-handle-text {
            font-size: 9px !important;
            padding: 6px 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .superacao-slider-container {
            padding-bottom: 130%;
          }
        }
      `}</style>

      <div 
        className="superacao-slider-wrapper"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="superacao-slider-container">
          {/* Imagem DEPOIS (fundo - lado direito/dourado) */}
          <div style={{ 
            position: 'absolute', 
            inset: 0,
            backgroundImage: 'url(/images/before-after/depois2.png)',
            backgroundSize: 'cover',
            backgroundPosition: isMobile ? 'center 20%' : 'center 30%',
          }} />

          {/* Imagem ANTES (lado esquerdo - sobreposta/escuro) */}
          <div style={{ 
            position: 'absolute', 
            inset: 0,
            width: `${sliderPosition}%`,
            overflow: 'hidden',
            transition: isDragging ? 'none' : 'width 0.05s ease-out'
          }}>
            <div style={{ 
              position: 'absolute', 
              inset: 0,
              backgroundImage: 'url(/images/before-after/antes2.png)',
              backgroundSize: 'cover',
              backgroundPosition: isMobile ? 'center 20%' : 'center 30%',
              width: `${100 / (sliderPosition / 100) || 100}%`,
              filter: 'grayscale(100%) brightness(0.5) contrast(1.15)'
            }} />
          </div>

          {/* Linha Divisória Dourada Vertical */}
          <div style={{ 
            position: 'absolute',
            top: 0,
            left: `${sliderPosition}%`,
            width: 3,
            height: '100%',
            background: 'linear-gradient(180deg, #D4A574 0%, #FFB800 50%, #D4A574 100%)',
            boxShadow: '0 0 30px rgba(212,165,116,0.8), 0 0 60px rgba(255,184,0,0.4)',
            pointerEvents: 'none',
            transform: 'translateX(-50%)',
            zIndex: 10
          }}>
            {/* Handle Central Interativo */}
            <div 
              className="superacao-slider-handle"
              style={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'linear-gradient(135deg, #FFB800, #D4A574)',
                borderRadius: '50%',
                width: 70,
                height: 70,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 40px rgba(255,184,0,0.6), 0 0 0 6px rgba(255,255,255,0.15), inset 0 2px 10px rgba(255,255,255,0.3)',
                cursor: 'grab',
                transition: 'transform 0.2s, box-shadow 0.2s',
                ...(isDragging ? { 
                  transform: 'translate(-50%, -50%) scale(1.15)', 
                  boxShadow: '0 12px 50px rgba(255,184,0,0.8), 0 0 0 8px rgba(255,255,255,0.25), inset 0 2px 10px rgba(255,255,255,0.4)'
                } : {})
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </div>

            <div 
              className="superacao-slider-handle-text"
              style={{ 
                position: 'absolute',
                top: 'calc(50% + 45px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(10,10,10,0.95)',
                color: '#FFB800',
                padding: '10px 20px',
                borderRadius: 25,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,184,0,0.3)',
                pointerEvents: 'none',
                textTransform: 'uppercase'
              }}
            >
              Arraste para ver
            </div>
          </div>

          {/* Texto ANTES */}
          <div 
            className="superacao-slider-text"
            style={{ 
              position: 'absolute', 
              top: isMobile ? 24 : 40, 
              left: isMobile ? 16 : 40, 
              color: 'rgba(255,255,255,0.9)', 
              zIndex: 5, 
              maxWidth: 280 
            }}
          >
            <div 
              className="superacao-slider-label"
              style={{ 
                fontSize: 12, 
                letterSpacing: 4, 
                fontWeight: 800, 
                marginBottom: 16, 
                textTransform: 'uppercase', 
                color: 'rgba(255,255,255,0.7)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 10 
              }}
            >
              <span style={{ width: 30, height: 2, background: 'rgba(255,255,255,0.5)' }} />
              ANTES
            </div>
            <p style={{ 
              fontSize: isMobile ? 14 : 17, 
              fontStyle: 'italic', 
              lineHeight: 1.5, 
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 2px 15px rgba(0,0,0,0.9)', 
              color: 'rgba(255,255,255,0.85)',
              margin: 0
            }}>
              "Eu acreditava que minha história tinha acabado."
            </p>
          </div>

          {/* Texto DEPOIS */}
          <div 
            className="superacao-slider-text"
            style={{ 
              position: 'absolute', 
              top: isMobile ? 24 : 40, 
              right: isMobile ? 16 : 40, 
              color: 'rgba(255,255,255,0.95)', 
              zIndex: 5, 
              maxWidth: 280, 
              textAlign: 'right' 
            }}
          >
            <div 
              className="superacao-slider-label"
              style={{ 
                fontSize: 12, 
                letterSpacing: 4, 
                fontWeight: 800, 
                marginBottom: 16, 
                textTransform: 'uppercase', 
                color: '#FFB800', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 10, 
                justifyContent: 'flex-end' 
              }}
            >
              DEPOIS
              <span style={{ width: 30, height: 2, background: 'rgba(255,184,0,0.7)' }} />
            </div>
            <p style={{ 
              fontSize: isMobile ? 14 : 17, 
              fontStyle: 'italic', 
              lineHeight: 1.5, 
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 2px 15px rgba(0,0,0,0.7)', 
              color: '#ffffff',
              margin: 0
            }}>
              "Descobri que minha dor era apenas o começo."
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
