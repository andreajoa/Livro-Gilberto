"use client"
import { useState } from 'react'
import { Mail, MapPin, Send, Newspaper, Handshake, CheckCircle, AlertCircle } from 'lucide-react'

const S = {
  hero: { background:'linear-gradient(135deg,#060C18,#0D1B3E)', padding:'100px 6vw', textAlign:'center' },
  h1: { fontFamily:"'Playfair Display',serif", fontSize:'clamp(32px,5vw,56px)', fontWeight:900, color:'#fff', marginBottom:12 },
  sub: { fontFamily:"'Cormorant Garant',serif", fontStyle:'italic', fontSize:20, color:'#00C4D4' },
  body: { background:'#0A1628', padding:'80px 6vw' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:48, maxWidth:1100, margin:'0 auto' },
  label: { fontSize:13, color:'#8A9BBF', display:'block', marginBottom:6 },
  input: { width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:6, padding:'12px 14px', color:'#fff', fontSize:14, outline:'none', boxSizing:'border-box', marginBottom:16 },
  btn: { width:'100%', background:'linear-gradient(135deg,#00C4D4,#0099A8)', border:'none', borderRadius:6, padding:'14px', color:'#0D1B3E', fontSize:15, fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 },
  infoCard: { background:'rgba(13,27,62,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, padding:'20px 24px', marginBottom:16, display:'flex', alignItems:'center', gap:16 },
  h2: { fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:'#fff', marginBottom:24 },
}

export default function Contato() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contacts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
      if (data.success) setForm({ name:'', email:'', phone:'', subject:'', message:'' })
    } catch { setStatus('error') }
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <div>
      <section style={S.hero}>
        <h1 style={S.h1}>Entre em Contato</h1>
        <p style={S.sub}>Estamos aqui para ouvir você</p>
      </section>
      <section style={S.body}>
        <div style={S.grid}>
          {/* Formulário */}
          <div>
            <h2 style={S.h2}>Envie uma Mensagem</h2>
            {status==='success' && <div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',borderRadius:6,padding:'12px 16px',display:'flex',alignItems:'center',gap:8,marginBottom:16,color:'#4ade80',fontSize:14}}><CheckCircle size={16}/>Mensagem enviada! Responderemos em breve.</div>}
            {status==='error' && <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:6,padding:'12px 16px',display:'flex',alignItems:'center',gap:8,marginBottom:16,color:'#f87171',fontSize:14}}><AlertCircle size={16}/>Erro ao enviar. Tente pelo email diretamente.</div>}
            <form onSubmit={handleSubmit}>
              <label style={S.label}>Nome Completo *</label>
              <input style={S.input} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Seu nome" required/>
              <label style={S.label}>Email *</label>
              <input style={S.input} type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="seu@email.com" required/>
              <label style={S.label}>WhatsApp</label>
              <input style={S.input} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="(11) 99999-9999"/>
              <label style={S.label}>Assunto *</label>
              <select style={S.input} value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} required>
                <option value="">Selecione</option>
                <option>Informações sobre Pedido</option>
                <option>Dúvida Geral</option>
                <option>Imprensa</option>
                <option>Parceria</option>
                <option>Outro</option>
              </select>
              <label style={S.label}>Mensagem *</label>
              <textarea style={{...S.input, minHeight:120, resize:'vertical'}} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Escreva sua mensagem..." required/>
              <button type="submit" style={S.btn} disabled={status==='loading'}>
                <Send size={16}/>{status==='loading' ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 style={S.h2}>Informações de Contato</h2>
            <div style={S.infoCard}>
              <div style={{width:44,height:44,background:'rgba(0,196,212,0.15)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Mail size={20} color="#00C4D4"/></div>
              <div><p style={{fontSize:13,color:'#8A9BBF',margin:'0 0 2px'}}>Email</p><p style={{fontSize:14,color:'#fff',margin:0}}>contato@gilbertosouza.com</p></div>
            </div>
            <div style={S.infoCard}>
              <div style={{width:44,height:44,background:'rgba(0,196,212,0.15)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><MapPin size={20} color="#00C4D4"/></div>
              <div><p style={{fontSize:13,color:'#8A9BBF',margin:'0 0 2px'}}>Localização</p><p style={{fontSize:14,color:'#fff',margin:0}}>Boston, Massachusetts — EUA</p></div>
            </div>
            <div style={{background:'rgba(13,27,62,0.6)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:8,padding:'20px 24px',marginBottom:16}}>
              <p style={{fontSize:14,fontWeight:600,color:'#fff',marginBottom:8}}>Horário de Atendimento</p>
              <p style={{fontSize:13,color:'#8A9BBF',lineHeight:1.8,margin:0}}>Segunda a Sexta: 9h às 18h (Brasília)<br/>Resposta em até 24 horas úteis</p>
            </div>
            <div style={{background:'rgba(0,196,212,0.07)',border:'1px solid rgba(0,196,212,0.2)',borderRadius:8,padding:'20px 24px'}}>
              <p style={{fontSize:14,fontWeight:600,color:'#fff',marginBottom:6}}>💬 Para Imprensa & Parcerias</p>
              <p style={{fontSize:13,color:'#8A9BBF',lineHeight:1.8,margin:0}}>imprensa@gilbertosouza.com<br/>parcerias@gilbertosouza.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
