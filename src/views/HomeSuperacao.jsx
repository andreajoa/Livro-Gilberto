"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Lock,
  Mail,
  MapPin,
  Package,
  Quote,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Target,
  Truck,
} from "lucide-react"

import ShippingCalculator from "../components/ShippingCalculator"
import FooterSuperacao from "../components/FooterSuperacao"
import SuperacaoLeadPopup from "../components/SuperacaoLeadPopup"
import SuperacaoPhysicalPaymentModal from "../components/SuperacaoPhysicalPaymentModal"
import SuperacaoDigitalPaymentModal from "../components/SuperacaoDigitalPaymentModal"

const AMAZON_PHYSICAL_URL = "https://www.amazon.com/dp/B0H9R8ZK7T"
const AMAZON_EBOOK_URL =
  "https://www.amazon.com.br/Supera%C3%A7%C3%A3o-futuro-hist%C3%B3ria-vit%C3%B3ria-Portuguese-ebook/dp/B0H9N93T5J"

const PHYSICAL_PRICE = 141.74
const EBOOK_PRICE = 65.99

const journey = [
  {
    number: "01",
    title: "O menino que aprendeu cedo demais",
    text: "Infância marcada por doença, mudanças, fome e responsabilidades que nenhuma criança deveria carregar.",
  },
  {
    number: "02",
    title: "A coragem de escolher o caminho certo",
    text: "Trabalho precoce, a bicicleta conquistada com recicláveis e o primeiro grande não ao dinheiro fácil.",
  },
  {
    number: "03",
    title: "O deserto e a prisão",
    text: "Uma travessia extrema, fome, sede, medo, deportação e uma segunda tentativa de recomeçar.",
  },
  {
    number: "04",
    title: "Trabalho, ascensão e escolhas",
    text: "Pizza, madrugadas de limpeza, construção, música, sucesso e os perigos de crescer sem maturidade.",
  },
  {
    number: "05",
    title: "A queda e o fundo do poço",
    text: "Perdas, culpa, depressão e o momento em que permanecer caído deixou de ser uma opção.",
  },
  {
    number: "06",
    title: "Reconstrução e propósito",
    text: "Fé, terapia, trabalho, empresa, patrimônio e uma história transformada em força para levantar outras pessoas.",
  },
]

const discoveries = [
  {
    icon: Heart,
    title: "Transformar dor em propósito",
    text: "Como experiências difíceis podem deixar de ser apenas feridas e se tornar direção para uma nova vida.",
  },
  {
    icon: ShieldCheck,
    title: "Proteger o futuro com caráter",
    text: "Por que decisões tomadas nos momentos de pressão podem salvar ou comprometer anos da sua história.",
  },
  {
    icon: Target,
    title: "Unir fé e atitude",
    text: "A fé não elimina responsabilidade: ela orienta escolhas, trabalho, disciplina e perseverança.",
  },
  {
    icon: Sparkles,
    title: "Recomeçar com maturidade",
    text: "Reconhecer erros, enfrentar consequências e construir uma versão mais consciente de si mesmo.",
  },
]

const faqs = [
  {
    question: "Como funciona a compra do livro físico pelo site?",
    answer:
      "Primeiro você informa seu CEP e escolhe uma modalidade de entrega. Depois preenche os dados do destinatário e segue para o checkout seguro. O valor final reúne o preço do livro e o frete selecionado.",
  },
  {
    question: "Como o frete é calculado?",
    answer:
      "O cálculo é feito com base no CEP informado e nas modalidades de entrega disponíveis. O valor e o prazo aparecem antes do pagamento.",
  },
  {
    question: "Como recebo o eBook?",
    answer:
      "Após a confirmação do pagamento, o eBook é enviado para o e-mail informado durante a compra por meio de um link individual de acesso.",
  },
  {
    question: "O pagamento é seguro?",
    answer:
      "Sim. O pagamento é processado em ambiente protegido com Stripe. Os dados do cartão não ficam armazenados neste website.",
  },
  {
    question: "Posso comprar pela Amazon?",
    answer:
      "Sim. A Amazon é uma opção externa e independente. Ao escolher essa modalidade, você será direcionado para a página correspondente da Amazon.",
  },
  {
    question: "A Barnes & Noble já está disponível?",
    answer:
      "A opção será destinada principalmente aos leitores nos Estados Unidos. O botão permanecerá sinalizado como “em breve” até que o link oficial esteja disponível.",
  },
]

function money(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

function PromoSlider({ type = "amazon" }) {
  const amazonItems = [
    {
      eyebrow: "Já disponível na Amazon",
      text: "Escolha o formato ideal e leia Superação onde estiver.",
    },
    {
      eyebrow: "Uma história real",
      text: "Dor, fé, luta e vitória em uma jornada sem filtros.",
    },
    {
      eyebrow: "Livro físico e eBook",
      text: "Compre na plataforma que fizer mais sentido para você.",
    },
  ]

  const barnesItems = [
    {
      eyebrow: "Para leitores nos Estados Unidos",
      text: "Superação estará disponível também pela Barnes & Noble.",
    },
    {
      eyebrow: "Barnes & Noble",
      text: "Nova opção internacional de compra em preparação.",
    },
    {
      eyebrow: "Disponibilidade nos EUA",
      text: "O link oficial será publicado assim que estiver ativo.",
    },
  ]

  const items = type === "amazon" ? amazonItems : barnesItems
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [items.length])

  const previous = () => {
    setIndex((current) => (current - 1 + items.length) % items.length)
  }

  const next = () => {
    setIndex((current) => (current + 1) % items.length)
  }

  const isAmazon = type === "amazon"

  return (
    <aside
      className={`sup-promo-slider ${
        isAmazon ? "sup-promo-amazon" : "sup-promo-barnes"
      }`}
      aria-label={
        isAmazon
          ? "Destaques da Amazon"
          : "Destaques da Barnes & Noble"
      }
    >
      <button
        className="sup-promo-arrow"
        type="button"
        onClick={previous}
        aria-label="Mensagem anterior"
      >
        <ChevronLeft size={18} />
      </button>

      <img
        className="sup-promo-cover"
        src="/books/superacao/book-front.png"
        alt=""
      />

      <div className="sup-promo-copy" aria-live="polite">
        <strong>{items[index].eyebrow}</strong>
        <span>{items[index].text}</span>
      </div>

      {isAmazon ? (
        <a
          className="sup-promo-button"
          href={AMAZON_PHYSICAL_URL}
          target="_blank"
          rel="noreferrer"
        >
          Ver na Amazon
          <ArrowRight size={16} />
        </a>
      ) : (
        <button
          className="sup-promo-button sup-promo-disabled"
          type="button"
          disabled
        >
          Barnes & Noble — em breve
        </button>
      )}

      <div className="sup-promo-dots" aria-hidden="true">
        {items.map((_, itemIndex) => (
          <span
            key={itemIndex}
            className={itemIndex === index ? "is-active" : ""}
          />
        ))}
      </div>

      <button
        className="sup-promo-arrow"
        type="button"
        onClick={next}
        aria-label="Próxima mensagem"
      >
        <ChevronRight size={18} />
      </button>
    </aside>
  )
}

function TrustItem({ icon: Icon, children }) {
  return (
    <div className="sup-trust-item">
      <Icon size={20} />
      <span>{children}</span>
    </div>
  )
}

function SectionHeading({ eyebrow, title, text, align = "center" }) {
  return (
    <header
      className={`sup-section-heading ${
        align === "left" ? "is-left" : ""
      }`}
    >
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </header>
  )
}

function FaqItem({ item, isOpen, onClick }) {
  return (
    <article className={`sup-faq-item ${isOpen ? "is-open" : ""}`}>
      <button type="button" onClick={onClick}>
        <span>{item.question}</span>
        <ChevronDown size={20} />
      </button>

      <div className="sup-faq-answer">
        <p>{item.answer}</p>
      </div>
    </article>
  )
}

export default function HomeSuperacao() {
  const [openFaq, setOpenFaq] = useState(0)
  const [showPhysicalCheckout, setShowPhysicalCheckout] = useState(false)
  const [showDigitalCheckout, setShowDigitalCheckout] = useState(false)
  const [selectedShipping, setSelectedShipping] = useState(null)

  const handleShippingSelect = (shipping) => {
    setSelectedShipping(shipping)
    setShowPhysicalCheckout(true)
  }

  return (
    <main className="sup-page">
      <div className="sup-top-shell">
        <PromoSlider type="amazon" />

        <nav className="sup-nav" aria-label="Navegação principal">
          <button
            type="button"
            className="sup-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span>SUPERAÇÃO</span>
            <small>Gilberto de Souza</small>
          </button>

          <div className="sup-nav-links">
            <button type="button" onClick={() => scrollToId("historia")}>
              A história
            </button>
            <button type="button" onClick={() => scrollToId("autor")}>
              O autor
            </button>
            <button type="button" onClick={() => scrollToId("comprar")}>
              Como comprar
            </button>
            <button type="button" onClick={() => scrollToId("perguntas")}>
              Perguntas
            </button>
          </div>

          <button
            className="sup-button sup-button-primary sup-nav-cta"
            type="button"
            onClick={() => scrollToId("comprar")}
          >
            Comprar agora
          </button>
        </nav>

        <section className="sup-hero">
          <div className="sup-hero-glow" />

          <div className="sup-hero-copy">
            <span className="sup-kicker">
              Uma história real de dor, fé, luta e vitória
            </span>

            <h1>
              A dor pode explicar o seu passado.
              <em>Ela não precisa decidir o seu futuro.</em>
            </h1>

            <p>
              Conheça a trajetória de um menino que enfrentou fome,
              travessias, prisão, perdas e depressão — e decidiu
              transformar cada queda em aprendizado, fé, trabalho e
              propósito.
            </p>

            <div className="sup-hero-actions">
              <button
                className="sup-button sup-button-primary"
                type="button"
                onClick={() => scrollToId("comprar")}
              >
                <ShoppingCart size={18} />
                Comprar livro físico
              </button>

              <a
                className="sup-button sup-button-secondary"
                href="#comprar"
                onClick={(event) => {
                  event.preventDefault()
                  setShowDigitalCheckout(true)
                }}
              >
                <BookOpen size={18} />
                Comprar eBook
              </a>
            </div>

            <div className="sup-hero-trust">
              <TrustItem icon={Lock}>Pagamento seguro</TrustItem>
              <TrustItem icon={Mail}>
                eBook enviado após a confirmação
              </TrustItem>
              <TrustItem icon={Truck}>
                Entrega para todo o Brasil
              </TrustItem>
            </div>
          </div>

          <div className="sup-hero-product">
            <div className="sup-hero-product-aura" />
            <img
              src="/books/superacao/book-front-back.png"
              alt="Livro Superação, de Gilberto de Souza"
            />
            <div className="sup-product-seal">
              <Star size={16} fill="currentColor" />
              História real
            </div>
          </div>
        </section>
      </div>

      <section className="sup-light-section sup-why-section">
        <SectionHeading
          eyebrow="Por que este livro importa"
          title="Para quem sente que a vida se tornou uma luta diária"
          text="Não é uma promessa de caminho fácil. É o testemunho de alguém que precisou aprender a continuar quando quase tudo dizia para desistir."
        />

        <div className="sup-benefit-grid">
          {discoveries.map(({ icon: Icon, title, text }) => (
            <article className="sup-benefit-card" key={title}>
              <div className="sup-icon-circle">
                <Icon size={25} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sup-dark-section sup-transformation">
        <SectionHeading
          eyebrow="A transformação"
          title="Superação não apaga o que aconteceu. Ela muda o que você faz com isso."
          text="O livro percorre a distância entre a dor que paralisa e a decisão que devolve movimento à vida."
        />

        <div className="sup-comparison">
          <article className="sup-comparison-side is-before">
            <div className="sup-comparison-image">
              <img
                src="/images/before-after/antes2.png"
                alt="Representação de um período de dor e isolamento"
              />
            </div>

            <div className="sup-comparison-copy">
              <span>Quando a dor domina</span>
              <h3>O fundo do poço</h3>

              <ul>
                {[
                  "Sem direção para o próximo passo",
                  "Culpa e consequências acumuladas",
                  "Medo de perder o que ainda restava",
                  "Cansaço emocional e espiritual",
                  "Sensação de que a história havia acabado",
                ].map((item) => (
                  <li key={item}>
                    <span className="sup-list-negative">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <div className="sup-comparison-divider" aria-hidden="true">
            <ArrowRight size={20} />
          </div>

          <article className="sup-comparison-side is-after">
            <div className="sup-comparison-image">
              <img
                src="/images/before-after/depois2.png"
                alt="Representação de reconstrução, direção e propósito"
              />
            </div>

            <div className="sup-comparison-copy">
              <span>Quando nasce uma decisão</span>
              <h3>Uma vida reconstruída</h3>

              <ul>
                {[
                  "Fé acompanhada de atitude",
                  "Responsabilidade pelas próprias escolhas",
                  "Trabalho transformado em oportunidade",
                  "Disciplina para reconstruir",
                  "Propósito que alcança outras vidas",
                ].map((item) => (
                  <li key={item}>
                    <span className="sup-list-positive">
                      <Check size={13} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section id="historia" className="sup-light-section sup-story-section">
        <SectionHeading
          eyebrow="A história por trás de Superação"
          title="Uma jornada real. Sem esconder as cicatrizes."
          text="Cada capítulo apresenta um marco da trajetória e encerra com reflexão, ensinamentos para guardar no coração e oração."
        />

        <div className="sup-journey-grid">
          {journey.map((item) => (
            <article className="sup-journey-card" key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sup-dark-section sup-discover-section">
        <div className="sup-discover-media">
          <img
            src="/images/superacao/lifestyle-1.jpeg"
            alt="Livro Superação em destaque"
          />
        </div>

        <div className="sup-discover-copy">
          <SectionHeading
            align="left"
            eyebrow="Dentro do livro"
            title="Treze capítulos para refletir sobre escolhas, quedas e recomeços"
          />

          <div className="sup-discover-list">
            {[
              "Infância, escassez e responsabilidades precoces",
              "Trabalho, caráter e coragem para recusar atalhos",
              "A travessia pelo deserto e os dias de prisão",
              "Os perigos do sucesso sem maturidade",
              "Culpa, consequências e restauração interior",
              "A reconstrução profissional e familiar",
              "Fé, disciplina, atitude e propósito",
            ].map((item) => (
              <div key={item}>
                <Check size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <blockquote>
            <Quote size={23} />
            <p>
              “A última palavra da sua história não precisa ser a dor.
              Pode ser a decisão de recomeçar.”
            </p>
          </blockquote>
        </div>
      </section>

      <section id="autor" className="sup-author-section">
        <div className="sup-author-image">
          <img
            src="/images/superacao/lifestyle-2.jpeg"
            alt="Gilberto de Souza apresentando o livro Superação"
          />
        </div>

        <div className="sup-author-copy">
          <span className="sup-kicker">Sobre o autor</span>
          <h2>Gilberto de Souza</h2>

          <p>
            Empresário e autor brasileiro, Gilberto transformou
            habilidades aprendidas em momentos de necessidade em uma
            trajetória profissional na construção civil nos Estados
            Unidos.
          </p>

          <p>
            Em Superação, ele não apresenta uma imagem de perfeição.
            Reconhece escolhas erradas, perdas, consequências,
            depressão e o processo necessário para reconstruir a vida
            com mais fé, responsabilidade e maturidade.
          </p>

          <div className="sup-author-tags">
            <span>
              <BookOpen size={17} />
              História autobiográfica
            </span>
            <span>
              <Heart size={17} />
              Fé e propósito
            </span>
            <span>
              <Package size={17} />
              Empreendedorismo
            </span>
          </div>
        </div>
      </section>

      <section className="sup-barnes-wrap">
        <PromoSlider type="barnes" />
      </section>

      <section id="comprar" className="sup-offer-section">
        <SectionHeading
          eyebrow="Escolha como comprar"
          title="Leve Superação para a sua jornada"
          text="Cada modalidade possui um fluxo próprio. Escolha o formato e a plataforma que fazem mais sentido para você."
        />

        <div className="sup-offer-grid">
          <article className="sup-offer-card is-featured">
            <div className="sup-offer-badge">Compra direta</div>

            <div className="sup-offer-top">
              <img
                src="/books/superacao/book-front.png"
                alt="Livro físico Superação"
              />

              <div>
                <span>Livro físico</span>
                <h3>Compre pelo website</h3>
                <strong>{money(PHYSICAL_PRICE)}</strong>
                <small>Frete calculado separadamente</small>
              </div>
            </div>

            <ul>
              <li>
                <Check size={16} />
                Edição impressa
              </li>
              <li>
                <Check size={16} />
                Entrega para todo o Brasil
              </li>
              <li>
                <Check size={16} />
                Valor total exibido antes do pagamento
              </li>
              <li>
                <Check size={16} />
                Checkout protegido com Stripe
              </li>
            </ul>

            <div className="sup-shipping-box">
              <div className="sup-shipping-heading">
                <MapPin size={20} />
                <div>
                  <strong>Informe o CEP</strong>
                  <span>
                    Calcule o frete antes de seguir para o pagamento
                  </span>
                </div>
              </div>

              <ShippingCalculator
                onSelectShipping={handleShippingSelect}
              />
            </div>
          </article>

          <article className="sup-offer-card">
            <div className="sup-offer-top">
              <img
                src="/books/superacao/book-front.png"
                alt="eBook Superação"
              />

              <div>
                <span>Formato digital</span>
                <h3>eBook</h3>
                <strong>{money(EBOOK_PRICE)}</strong>
                <small>Sem frete</small>
              </div>
            </div>

            <ul>
              <li>
                <Check size={16} />
                Compra digital separada
              </li>
              <li>
                <Check size={16} />
                Link individual de acesso
              </li>
              <li>
                <Check size={16} />
                Envio por e-mail após a confirmação
              </li>
              <li>
                <Check size={16} />
                Entrega automática e rastreável
              </li>
            </ul>

            <a
              className="sup-button sup-button-primary sup-button-block"
              href="#comprar"
                onClick={(event) => {
                  event.preventDefault()
                  setShowDigitalCheckout(true)
                }}
            >
              <BookOpen size={18} />
              Comprar eBook
            </a>

            <p className="sup-offer-note">
              O download será liberado depois da confirmação do
              pagamento.
            </p>
          </article>

          <article className="sup-offer-card sup-offer-external">
            <div className="sup-retailer-logo sup-amazon-wordmark">
              amazon
              <span>⌣</span>
            </div>

            <h3>Comprar pela Amazon</h3>

            <p>
              Opção externa para quem prefere concluir a compra
              diretamente na Amazon.
            </p>

            <div className="sup-external-actions">
              <a
                className="sup-button sup-button-primary sup-button-block"
                href={AMAZON_PHYSICAL_URL}
                target="_blank"
                rel="noreferrer"
              >
                Livro físico na Amazon
                <ArrowRight size={17} />
              </a>

              <a
                className="sup-button sup-button-secondary sup-button-block"
                href={AMAZON_EBOOK_URL}
                target="_blank"
                rel="noreferrer"
              >
                eBook na Amazon
                <ArrowRight size={17} />
              </a>
            </div>

            <p className="sup-offer-note">
              A compra, a entrega e o atendimento seguem as políticas
              da Amazon.
            </p>
          </article>

          <article className="sup-offer-card sup-offer-barnes">
            <div className="sup-retailer-logo">
              BARNES
              <span>&amp; NOBLE</span>
            </div>

            <h3>Compra nos Estados Unidos</h3>

            <p>
              A futura opção pela Barnes & Noble será destinada
              principalmente aos leitores nos EUA.
            </p>

            <button
              className="sup-button sup-button-block sup-button-disabled"
              type="button"
              disabled
            >
              Link em breve
            </button>

            <p className="sup-offer-note">
              O endereço definitivo será incluído quando a página
              oficial estiver disponível.
            </p>
          </article>
        </div>

        <div className="sup-payment-confidence">
          <TrustItem icon={ShieldCheck}>
            Pagamento processado pela Stripe
          </TrustItem>
          <TrustItem icon={Truck}>
            Frete calculado antes da compra
          </TrustItem>
          <TrustItem icon={Mail}>
            Comunicação por e-mail
          </TrustItem>
          <TrustItem icon={Lock}>
            Dados protegidos
          </TrustItem>
        </div>
      </section>

      <section id="perguntas" className="sup-faq-section">
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title="Tudo o que você precisa saber antes da compra"
        />

        <div className="sup-faq-list">
          {faqs.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openFaq === index}
              onClick={() =>
                setOpenFaq((current) =>
                  current === index ? null : index
                )
              }
            />
          ))}
        </div>
      </section>

      <section className="sup-final-cta">
        <div className="sup-final-cta-image">
          <img
            src="/images/superacao/lifestyle-3.jpeg"
            alt="Gilberto de Souza com o livro Superação"
          />
        </div>

        <div className="sup-final-cta-copy">
          <span className="sup-kicker">A sua história continua</span>

          <h2>
            A dor pode ter escrito capítulos importantes.
            <em>Mas ela não precisa escrever o final.</em>
          </h2>

          <p>
            Leia uma trajetória de escassez, escolhas, fé, quedas e
            reconstrução — e permita que ela ajude você a olhar para
            a própria história com mais coragem.
          </p>

          <div className="sup-final-actions">
            <button
              className="sup-button sup-button-primary"
              type="button"
              onClick={() => scrollToId("comprar")}
            >
              Quero o livro físico
            </button>

            <a
              className="sup-button sup-button-secondary"
              href="#comprar"
                onClick={(event) => {
                  event.preventDefault()
                  setShowDigitalCheckout(true)
                }}
            >
              Quero o eBook
            </a>

            <a
              className="sup-button sup-button-tertiary"
              href={AMAZON_PHYSICAL_URL}
              target="_blank"
              rel="noreferrer"
            >
              Ver na Amazon
            </a>
          </div>
        </div>
      </section>

      <SuperacaoLeadPopup />

      <FooterSuperacao />

      <SuperacaoPhysicalPaymentModal
        isOpen={showPhysicalCheckout}
        shipping={selectedShipping}
        onClose={() => {
          setShowPhysicalCheckout(false)
          setSelectedShipping(null)
        }}
      />

      <SuperacaoDigitalPaymentModal
        isOpen={showDigitalCheckout}
        onClose={() => {
          setShowDigitalCheckout(false)
        }}
      />
    </main>
  )
}
