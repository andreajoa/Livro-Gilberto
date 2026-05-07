"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Download, Headphones, CheckCircle, Play, Heart } from 'lucide-react'

export default function AcessoDigital({ token }) {
  const params = useSearchParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const name = params.get('name') || ''
  const lang = params.get('lang') || 'pt'
  const firstName = name.split(' ')[0] || 'Bem-vindo'

  useEffect(() => {
    if (!token) { setNotFound(true); setLoading(false); return }
    fetch(`/api/digital-access?token=${token}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) { setOrder(d.order) }
        else { setNotFound(true) }
        setLoading(false)
      })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [token])

  const langLabel = lang === 'pt' ? 'Português' : lang === 'en' ? 'English' : 'Español'

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#060C18' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:48,height:48,border:'3px solid rgba(0,196,212,0.3)',borderTop:'3px solid #00C4D4',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 16px' }}/>
        <p style={{ color:'#8A9BBF' }}>Carregando seu acesso...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )

  if (notFound) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#060C18', textAlign:'center', padding:'0 6vw' }}>
      <div>
        <p style={{ color:'#f87171', fontSize:18, marginBottom:16 }}>Link inválido ou expirado.</p>
        <p style={{ color:'#8A9BBF', fontSize:14 }}>Verifique o email de confirmação ou contate contato@gilbertosouza.com</p>
      </div>
    </div>
  )

  const files = order?.files || {}
  const audiobook = files.audiobook || []

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#060C18,#0D1B3E)', padding:'100px 6vw 60px' }}>
      <div style={{ maxWidth:720, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ width:72,height:72,background:'linear-gradient(135deg,#00C4D4,#0099A8)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px',boxShadow:'0 0 40px rgba(0,196,212,0.3)' }}>
            <CheckCircle size={36} color="#0D1B3E"/>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(26px,4vw,44px)', color:'#fff', fontWeight:900, marginBottom:8 }}>
            Seu Acesso está Liberado{firstName ? `, ${firstName}` : ''}!
          </h1>
          <p style={{ color:'#00C4D4', fontStyle:'italic', fontSize:16 }}>eBook + Audiobook — {langLabel}</p>
        </div>

        {/* eBook */}
        {files.ebook?.url && (
          <div style={{ background:'rgba(13,27,62,0.7)', border:'1px solid rgba(0,196,212,0.2)', borderRadius:12, padding:28, marginBottom:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
              <div style={{ width:48,height:48,background:'rgba(0,196,212,0.15)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                <Download size={22} color="#00C4D4"/>
              </div>
              <div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:'#fff', fontWeight:700, margin:'0 0 2px' }}>eBook PDF</h2>
                <p style={{ color:'#8A9BBF', fontSize:13, margin:0 }}>Como Vencer a Dor de Ser Trocado Por Outro</p>
              </div>
            </div>
            <a href={files.ebook.url} target="_blank" rel="noreferrer" download style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#00C4D4,#0099A8)', color:'#0D1B3E', padding:'12px 24px', borderRadius:8, fontSize:14, fontWeight:800, textDecoration:'none' }}>
              <Download size={16}/>Baixar eBook PDF
            </a>
          </div>
        )}

        {/* Audiobook */}
        {audiobook.length > 0 && (
          <div style={{ background:'rgba(13,27,62,0.7)', border:'1px solid rgba(0,196,212,0.2)', borderRadius:12, padding:28, marginBottom:32 }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
              <div style={{ width:48,height:48,background:'rgba(0,196,212,0.15)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                <Headphones size={22} color="#00C4D4"/>
              </div>
              <div>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:'#fff', fontWeight:700, margin:'0 0 2px' }}>Audiobook</h2>
                <p style={{ color:'#8A9BBF', fontSize:13, margin:0 }}>{audiobook.length} capítulos disponíveis</p>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {audiobook.map((ch, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, padding:'12px 16px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:32,height:32,background:'rgba(0,196,212,0.15)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                      <Play size={14} color="#00C4D4"/>
                    </div>
                    <span style={{ color:'#fff', fontSize:14, fontWeight:500 }}>{ch.title}</span>
                  </div>
                  <a href={ch.url} target="_blank" rel="noreferrer" download style={{ color:'#00C4D4', fontSize:12, fontWeight:700, textDecoration:'none' }}>
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background:'rgba(0,196,212,0.07)', border:'1px solid rgba(0,196,212,0.15)', borderRadius:10, padding:'20px 24px', textAlign:'center' }}>
          <Heart size={16} color="#00C4D4" style={{ marginBottom:8 }}/>
          <p style={{ color:'#B8C8E0', fontSize:14, lineHeight:1.8, margin:0, fontStyle:'italic' }}>
            "Guarde este link — ele é seu acesso permanente. Em caso de dúvidas: contato@gilbertosouza.com"
          </p>
        </div>
      </div>
    </div>
  )
}
