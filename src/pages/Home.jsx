import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { Heart, Brain, Frown, User, Book, HeartPulse, Quote, ArrowRight, Check, Mail, Shield, Sparkles } from 'lucide-react';
import bookFront from '../assets/book-front.jpg';
import authorImg from '../assets/author.jpg';
import { useForm } from 'react-hook-form';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const floatAnimation = {
  y: [0, -18, 0],
  rotate: [-2, -2, -2],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
};

const PainCard = ({ icon: Icon, title, description, image }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-paper p-6 rounded-xl border border-white/10 hover:border-cyan/30 transition-all duration-300 group relative overflow-hidden"
    >
      {image && (
        <div className="absolute top-0 left-0 w-32 h-32 -translate-x-4 -translate-y-4">
          <img src={image} alt={title} className="w-full h-full object-cover rounded-full shadow-lg" />
        </div>
      )}
      <div className="relative z-10">
        <div className="w-12 h-12 bg-navy-light rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
          <Icon className="text-cyan" size={24} />
        </div>
        <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
        <p className="text-text-muted text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const emotionalImages = [
  { src: '/images/Whisk_0ff19b3870d52b9937349e384106b917dr.png', alt: 'Esperança' },
  { src: '/images/Whisk_1077a37ca15538fa2194b95dd276f65ddr.png', alt: 'Força' },
  { src: '/images/Whisk_28a99d62ca1b2ae8c0743456c1b2503fdr.png', alt: 'Resiliência' },
  { src: '/images/Whisk_2d70c31ce41ad82901d4e1e8ec762153dr.png', alt: 'Superação' },
  { src: '/images/Whisk_49e2674e2579cf2acda4c4730dc4e78bdr.png', alt: 'Cura' },
  { src: '/images/Whisk_638147bfa9a109caf2e4067e7fa3886fdr.png', alt: 'Renascimento' },
  { src: '/images/Whisk_b551161facc7831ae484d8ecb5a3f7eedr.png', alt: 'Evolução' },
];

const Home = () => {
  const { register, handleSubmit } = useForm();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroRef = useRef(null);
  const painRef = useRef(null);
  const authorRef = useRef(null);
  const whatRef = useRef(null);
  const quoteRef = useRef(null);
  const formRef = useRef(null);
  const faqRef = useRef(null);
  const galleryRef = useRef(null);

  const onSubmit = (data) => {
    const subject = `Pedido do Livro - ${data.name}`;
    const body = `
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
CEP: ${data.cep}
Endereço: ${data.address}, ${data.number}
Complemento: ${data.complement}
Cidade: ${data.city}
Estado: ${data.state}

Tipo de pedido: Livro Físico - Como Vencer a Dor de Ser Trocado Por Outro
`.trim();

    window.location.href = `mailto:contato@gilbertosouza.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const faqItems = [
    {
      q: 'Como funciona o envio?',
      a: 'Após a confirmação do pedido, o livro é enviado através dos Correios para o endereço informado. Você receberá um código de rastreamento por email para acompanhar a entrega.'
    },
    {
      q: 'Qual o prazo de entrega?',
      a: 'O prazo varia de 5 a 15 dias úteis, dependendo da região: Sul/Sudeste (5-8 dias), Centro-Oeste/Nordeste (8-12 dias) e Norte (10-15 dias).'
    },
    {
      q: 'Posso devolver o livro?',
      a: 'Sim! De acordo com o Código de Defesa do Consumidor, você tem 7 dias após o recebimento para devolução, desde que o livro esteja em perfeitas condições e na embalagem original.'
    },
    {
      q: 'Como acompanho meu pedido?',
      a: 'Após o envio, você receberá um email com o código de rastreamento. Use-o no site dos Correios (rastreamento.correios.com.br) para acompanhar em tempo real.'
    },
    {
      q: 'O livro está disponível em versão digital?',
      a: 'No momento, oferecemos apenas a versão física do livro. Uma cópia em papel permite uma leitura mais profunda e reflexiva, ideal para este tipo de conteúdo.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Element name="hero" className="relative min-h-screen grain-overlay flex items-center overflow-hidden">
        {/* Background emotional image */}
        <div className="absolute inset-0 opacity-30">
          <img
            src={emotionalImages[currentImageIndex].src}
            alt="Fundo emocional"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={heroRef} className="relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-flex items-center gap-2 bg-cyan/20 text-cyan px-4 py-2 rounded-full text-sm mb-6">
                  📖 Lançamento 2026
                </span>

                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
                  Como Vencer a Dor de Ser
                  <span className="text-cyan"> Trocado</span> Por Outro
                </h1>

                <p className="font-editorial italic text-2xl text-cyan-light mb-4">
                  Você não está sozinho
                </p>

                <p className="text-text-muted text-lg mb-8 max-w-lg">
                  A história real de um homem que dedicou anos de sua vida a uma mulher, apenas para ser trocado quando ela estava em seu melhor momento — e escolheu se reconstruir.
                </p>

                <div className="flex flex-wrap gap-4">
                  <ScrollLink to="comprar" smooth={true} className="btn-primary">
                    Quero Este Livro
                    <ArrowRight size={18} />
                  </ScrollLink>
                  <ScrollLink to="historia" smooth={true} className="btn-secondary">
                    Conheça a História
                  </ScrollLink>
                </div>
              </motion.div>

              <div className="page-number absolute left-0 -translate-x-8">Pág. 01</div>
            </div>

            <motion.div
              animate={floatAnimation}
              className="flex justify-center"
            >
              <img
                src={bookFront}
                alt="Capa do livro Como Vencer a Dor de Ser Trocado Por Outro"
                className="book-image max-w-md w-full"
              />
            </motion.div>
          </div>
        </div>
      </Element>

      {/* Emotional Gallery - New Section */}
      <section ref={galleryRef} className="py-16 bg-navy-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl mb-4 flex items-center justify-center gap-3">
              <Sparkles className="text-cyan" size={28} />
              Cada jornada é única
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Assim como cada homem que enfrenta a dor da traição, sua caminho de superação também é única. Este livro acompanha você em cada passo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {emotionalImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-cyan/50 transition-all"
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <Element name="historia" className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={painRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy mb-4">
              Você se reconhece aqui?
            </h2>
            <div className="editorial-divider bg-navy" />
          </motion.div>

          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <PainCard
              icon={Heart}
              title="A rejeição que paralisa"
              description="A sensação de não ser suficiente, mesmo após ter dado tudo de si."
            />
            <PainCard
              icon={Brain}
              title="O loop mental que não para"
              description="Perguntas sem resposta que giram na cabeça dia e noite."
            />
            <PainCard
              icon={Frown}
              title="O medo de nunca amar de novo"
              description="O receio de se abrir novamente e passar pela mesma dor."
            />
            <PainCard
              icon={User}
              title="A dúvida sobre seu valor"
              description="Questionar se você merece ser amado e se algo está errado com você."
            />
          </motion.div>
        </div>
      </Element>

      {/* Author Preview */}
      <section ref={authorRef} className="py-24 grain-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-cyan/20 translate-x-4 translate-y-4 rounded-lg" />
              <img
                src={authorImg}
                alt="Gilberto de Souza"
                className="relative rounded-lg shadow-2xl max-w-md"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
                O Homem Atrás das Palavras
              </h2>
              <p className="text-text-muted text-lg mb-6">
                Gilberto de Souza nasceu no Brasil e há 23 anos mudou-se para os Estados Unidos, onde fundou sua própria empresa de construção de casas.
              </p>
              <p className="text-text-muted text-lg mb-8">
                Após passar por uma experiência de traição que o levou ao início de uma depressão, ele escolheu não se deixar vencer. Escreveu este livro para compartilhar sua jornada e ajudar outros a encontrarem o caminho da superação.
              </p>
              <RouterLink to="/sobre" className="btn-secondary">
                Conheça Gilberto
                <ArrowRight size={18} />
              </RouterLink>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Book Delivers */}
      <section ref={whatRef} className="py-24 bg-navy-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              O que este livro entrega
            </h2>
            <div className="editorial-divider" />
          </motion.div>

          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Book,
                title: 'História Real',
                description: 'Uma narrativa autêntica, baseada em experiências verdadeiras, sem enfeites ou falsas promessas.'
              },
              {
                icon: HeartPulse,
                title: 'Caminho Concreto',
                description: 'Passos práticos e reflexões profundas para guiar sua jornada de cura e reconstrução.'
              },
              {
                icon: Check,
                title: 'Você Não Está Sozinho',
                description: 'A certeza de que outros passaram pelo mesmo e encontraram a luz no fim do túnel.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariant}
                className="text-center"
              >
                <div className="w-16 h-16 bg-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-cyan" size={32} />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-text-muted">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <Element name="quote" ref={quoteRef} className="py-24 grain-overlay relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Quote size={300} className="text-cyan/5" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-editorial italic text-2xl sm:text-3xl lg:text-4xl text-cyan-light leading-relaxed">
              "A história de um homem que dedicou anos de sua vida a uma mulher, apenas para ser trocado quando ela estava em seu melhor momento."
            </p>
            <div className="editorial-divider mt-8" />
          </motion.blockquote>
        </div>
      </Element>

      {/* Order Form */}
      <Element name="comprar" ref={formRef} className="py-24 bg-navy-mid">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              Receba o Livro em Casa
            </h2>
            <p className="text-text-muted">
              Preencha seus dados e entraremos em contato para finalizar seu pedido
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-navy p-8 rounded-2xl border border-navy-light"
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2">Nome Completo *</label>
                <input
                  {...register('name', { required: true })}
                  placeholder="Seu nome completo"
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
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2">Telefone *</label>
                <input
                  {...register('phone', { required: true })}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">CEP *</label>
                <input
                  {...register('cep', { required: true })}
                  placeholder="00000-000"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm mb-2">Endereço *</label>
                <input
                  {...register('address', { required: true })}
                  placeholder="Rua, Avenida, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Número *</label>
                <input
                  {...register('number', { required: true })}
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2">Complemento</label>
                <input
                  {...register('complement')}
                  placeholder="Apto, Bloco"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Cidade *</label>
                <input
                  {...register('city', { required: true })}
                  placeholder="Sua cidade"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Estado *</label>
                <input
                  {...register('state', { required: true })}
                  placeholder="UF"
                  required
                />
              </div>
            </div>

            <div className="border-t border-navy-light pt-6 mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-muted">Livro Físico</span>
                <span className="font-bold text-lg">R$ --,--</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-text-muted">Frete (Correios)</span>
                <span className="text-cyan">A calcular</span>
              </div>

              <button type="submit" className="w-full btn-primary text-lg">
                <Mail size={20} />
                Finalizar Pedido
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-text-muted">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-cyan">📦</span>
                <span>Enviado pelos Correios para todo o Brasil</span>
              </div>
              <span>Prazo estimado: 5 a 15 dias úteis</span>
            </div>
          </motion.form>
        </div>
      </Element>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-24 grain-overlay">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              Perguntas Frequentes
            </h2>
            <div className="editorial-divider" />
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy-mid rounded-lg border border-navy-light overflow-hidden"
              >
                <summary className="px-6 py-4 cursor-pointer font-body font-semibold flex items-center justify-between hover:bg-navy-light/30 transition-colors">
                  {item.q}
                  <ChevronRight size={20} className="transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-text-muted">
                  {item.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default Home;
