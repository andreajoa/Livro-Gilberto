import { motion } from 'framer-motion';
import { Package, Truck, MapPin, Clock, CheckCircle, Search, AlertCircle, ArrowRight } from 'lucide-react';

const Delivery = () => {
  const steps = [
    {
      number: '01',
      icon: Package,
      title: 'Pedido Recebido',
      description: 'Seu pedido é registrado e você recebe a confirmação por email.'
    },
    {
      number: '02',
      icon: Package,
      title: 'Separação e Embalagem',
      description: 'O livro é separado e embalado com cuidado para envio.'
    },
    {
      number: '03',
      icon: Truck,
      title: 'Postagem nos Correios',
      description: 'O pacote é postado com código de rastreamento.'
    },
    {
      number: '04',
      icon: MapPin,
      title: 'Rastreamento',
      description: 'O código de rastreamento é enviado por email para você acompanhar.'
    },
    {
      number: '05',
      icon: CheckCircle,
      title: 'Entrega',
      description: 'O livro é entregue no endereço informado.'
    }
  ];

  const deliveryTimes = [
    { region: 'Sul / Sudeste', days: '5–8 dias úteis' },
    { region: 'Centro-Oeste / Nordeste', days: '8–12 dias úteis' },
    { region: 'Norte', days: '10–15 dias úteis' }
  ];

  const trackingInfo = [
    {
      icon: Search,
      title: 'Como rastrear',
      description: 'Acesse rastreamento.correios.com.br e digite o código enviado por email.'
    },
    {
      icon: AlertCircle,
      title: 'Prazo vencido?',
      description: 'Entre em contato conosco se o prazo estimado for ultrapassado sem entrega.'
    },
    {
      icon: MapPin,
      title: 'Endereço incorreto',
      description: 'Verifique o endereço antes de finalizar o pedido. Alterações após o envio dependem da disponibilidade dos Correios.'
    }
  ];

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
              <Truck size={40} className="text-cyan" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl mb-4">
              Política de Entrega
            </h1>
            <p className="font-editorial italic text-2xl text-cyan-light">
              Seu livro chegará até você, onde estiver
            </p>
          </motion.div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="py-16 bg-navy-mid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              Como Funciona a Entrega
            </h2>
            <div className="editorial-divider" />
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-cyan/20 transform -translate-y-1/2" />

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 bg-cyan rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="font-display font-bold text-xl text-navy">{step.number}</span>
                  </div>
                  <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4 -mt-8">
                    <step.icon className="text-cyan" size={20} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-text-muted text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Times */}
      <section className="py-16 grain-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              Prazos Estimados por Região
            </h2>
            <p className="text-text-muted">
              Os prazos são estimados e podem variar conforme condições operacionais dos Correios
            </p>
          </motion.div>

          <div className="space-y-4">
            {deliveryTimes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy-mid p-6 rounded-xl border border-navy-light flex justify-between items-center hover:border-cyan/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center">
                    <MapPin size={24} className="text-cyan" />
                  </div>
                  <span className="font-semibold text-lg">{item.region}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-cyan" />
                  <span className="font-display font-bold text-xl text-cyan">{item.days}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Info */}
      <section className="py-16 bg-navy-mid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              Orientações Importantes
            </h2>
            <div className="editorial-divider" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {trackingInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy p-6 rounded-xl border border-navy-light"
              >
                <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center mb-4">
                  <info.icon className="text-cyan" size={24} />
                </div>
                <h3 className="font-display font-bold text-lg mb-3">{info.title}</h3>
                <p className="text-text-muted text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 grain-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy-mid p-8 md:p-12 rounded-2xl border border-navy-light"
          >
            <h3 className="font-display font-bold text-2xl mb-4">
              Pronto para receber seu livro?
            </h3>
            <p className="text-text-muted mb-6">
              Preencha seus dados e entraremos em contato para finalizar seu pedido
            </p>
            <a href="/#comprar" className="btn-primary">
              Fazer Pedido Agora
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Delivery;
