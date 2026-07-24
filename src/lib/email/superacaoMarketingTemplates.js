function baseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://www.gilberto-souza.com"
  ).replace(/\/$/, "")
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function firstName(value) {
  return esc(
    String(value || "")
      .trim()
      .split(/\s+/)[0] || ""
  )
}

function unsubscribeUrl(email) {
  return (
    `${baseUrl()}/api/unsubscribe` +
    `?email=${encodeURIComponent(String(email || ""))}` +
    `&lang=pt`
  )
}

const COLORS = {
  page: "#090806",
  outer: "#100d09",
  card: "#18130e",
  cardSoft: "#211910",
  gold: "#D4A574",
  goldStrong: "#E8BE73",
  bronze: "#9B6942",
  cream: "#FFF6E7",
  text: "#F5E9D8",
  muted: "#B9AA98",
  soft: "#817465",
  border: "#463420",
}

const HEROES = [
  "/images/superacao/lifestyle-1.jpeg",
  "/images/superacao/lifestyle-2.jpeg",
  "/images/superacao/lifestyle-3.jpeg",
]

const LEAD_EMAILS = [
  {
    subject:
      "A sua história não precisa terminar onde a dor começou",
    eyebrow: "UMA NOVA HISTÓRIA É POSSÍVEL",
    title:
      "A sua história pode ter começado na dor. Mas não precisa terminar nela.",
    quote:
      "Nem sempre escolhemos o que nos acontece. Mas ainda podemos escolher o que faremos depois.",
    paragraphs: [
      "Existem momentos em que tudo parece ter sido decidido contra nós.",
      "Gilberto conheceu a fome, a escassez, escolhas perigosas, o deserto, a prisão, a deportação, perdas e o fundo do poço.",
      "A história de Superação começa exatamente aí: no ponto em que continuar caído parecia mais fácil do que reconstruir tudo.",
    ],
    insight:
      "O passado explica parte da sua história. Ele não precisa determinar o seu destino.",
  },
  {
    subject:
      "Quando sobreviver é a primeira forma de coragem",
    eyebrow: "AS ORIGENS",
    title:
      "Antes de conquistar, foi preciso aprender a sobreviver.",
    quote:
      "Quem cresce enfrentando a falta aprende cedo que desistir também tem um preço.",
    paragraphs: [
      "Na infância, faltaram recursos, conforto e segurança.",
      "Uma bicicleta construída com materiais recicláveis representava mais do que um brinquedo. Era criatividade diante da escassez.",
      "A força não nasceu depois do sucesso. Ela começou quando quase nada estava disponível.",
    ],
    insight:
      "Muitas das capacidades que você usa hoje nasceram em períodos que pareciam apenas difíceis.",
  },
  {
    subject:
      "A decisão que pode mudar muitos anos da sua vida",
    eyebrow: "CARÁTER SOB PRESSÃO",
    title:
      "Existem atalhos que cobram um preço alto demais.",
    quote:
      "Uma escolha feita em poucos minutos pode comprometer anos inteiros.",
    paragraphs: [
      "Quando oportunidades corretas parecem distantes, o caminho errado pode parecer mais rápido.",
      "Gilberto esteve diante de ambientes em que o crime era apresentado como alternativa.",
      "Recusar aquele caminho não eliminou as dificuldades. Mas preservou a possibilidade de construir um futuro.",
    ],
    insight:
      "Caráter não é apenas o que fazemos quando tudo está bem. É o que protegemos quando estamos pressionados.",
  },
  {
    subject:
      "O deserto não pergunta se você está preparado",
    eyebrow: "A TRAVESSIA",
    title:
      "Há travessias que revelam limites que você nem sabia possuir.",
    quote:
      "O deserto não oferece garantias. Ele exige movimento, resistência e fé.",
    paragraphs: [
      "A caminhada pelo deserto carregava medo, exaustão e incerteza.",
      "Não havia promessa de que o esforço terminaria em vitória.",
      "Mas parar também significava aceitar que a história terminaria ali.",
    ],
    insight:
      "Coragem não é ausência de medo. É continuar mesmo quando o medo está presente.",
  },
  {
    subject:
      "Quando a liberdade deixa de parecer garantida",
    eyebrow: "PRISÃO E DEPORTAÇÃO",
    title:
      "Algumas quedas retiram tudo o que parecia estar sob controle.",
    quote:
      "Perder a liberdade muda a forma como enxergamos escolhas, tempo e futuro.",
    paragraphs: [
      "A prisão e a deportação poderiam ter sido o capítulo final.",
      "Vergonha, frustração e sensação de fracasso estavam presentes.",
      "Mas retornar derrotado não significava permanecer derrotado.",
    ],
    insight:
      "Um fracasso pode encerrar uma tentativa. Ele não precisa encerrar a sua capacidade de recomeçar.",
  },
  {
    subject:
      "Nenhum trabalho honesto é pequeno quando existe propósito",
    eyebrow: "RECOMEÇO",
    title:
      "Pizza, limpeza, construção: o futuro foi reconstruído em etapas.",
    quote:
      "O trabalho que hoje parece pequeno pode estar sustentando uma história muito maior.",
    paragraphs: [
      "O recomeço não veio acompanhado de aplausos.",
      "Vieram madrugadas, cansaço, serviços difíceis e a necessidade de provar valor todos os dias.",
      "Cada trabalho representava uma nova peça na reconstrução.",
    ],
    insight:
      "Dignidade não depende do tamanho da tarefa. Ela aparece na forma como você decide realizá-la.",
  },
  {
    subject:
      "Conquistar não é suficiente quando você se perde no caminho",
    eyebrow: "ASCENSÃO",
    title:
      "O sucesso também pode testar aquilo que a dificuldade não conseguiu destruir.",
    quote:
      "Nem toda vitória externa representa uma vitória interior.",
    paragraphs: [
      "O trabalho começou a gerar resultados, oportunidades e reconhecimento.",
      "Mas crescer sem maturidade pode afastar uma pessoa dos valores que a sustentaram.",
      "A ascensão trouxe conquistas, mas também escolhas que cobrariam consequências.",
    ],
    insight:
      "O verdadeiro sucesso precisa incluir caráter, consciência e responsabilidade.",
  },
  {
    subject:
      "O fundo do poço não avisa quando está próximo",
    eyebrow: "A QUEDA",
    title:
      "Há momentos em que as perdas chegam antes que consigamos entender os sinais.",
    quote:
      "Quando tudo desmorona, a pessoa precisa decidir se vai esconder a dor ou enfrentá-la.",
    paragraphs: [
      "Vieram perdas, culpa, conflitos e depressão.",
      "O homem que havia sobrevivido a tantos desafios já não reconhecia a própria força.",
      "Permanecer caído começou a custar mais do que pedir ajuda.",
    ],
    insight:
      "Reconhecer que você precisa de ajuda não diminui sua força. Pode ser a primeira prova real dela.",
  },
  {
    subject:
      "Fé não elimina responsabilidade",
    eyebrow: "FÉ E ATITUDE",
    title:
      "A reconstrução começou quando fé e responsabilidade caminharam juntas.",
    quote:
      "A fé aponta uma direção. A atitude transforma essa direção em caminho.",
    paragraphs: [
      "Não houve uma mudança instantânea ou uma solução mágica.",
      "Foi necessário reconhecer erros, enfrentar consequências e assumir novas escolhas.",
      "A espiritualidade tornou-se uma base, mas o trabalho diário continuou indispensável.",
    ],
    insight:
      "Esperança sem movimento pode virar espera. Esperança com atitude pode virar reconstrução.",
  },
  {
    subject:
      "Terapia não foi sinal de fraqueza",
    eyebrow: "PEDIR AJUDA",
    title:
      "Algumas batalhas não precisam ser enfrentadas em silêncio.",
    quote:
      "A coragem também aparece quando aceitamos que não sabemos resolver tudo sozinhos.",
    paragraphs: [
      "A terapia ajudou a organizar dores, culpas e comportamentos.",
      "Enfrentar a própria história foi mais difícil do que fingir que ela já estava superada.",
      "Mas nenhuma reconstrução sólida acontece sem verdade.",
    ],
    insight:
      "Você não precisa esperar chegar ao limite para começar a cuidar daquilo que está ferido.",
  },
  {
    subject:
      "Recomeçar exige uma versão mais consciente de você",
    eyebrow: "MATURIDADE",
    title:
      "Voltar ao mesmo ponto com a mesma mentalidade não é recomeçar.",
    quote:
      "O verdadeiro recomeço muda decisões, prioridades e comportamentos.",
    paragraphs: [
      "Reconstruir não significava recuperar apenas patrimônio ou trabalho.",
      "Era necessário recuperar confiança, disciplina, caráter e direção.",
      "A nova fase exigiu abandonar padrões que já haviam causado perdas.",
    ],
    insight:
      "Você não controla todas as circunstâncias, mas pode desenvolver a pessoa que enfrentará as próximas.",
  },
  {
    subject:
      "Transformar dor em propósito muda o significado da história",
    eyebrow: "PROPÓSITO",
    title:
      "A dor deixou de ser apenas uma ferida quando começou a levantar outras pessoas.",
    quote:
      "Uma experiência difícil ganha outro significado quando se transforma em direção.",
    paragraphs: [
      "A história não foi escrita para apresentar perfeição.",
      "Ela foi escrita para mostrar as escolhas, erros, perdas e decisões que tornaram possível continuar.",
      "Aquilo que antes causava vergonha começou a servir como ponte para outras pessoas.",
    ],
    insight:
      "O que você viveu pode não ter sido justo. Ainda assim, pode se tornar útil.",
  },
  {
    subject:
      "O futuro não é construído em um único grande gesto",
    eyebrow: "DISCIPLINA",
    title:
      "Grandes mudanças são sustentadas por pequenas decisões repetidas.",
    quote:
      "A vida muda quando a decisão correta deixa de ser exceção e vira prática.",
    paragraphs: [
      "Empresas, patrimônio, relações e credibilidade não foram reconstruídos em um dia.",
      "Cada etapa exigiu repetição, paciência e compromisso.",
      "O resultado visível nasceu de muitas escolhas que ninguém viu.",
    ],
    insight:
      "Não subestime a decisão correta que você consegue tomar hoje.",
  },
  {
    subject:
      "Você não precisa apagar o passado para seguir em frente",
    eyebrow: "RESSIGNIFICAR",
    title:
      "Superar não é fingir que nada aconteceu.",
    quote:
      "Superação não apaga a história. Ela muda o lugar que a história ocupa.",
    paragraphs: [
      "Algumas memórias continuam existindo.",
      "A diferença é que elas deixam de controlar as decisões atuais.",
      "O passado pode ser lembrado sem continuar governando o futuro.",
    ],
    insight:
      "Curar não é esquecer. É recuperar a liberdade de escolher o próximo passo.",
  },
  {
    subject:
      "O seu futuro ainda está sendo escrito",
    eyebrow: "UM CONVITE",
    title:
      "Talvez este seja o momento de escrever um capítulo diferente.",
    quote:
      "O futuro não começa quando tudo está resolvido. Ele começa quando você decide não permanecer no mesmo lugar.",
    paragraphs: [
      "Superação é uma história real, com erros reais e consequências reais.",
      "Por isso ela não oferece promessas fáceis.",
      "Ela oferece algo mais importante: a prova de que uma história pode mudar quando uma pessoa aceita reconstruí-la.",
    ],
    insight:
      "A sua história pode ter começado na dor, mas não precisa terminar nela.",
  },
]

const CHECKOUT_EMAILS = [
  {
    subject:
      "Seu exemplar de Superação ainda está esperando",
    title:
      "Você chegou muito perto de começar esta leitura.",
    paragraphs: [
      "Se algo interrompeu sua compra, seu pedido ainda pode ser retomado.",
      "Você pode escolher o livro físico com entrega ou o eBook com acesso digital.",
    ],
  },
  {
    subject:
      "Qual formato de Superação combina melhor com você?",
    title:
      "Livro físico ou eBook: a história é a mesma, a experiência é sua.",
    paragraphs: [
      "O livro físico permite uma leitura pausada, com marcações e presença.",
      "O eBook oferece acesso rápido e pode acompanhar você onde estiver.",
    ],
  },
  {
    subject:
      "Nem sempre precisamos estar prontos para começar",
    title:
      "A clareza muitas vezes aparece depois do primeiro passo.",
    paragraphs: [
      "É comum adiar uma decisão esperando sentir certeza absoluta.",
      "Mas algumas mudanças começam justamente quando decidimos avançar mesmo sem ter todas as respostas.",
    ],
  },
  {
    subject:
      "O custo invisível de continuar no mesmo lugar",
    title:
      "Adiar também é uma decisão.",
    paragraphs: [
      "Quando uma história continua nos prendendo, o tempo sozinho nem sempre resolve.",
      "Informação, reflexão e atitude podem abrir um caminho diferente.",
    ],
  },
  {
    subject:
      "Uma história real para quem precisa recomeçar",
    title:
      "Superação não foi escrito por alguém que observou a dor de longe.",
    paragraphs: [
      "Gilberto viveu escassez, risco, prisão, perdas e depressão.",
      "O livro mostra como fé, terapia, trabalho e responsabilidade participaram da reconstrução.",
    ],
  },
  {
    subject:
      "O pagamento é seguro e o processo é simples",
    title:
      "Você conclui a compra sem sair do website.",
    paragraphs: [
      "O pagamento é processado pela Stripe em ambiente protegido.",
      "No livro físico, o total é formado pelo livro e pelo frete selecionado. No eBook, não há frete.",
    ],
  },
  {
    subject:
      "Talvez esta mensagem tenha chegado no momento certo",
    title:
      "Algumas leituras encontram a gente quando estamos prontos para ouvi-las.",
    paragraphs: [
      "Você não precisa transformar toda a sua vida hoje.",
      "Talvez precise apenas de uma nova perspectiva para decidir o próximo passo.",
    ],
  },
  {
    subject:
      "Superação continua disponível para você",
    title:
      "Quando decidir começar, a história estará esperando.",
    paragraphs: [
      "Este é o último lembrete desta sequência.",
      "Você poderá retornar ao website e escolher o formato que preferir.",
    ],
  },
]

const CUSTOMER_EMAILS = [
  {
    subject:
      "Obrigado por escolher Superação",
    title:
      "A sua leitura começa agora.",
    paragraphs: [
      "Sua compra foi confirmada.",
      "Mais do que uma sequência de acontecimentos, este livro é um convite para olhar para escolhas, consequências, fé e reconstrução.",
    ],
  },
  {
    subject:
      "Como aproveitar melhor a leitura de Superação",
    title:
      "Não tenha pressa para atravessar cada capítulo.",
    paragraphs: [
      "Leia observando não apenas o que aconteceu com Gilberto, mas também as decisões tomadas em cada etapa.",
      "Marque os trechos que despertarem identificação e registre quais atitudes podem ser aplicadas à sua própria história.",
    ],
  },
  {
    subject:
      "Qual capítulo de Superação mais falou com você?",
    title:
      "A sua experiência com esta história importa.",
    paragraphs: [
      "Alguns leitores se identificam com as origens. Outros, com a queda ou com a reconstrução.",
      "Responder esta mensagem contando o trecho que mais marcou você ajuda Gilberto a compreender o impacto real do livro.",
    ],
  },
]

function getCollection(sequenceCode) {
  const code = String(sequenceCode || "").toLowerCase()

  if (code.includes("checkout")) {
    return CHECKOUT_EMAILS
  }

  if (code.includes("customer")) {
    return CUSTOMER_EMAILS
  }

  return LEAD_EMAILS
}

export function getSuperacaoEmailSubject({
  sequenceCode,
  emailNumber,
}) {
  const collection = getCollection(sequenceCode)
  const index = Math.max(0, Number(emailNumber || 1) - 1)

  return (
    collection[index]?.subject ||
    collection[0].subject
  )
}

function button(text, href) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:30px 0 12px;">
      <tr>
        <td align="center">
          <a
            href="${href}"
            style="
              display:inline-block;
              min-width:220px;
              padding:16px 25px;
              border-radius:10px;
              background:linear-gradient(135deg,${COLORS.goldStrong},${COLORS.gold});
              color:#201306;
              font-family:Arial,Helvetica,sans-serif;
              font-size:13px;
              font-weight:800;
              letter-spacing:.3px;
              text-decoration:none;
            "
          >
            ${text}
          </a>
        </td>
      </tr>
    </table>
  `
}

export function getSuperacaoEmailHtml({
  sequenceCode,
  emailNumber,
  name,
  email,
  productType,
}) {
  const collection = getCollection(sequenceCode)
  const index = Math.max(0, Number(emailNumber || 1) - 1)
  const item = collection[index] || collection[0]

  const isCustomer =
    String(sequenceCode || "").includes("customer")

  const isCheckout =
    String(sequenceCode || "").includes("checkout")

  const hero =
    HEROES[index % HEROES.length]

  const greeting = firstName(name)
    ? `Olá, ${firstName(name)}.`
    : "Olá."

  const paragraphs = (item.paragraphs || [])
    .map(
      (paragraph) => `
        <p style="
          margin:0 0 18px;
          color:${COLORS.muted};
          font-family:Arial,Helvetica,sans-serif;
          font-size:16px;
          line-height:1.75;
        ">
          ${esc(paragraph)}
        </p>
      `
    )
    .join("")

  const insight = item.insight
    ? `
      <div style="
        margin:26px 0;
        padding:20px 21px;
        border-left:4px solid ${COLORS.gold};
        border-radius:8px;
        background:${COLORS.cardSoft};
      ">
        <p style="
          margin:0;
          color:${COLORS.cream};
          font-family:Georgia,'Times New Roman',serif;
          font-size:17px;
          line-height:1.55;
        ">
          ${esc(item.insight)}
        </p>
      </div>
    `
    : ""

  const quote = item.quote
    ? `
      <p style="
        margin:0 0 26px;
        color:${COLORS.goldStrong};
        font-family:Georgia,'Times New Roman',serif;
        font-size:21px;
        font-style:italic;
        line-height:1.5;
      ">
        ${esc(item.quote)}
      </p>
    `
    : ""

  const ctaText = isCustomer
    ? "VISITAR O WEBSITE DE SUPERAÇÃO"
    : isCheckout
      ? "RETOMAR MINHA COMPRA"
      : "CONHECER O LIVRO SUPERAÇÃO"

  const formatLabel =
    productType === "physical"
      ? "Livro físico"
      : productType === "digital"
        ? "eBook"
        : ""

  const website =
    `${baseUrl()}/superacao` +
    `${isCustomer ? "" : "#comprar"}`

  return `
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta
    name="viewport"
    content="width=device-width,initial-scale=1"
  >
  <title>${esc(item.subject)}</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:${COLORS.page};
">
  <div style="
    display:none;
    max-height:0;
    overflow:hidden;
    opacity:0;
    color:transparent;
  ">
    ${esc(item.title)}
  </div>

  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    style="
      width:100%;
      background:${COLORS.page};
      border-collapse:collapse;
    "
  >
    <tr>
      <td
        align="center"
        style="padding:28px 10px;"
      >
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="
            width:100%;
            max-width:660px;
            overflow:hidden;
            border:1px solid ${COLORS.border};
            border-radius:22px;
            background:${COLORS.card};
            border-collapse:separate;
          "
        >
          <tr>
            <td style="
              padding:20px 28px;
              background:linear-gradient(
                135deg,
                ${COLORS.goldStrong},
                ${COLORS.gold},
                ${COLORS.bronze}
              );
            ">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>
                  <td style="
                    color:#21150a;
                    font-family:Arial,Helvetica,sans-serif;
                    font-size:10px;
                    font-weight:900;
                    letter-spacing:2.4px;
                    text-transform:uppercase;
                  ">
                    SUPERAÇÃO
                  </td>

                  <td
                    align="right"
                    style="
                      color:rgba(33,21,10,.75);
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:10px;
                      font-weight:800;
                    "
                  >
                    Gilberto de Souza
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0;">
              <img
                src="${baseUrl()}${hero}"
                width="660"
                alt="Livro Superação, de Gilberto de Souza"
                style="
                  width:100%;
                  max-width:660px;
                  height:auto;
                  display:block;
                  border:0;
                "
              >
            </td>
          </tr>

          <tr>
            <td style="padding:38px 34px 32px;">
              <p style="
                margin:0 0 13px;
                color:${COLORS.gold};
                font-family:Arial,Helvetica,sans-serif;
                font-size:10px;
                font-weight:900;
                letter-spacing:2.5px;
                text-transform:uppercase;
              ">
                ${esc(
                  item.eyebrow ||
                    (isCustomer
                      ? "DEPOIS DA COMPRA"
                      : isCheckout
                        ? "SUA COMPRA"
                        : "UMA HISTÓRIA REAL")
                )}
              </p>

              <h1 style="
                margin:0 0 22px;
                color:${COLORS.cream};
                font-family:Georgia,'Times New Roman',serif;
                font-size:34px;
                line-height:1.12;
                font-weight:700;
              ">
                ${esc(item.title)}
              </h1>

              <p style="
                margin:0 0 18px;
                color:${COLORS.text};
                font-family:Arial,Helvetica,sans-serif;
                font-size:16px;
                line-height:1.7;
              ">
                ${greeting}
              </p>

              ${quote}
              ${paragraphs}
              ${insight}

              ${
                formatLabel
                  ? `
                    <p style="
                      margin:22px 0 0;
                      color:${COLORS.soft};
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:12px;
                    ">
                      Formato relacionado à sua compra:
                      <strong style="color:${COLORS.gold};">
                        ${esc(formatLabel)}
                      </strong>
                    </p>
                  `
                  : ""
              }

              ${button(ctaText, website)}

              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                style="
                  margin-top:32px;
                  border-top:1px solid ${COLORS.border};
                "
              >
                <tr>
                  <td
                    width="92"
                    valign="middle"
                    style="padding-top:25px;"
                  >
                    <img
                      src="${baseUrl()}/books/superacao/book-front.png"
                      width="72"
                      alt="Capa do livro Superação"
                      style="
                        width:72px;
                        height:auto;
                        display:block;
                        border-radius:4px;
                        box-shadow:0 12px 28px rgba(0,0,0,.35);
                      "
                    >
                  </td>

                  <td
                    valign="middle"
                    style="padding-top:25px;"
                  >
                    <p style="
                      margin:0 0 5px;
                      color:${COLORS.gold};
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:10px;
                      font-weight:900;
                      letter-spacing:1.7px;
                      text-transform:uppercase;
                    ">
                      Livro oficial
                    </p>

                    <p style="
                      margin:0;
                      color:${COLORS.cream};
                      font-family:Georgia,'Times New Roman',serif;
                      font-size:20px;
                      font-weight:700;
                    ">
                      Superação
                    </p>

                    <p style="
                      margin:6px 0 0;
                      color:${COLORS.soft};
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:12px;
                      line-height:1.5;
                    ">
                      O seu futuro é você quem faz.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="
              padding:24px 28px;
              border-top:1px solid ${COLORS.border};
              background:${COLORS.outer};
              text-align:center;
            ">
              <p style="
                margin:0 0 8px;
                color:${COLORS.muted};
                font-family:Arial,Helvetica,sans-serif;
                font-size:11px;
                line-height:1.6;
              ">
                Você recebeu esta mensagem porque se cadastrou
                ou realizou uma compra no website oficial de
                Gilberto de Souza.
              </p>

              <p style="
                margin:0 0 9px;
                color:${COLORS.soft};
                font-family:Arial,Helvetica,sans-serif;
                font-size:10px;
                line-height:1.6;
              ">
                Editora Suprema · Hortolândia – SP – Brasil
              </p>

              <a
                href="${unsubscribeUrl(email)}"
                style="
                  color:${COLORS.gold};
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:10px;
                  text-decoration:underline;
                "
              >
                Cancelar inscrição
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
