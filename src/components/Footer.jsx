import { Link } from 'react-router-dom';
import { BookOpen, Shield, CheckCircle, Package, Lock } from 'lucide-react';
import bookCover from '../assets/book/capa-livro.png';

const BarCodeSVG = () => (
  <svg width="200" height="40" viewBox="0 0 200 40" style={{ opacity: 0.2 }}>
    {[0,4,6,11,13,17,23,25,30,34,36,41,43,47,52,54,58,64,66,71,75,77,82,84,88,93,95,99,105,107,112,116,118,123,125,129,134,136,140,146,148,153,157,159,164,166,170,175,177,181,187,189,194,198].map((x, i) => (
      <rect key={i} x={x} y="0" width={i%5===0?3:i%3===0?2:1} height="40" fill="white" />
    ))}
  </svg>
);

const Footer = () => {
  const navLinks = [
    { name: 'Início', to: '/' },
    { name: 'O Livro', to: '/o-livro' },
    { name: 'Sobre', to: '/sobre' },
    { name: 'Contato', to: '/contato' },
  ];

  const legalLinks = [
    { name: 'Política de Privacidade', to: '/privacidade' },
    { name: 'Termos de Uso', to: '/termos' },
    { name: 'Política de Entrega', to: '/entrega' },
    { name: 'Política de Devolução', to: '/devolucao' },
  ];

  return (
    <footer style={{ background: '#091422', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 8vw 40px' }}>

        {/* Grid 4 colunas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 48, marginBottom: 64 }}>

          {/* Brand */}
          <div>
            <div style={{ width: 52, height: 52, background: '#00C4D4', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: '#0D1B3E' }}>G·S</span>
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 6 }}>Gilberto de Souza</p>
            <p style={{ fontSize: 13, color: '#8A9BBF', marginBottom: 20, fontStyle: 'italic' }}>Você não está sozinho</p>
            <BarCodeSVG />
          </div>

          {/* Navegação */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#00C4D4', marginBottom: 20 }}>Navegação</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.to} style={{ color: '#8A9BBF', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#00C4D4'}
                    onMouseLeave={e => e.target.style.color = '#8A9BBF'}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* O Livro */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#00C4D4', marginBottom: 20 }}>O Livro</h3>
            <img src={bookCover} alt="Como Vencer a Dor de Ser Trocado Por Outro"
              style={{ width: 80, borderRadius: 3, marginBottom: 16, boxShadow: '4px 6px 20px rgba(0,0,0,0.5)', display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: <BookOpen size={13} />, text: 'ISBN 978-658462205-0' },
                { icon: '📚', text: 'Autoajuda / Relacionamentos' },
                { icon: '🗓', text: '2026 — 1ª Edição' },
                { icon: '📖', text: 'Formato físico' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#8A9BBF' }}>
                  <span style={{ color: '#00C4D4', flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#00C4D4', marginBottom: 20 }}>Legal</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {legalLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.to} style={{ color: '#8A9BBF', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#00C4D4'}
                    onMouseLeave={e => e.target.style.color = '#8A9BBF'}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 32 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
            <p style={{ fontSize: 13, color: '#8A9BBF' }}>© 2026 Gilberto de Souza · Todos os direitos reservados</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#8A9BBF' }}>
              <Package size={14} />
              <span>Enviado pelos Correios para todo o Brasil</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
            {[
              { icon: <Lock size={13} />, text: 'Compra Segura' },
              { icon: <Shield size={13} />, text: 'LGPD Compliance' },
              { icon: <CheckCircle size={13} />, text: 'Site Verificado' },
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#8A9BBF' }}>
                <span style={{ color: '#00C4D4' }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
