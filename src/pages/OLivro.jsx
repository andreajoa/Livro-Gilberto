import { motion } from 'framer-motion';
import { BookOpen, HeartPulse, Lightbulb, Shield, ArrowRight, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import bookFront from '../assets/book-front.jpg';

const Book = () => {
  const bookDetails = [
    { label: 'Título', value: 'Como Vencer a Dor de Ser Trocado Por Outro' },
    { label: 'Autor', value: 'Gilberto de Souza' },
    { label: 'ISBN', value: '978-658462205-0' },
    { label: 'Categoria', value: 'Autoajuda / Relacionamentos / Superação' },
    { label: 'Idioma', value: 'Português' },
    { label: 'Formato', value: 'Livro físico' },
    { label: 'Ano', value: '2026' }
  ];

  const themes = [
    {
      icon: HeartPulse,
      title: 'Reconhecendo a Dor',
      description: 'Entender que sentir dor não é sinal de fraqueza, mas o primeiro passo para a cura.'
    },
    {
      icon: Shield,
      title: 'Reconstruindo a Autoestima',
      description: 'Técnicas práticas para resgatar seu valor pessoal após a rejeição.'
    },
    {
      icon: Lightbulb,
      title: 'Compreendendo o Processo',
      description: 'Insights sobre por que as traições acontecem e como não tomar isso como uma falha pessoal.'
    },
    {
      icon: BookOpen,
      title: 'Recuperando a Capacidade de Amar',
      description: 'Como abrir seu coração novamente, mas desta vez com mais sabedoria e menos medo.'
    }
  ];

  const BarCode = () => (
    <svg width="200" height="60" viewBox="0 0 200 60" className="opacity-30">
      {/* Simulated barcode pattern based on ISBN */}
      <rect x="10" y="10" width="2" height="40" fill="white" />
      <rect x="15" y="10" width="1" height="40" fill="white" />
      <rect x="18" y="10" width="3" height="40" fill="white" />
      <rect x="23" y="10" width="1" height="40" fill="white" />
      <rect x="26" y="10" width="2" height="40" fill="white" />
      <rect x="31" y="10" width="4" height="40" fill="white" />
      <rect x="37" y="10" width="1" height="40" fill="white" />
      <rect x="40" y="10" width="3" height="40" fill="white" />
      <rect x="45" y="10" width="2" height="40" fill="white" />
      <rect x="50" y="10" width="1" height="40" fill="white" />
      <rect x="53" y="10" width="3" height="40" fill="white" />
      <rect x="58" y="10" width="1" height="40" fill="white" />
      <rect x="61" y="10" width="2" height="40" fill="white" />
      <rect x="66" y="10" width="3" height="40" fill="white" />
      <rect x="71" y="10" width="1" height="40" fill="white" />
      <rect x="74" y="10" width="2" height="40" fill="white" />
      <rect x="79" y="10" width="4" height="40" fill="white" />
      <rect x="85" y="10" width="1" height="40" fill="white" />
      <rect x="88" y="10" width="3" height="40" fill="white" />
      <rect x="93" y="10" width="2" height="40" fill="white" />
      <rect x="98" y="10" width="1" height="40" fill="white" />
      <rect x="101" y="10" width="3" height="40" fill="white" />
      <rect x="106" y="10" width="1" height="40" fill="white" />
      <rect x="109" y="10" width="2" height="40" fill="white" />
      <rect x="114" y="10" width="3" height="40" fill="white" />
      <rect x="119" y="10" width="1" height="40" fill="white" />
      <rect x="122" y="10" width="2" height="40" fill="white" />
      <rect x="127" y="10" width="4" height="40" fill="white" />
      <rect x="133" y="10" width="1" height="40" fill="white" />
      <rect x="136" y="10" width="3" height="40" fill="white" />
      <rect x="141" y="10" width="2" height="40" fill="white" />
      <rect x="146" y="10" width="1" height="40" fill="white" />
      <rect x="149" y="10" width="3" height="40" fill="white" />
      <rect x="154" y="10" width="1" height="40" fill="white" />
      <rect x="157" y="10" width="2" height="40" fill="white" />
      <rect x="162" y="10" width="3" height="40" fill="white" />
      <rect x="167" y="10" width="1" height="40" fill="white" />
      <rect x="170" y="10" width="2" height="40" fill="white" />
      <rect x="175" y="10" width="4" height="40" fill="white" />
      <rect x="181" y="10" width="1" height="40" fill="white" />
      <rect x="184" y="10" width="3" height="40" fill="white" />
      <rect x="189" y="10" width="2" height="40" fill="white" />
      <rect x="194" y="10" width="2" height="40" fill="white" />
    </svg>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] grain-overlay flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-cyan/10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src={bookFront}
                alt="Capa do livro Como Vencer a Dor de Ser Trocado Por Outro"
                className="book-image max-w-md mx-auto mb-12"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-4">
                O Livro
              </h1>
              <p className="font-editorial italic text-2xl text-cyan-light mb-8">
                Uma jornada de superação em cada página
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book Details */}
      <section className="py-24 bg-navy-mid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              Ficha Editorial
            </h2>
            <div className="editorial-divider" />
          </motion.div>

          <div className="bg-navy p-8 rounded-2xl border border-navy-light mb-12">
            <div className="grid md:grid-cols-2 gap-4">
              {bookDetails.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex justify-between border-b border-navy-light/30 py-3 last:border-0"
                >
                  <span className="text-text-muted">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center">
              <div className="isbn-badge mb-4">
                <Code size={16} />
                ISBN 978-658462205-0
              </div>
              <BarCode />
            </div>
          </div>
        </div>
      </section>

      {/* Synopsis */}
      <section className="py-24 grain-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-8 text-center">
              Sinopse
            </h2>

            <div className="bg-navy-mid p-8 md:p-12 rounded-2xl border-l-4 border-cyan">
              <p className="text-lg leading-relaxed mb-6">
                Este livro é a crônica honesta e vulnerável de um homem que dedicou anos de sua vida a construir um relacionamento, só para ser trocado quando sua parceira estava em seu melhor momento. É a história de alguém que, de repente, se viu sozinho, questionando seu valor e se tudo aquilo que construiu tinha sido em vão.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Mas é também a história da superação. De como, aos poucos, aprendeu que sua validação não dependia de outra pessoa. De como encontrou forças para reconstruir sua autoestima e, eventualmente, voltar a acreditar no amor — mas desta vez de forma diferente, mais consciente e menos dependente.
              </p>

              <p className="text-lg leading-relaxed">
                Escrito de forma direta e sem enfeites, este livro não oferece fórmulas mágicas. Oferece companhia. A certeza de que você não está sozinho nessa dor, e que outros já trilharam esse caminho e encontraram a luz no fim do túnel.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Themes */}
      <section className="py-24 bg-navy-mid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              O que você vai encontrar
            </h2>
            <div className="editorial-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {themes.map((theme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy p-6 rounded-xl border border-navy-light hover:border-cyan/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center mb-4">
                  <theme.icon className="text-cyan" size={24} />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{theme.title}</h3>
                <p className="text-text-muted">{theme.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 grain-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
              Comece sua jornada de superação
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Este livro foi escrito para você. Para que você saiba que é possível superar, que é possível reconstruir, que é possível voltar a sorrir de verdade.
            </p>
            <Link to="/#comprar" className="btn-primary text-lg">
              Quero Este Livro
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Book;
