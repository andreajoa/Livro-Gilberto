"use client"
import { Package, Truck, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react'

const S = {
  hero: { background:'linear-gradient(135deg,#060C18,#0D1B3E)', padding:'100px 6vw', textAlign:'center' },
  icon: { width:80,height:80,background:'rgba(0,196,212,0.15)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px' },
  h1: { fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:900, color:'#fff', marginBottom:12 },
  sub: { fontFamily:"'Cormorant Garant',serif", fontStyle:'italic', fontSize:20, color:'#00C4D4' },
  sec: { padding:'80px 6vw' },
  card: { background:'rgba(13,27,62,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, padding:'24px' },
  h2: { fontFamily:"'Playfair Display',serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:900, color:'#fff', textAlign:'center', marginBottom:12 },
  p: { fontSize:15, color:'#B8C8E0', lineHeight:1.9 },
}

const steps = [
  { icon:Package, n:'01', title:'Pedido Recebido', desc:'Seu pedido é registrado e você recebe confirmação por email.' },
  { icon:Package, n:'02', title:'Embalagem', desc:'O livro é embalado com cuidado em embalagem protetora kraft.' },
  { icon:Truck,   n:'03', title:'Postagem', desc:'O pacote é postado nos Correios com código de rastreamento.' },
  { icon:MapPin,  n:'04', title:'Rastreamento', desc:'Você recebe o código por email para acompanhar em tempo real.' },
  { icon:CheckCircle, n:'05', title:'Entrega', desc:'O livro chega no endereço informado.' },
]

const prazos = [
  { region:'Sul / Sudeste', days:'5–8 dias úteis' },
  { region:'Centro-Oeste / Nordeste', days:'8–12 dias úteis' },
  { region:'Norte', days:'10–15 dias úteis' },
]

export default function Entrega() {
  return (
    <div>
      <section style={S.hero}>
        <div style={S.icon}><Truck size={36} color="#00C4D4"/></div>
        <h1 style={S.h1}>Política de Entrega</h1>
        <p style={S.sub}>Seu livro chegará até você, onde estiver</p>
      </section>

      <section style={{...S.sec, background:'#0A1628'}}>
        <h2 style={S.h2}>Como Funciona a Entrega</h2>
        <div style={{width:48,height:2,background:'#00C4D4',margin:'0 auto 48px'}}/>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:24, maxWidth:1000, margin:'0 auto'}}>
          {steps.map((s,i) => {
            const Icon = s.icon
            return (
              <div key={i} style={{...S.card, textAlign:'center'}}>
                <div style={{width:48,height:48,background:'#00C4D4',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
                  <span style={{fontWeight:900,color:'#0D1B3E',fontSize:14}}>{s.n}</span>
                </div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:'#fff',fontWeight:700,marginBottom:8}}>{s.title}</h3>
                <p style={{fontSize:13,color:'#8A9BBF',lineHeight:1.7,margin:0}}>{s.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section style={{...S.sec, background:'#0D1B3E'}}>
        <h2 style={S.h2}>Prazos Estimados por Região</h2>
        <div style={{width:48,height:2,background:'#00C4D4',margin:'0 auto 48px'}}/>
        <div style={{display:'flex',flexDirection:'column',gap:16,maxWidth:700,margin:'0 auto'}}>
          {prazos.map((p,i) => (
            <div key={i} style={{...S.card, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <MapPin size={20} color="#00C4D4"/>
                <span style={{fontSize:15,fontWeight:600,color:'#fff'}}>{p.region}</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <Clock size={16} color="#00C4D4"/>
                <span style={{fontSize:16,fontWeight:700,color:'#00C4D4'}}>{p.days}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{...S.sec, background:'#0A1628', textAlign:'center'}}>
        <div style={{maxWidth:600,margin:'0 auto', background:'rgba(0,196,212,0.08)', border:'1px solid rgba(0,196,212,0.2)', borderRadius:8, padding:40}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:'#fff',fontWeight:900,marginBottom:16}}>Pronto para receber seu livro?</h3>
          <p style={{...S.p, marginBottom:28, textAlign:'center'}}>Faça seu pedido agora e receba em casa.</p>
          <a href="/#comprar" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#00C4D4,#0099A8)',color:'#0D1B3E',padding:'14px 28px',borderRadius:6,fontSize:15,fontWeight:800,textDecoration:'none'}}>Fazer Pedido <ArrowRight size={16}/></a>
        </div>
      </section>
    </div>
  )
}
