"use client"
import { Shield, Lock, FileText, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const S = {
  hero: { background:'linear-gradient(135deg,#060C18,#0D1B3E)', padding:'100px 6vw', textAlign:'center' },
  icon: { width:80,height:80,background:'rgba(0,196,212,0.15)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px' },
  h1: { fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:900, color:'#fff', marginBottom:12 },
  sub: { fontSize:15, color:'#8A9BBF' },
  body: { background:'#0A1628', padding:'80px 6vw' },
  wrap: { maxWidth:800, margin:'0 auto', display:'flex', flexDirection:'column', gap:40 },
  section: { background:'rgba(13,27,62,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, padding:'32px' },
  h2: { fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:'#fff', marginBottom:16, display:'flex', alignItems:'center', gap:10 },
  p: { fontSize:15, color:'#B8C8E0', lineHeight:1.9, marginBottom:12 },
  li: { fontSize:14, color:'#B8C8E0', lineHeight:2 },
  divider: { height:1, background:'rgba(0,196,212,0.15)', margin:'0' },
}

export default function Privacidade() {
  return (
    <div>
      <section style={S.hero}>
        <div style={S.icon}><Shield size={36} color="#00C4D4" /></div>
        <h1 style={S.h1}>Política de Privacidade</h1>
        <p style={S.sub}>Última atualização: Janeiro de 2026</p>
      </section>
      <section style={S.body}>
        <div style={S.wrap}>
          {[
            { icon:<FileText size={18} color="#00C4D4"/>, title:'1. Quem Somos', content: <><p style={S.p}>Somos Gilberto de Souza, autor e responsável pelo site de vendas do livro "Como Vencer a Dor de Ser Trocado Por Outro".</p><div style={{display:'flex',alignItems:'center',gap:8,color:'#8A9BBF',fontSize:14}}><Mail size={14} color="#00C4D4"/>contato@gilbertosouza.com</div></> },
            { icon:<Lock size={18} color="#00C4D4"/>, title:'2. Quais Dados Coletamos', content: <><p style={S.p}>Coletamos exclusivamente os dados necessários para o processamento e envio do seu pedido:</p><ul style={{paddingLeft:20}}>{['Nome completo','Endereço postal completo','Email','Telefone'].map(i=><li key={i} style={S.li}>{i}</li>)}</ul></> },
            { icon:<Shield size={18} color="#00C4D4"/>, title:'3. Como Usamos os Dados', content: <><p style={S.p}>Seus dados são utilizados exclusivamente para:</p><ul style={{paddingLeft:20}}>{['Processamento do seu pedido','Envio pelos Correios','Comunicação sobre o status do envio','Envio do código de rastreamento'].map(i=><li key={i} style={S.li}>{i}</li>)}</ul></> },
            { icon:<Shield size={18} color="#00C4D4"/>, title:'4. Compartilhamento com Terceiros', content: <p style={S.p}>Seus dados de endereço são compartilhados exclusivamente com os Correios para fins de entrega. Não vendemos, alugamos ou compartilhamos seus dados para fins de marketing.</p> },
            { icon:<Lock size={18} color="#00C4D4"/>, title:'5. Armazenamento e Segurança', content: <p style={S.p}>Adotamos medidas de segurança adequadas para proteger seus dados contra acesso não autorizado, alteração, destruição ou perda.</p> },
            { icon:<FileText size={18} color="#00C4D4"/>, title:'6. Direitos do Titular (LGPD)', content: <><p style={S.p}>Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você possui os seguintes direitos:</p><ul style={{paddingLeft:20}}>{['Acesso aos seus dados pessoais','Correção de dados incorretos','Exclusão de dados (quando aplicável)','Portabilidade dos dados','Oposição ao processamento'].map(i=><li key={i} style={S.li}>{i}</li>)}</ul></> },
            { icon:<Shield size={18} color="#00C4D4"/>, title:'7. Cookies', content: <p style={S.p}>Este site pode utilizar cookies para melhorar a experiência do usuário e coletar informações estatísticas anônimas sobre o tráfego.</p> },
            { icon:<Mail size={18} color="#00C4D4"/>, title:'8. Contato', content: <p style={S.p}>Para questões relacionadas à proteção de dados: <strong style={{color:'#fff'}}>contato@gilbertosouza.com</strong></p> },
          ].map((sec,i) => (
            <div key={i} style={S.section}>
              <h2 style={S.h2}>{sec.icon}{sec.title}</h2>
              {sec.content}
            </div>
          ))}
          <div style={{textAlign:'center', background:'rgba(0,196,212,0.08)', border:'1px solid rgba(0,196,212,0.2)', borderRadius:8, padding:32}}>
            <p style={{...S.p, marginBottom:20}}>Ainda tem dúvidas? Entre em contato conosco.</p>
            <Link href="/contato" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#00C4D4,#0099A8)',color:'#0D1B3E',padding:'12px 24px',borderRadius:6,fontSize:14,fontWeight:800,textDecoration:'none'}}>Fale Conosco <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
