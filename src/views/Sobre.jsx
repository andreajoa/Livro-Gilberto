"use client"
import { useState } from 'react'
import { MapPin, Building2, HeartPulse, PenTool, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import authorImg from '../assets/author.jpg'

const timeline = [
  { icon: MapPin,      year: 'Início',      title: 'Nasceu no Brasil',         description: 'Começou sua jornada em solo brasileiro, onde construiu suas primeiras lembranças e valores.' },
  { icon: MapPin,      year: '2003',         title: 'Mudou para os EUA',        description: 'Há 23 anos, buscou novos horizontes e oportunidades nos Estados Unidos.' },
  { icon: Building2,   year: 'Crescimento',  title: 'Fundou sua empresa',       description: 'Construiu um negócio de sucesso no setor de construção de casas.' },
  { icon: HeartPulse,  year: 'Desafio',      title: 'Enfrentou a traição',      description: 'Passou por uma experiência que o levou ao início de uma depressão profunda.' },
  { icon: HeartPulse,  year: 'Superação',    title: 'Escolheu se reconstruir',  description: 'Em vez de se deixar vencer, decidiu transformar a dor em força.' },
  { icon: PenTool,     year: 'Hoje',         title: 'Escreveu este livro',      description: 'Para compartilhar sua jornada e ajudar outros a encontrarem o caminho da cura.' },
]

export default function Sobre() {
  return (
    <div style={{ paddingTop: 64 }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #060C18 0%, #0D1B3E 100%)', padding: '100px 6vw', textAlign: 'center' }}>
        <div style={{ width: 128, height: 128, borderRadius: '50%', overflow: 'hidden', border: '4px solid #00C4D4', margin: '0 auto 32px', boxShadow: '0 0 40px rgba(0,196,212,0.3)' }}>
          <img src={authorImg.src} alt="Gilberto de Souza" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px,5vw,72px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
          Gilberto de Souza
        </h1>
        <p style={{ fontFamily: "'Cormorant Garant', serif", fontStyle: 'italic', fontSize: 22, color: '#00C4D4' }}>
          Autor · Empreendedor · Superação
        </p>
      </section>

      {/* TIMELINE */}
      <section style={{ background: '#0A1628', padding: '100px 6vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3vw,44px)', color: '#fff', textAlign: 'center', marginBottom: 12, fontWeight: 900 }}>
            Uma Jornada de <span style={{ color: '#00C4D4' }}>Transformação</span>
          </h2>
          <div style={{ width: 48, height: 2, background: '#00C4D4', margin: '0 auto 64px' }} />

          <div style={{ position: 'relative' }}>
            {/* linha vertical */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(0,196,212,0.2)', transform: 'translateX(-50%)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              {timeline.map((item, i) => {
                const Icon = item.icon
                const isLeft = i % 2 === 0
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr', alignItems: 'center', gap: 0 }}>
                    {/* lado esquerdo */}
                    <div style={{ padding: '0 32px 0 0', textAlign: 'right', opacity: isLeft ? 1 : 0, pointerEvents: isLeft ? 'auto' : 'none' }}>
                      {isLeft && (
                        <div style={{ background: 'rgba(13,27,62,0.8)', border: '1px solid rgba(0,196,212,0.2)', borderRadius: 8, padding: '20px 24px' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#00C4D4', letterSpacing: 2, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>{item.year}</span>
                          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: '#fff', fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                          <p style={{ fontSize: 13, color: '#8A9BBF', lineHeight: 1.7, margin: 0 }}>{item.description}</p>
                        </div>
                      )}
                    </div>

                    {/* dot central */}
                    <div style={{ display: 'flex', justifyContent: 'center', zIndex: 2 }}>
                      <div style={{ width: 48, height: 48, background: '#00C4D4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,196,212,0.4)' }}>
                        <Icon size={20} color="#0D1B3E" />
                      </div>
                    </div>

                    {/* lado direito */}
                    <div style={{ padding: '0 0 0 32px', textAlign: 'left', opacity: !isLeft ? 1 : 0, pointerEvents: !isLeft ? 'auto' : 'none' }}>
                      {!isLeft && (
                        <div style={{ background: 'rgba(13,27,62,0.8)', border: '1px solid rgba(0,196,212,0.2)', borderRadius: 8, padding: '20px 24px' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#00C4D4', letterSpacing: 2, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>{item.year}</span>
                          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: '#fff', fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                          <p style={{ fontSize: 13, color: '#8A9BBF', lineHeight: 1.7, margin: 0 }}>{item.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* POR QUE ESCREVI */}
      <section style={{ background: '#0D1B3E', padding: '100px 6vw' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3.5vw,48px)', color: '#fff', fontWeight: 900, marginBottom: 32 }}>
            Por que escrevi este livro
          </h2>

          <blockquote style={{ fontFamily: "'Cormorant Garant', serif", fontStyle: 'italic', fontSize: 'clamp(20px,2.5vw,28px)', color: '#00C4D4', borderLeft: '3px solid #00C4D4', paddingLeft: 24, lineHeight: 1.7, marginBottom: 48 }}>
            "Escrevi este livro porque sei que não estou sozinho. Se você está lendo isso, provavelmente também passou por algo parecido. E quero que você saiba: há luz no fim do túnel."
          </blockquote>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
            {[
              'Quando fui traído, senti como se o mundo tivesse desmoronado. Anos de dedicação, de construir uma vida juntos, pareciam não ter valor algum. Entrei em uma depressão que quase me consumiu.',
              'Mas em algum momento, decidi que não deixaria aquela experiência definir quem eu era. Comecei a buscar respostas, a entender que minha validação não dependia de outra pessoa, e que merecia ser amado por quem eu realmente era.',
              'Este livro é o resultado dessa jornada. Não é um manual de como esquecer — porque esquecer não é o objetivo. É sobre como transformar a dor em sabedoria, como reconstruir sua autoestima e como, um dia, voltar a amar — sem medo.',
            ].map((p, i) => (
              <p key={i} style={{ fontSize: 16, color: '#B8C8E0', lineHeight: 1.9, margin: 0 }}>{p}</p>
            ))}
          </div>

          <Link href="/o-livro" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #00C4D4, #0099A8)', color: '#0D1B3E', padding: '14px 28px', borderRadius: 6, fontSize: 15, fontWeight: 800, textDecoration: 'none' }}>
            Ver o Livro <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: 'linear-gradient(135deg, #060C18, #0D1B3E)', padding: '100px 6vw', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,3.5vw,48px)', color: '#fff', fontWeight: 900, marginBottom: 20 }}>
            Você não precisa carregar esse peso sozinho
          </h2>
          <p style={{ fontSize: 16, color: '#8A9BBF', lineHeight: 1.8, marginBottom: 40 }}>
            Este livro foi escrito para você. Para que você saiba que é possível superar, que é possível reconstruir, que é possível voltar a sorrir de verdade.
          </p>
          <a href="/#comprar" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #00C4D4, #0099A8)', color: '#0D1B3E', padding: '16px 36px', borderRadius: 6, fontSize: 16, fontWeight: 800, textDecoration: 'none' }}>
            Peça Seu Exemplar <ArrowRight size={18} />
          </a>
        </div>
      </section>

    </div>
  )
}
