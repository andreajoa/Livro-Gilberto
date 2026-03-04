import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Newspaper, Handshake } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Contact = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const subject = `[${data.subject}] ${data.name}`;
    const body = `
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}

Mensagem:
${data.message}
`.trim();

    window.location.href = `mailto:contato@gilbertosouza.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contato@gilbertosouza.com',
      link: 'mailto:contato@gilbertosouza.com'
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: '(55) XX XXXXX-XXXX',
      link: 'tel:+55XXXXXXXXXXX'
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'Estados Unidos / Brasil',
      link: null
    }
  ];

  const pressInfo = [
    {
      icon: Newspaper,
      title: 'Para Imprensa',
      description: 'Solicitações de entrevistas, materiais para mídia e kit de imprensa.',
      email: 'imprensa@gilbertosouza.com'
    },
    {
      icon: Handshake,
      title: 'Parcerias',
      description: 'Propostas de colaboração, distribuição e projetos conjuntos.',
      email: 'parcerias@gilbertosouza.com'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] grain-overlay flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-cyan/10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-4">
              Entre em Contato
            </h1>
            <p className="font-editorial italic text-2xl text-cyan-light">
              Estamos aqui para ouvir você
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-navy-mid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-6">
                Envie uma Mensagem
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Nome Completo *</label>
                  <input
                    {...register('name', { required: true })}
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Email *</label>
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Telefone</label>
                  <input
                    {...register('phone')}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Assunto *</label>
                  <select {...register('subject', { required: true })} required>
                    <option value="">Selecione um assunto</option>
                    <option value="Pedido">Informações sobre Pedido</option>
                    <option value="Dúvida">Dúvida Geral</option>
                    <option value="Imprensa">Imprensa</option>
                    <option value="Parceria">Parceria</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Mensagem *</label>
                  <textarea
                    {...register('message', { required: true })}
                    rows={5}
                    placeholder="Escreva sua mensagem..."
                    required
                  />
                </div>

                <button type="submit" className="w-full btn-primary">
                  <Send size={20} />
                  Enviar Mensagem
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display font-bold text-2xl mb-6">
                Informações de Contato
              </h2>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link || '#'}
                    className={`block bg-navy p-6 rounded-xl border border-navy-light hover:border-cyan/30 transition-all duration-300 ${!item.link ? 'cursor-default' : 'hover:translate-x-2'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-cyan" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.label}</h3>
                        <p className="text-text-muted">{item.value}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bg-navy p-6 rounded-xl border border-navy-light mt-8">
                <h3 className="font-semibold mb-3">Horário de Atendimento</h3>
                <p className="text-text-muted">
                  Segunda a Sexta: 9h às 18h (horário de Brasília)<br />
                  Respostas geralmente em até 24 horas úteis
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Press & Partners */}
      <section className="py-24 grain-overlay">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              Para Imprensa & Parcerias
            </h2>
            <div className="editorial-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {pressInfo.map((item, index) => (
              <motion.a
                key={index}
                href={`mailto:${item.email}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy-mid p-8 rounded-2xl border border-navy-light hover:border-cyan/30 transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-cyan/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan/30 transition-colors">
                  <item.icon className="text-cyan" size={32} />
                </div>
                <h3 className="font-display font-bold text-2xl mb-3">{item.title}</h3>
                <p className="text-text-muted mb-6">{item.description}</p>
                <span className="inline-flex items-center gap-2 text-cyan group-hover:gap-3 transition-all">
                  {item.email}
                  <Send size={16} />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
