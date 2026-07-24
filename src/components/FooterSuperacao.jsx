"use client"
import Link from 'next/link'
import { Shield, CheckCircle, Package, Lock, BookOpen, Calendar, Tag } from 'lucide-react'

export default function FooterSuperacao() {
  return (
    <footer style={{ 
      background: '#050505', 
      padding: '80px 6vw 40px', 
      borderTop: '1px solid rgba(212,165,116,0.1)',
      marginTop: '100px'
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 48,
        marginBottom: 60
      }}>
        {/* Coluna 1 - Logo e Info */}
        <div>
          <div style={{ 
            width: 60, 
            height: 60, 
            background: 'linear-gradient(135deg, #D4A574, #C9A962)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            boxShadow: '0 8px 24px rgba(212,165,116,0.3)'
          }}>
            <span style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 900,
              color: '#0a0a0a'
            }}>
              G·S
            </span>
          </div>
          <h3 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: 8
          }}>
            Gilberto de Souza
          </h3>
          <p style={{ 
            fontSize: 14,
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 20
          }}>
            Superação — O seu futuro é você quem faz
          </p>
          <div style={{ 
            height: 40,
            background: 'linear-gradient(90deg, rgba(212,165,116,0.3), transparent)',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 12
          }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 2 }}>
              ISBN 979-8187736492
            </span>
          </div>
        </div>

        {/* Coluna 2 - Navegação */}
        <div>
          <h4 style={{ 
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#D4A574',
            marginBottom: 20
          }}>
            Navegação
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['Início', '/'], ['O Livro', '/o-livro'], ['Sobre', '/sobre'], ['Contato', '/contato']].map(([name, href]) => (
              <Link 
                key={name} 
                href={href} 
                style={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  textDecoration: 'none', 
                  fontSize: 14,
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D4A574'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* Coluna 3 - O Livro */}
        <div>
          <h4 style={{ 
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#D4A574',
            marginBottom: 20
          }}>
            O Livro
          </h4>
          <img 
            src="/books/superacao/book-front.png" 
            alt="Capa do livro Superação" 
            style={{ 
              width: 80, 
              borderRadius: 8,
              marginBottom: 16,
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              display: 'block'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: <BookOpen size={14} />, text: 'ISBN 979-8187736492' },
              { icon: <Tag size={14} />, text: 'Autoajuda / Superação' },
              { icon: <Calendar size={14} />, text: '2026 — 1ª Edição' },
              { icon: <Package size={14} />, text: 'Formato físico' }
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 10, 
                fontSize: 13, 
                color: 'rgba(255,255,255,0.6)' 
              }}>
                <span style={{ color: '#D4A574' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Coluna 4 - Legal */}
        <div>
          <h4 style={{ 
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#D4A574',
            marginBottom: 20
          }}>
            Legal
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['Política de Privacidade', '/privacidade'], ['Termos de Uso', '/termos'], ['Política de Entrega', '/entrega'], ['Política de Devolução', '/devolucao']].map(([name, href]) => (
              <Link 
                key={name} 
                href={href} 
                style={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  textDecoration: 'none', 
                  fontSize: 14,
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#D4A574'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ 
        height: 1, 
        background: 'linear-gradient(90deg, transparent, rgba(212,165,116,0.2), transparent)',
        margin: '40px 0'
      }} />

      {/* Footer Bottom */}
      <div style={{ 
        textAlign: 'center',
        paddingTop: 40
      }}>
        <p style={{ 
          fontSize: 13, 
          color: 'rgba(255,255,255,0.5)',
          marginBottom: 20
        }}>
          © 2026 Gilberto de Souza · Todos os direitos reservados
        </p>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 32,
          flexWrap: 'wrap',
          fontSize: 12,
          color: 'rgba(255,255,255,0.5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Lock size={12} color="#D4A574" />
            Compra Segura
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Shield size={12} color="#D4A574" />
            LGPD Compliance
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle size={12} color="#D4A574" />
            Site Verificado
          </div>
        </div>
        <p style={{ 
          fontSize: 11, 
          color: 'rgba(255,255,255,0.4)',
          marginTop: 20
        }}>
          Enviado pelos Correios para todo o Brasil
        </p>
      </div>
    </footer>
  )
}
