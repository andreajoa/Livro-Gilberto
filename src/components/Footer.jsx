import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Package, Lock } from 'lucide-react';
import bookCover from '../assets/book/capa-livro.png';

export default function Footer() {
  return (
    <footer style={{ background:'#091422', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 8vw 40px' }}>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))', gap:48, marginBottom:64 }}>

          {/* Brand */}
          <div>
            <div style={{ width:52, height:52, background:'#00C4D4', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
              <span style={{ fontFamily:"'Playfair Display', serif", fontWeight:900, fontSize:20, color:'#0D1B3E' }}>G·S</span>
            </div>
            <p style={{ fontFamily:"'Playfair Display', serif", fontWeight:700, fontSize:16, color:'#fff', marginBottom:6 }}>Gilberto de Souza</p>
            <p style={{ fontSize:13, color:'#8A9BBF', marginBottom:20, fontStyle:'italic' }}>Você não está sozinho</p>
            <svg width="160" height="32" viewBox="0 0 160 32" style={{ opacity:0.2 }}>
              {[0,4,6,11,13,17,23,25,30,34,36,41,43,47,52,54,58,64,66,71,75,77,82,84,88,93,95,99,105,107,112,116,118,123,125,129,134,136,140,146,148,153,157,159].map((x,i) => (
                <rect key={i} x={x} y="0" width={i%5===0?3:i%3===0?2:1} height="32" fill="white" />
              ))}
            </svg>
          </div>

          {/* Navegação */}
          <div>
            <h3 style={{ fontSize:11, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'#00C4D4', marginBottom:20 }}>Navegação</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {[['Início','/'],['O Livro','/o-livro'],['Sobre','/sobre'],['Contato','/contato']].map(([name,to]) => (
                <Link key={name} to={to} style={{ color:'#8A9BBF', textDecoration:'none', fontSize:14 }}>{name}</Link>
              ))}
            </div>
          </div>

          {/* O Livro */}
          <div>
            <h3 style={{ fontSize:11, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'#00C4D4', marginBottom:20 }}>O Livro</h3>
            <img src={bookCover} alt="Capa do livro"
              style={{ width:80, borderRadius:3, marginBottom:16, boxShadow:'4px 6px 20px rgba(0,0,0,0.5)', display:'block' }} />
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {[
                ['📖','ISBN 978-658462205-0'],
                ['📚','Autoajuda / Relacionamentos'],
                ['🗓','2026 — 1ª Edição'],
                ['📦','Formato físico'],
              ].map(([icon,text]) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#8A9BBF' }}>
                  <span>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ fontSize:11, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'#00C4D4', marginBottom:20 }}>Legal</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {[['Política de Privacidade','/privacidade'],['Termos de Uso','/termos'],['Política de Entrega','/entrega'],['Política de Devolução','/devolucao']].map(([name,to]) => (
                <Link key={name} to={to} style={{ color:'#8A9BBF', textDecoration:'none', fontSize:14 }}>{name}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:32 }}>
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:16, marginBottom:24 }}>
            <p style={{ fontSize:13, color:'#8A9BBF', margin:0 }}>© 2026 Gilberto de Souza · Todos os direitos reservados</p>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'#8A9BBF' }}>
              <Package size={14} color="#00C4D4" />
              <span>Enviado pelos Correios para todo o Brasil</span>
            </div>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:32 }}>
            {[
              [<Lock size={13} key="l"/>, 'Compra Segura'],
              [<Shield size={13} key="s"/>, 'LGPD Compliance'],
              [<CheckCircle size={13} key="c"/>, 'Site Verificado'],
            ].map(([icon,text]) => (
              <div key={text} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#8A9BBF' }}>
                <span style={{ color:'#00C4D4' }}>{icon}</span>{text}
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
