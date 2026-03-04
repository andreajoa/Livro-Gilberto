import { motion } from 'framer-motion';
import { FileText, ShoppingBag, Clock, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
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
              <FileText size={40} className="text-cyan" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl mb-4">
              Termos de Uso
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
                <CheckCircle size={24} className="text-cyan" />
                1. Aceitação dos Termos
              </h2>
              <p className="text-text-muted leading-relaxed">
                Ao acessar e utilizar este site, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, por favor não utilize este site.
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4 flex items-center gap-3">
                <ShoppingBag size={24} className="text-cyan" />
                2. Descrição do Produto
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Este site comercializa o livro físico "Como Vencer a Dor de Ser Trocado Por Outro", escrito por Gilberto de Souza.
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                <li>Formato: Livro físico impresso</li>
                <li>ISBN: 978-658462205-0</li>
                <li>Categoria: Autoajuda / Relacionamentos / Superação</li>
                <li>Idioma: Português</li>
              </ul>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">3. Processo de Compra</h2>
              <p className="text-text-muted leading-relaxed mb-4">
                O processo de compra é realizado da seguinte forma:
              </p>
              <ol className="list-decimal list-inside text-text-muted space-y-2 ml-4">
                <li>Preenchimento do formulário de pedido com seus dados pessoais e de entrega</li>
                <li>Envio do pedido via email para contato@gilbertosouza.com</li>
                <li>Confirmação do pedido por email com instruções de pagamento</li>
                <li>Envio do livro após confirmação do pagamento</li>
              </ol>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">4. Preços e Pagamento</h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Os preços são informados em Reais (BRL) no momento da compra e incluem o valor do livro, não incluindo o frete, que será calculado de acordo com o endereço de entrega.
              </p>
              <p className="text-text-muted leading-relaxed">
                As formas de pagamento serão informadas no email de confirmação do pedido.
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">5. Envio e Entrega</h2>
              <p className="text-text-muted leading-relaxed mb-4">
                O livro é enviado através dos Correios para todo o Brasil. Os prazos estimados são:
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                <li>Sul / Sudeste: 5–8 dias úteis</li>
                <li>Centro-Oeste / Nordeste: 8–12 dias úteis</li>
                <li>Norte: 10–15 dias úteis</li>
              </ul>
              <p className="text-text-muted leading-relaxed mt-4">
                O comprador receberá um código de rastreamento para acompanhar a entrega.
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4 flex items-center gap-3">
                <Clock size={24} className="text-cyan" />
                6. Cancelamento
              </h2>
              <p className="text-text-muted leading-relaxed">
                O pedido pode ser cancelado a qualquer momento antes do envio do livro. Para cancelar, entre em contato através do email contato@gilbertosouza.com informando o número do pedido.
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">7. Devolução e Reembolso</h2>
              <p className="text-text-muted leading-relaxed mb-4">
                De acordo com o Código de Defesa do Consumidor (Art. 49), você tem direito de arrependimento em até 7 dias corridos após o recebimento do produto.
              </p>
              <p className="text-text-muted leading-relaxed mb-4">
                Condições para devolução:
              </p>
              <ul className="list-disc list-inside text-text-muted space-y-2 ml-4">
                <li>Livro sem uso e em perfeitas condições</li>
                <li>Embalagem original intacta</li>
                <li>Solicitação enviada via email dentro do prazo de 7 dias</li>
              </ul>
              <p className="text-text-muted leading-relaxed mt-4">
                O reembolso será processado em até 10 dias úteis após o recebimento do produto devolvido.
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4 flex items-center gap-3">
                <AlertCircle size={24} className="text-cyan" />
                8. Limitação de Responsabilidade
              </h2>
              <p className="text-text-muted leading-relaxed">
                Não nos responsabilizamos por atrasos na entrega causados por problemas operacionais dos Correios ou por endereços incorretos informados pelo comprador. Em caso de atrasos além do prazo estimado, recomendamos entrar em contato para verificar a situação do pedido.
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">9. Legislação Aplicável</h2>
              <p className="text-text-muted leading-relaxed">
                Estes termos são regidos pelas leis brasileiras, especialmente pelo Código de Defesa do Consumidor (Lei 8.078/1990) e pela Lei Geral de Proteção de Dados (Lei 13.709/2018). Quaisquer disputas serão resolvidas no foro da comarca do domicílio do consumidor.
              </p>
            </motion.section>

            <div className="editorial-divider" />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-4">10. Contato</h2>
              <p className="text-text-muted leading-relaxed">
                Para quaisquer dúvidas sobre estes Termos de Uso, entre em contato através do email <strong className="text-white">contato@gilbertosouza.com</strong>
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

export default Terms;
