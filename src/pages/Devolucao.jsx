import { motion } from 'framer-motion';
import { RotateCcw, Clock, CheckCircle, AlertTriangle, XCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Return = () => {
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
              <RotateCcw size={40} className="text-cyan" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl mb-4">
              Política de Devolução
            </h1>
            <p className="font-editorial italic text-2xl text-cyan-light">
              Seus direitos garantidos por lei
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-navy-mid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Right to Withdraw */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy p-8 rounded-2xl border border-cyan/30 mb-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle size={24} className="text-cyan" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl mb-2">Direito de Arrependimento</h2>
                <p className="text-cyan-light font-semibold">
                  Art. 49 do Código de Defesa do Consumidor
                </p>
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              De acordo com o Código de Defesa do Consumidor, você tem direito de arrependimento e pode devolver o produto em até <strong className="text-white">7 dias corridos</strong> após o recebimento, sem necessidade de justificativa.
            </p>
          </motion.div>

          {/* Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-3">
              <AlertTriangle size={24} className="text-cyan" />
              Condições para Devolução
            </h2>
            <div className="space-y-4">
              {[
                'O livro deve estar sem uso e em perfeitas condições',
                'A embalagem original deve estar intacta',
                'A solicitação deve ser feita dentro do prazo de 7 dias corridos após o recebimento',
                'O número do pedido deve ser informado na solicitação'
              ].map((condition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-navy p-4 rounded-lg border border-navy-light flex items-center gap-3"
                >
                  <CheckCircle size={20} className="text-cyan flex-shrink-0" />
                  <span className="text-text-muted">{condition}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="editorial-divider" />

          {/* How to Request */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-3">
              <Mail size={24} className="text-cyan" />
              Como Solicitar a Devolução
            </h2>
            <div className="bg-navy p-6 rounded-xl border border-navy-light">
              <ol className="list-decimal list-inside space-y-4 text-text-muted">
                <li>Envie um email para <strong className="text-white">contato@gilbertosouza.com</strong></li>
                <li>Coloque "Solicitação de Devolução - [Número do Pedido]" no assunto</li>
                <li>Informe seu nome completo e número do pedido</li>
                <li>Descreva brevemente o motivo da devolução</li>
                <li>Aguarde as instruções sobre o frete de retorno</li>
              </ol>
            </div>
          </motion.div>

          <div className="editorial-divider" />

          {/* Return Shipping */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display font-bold text-2xl mb-6">Frete de Retorno</h2>
            <div className="bg-navy p-6 rounded-xl border border-navy-light">
              <p className="text-text-muted leading-relaxed mb-4">
                O frete de retorno será acordado caso a caso. Em devoluções motivadas por arrependimento (direito do consumidor), o vendedor pode assumir os custos conforme legislação vigente.
              </p>
              <p className="text-text-muted leading-relaxed">
                Por favor, aguarde as instruções específicas sobre como proceder com o envio de retorno antes de postar o produto.
              </p>
            </div>
          </motion.div>

          <div className="editorial-divider" />

          {/* Refund */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-3">
              <Clock size={24} className="text-cyan" />
              Prazo de Reembolso
            </h2>
            <div className="bg-navy p-6 rounded-xl border border-cyan/30">
              <p className="text-text-muted leading-relaxed">
                O reembolso será processado em até <strong className="text-white">10 dias úteis</strong> após o recebimento e verificação do produto devolvido, conforme determina o Código de Defesa do Consumidor.
              </p>
            </div>
          </motion.div>

          <div className="editorial-divider" />

          {/* Defect Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-3">
              <XCircle size={24} className="text-cyan" />
              Trocas por Defeito de Fabricação
            </h2>
            <div className="bg-navy p-6 rounded-xl border border-navy-light">
              <p className="text-text-muted leading-relaxed mb-4">
                Caso o produto apresente defeitos de fabricação, aceitamos trocas em até <strong className="text-white">30 dias</strong> após o recebimento.
              </p>
              <p className="text-text-muted leading-relaxed">
                Siga o mesmo processo de solicitação de devolução, informando claramente que se trata de defeito de fabricação. O envio do novo exemplar e a devolução do defeituoso serão tratados com prioridade.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy-mid p-8 rounded-2xl border border-navy-light text-center"
          >
            <h3 className="font-display font-bold text-xl mb-4">
              Precisa de ajuda com sua devolução?
            </h3>
            <p className="text-text-muted mb-6">
              Entre em contato conosco e responderemos prontamente.
            </p>
            <Link to="/contato" className="btn-secondary">
              Solicitar Devolução
              <Mail size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Return;
