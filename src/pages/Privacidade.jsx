import { motion } from 'framer-motion';
import { Shield, Lock, FileText, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[30vh] grain-overlay flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-cyan/10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={40} className="text-cyan" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl mb-4">
              Política de Privacidade
            </h1>
            <p className="text-text-muted text-lg">
              Última atualização: Janeiro de 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-navy-mid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4 flex items-center gap-3">
                <FileText size={24} className="text-cyan" />
                1. Quem Somos
              </h2>
              <p className="text-text-muted leading-relaxed">
                Somos Gilberto de Souza, autor e responsável pelo site de vendas do livro "Como Vencer a Dor de Ser Trocado Por Outro".
              </p>
              <div className="mt-4 flex items-center gap-3 text-text-muted">
                <Mail size={18} className="text-cyan" />
                <span>contato@gilbertosouza.com</span>
              </div>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4 flex items-center gap-3">
                <Lock size={24} className="text-cyan" />
                2. Quais Dados Coletamos
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Coletamos exclusivamente os dados necessários para o processamento e envio do seu pedido:
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                <li>Nome completo</li>
                <li>Endereço postal completo (rua, número, complemento, cidade, estado, CEP)</li>
                <li>Email</li>
                <li>Telefone</li>
              </ul>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4 flex items-center gap-3">
                <Shield size={24} className="text-cyan" />
                3. Como Usamos os Dados
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Seus dados são utilizados exclusivamente para:
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                <li>Processamento do seu pedido do livro</li>
                <li>Envio do livro pelo Correios para o endereço informado</li>
                <li>Comunicação sobre o status do envio</li>
                <li>Envio do código de rastreamento</li>
                <li>Responder a dúvidas ou solicitações que você enviar</li>
              </ul>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">4. Compartilhamento com Terceiros</h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Compartilhamos seus dados de endereço exclusivamente com:
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                <li><strong className="text-white">Correios:</strong> para fins de entrega do pedido</li>
              </ul>
              <p className="text-text-muted leading-relaxed mt-4">
                Não vendemos, alugamos ou compartilhamos seus dados com qualquer outra terceira parte para fins de marketing ou publicidade.
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">5. Armazenamento e Segurança</h2>
              <p className="text-text-muted leading-relaxed">
                Adotamos medidas de segurança adequadas para proteger seus dados contra acesso não autorizado, alteração, destruição ou perda. Seus dados são armazenados de forma segura e mantidos apenas pelo tempo necessário para cumprir as finalidades descritas nesta política.
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">6. Direitos do Titular (LGPD)</h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você possui os seguintes direitos:
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                <li>Acesso aos seus dados pessoais</li>
                <li>Correção de dados incompletos ou inexatos</li>
                <li>Exclusão de dados (quando aplicável)</li>
                <li>Portabilidade dos dados</li>
                <li>Oposição ao processamento</li>
                <li>Informação sobre compartilhamento de dados</li>
              </ul>
              <p className="text-text-muted leading-relaxed mt-4">
                Para exercer esses direitos, entre em contato através do email informado acima.
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">7. Cookies e Analytics</h2>
              <p className="text-text-muted leading-relaxed">
                Este site pode utilizar cookies para melhorar a experiência do usuário e coletar informações estatísticas anônimas sobre o tráfego. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">8. Encarregado (DPO)</h2>
              <p className="text-text-muted leading-relaxed">
                Para questões relacionadas à proteção de dados pessoais, entre em contato com nosso encarregado pelo email: <strong className="text-white">contato@gilbertosouza.com</strong>
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">9. Vigência</h2>
              <p className="text-text-muted leading-relaxed">
                Esta política está em vigor a partir de Janeiro de 2026. Reservamo-nos o direito de atualizá-la periodicamente para refletir mudanças em nossas práticas ou por exigências legais.
              </p>
            </motion.section>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-navy p-8 rounded-2xl border border-navy-light text-center"
          >
            <h3 className="font-display font-bold text-xl mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-text-muted mb-6">
              Entre em contato conosco e responderemos prontamente.
            </p>
            <Link to="/contato" className="btn-secondary">
              Fale Conosco
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
