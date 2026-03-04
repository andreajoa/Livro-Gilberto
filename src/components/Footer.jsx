import { Link } from 'react-router-dom';
import { BookOpen, Mail, Shield, CheckCircle, Package, Lock } from 'lucide-react';

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

  const BarCodeSVG = () => (
    <svg width="200" height="40" viewBox="0 0 200 40" className="opacity-20">
      <rect x="0" y="0" width="2" height="40" fill="white" />
      <rect x="4" y="0" width="1" height="40" fill="white" />
      <rect x="6" y="0" width="3" height="40" fill="white" />
      <rect x="11" y="0" width="1" height="40" fill="white" />
      <rect x="13" y="0" width="2" height="40" fill="white" />
      <rect x="17" y="0" width="4" height="40" fill="white" />
      <rect x="23" y="0" width="1" height="40" fill="white" />
      <rect x="25" y="0" width="3" height="40" fill="white" />
      <rect x="30" y="0" width="2" height="40" fill="white" />
      <rect x="34" y="0" width="1" height="40" fill="white" />
      <rect x="36" y="0" width="3" height="40" fill="white" />
      <rect x="41" y="0" width="1" height="40" fill="white" />
      <rect x="43" y="0" width="2" height="40" fill="white" />
      <rect x="47" y="0" width="3" height="40" fill="white" />
      <rect x="52" y="0" width="1" height="40" fill="white" />
      <rect x="54" y="0" width="2" height="40" fill="white" />
      <rect x="58" y="0" width="4" height="40" fill="white" />
      <rect x="64" y="0" width="1" height="40" fill="white" />
      <rect x="66" y="0" width="3" height="40" fill="white" />
      <rect x="71" y="0" width="2" height="40" fill="white" />
      <rect x="75" y="0" width="1" height="40" fill="white" />
      <rect x="77" y="0" width="3" height="40" fill="white" />
      <rect x="82" y="0" width="1" height="40" fill="white" />
      <rect x="84" y="0" width="2" height="40" fill="white" />
      <rect x="88" y="0" width="3" height="40" fill="white" />
      <rect x="93" y="0" width="1" height="40" fill="white" />
      <rect x="95" y="0" width="2" height="40" fill="white" />
      <rect x="99" y="0" width="4" height="40" fill="white" />
      <rect x="105" y="0" width="1" height="40" fill="white" />
      <rect x="107" y="0" width="3" height="40" fill="white" />
      <rect x="112" y="0" width="2" height="40" fill="white" />
      <rect x="116" y="0" width="1" height="40" fill="white" />
      <rect x="118" y="0" width="3" height="40" fill="white" />
      <rect x="123" y="0" width="1" height="40" fill="white" />
      <rect x="125" y="0" width="2" height="40" fill="white" />
      <rect x="129" y="0" width="3" height="40" fill="white" />
      <rect x="134" y="0" width="1" height="40" fill="white" />
      <rect x="136" y="0" width="2" height="40" fill="white" />
      <rect x="140" y="0" width="4" height="40" fill="white" />
      <rect x="146" y="0" width="1" height="40" fill="white" />
      <rect x="148" y="0" width="3" height="40" fill="white" />
      <rect x="153" y="0" width="2" height="40" fill="white" />
      <rect x="157" y="0" width="1" height="40" fill="white" />
      <rect x="159" y="0" width="3" height="40" fill="white" />
      <rect x="164" y="0" width="1" height="40" fill="white" />
      <rect x="166" y="0" width="2" height="40" fill="white" />
      <rect x="170" y="0" width="3" height="40" fill="white" />
      <rect x="175" y="0" width="1" height="40" fill="white" />
      <rect x="177" y="0" width="2" height="40" fill="white" />
      <rect x="181" y="0" width="4" height="40" fill="white" />
      <rect x="187" y="0" width="1" height="40" fill="white" />
      <rect x="189" y="0" width="3" height="40" fill="white" />
      <rect x="194" y="0" width="2" height="40" fill="white" />
      <rect x="198" y="0" width="2" height="40" fill="white" />
    </svg>
  );

  return (
    <footer className="bg-navy-mid border-t border-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="w-14 h-14 bg-cyan rounded-lg flex items-center justify-center mb-4">
              <span className="font-display font-bold text-2xl text-navy">G·S</span>
            </div>
            <p className="font-display font-bold text-xl mb-2">Gilberto de Souza</p>
            <p className="text-text-muted text-sm mb-4">Você não está sozinho</p>
            <BarCodeSVG />
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-body font-semibold text-white mb-4">Navegação</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-text-muted hover:text-cyan transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* O Livro */}
          <div>
            <h3 className="font-body font-semibold text-white mb-4">O Livro</h3>
            <div className="space-y-2 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>ISBN: 978-658462205-0</span>
              </div>
              <p>Categoria: Autoajuda / Relacionamentos</p>
              <p>Ano: 2026</p>
              <p>Formato: Livro físico</p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-body font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-text-muted hover:text-cyan transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-light mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              © 2026 Gilberto de Souza · Todos os direitos reservados
            </p>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Package size={16} />
              <span>Enviado pelos Correios para todo o Brasil</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-text-muted text-xs">
              <Lock size={14} />
              <span>Compra Segura</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted text-xs">
              <Shield size={14} />
              <span>LGPD Compliance</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted text-xs">
              <CheckCircle size={14} />
              <span>Site Verificado</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
