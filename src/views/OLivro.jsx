"use client"
import { BookOpen, HeartPulse, Lightbulb, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import bookCover from '../assets/book/capa-livro.png'

const themes = [
  { icon:HeartPulse, title:'Reconhecendo a Dor', desc:'Entender que sentir dor não é fraqueza, mas o primeiro passo para a cura.' },
  { icon:Shield, title:'Reconstruindo a Autoestima', desc:'Técnicas práticas para resgatar seu valor pessoal após a rejeição.' },
  { icon:Lightbulb, title:'Compreendendo o Processo', desc:'Insights sobre por que as traições acontecem e como não tomar isso como falha pessoal.' },
  { icon:BookOpen, title:'Recuperando a Capacidade de Amar', desc:'Como abrir seu coração novamente, com mais sabedoria e menos medo.' },
]

const details = [
  ['Título','Como Vencer a Dor de Ser Trocado Por Outro'],
  ['Autor','Gilberto de Souza'],
  ['ISBN','978-658462205-0'],
  ['Categoria','Autoajuda / Relacionamentos / Superação'],
  ['Idioma','Português'],
  ['Formato','Livro físico'],
  ['Ano','2026'],
]

const S = {
  p: { fontSize:15, color:'#B8C8E0', lineHeight:1.9, marginBottom:16 },
  h2: { fontFamily:"'Playfair Display',serif", fontSize:'clamp(26px,3vw,40px)', fontWeight:900, color:'#fff', textAlign:'center', marginBottom:12 },
}

export default function OLivro() {
  return (
    <div>
      {/* HERO */}
      <section style={{ background:'linear-gradient(135deg,#060C18,#0D1B3E)', padding:'100px 6vw', textAlign:'center' }}>
        <img src={bookCover.src} alt="Capa do livro" style={{ width:'min(260px,60vw)', borderRadius:6, boxShadow:'0 30px 80px rgba(0,0,0,0.7)', marginBottom:40, display:'block', margin:'0 auto 40px' }}/>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,5vw,60px)', fontWeight:900, color:'#fff', marginBottom:12 }}>O Livro</h1>
        <p style={{ fontFamily:"'Cormorant Garant',serif", fontStyle:'italic', fontSize:20, color:'#00C4D4' }}>Uma jornada de superação em cada página</p>
      </section>

      {/* FICHA EDITORIAL */}
      <section style={{ background:'#0A1628', padding:'80px 6vw' }}>
        <h2 style={S.h2}>Ficha Editorial</h2>
        <div style={{ width:48, height:2, background:'#00C4D4', margin:'0 auto 48px' }}/>
        <div style={{ maxWidth:700, margin:'0 auto', background:'rgba(13,27,62,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, overflow:'hidden' }}>
          {details.map(([label,value],i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 24px', borderBottom: i<details.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <span style={{ fontSize:13, color:'#8A9BBF' }}>{label}</span>
              <span style={{ fontSize:14, color:'#fff', fontWeight:600, textAlign:'right', maxWidth:'60%' }}>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SINOPSE */}
      <section style={{ background:'#0D1B3E', padding:'80px 6vw' }}>
        <h2 style={S.h2}>Sinopse</h2>
        <div style={{ width:48, height:2, background:'#00C4D4', margin:'0 auto 48px' }}/>
        <div style={{ maxWidth:800, margin:'0 auto', borderLeft:'3px solid #00C4D4', paddingLeft:28 }}>
          <p style={S.p}>Este livro é a crônica honesta e vulnerável de um homem que dedicou anos de sua vida a construir um relacionamento, só para ser trocado quando mais confiava. É a história de alguém que se viu sozinho, questionando seu valor e se tudo que construiu tinha sido em vão.</p>
          <p style={S.p}>Mas é também a história da superação. De como, aos poucos, aprendeu que sua validação não dependia de outra pessoa. De como encontrou forças para reconstruir sua autoestima e voltar a acreditar no amor — mas desta vez de forma diferente.</p>
          <p style={{...S.p, marginBottom:0}}>Escrito de forma direta e sem enfeites, este livro não oferece fórmulas mágicas. Oferece companhia. A certeza de que você não está sozinho nessa dor.</p>
        </div>
      </section>

      {/* TEMAS */}
      <section style={{ background:'#0A1628', padding:'80px 6vw' }}>
        <h2 style={S.h2}>O que você vai encontrar</h2>
        <div style={{ width:48, height:2, background:'#00C4D4', margin:'0 auto 48px' }}/>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:24, maxWidth:1000, margin:'0 auto' }}>
          {themes.map((t,i) => {
            const Icon = t.icon
            return (
              <div key={i} style={{ background:'rgba(13,27,62,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, padding:'24px', transition:'border-color 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(0,196,212,0.35)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}
              >
                <div style={{ width:44,height:44,background:'rgba(0,196,212,0.15)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16 }}>
                  <Icon size={20} color="#00C4D4"/>
                </div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:'#fff', marginBottom:8 }}>{t.title}</h3>
                <p style={{ fontSize:13, color:'#8A9BBF', lineHeight:1.7, margin:0 }}>{t.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'linear-gradient(135deg,#060C18,#0D1B3E)', padding:'80px 6vw', textAlign:'center' }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(26px,3vw,42px)', fontWeight:900, color:'#fff', marginBottom:16 }}>Comece sua jornada de superação</h2>
        <p style={{ fontSize:15, color:'#8A9BBF', marginBottom:36, maxWidth:600, margin:'0 auto 36px' }}>Este livro foi escrito para você. Peça o seu agora.</p>
        <Link href="/#comprar" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#00C4D4,#0099A8)', color:'#0D1B3E', padding:'16px 32px', borderRadius:6, fontSize:15, fontWeight:800, textDecoration:'none' }}>
          Quero Este Livro <ArrowRight size={18}/>
        </Link>
      </section>
    </div>
  )
}
