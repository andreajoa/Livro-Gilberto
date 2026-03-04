import { motion } from 'framer-motion';
import { MapPin, Building2, HeartPulse, PenTool, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import authorImg from '../assets/author.jpg';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const About = () => {
  const timeline = [
    {
      icon: MapPin,
      title: 'Nasceu no Brasil',
      description: 'Começou sua jornada em solo brasileiro, onde construiu suas primeiras lembranças e valores.',
      year: 'Início'
    },
    {
      icon: MapPin,
      title: 'Mudou para os EUA',
      description: 'Há 23 anos, buscou novos horizontes e oportunidades nos Estados Unidos.',
      year: '2003'
    },
    {
      icon: Building2,
      title: 'Fundou sua empresa',
      description: 'Construiu um negócio de sucesso no setor de construção de casas.',
      year: 'Crescimento'
    },
    {
      icon: HeartPulse,
      title: 'Enfrentou a traição',
      description: 'Passou por uma experiência que o levou ao início de uma depressão profunda.',
      year: 'Desafio'
    },
    {
      icon: HeartPulse,
      title: 'Escolheu se reconstruir',
      description: 'Em vez de se deixar vencer, decidiu transformar a dor em força.',
      year: 'Superação'
    },
    {
      icon: PenTool,
      title: 'Escreveu este livro',
      description: 'Para compartilhar sua jornada e ajudar outros a encontrarem o caminho da cura.',
      year: 'Hoje'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] grain-overlay flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-cyan/10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-cyan shadow-glow">
              <img
                src={authorImg}
                alt="Gilberto de Souza"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-4">
              Gilberto de Souza
            </h1>
            <p className="font-editorial italic text-2xl text-cyan-light">
              Autor · Empreendedor · Superação
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-paper">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy mb-4">
              Uma Jornada de Transformação
            </h2>
            <div className="editorial-divider bg-navy" />
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-navy/20 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-6`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-navy/10">
                      <span className="text-sm font-semibold text-cyan mb-2 block">{item.year}</span>
                      <h3 className="font-display font-bold text-lg text-navy mb-2">{item.title}</h3>
                      <p className="text-text-muted text-sm">{item.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-cyan rounded-full flex items-center justify-center shadow-lg">
                    <item.icon size={20} className="text-navy" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 grain-overlay">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-8">
              Por que escrevi este livro
            </h2>

            <blockquote className="font-editorial italic text-2xl sm:text-3xl text-cyan-light leading-relaxed mb-12">
              "Escrevi este livro porque sei que não estou sozinho. Se você está lendo isso, provavelmente também passou por algo parecido. E quero que você saiba: há luz no fim do túnel."
            </blockquote>

            <div className="editorial-divider mb-12" />

            <p className="text-text-muted text-lg mb-8">
              Quando fui traído, senti como se o mundo tivesse desmoronado. Anos de dedicação, de construir uma vida juntos, pareciam não ter valor algum. Entrei em uma depressão que quase me consumiu.
            </p>

            <p className="text-text-muted text-lg mb-8">
              Mas em algum momento, decidi que não deixaria aquela experiência definir quem eu era. Comecei a buscar respostas, a entender que minha validação não dependia de outra pessoa, e que merecia ser amado por quem eu realmente era.
            </p>

            <p className="text-text-muted text-lg mb-12">
              Este livro é o resultado dessa jornada. Não é um manual de como esquecer — porque esquecer não é o objetivo. É sobre como transformar a dor em sabedoria, como reconstruir sua autoestima e como, um dia, voltar a amar — sem medo.
            </p>

            <Link to="/o-livro" className="btn-primary">
              Leia o Livro
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy-mid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
              Você não precisa carregar esse peso sozinho
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Este livro foi escrito para você. Para que você saiba que é possível superar, que é possível reconstruir, que é possível voltar a sorrir de verdade.
            </p>
            <a href="/#comprar" className="btn-primary text-lg">
              Peça Seu Exemplar
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
