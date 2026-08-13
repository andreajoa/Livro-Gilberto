"use client"
import { FileText, ShoppingBag, Clock, ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'

const S = {
  hero: { background:'linear-gradient(135deg,#060C18,#0D1B3E)', padding:'100px 6vw', textAlign:'center' },
  icon: { width:80,height:80,background:'rgba(0,196,212,0.15)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px' },
  h1: { fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:900, color:'#fff', marginBottom:12 },
  sub: { fontSize:15, color:'#8A9BBF' },
  body: { background:'#0A1628', padding:'80px 6vw' },
  wrap: { maxWidth:800, margin:'0 auto', display:'flex', flexDirection:'column', gap:32 },
  sec: { background:'rgba(13,27,62,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, padding:'32px' },
  h2: { fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:'#fff', marginBottom:14, display:'flex', alignItems:'center', gap:10 },
  p: { fontSize:15, color:'#B8C8E0', lineHeight:1.9, marginBottom:10 },
  li: { fontSize:14, color:'#B8C8E0', lineHeight:2.2 },
}

export default function Termos() {
  return (
    <div>
      <section style={S.hero}>
        <div style={S.icon}><FileText size={36} color="#00C4D4" /></div>
        <h1 style={S.h1}>Termos de Uso</h1>
        <p style={S.sub}>Última atualização: Janeiro de 2026</p>
      </section>
      <section style={S.body}>
        <div style={S.wrap}>
          <div style={S.sec}>
            <h2 style={S.h2}><FileText size={18} color="#00C4D4"/>1. Aceitação dos Termos</h2>
            <p style={S.p}>Ao acessar e utilizar este site, você concorda com estes Termos de Uso.</p>
          </div>
          <div style={S.sec}>
            <h2 style={S.h2}><ShoppingBag size={18} color="#00C4D4"/>2. Descrição do Produto</h2>
            <p style={S.p}>Este site comercializa o livro físico "Como Vencer a Dor de Ser Trocado Por Outro", escrito por Gilberto de Souza.</p>
            <ul style={{paddingLeft:20}}>{['Formato: Livro físico impresso','ISBN: 978-658462205-0','Categoria: Autoajuda / Relacionamentos','Idioma: Português'].map(i=><li key={i} style={S.li}>{i}</li>)}</ul>
          </div>
          <div style={S.sec}>
            <h2 style={S.h2}><FileText size={18} color="#00C4D4"/>3. Processo de Compra</h2>
            <p style={S.p}>O processo é realizado via formulário no site, com pagamento seguro processado pela Stripe.</p>
          </div>
          <div style={S.sec}>
            <h2 style={S.h2}><FileText size={18} color="#00C4D4"/>4. Preços e Pagamento</h2>
            <p style={S.p}>Os preços são informados em Reais (BRL). O frete é calculado separadamente pelo CEP. Aceitamos Visa, Mastercard, Amex e Pix.</p>
          </div>
          <div style={S.sec}>
            <h2 style={S.h2}><Clock size={18} color="#00C4D4"/>5. Envio e Entrega</h2>
            <p style={S.p}>Enviado pelos Correios para todo o Brasil. Prazos estimados:</p>
            <ul style={{paddingLeft:20}}>{['Sul / Sudeste: 5–8 dias úteis','Centro-Oeste / Nordeste: 8–12 dias úteis','Norte: 10–15 dias úteis'].map(i=><li key={i} style={S.li}>{i}</li>)}</ul>
          </div>
          <div style={S.sec}>
            <h2 style={S.h2}><Clock size={18} color="#00C4D4"/>6. Cancelamento e Devolução</h2>
            <p style={S.p}>O pedido pode ser cancelado antes do envio. Após recebimento, você tem 7 dias corridos para devolução conforme o Código de Defesa do Consumidor.</p>
          </div>
          <div style={S.sec}>
            <h2 style={S.h2}><FileText size={18} color="#00C4D4"/>7. Legislação Aplicável</h2>
            <p style={S.p}>Estes termos são regidos pelas leis brasileiras, especialmente o CDC (Lei 8.078/1990) e a LGPD (Lei 13.709/2018).</p>
          </div>
          <div style={S.sec}>
            <h2 style={S.h2}><Mail size={18} color="#00C4D4"/>8. Contato</h2>
            <p style={S.p}>Dúvidas: <strong style={{color:'#fff'}}>contato@gilberto-souza.com</strong></p>
          </div>
          <div style={{textAlign:'center', background:'rgba(0,196,212,0.08)', border:'1px solid rgba(0,196,212,0.2)', borderRadius:8, padding:32}}>
            <p style={{...S.p, marginBottom:20}}>Ainda tem dúvidas? Entre em contato conosco.</p>
            <Link href="/contato" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#00C4D4,#0099A8)',color:'#0D1B3E',padding:'12px 24px',borderRadius:6,fontSize:14,fontWeight:800,textDecoration:'none'}}>Fale Conosco <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
