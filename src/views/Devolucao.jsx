"use client"
import { RotateCcw, Clock, CheckCircle, Mail, ArrowRight, XCircle } from 'lucide-react'
import Link from 'next/link'

const S = {
  hero: { background:'linear-gradient(135deg,#060C18,#0D1B3E)', padding:'100px 6vw', textAlign:'center' },
  iconWrap: { width:80,height:80,background:'rgba(0,196,212,0.15)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px' },
  h1: { fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:900, color:'#fff', marginBottom:12 },
  sub: { fontFamily:"'Cormorant Garant',serif", fontStyle:'italic', fontSize:20, color:'#00C4D4' },
  body: { background:'#0A1628', padding:'80px 6vw' },
  wrap: { maxWidth:800, margin:'0 auto', display:'flex', flexDirection:'column', gap:32 },
  card: { background:'rgba(13,27,62,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, padding:'32px' },
  cardCyan: { background:'rgba(0,196,212,0.07)', border:'1px solid rgba(0,196,212,0.25)', borderRadius:8, padding:'32px' },
  h2: { fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:'#fff', marginBottom:16, display:'flex', alignItems:'center', gap:10 },
  p: { fontSize:15, color:'#B8C8E0', lineHeight:1.9, marginBottom:10 },
  li: { fontSize:14, color:'#B8C8E0', lineHeight:2.2, listStyle:'none', display:'flex', alignItems:'flex-start', gap:8, marginBottom:8 },
}

export default function Devolucao() {
  return (
    <div>
      <section style={S.hero}>
        <div style={S.iconWrap}><RotateCcw size={36} color="#00C4D4"/></div>
        <h1 style={S.h1}>Política de Devolução</h1>
        <p style={S.sub}>Seus direitos garantidos por lei</p>
      </section>
      <section style={S.body}>
        <div style={S.wrap}>
          <div style={S.cardCyan}>
            <h2 style={S.h2}><CheckCircle size={20} color="#00C4D4"/>Direito de Arrependimento</h2>
            <p style={{...S.p, color:'#00C4D4', fontWeight:600, marginBottom:8}}>Art. 49 do Código de Defesa do Consumidor</p>
            <p style={S.p}>Você tem direito de arrependimento e pode devolver o produto em até <strong style={{color:'#fff'}}>7 dias corridos</strong> após o recebimento, sem necessidade de justificativa.</p>
          </div>

          <div style={S.card}>
            <h2 style={S.h2}><CheckCircle size={20} color="#00C4D4"/>Condições para Devolução</h2>
            {['O livro deve estar sem uso e em perfeitas condições','A embalagem original deve estar intacta','Solicitação dentro do prazo de 7 dias corridos','Número do pedido deve ser informado'].map(c=>(
              <div key={c} style={S.li}><CheckCircle size={14} color="#00C4D4" style={{flexShrink:0,marginTop:4}}/><span>{c}</span></div>
            ))}
          </div>

          <div style={S.card}>
            <h2 style={S.h2}><Mail size={20} color="#00C4D4"/>Como Solicitar</h2>
            {['Envie email para contato@gilberto-souza.com','Assunto: "Solicitação de Devolução - [Nº do Pedido]"','Informe seu nome completo e número do pedido','Descreva brevemente o motivo','Aguarde as instruções sobre o frete de retorno'].map((s,i)=>(
              <div key={i} style={S.li}><span style={{color:'#00C4D4',fontWeight:700,flexShrink:0}}>{i+1}.</span><span>{s}</span></div>
            ))}
          </div>

          <div style={S.cardCyan}>
            <h2 style={S.h2}><Clock size={20} color="#00C4D4"/>Prazo de Reembolso</h2>
            <p style={S.p}>O reembolso será processado em até <strong style={{color:'#fff'}}>10 dias úteis</strong> após o recebimento e verificação do produto devolvido.</p>
          </div>

          <div style={S.card}>
            <h2 style={S.h2}><XCircle size={20} color="#00C4D4"/>Trocas por Defeito</h2>
            <p style={S.p}>Defeitos de fabricação: aceitamos trocas em até <strong style={{color:'#fff'}}>30 dias</strong> após o recebimento. Siga o mesmo processo informando que se trata de defeito.</p>
          </div>

          <div style={{textAlign:'center', background:'rgba(0,196,212,0.08)', border:'1px solid rgba(0,196,212,0.2)', borderRadius:8, padding:32}}>
            <p style={{...S.p, marginBottom:20, textAlign:'center'}}>Precisa de ajuda com sua devolução?</p>
            <Link href="/contato" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#00C4D4,#0099A8)',color:'#0D1B3E',padding:'12px 24px',borderRadius:6,fontSize:14,fontWeight:800,textDecoration:'none'}}>Solicitar Devolução <Mail size={16}/></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
