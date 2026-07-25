const SITE_URL =
  "https://www.gilberto-souza.com"

const BOOK_URL =
  `${SITE_URL}/superacao`

const CHECKOUT_URL =
  `${BOOK_URL}#comprar`

const AMAZON_PHYSICAL_URL =
  "https://www.amazon.com/dp/B0H9R8ZK7T"

const AMAZON_EBOOK_URL =
  "https://www.amazon.com.br/Supera%C3%A7%C3%A3o-futuro-hist%C3%B3ria-vit%C3%B3ria-Portuguese-ebook/dp/B0H9N93T5J"


const INSTAGRAM_URL =
  "https://www.instagram.com/gilberto_souza_autor/"

const INSTAGRAM_ICON_URL =
  `${SITE_URL}/images/superacao/email/instagram.png`

const EMAIL_BANNERS = {
  presentation:
    `${SITE_URL}/images/superacao/email/banner-apresentacao.jpg`,
  story:
    `${SITE_URL}/images/superacao/email/banner-historia.jpg`,
  amazonPhysical:
    `${SITE_URL}/images/superacao/email/banner-amazon-fisico.jpg`,
  amazonEbook:
    `${SITE_URL}/images/superacao/email/banner-amazon-ebook.jpg`,
  websitePhysical:
    `${SITE_URL}/images/superacao/email/banner-website-fisico.jpg`,
  restart:
    `${SITE_URL}/images/superacao/email/banner-recomeco.jpg`,
}

const IMAGES = {
  cover:
    `${SITE_URL}/books/superacao/book-front.png`,
  lifestyle1:
    `${SITE_URL}/images/superacao/lifestyle-1.jpeg`,
  lifestyle2:
    `${SITE_URL}/images/superacao/lifestyle-2.jpeg`,
  lifestyle3:
    `${SITE_URL}/images/superacao/lifestyle-3.jpeg`,
}

const COLORS = {
  black: "#090806",
  dark: "#18130E",
  brown: "#463420",
  gold: "#D4A574",
  lightGold: "#E8BE73",
  cream: "#F5E9D8",
  softCream: "#FFF6E7",
  muted: "#B9AA98",
  gray: "#817465",
  white: "#FFFFFF",
}

const LEAD_EMAILS = [
  {
    subject:
      "A sua história não precisa terminar onde a dor começou",
    eyebrow:
      "UMA NOVA HISTÓRIA PODE COMEÇAR",
    title:
      "A dor pode fazer parte da história. Ela não precisa escrever o final.",
    preheader:
      "Uma história real sobre escolhas, quedas, fé e reconstrução.",
    paragraphs: [
      "Existem momentos em que a vida parece determinada por tudo o que já aconteceu.",
      "As perdas, as escolhas erradas e os períodos mais difíceis podem criar a sensação de que não existe outro caminho.",
      "Mas uma história não termina no capítulo mais doloroso. Ela pode ganhar um novo significado quando existe coragem para continuar.",
      "Superação nasceu de uma trajetória real. Não é uma promessa de vida perfeita. É um convite para acreditar que reconstruir ainda é possível.",
    ],
    quote:
      "O passado explica parte da caminhada, mas não precisa determinar o destino.",
    image:
      "lifestyle1",
    primaryLabel:
      "Conhecer a história de Superação",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "Quando sobreviver é a primeira forma de coragem",
    eyebrow:
      "CORAGEM TAMBÉM É CONTINUAR",
    title:
      "Nem toda coragem parece grandiosa quando está acontecendo.",
    preheader:
      "Às vezes, levantar e continuar já é uma vitória.",
    paragraphs: [
      "Há períodos em que vencer não significa conquistar algo extraordinário.",
      "Significa apenas acordar, enfrentar mais um dia e não abandonar completamente a esperança.",
      "Sobreviver a uma fase difícil não é pouco. É o primeiro movimento de quem ainda pode reconstruir.",
      "Em Superação, Gilberto conta como momentos de escassez, responsabilidade precoce e escolhas difíceis ajudaram a formar sua visão sobre trabalho, fé e futuro.",
    ],
    quote:
      "Continuar também é uma forma de vencer.",
    image:
      "lifestyle2",
    primaryLabel:
      "Descobrir essa trajetória",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "A decisão que pode mudar muitos anos da sua vida",
    eyebrow:
      "ESCOLHAS CRIAM CAMINHOS",
    title:
      "Algumas decisões parecem pequenas até mudarem toda a direção da vida.",
    preheader:
      "Nem sempre controlamos as circunstâncias, mas podemos escolher o próximo passo.",
    paragraphs: [
      "Muitas mudanças não começam com certeza. Começam com uma decisão.",
      "A decisão de não aceitar um atalho perigoso. De trabalhar quando desistir parece mais fácil. De pedir ajuda quando o orgulho manda esconder a dor.",
      "Cada escolha fortalece ou enfraquece o futuro que estamos construindo.",
      "Superação mostra que destino não é apenas aquilo que acontece conosco. Também é resultado daquilo que decidimos fazer com o que aconteceu.",
    ],
    quote:
      "Uma escolha consciente pode interromper anos de repetição.",
    image:
      "lifestyle3",
    primaryLabel:
      "Ler mais sobre Superação",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "O deserto não pergunta se você está preparado",
    eyebrow:
      "QUANDO A VIDA MUDA SEM AVISAR",
    title:
      "Existem travessias para as quais ninguém se sente preparado.",
    preheader:
      "A força é construída enquanto atravessamos.",
    paragraphs: [
      "A vida nem sempre oferece tempo para organizar pensamentos, recursos e emoções.",
      "Às vezes, a crise simplesmente chega.",
      "É nesse território desconhecido que descobrimos limites, prioridades e forças que ainda não sabíamos possuir.",
      "O livro Superação não romantiza o sofrimento. Ele mostra como a consciência, a fé e a responsabilidade podem transformar uma travessia difícil em amadurecimento.",
    ],
    quote:
      "A travessia não exige perfeição. Exige presença.",
    image:
      "lifestyle1",
    primaryLabel:
      "Conhecer o livro",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "Quando a liberdade deixa de parecer garantida",
    eyebrow:
      "O VALOR DAS ESCOLHAS",
    title:
      "Algumas experiências mudam para sempre a forma como enxergamos a liberdade.",
    preheader:
      "A liberdade também exige responsabilidade.",
    paragraphs: [
      "Há coisas que só compreendemos plenamente quando sentimos que podemos perdê-las.",
      "Tempo, família, dignidade, confiança e liberdade não devem ser tratados como garantias permanentes.",
      "Quando a vida impõe limites, também pode revelar o que realmente importa.",
      "Em Superação, Gilberto compartilha acontecimentos que o obrigaram a rever prioridades, comportamentos e caminhos.",
    ],
    quote:
      "Valorizar a liberdade também significa aprender a cuidar das próprias escolhas.",
    image:
      "lifestyle2",
    primaryLabel:
      "Descobrir essa história",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "Nenhum trabalho honesto é pequeno quando existe propósito",
    eyebrow:
      "DIGNIDADE E CONSTRUÇÃO",
    title:
      "O trabalho pode ser mais do que sobrevivência.",
    preheader:
      "Toda construção sólida começa por algum lugar.",
    paragraphs: [
      "Quando existe propósito, nenhum começo honesto deve ser desprezado.",
      "A trajetória de Gilberto passa pelo trabalho precoce, pela escassez e pela necessidade de criar oportunidades onde quase não havia recursos.",
      "O valor não estava apenas no resultado financeiro. Estava na disciplina, na dignidade e na consciência de que um futuro diferente precisava ser construído.",
      "Superação é também uma homenagem a todos que continuam trabalhando mesmo quando ninguém está vendo.",
    ],
    quote:
      "O tamanho do começo não determina o tamanho do futuro.",
    image:
      "lifestyle3",
    primaryLabel:
      "Conhecer Superação",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "Conquistar não é suficiente quando você se perde no caminho",
    eyebrow:
      "SUCESSO SEM CONSCIÊNCIA",
    title:
      "Nem toda conquista representa uma vitória completa.",
    preheader:
      "Crescer por fora não resolve tudo o que está quebrado por dentro.",
    paragraphs: [
      "É possível alcançar resultados e ainda se sentir distante de si mesmo.",
      "Dinheiro, reconhecimento e oportunidades podem ampliar aquilo que já existe dentro de uma pessoa.",
      "Sem consciência, conquistas podem se transformar em excessos, isolamento e decisões perigosas.",
      "Superação mostra que reconstruir não significa apenas recuperar bens ou posição. Significa recuperar valores, vínculos e direção.",
    ],
    quote:
      "A verdadeira conquista não deveria exigir que você perdesse a si mesmo.",
    image:
      "lifestyle1",
    primaryLabel:
      "Ler sobre essa reconstrução",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "O fundo do poço não avisa quando está próximo",
    eyebrow:
      "RECONHECER ANTES DE PERDER TUDO",
    title:
      "A queda raramente começa no momento em que todos conseguem enxergá-la.",
    preheader:
      "Os sinais aparecem antes do colapso.",
    paragraphs: [
      "Grandes quedas costumam ser precedidas por pequenas concessões.",
      "Uma escolha ignorada, um limite ultrapassado, uma conversa evitada e uma ajuda recusada.",
      "Quando o problema finalmente se torna visível, ele pode ter crescido durante muito tempo.",
      "Superação fala sobre reconhecer responsabilidades sem transformar culpa em condenação eterna.",
    ],
    quote:
      "Reconhecer o problema é o primeiro passo para interromper a queda.",
    image:
      "lifestyle2",
    primaryLabel:
      "Conhecer a história completa",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "Fé não elimina responsabilidade",
    eyebrow:
      "FÉ, AÇÃO E CONSCIÊNCIA",
    title:
      "A fé pode sustentar a caminhada, mas não substitui as escolhas.",
    preheader:
      "Esperança e responsabilidade precisam caminhar juntas.",
    paragraphs: [
      "A fé não é uma maneira de fugir das consequências.",
      "Ela pode oferecer força, sentido e direção, mas a reconstrução exige atitudes concretas.",
      "Pedir perdão, procurar ajuda, reconhecer limites e mudar comportamentos são movimentos que ninguém pode fazer por nós.",
      "Em Superação, espiritualidade e responsabilidade aparecem como partes da mesma transformação.",
    ],
    quote:
      "A fé aponta o caminho. A responsabilidade coloca os pés em movimento.",
    image:
      "lifestyle3",
    primaryLabel:
      "Conhecer essa mensagem",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "Terapia não foi sinal de fraqueza",
    eyebrow:
      "PEDIR AJUDA TAMBÉM É CORAGEM",
    title:
      "Existem batalhas que não precisam ser enfrentadas em silêncio.",
    preheader:
      "Procurar ajuda pode mudar a direção de uma vida.",
    paragraphs: [
      "Muitas pessoas aprendem a esconder sofrimento para parecerem fortes.",
      "Mas ignorar a dor não a torna menor. Apenas permite que ela continue agindo sem ser compreendida.",
      "A terapia pode criar um espaço seguro para organizar pensamentos, reconhecer padrões e construir novas respostas.",
      "Na trajetória narrada em Superação, pedir ajuda foi parte fundamental do processo de reconstrução.",
    ],
    quote:
      "Força não é suportar tudo sozinho. É reconhecer quando chegou a hora de receber ajuda.",
    image:
      "lifestyle1",
    primaryLabel:
      "Descobrir essa trajetória",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "Recomeçar exige uma versão mais consciente de você",
    eyebrow:
      "RECOMEÇAR NÃO É REPETIR",
    title:
      "Um novo começo precisa de novas escolhas.",
    preheader:
      "Recomeçar sem consciência pode apenas repetir o passado.",
    paragraphs: [
      "Trocar de ambiente, trabalho ou relacionamento não garante uma transformação.",
      "Quando os mesmos padrões continuam ativos, eles encontram novas formas de aparecer.",
      "O recomeço verdadeiro acontece quando existe disposição para compreender o que precisa mudar internamente.",
      "Superação mostra que reconstruir é um processo. Exige honestidade, disciplina e paciência.",
    ],
    quote:
      "Um novo capítulo precisa ser escrito por uma versão mais consciente de nós mesmos.",
    image:
      "lifestyle2",
    primaryLabel:
      "Conhecer o livro",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "Transformar dor em propósito muda o significado da história",
    eyebrow:
      "QUANDO A HISTÓRIA SERVE A ALGUÉM",
    title:
      "A dor não precisa ser desperdiçada.",
    preheader:
      "Compartilhar uma história pode ajudar outra pessoa a continuar.",
    paragraphs: [
      "Nenhuma experiência difícil precisa ser celebrada para que possa gerar aprendizado.",
      "Quando uma pessoa consegue olhar para o passado com consciência, aquilo que antes representava apenas sofrimento pode se transformar em orientação.",
      "Gilberto escreveu Superação para compartilhar uma trajetória real, com erros, quedas, fé, trabalho e reconstrução.",
      "O livro não entrega respostas prontas. Ele oferece companhia para quem também está tentando continuar.",
    ],
    quote:
      "Quando a dor encontra propósito, ela deixa de ser apenas uma ferida.",
    image:
      "lifestyle3",
    primaryLabel:
      "Conhecer Superação",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "O futuro não é construído em um único grande gesto",
    eyebrow:
      "CONSISTÊNCIA MUDA DESTINOS",
    title:
      "A transformação acontece nas escolhas repetidas.",
    preheader:
      "Pequenos movimentos consistentes podem reconstruir uma vida.",
    paragraphs: [
      "Esperar por uma grande oportunidade pode nos impedir de reconhecer os pequenos passos possíveis agora.",
      "O futuro é construído por decisões cotidianas: cumprir uma responsabilidade, manter uma palavra, cuidar de uma relação e interromper um comportamento destrutivo.",
      "Nenhum desses movimentos parece extraordinário isoladamente.",
      "Mas, juntos, eles podem mudar completamente a direção de uma história.",
    ],
    quote:
      "A consistência transforma aquilo que a pressa não consegue sustentar.",
    image:
      "lifestyle1",
    primaryLabel:
      "Ler essa história",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "Você não precisa apagar o passado para seguir em frente",
    eyebrow:
      "ACEITAR NÃO É APROVAR",
    title:
      "Seguir em frente não exige fingir que nada aconteceu.",
    preheader:
      "O passado pode ser reconhecido sem continuar controlando o presente.",
    paragraphs: [
      "Algumas pessoas tentam recomeçar apagando memórias, evitando conversas e escondendo feridas.",
      "Mas aquilo que não é compreendido costuma continuar influenciando escolhas.",
      "Aceitar o passado não significa concordar com tudo o que aconteceu.",
      "Significa reconhecer a realidade, aprender com ela e decidir que ela não terá mais o mesmo poder.",
    ],
    quote:
      "O passado pode ocupar uma página da história sem controlar todos os capítulos seguintes.",
    image:
      "lifestyle2",
    primaryLabel:
      "Conhecer Superação",
    primaryUrl:
      BOOK_URL,
  },
  {
    subject:
      "O seu futuro ainda está sendo escrito",
    eyebrow:
      "A HISTÓRIA CONTINUA",
    title:
      "Enquanto existe vida, ainda existe possibilidade de escolha.",
    preheader:
      "Nenhuma fase precisa receber o poder de definir todo o futuro.",
    paragraphs: [
      "Talvez você esteja vivendo um período de incerteza.",
      "Talvez esteja tentando recuperar algo que perdeu ou simplesmente encontrar uma direção.",
      "Superação foi escrito para lembrar que uma vida pode atravessar muitos capítulos antes de encontrar um novo sentido.",
      "O futuro não está pronto. Ele continua sendo construído pelas escolhas que começam hoje.",
    ],
    quote:
      "Você não é apenas aquilo que viveu. Também é aquilo que decide construir daqui em diante.",
    image:
      "lifestyle3",
    primaryLabel:
      "Escolher como ler Superação",
    primaryUrl:
      CHECKOUT_URL,
    showPurchaseOptions:
      true,
  },
]

const CHECKOUT_EMAILS = [
  {
    subject:
      "Seu exemplar de Superação ainda está esperando",
    eyebrow:
      "VOCÊ ESTAVA QUASE LÁ",
    title:
      "Sua leitura de Superação ainda pode começar hoje.",
    preheader:
      "Retome sua compra com segurança.",
    paragraphs: [
      "Você iniciou o processo para adquirir Superação, mas a compra não foi concluída.",
      "Pode ter sido apenas uma interrupção, uma dúvida ou falta de tempo.",
      "O livro continua disponível em formato físico e digital.",
      "Escolha a opção que combina melhor com a forma como você prefere ler.",
    ],
    quote:
      "Às vezes, a diferença entre intenção e transformação é apenas concluir o próximo passo.",
    image:
      "cover",
    primaryLabel:
      "Retomar compra no website",
    primaryUrl:
      CHECKOUT_URL,
    showPurchaseOptions:
      true,
  },
  {
    subject:
      "Qual formato de Superação combina melhor com você?",
    eyebrow:
      "LIVRO FÍSICO OU EBOOK",
    title:
      "A história é a mesma. A experiência de leitura pode ser diferente.",
    preheader:
      "Compare as opções disponíveis.",
    paragraphs: [
      "O livro físico é ideal para quem gosta de marcar páginas, fazer anotações e manter a obra por perto.",
      "O eBook oferece praticidade, acesso digital e leitura em diferentes dispositivos.",
      "Pelo website, o livro físico custa R$ 141,74, além do frete selecionado.",
      "O eBook custa R$ 65,99 e é enviado após a confirmação do pagamento.",
    ],
    quote:
      "O melhor formato é aquele que permite que a mensagem chegue até você.",
    image:
      "cover",
    primaryLabel:
      "Escolher meu formato",
    primaryUrl:
      CHECKOUT_URL,
    showPurchaseOptions:
      true,
  },
  {
    subject:
      "Nem sempre precisamos estar prontos para começar",
    eyebrow:
      "COMEÇAR ANTES DA CERTEZA",
    title:
      "Esperar pelo momento perfeito também pode se tornar uma forma de adiamento.",
    preheader:
      "A leitura pode ser o primeiro movimento.",
    paragraphs: [
      "Não é necessário ter todas as respostas para iniciar uma mudança.",
      "Muitas vezes, a clareza aparece durante a caminhada.",
      "Superação reúne uma história verdadeira sobre escolhas, fé, perdas, responsabilidade e reconstrução.",
      "Talvez a leitura não resolva tudo. Mas pode oferecer uma nova forma de enxergar aquilo que você está vivendo.",
    ],
    quote:
      "Você não precisa estar completamente pronto. Precisa apenas estar disposto a começar.",
    image:
      "lifestyle1",
    primaryLabel:
      "Retomar minha compra",
    primaryUrl:
      CHECKOUT_URL,
    showPurchaseOptions:
      true,
  },
  {
    subject:
      "O custo invisível de continuar no mesmo lugar",
    eyebrow:
      "ADIAR TAMBÉM É UMA ESCOLHA",
    title:
      "Permanecer igual também tem um preço.",
    preheader:
      "Algumas mudanças começam com uma nova perspectiva.",
    paragraphs: [
      "É natural avaliar o valor de um livro antes de comprá-lo.",
      "Mas também vale considerar o custo de continuar repetindo pensamentos, decisões e comportamentos que já não funcionam.",
      "Superação não promete transformação instantânea.",
      "Ele oferece reflexão, identificação e a experiência de alguém que precisou reconstruir a própria trajetória.",
    ],
    quote:
      "Nem todo custo aparece no extrato. Alguns aparecem no tempo perdido.",
    image:
      "lifestyle2",
    primaryLabel:
      "Conhecer as opções de compra",
    primaryUrl:
      CHECKOUT_URL,
    showPurchaseOptions:
      true,
  },
  {
    subject:
      "Uma história real para quem precisa recomeçar",
    eyebrow:
      "SEM FÓRMULAS PRONTAS",
    title:
      "Superação não foi escrito de um lugar distante da dor.",
    preheader:
      "Uma narrativa real, humana e consciente.",
    paragraphs: [
      "Gilberto compartilha acontecimentos que marcaram sua infância, juventude, escolhas, conquistas e quedas.",
      "A narrativa não tenta transformar erros em heroísmo.",
      "Ela mostra como responsabilidade, terapia, fé e trabalho participaram de uma reconstrução possível.",
      "Essa honestidade é o que faz Superação dialogar com pessoas que também estão tentando encontrar um novo caminho.",
    ],
    quote:
      "Uma história verdadeira pode oferecer a companhia que uma fórmula pronta nunca oferece.",
    image:
      "lifestyle3",
    primaryLabel:
      "Garantir meu exemplar",
    primaryUrl:
      CHECKOUT_URL,
    showPurchaseOptions:
      true,
  },
  {
    subject:
      "O pagamento é seguro e o processo é simples",
    eyebrow:
      "COMPRA SEGURA",
    title:
      "Você pode concluir a compra pelo website com checkout protegido.",
    preheader:
      "Veja como funciona cada formato.",
    paragraphs: [
      "No livro físico, você informa o CEP, escolhe o frete e preenche os dados de entrega.",
      "O total é formado pelo valor do livro, R$ 141,74, e pelo frete selecionado.",
      "No eBook, não existe frete. O valor é R$ 65,99.",
      "O pagamento é processado em ambiente protegido, e o acesso digital é encaminhado após a confirmação.",
    ],
    quote:
      "Segurança e clareza também fazem parte de uma boa experiência de compra.",
    image:
      "cover",
    primaryLabel:
      "Concluir pelo website",
    primaryUrl:
      CHECKOUT_URL,
    showPurchaseOptions:
      true,
  },
  {
    subject:
      "Talvez esta mensagem tenha chegado no momento certo",
    eyebrow:
      "ALGUMAS HISTÓRIAS NOS ENCONTRAM",
    title:
      "Existem leituras que chegam quando finalmente estamos preparados para escutá-las.",
    preheader:
      "Superação continua disponível.",
    paragraphs: [
      "Talvez você tenha conhecido o livro por curiosidade.",
      "Talvez esteja atravessando uma fase em que recomeçar deixou de ser uma ideia distante.",
      "Superação foi escrito para pessoas reais, vivendo conflitos reais e tentando construir escolhas mais conscientes.",
      "O livro permanece disponível no website e na Amazon.",
    ],
    quote:
      "Nem toda mensagem muda a vida. Mas algumas chegam exatamente quando precisamos delas.",
    image:
      "lifestyle1",
    primaryLabel:
      "Escolher onde comprar",
    primaryUrl:
      CHECKOUT_URL,
    showPurchaseOptions:
      true,
  },
  {
    subject:
      "Superação continua disponível para você",
    eyebrow:
      "ÚLTIMO LEMBRETE",
    title:
      "Esta é a última mensagem desta sequência de compra.",
    preheader:
      "Você continuará podendo acessar o livro quando decidir.",
    paragraphs: [
      "Não queremos transformar sua decisão em pressão.",
      "Por isso, esta é a última mensagem relacionada à compra que você iniciou.",
      "Superação continuará disponível no website, em formato físico e eBook, e também na Amazon.",
      "Quando sentir que chegou o momento, a história estará esperando por você.",
    ],
    quote:
      "Uma escolha consciente não precisa nascer da pressão.",
    image:
      "cover",
    primaryLabel:
      "Ver opções de compra",
    primaryUrl:
      CHECKOUT_URL,
    showPurchaseOptions:
      true,
  },
]

const CUSTOMER_EMAILS = [
  {
    subject:
      "Obrigado por escolher Superação",
    eyebrow:
      "SUA LEITURA COMEÇA AGORA",
    title:
      "Obrigado por permitir que esta história faça parte da sua caminhada.",
    preheader:
      "Uma mensagem pessoal de agradecimento.",
    paragraphs: [
      "Sua compra de Superação foi confirmada.",
      "Mais do que adquirir um livro, você escolheu conhecer uma história construída com verdade, responsabilidade e esperança.",
      "Gilberto escreveu esta obra para compartilhar aprendizados que nasceram de experiências reais.",
      "Esperamos que a leitura encontre espaço na sua vida e ofereça reflexões importantes para o momento que você está vivendo.",
    ],
    quote:
      "Obrigado por receber esta história.",
    image:
      "cover",
    primaryLabel:
      "Visitar a página de Superação",
    primaryUrl:
      BOOK_URL,
    customer:
      true,
  },
  {
    subject:
      "Como aproveitar melhor a leitura de Superação",
    eyebrow:
      "UMA LEITURA COM PRESENÇA",
    title:
      "Não tenha pressa para terminar.",
    preheader:
      "Algumas sugestões para tornar a leitura mais significativa.",
    paragraphs: [
      "Superação pode ser lido de forma contínua, mas também pode ser vivido em pausas.",
      "Marque os trechos que despertarem identificação.",
      "Anote perguntas, memórias e decisões que surgirem durante a leitura.",
      "Alguns capítulos podem conversar com você imediatamente. Outros talvez ganhem sentido apenas depois.",
    ],
    quote:
      "Um livro termina na última página. Uma reflexão pode continuar por muito tempo.",
    image:
      "lifestyle2",
    primaryLabel:
      "Revisitar a página do livro",
    primaryUrl:
      BOOK_URL,
    customer:
      true,
  },
  {
    subject:
      "Qual capítulo de Superação mais falou com você?",
    eyebrow:
      "SUA EXPERIÊNCIA IMPORTA",
    title:
      "Toda leitura encontra uma história diferente dentro de quem lê.",
    preheader:
      "Conte qual parte mais marcou você.",
    paragraphs: [
      "Esperamos que Superação tenha encontrado espaço na sua caminhada.",
      "Talvez um capítulo tenha despertado identificação. Talvez uma escolha narrada tenha provocado reflexão.",
      "Responder esta mensagem contando o trecho que mais marcou você ajuda Gilberto a compreender o impacto real do livro.",
      "Sua experiência pode contribuir para que essa mensagem continue alcançando outras pessoas.",
    ],
    quote:
      "Quando uma história encontra outra história, ambas podem ganhar um novo significado.",
    image:
      "lifestyle3",
    primaryLabel:
      "Conhecer mais sobre Superação",
    primaryUrl:
      BOOK_URL,
    customer:
      true,
  },
]

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function firstName(name) {
  const cleaned =
    String(name || "")
      .trim()
      .split(/\s+/)[0]

  return cleaned || "leitor"
}

function normalizeProductType({
  productType,
  sequenceCode,
}) {
  const code =
    String(sequenceCode || "")
      .toLowerCase()

  if (
    productType === "physical" ||
    code.includes("_physical_")
  ) {
    return "physical"
  }

  if (
    productType === "digital" ||
    code.includes("_digital_")
  ) {
    return "digital"
  }

  return "general"
}

function getSequenceEmails(sequenceCode) {
  const code =
    String(sequenceCode || "")
      .toLowerCase()

  if (
    code.includes("checkout")
  ) {
    return CHECKOUT_EMAILS
  }

  if (
    code.includes("customer")
  ) {
    return CUSTOMER_EMAILS
  }

  return LEAD_EMAILS
}

function purchaseOptions() {
  return `
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        margin:32px 0 0;
        border-collapse:separate;
        border-spacing:0 12px;
      "
    >
      <tr>
        <td
          style="
            padding:20px;
            background:${COLORS.dark};
            border:1px solid ${COLORS.brown};
            border-radius:14px;
          "
        >
          <div
            style="
              color:${COLORS.gold};
              font-family:Arial,sans-serif;
              font-size:11px;
              font-weight:700;
              letter-spacing:1.8px;
              text-transform:uppercase;
            "
          >
            Website oficial
          </div>

          <div
            style="
              margin-top:7px;
              color:${COLORS.softCream};
              font-family:Georgia,'Times New Roman',serif;
              font-size:21px;
              line-height:1.3;
            "
          >
            Livro físico ou eBook
          </div>

          <div
            style="
              margin-top:7px;
              color:${COLORS.muted};
              font-family:Arial,sans-serif;
              font-size:14px;
              line-height:1.6;
            "
          >
            Livro físico por R$ 141,74 mais frete
            ou eBook por R$ 65,99.
          </div>

          <a
            href="${CHECKOUT_URL}"
            style="
              display:inline-block;
              margin-top:15px;
              padding:12px 18px;
              color:${COLORS.black};
              background:${COLORS.lightGold};
              border-radius:999px;
              font-family:Arial,sans-serif;
              font-size:13px;
              font-weight:700;
              text-decoration:none;
            "
          >
            Comprar no website
          </a>
        </td>
      </tr>

      <tr>
        <td
          style="
            padding:20px;
            background:${COLORS.softCream};
            border:1px solid #E3CDAE;
            border-radius:14px;
          "
        >
          <div
            style="
              color:${COLORS.brown};
              font-family:Arial,sans-serif;
              font-size:11px;
              font-weight:700;
              letter-spacing:1.8px;
              text-transform:uppercase;
            "
          >
            Amazon
          </div>

          <div
            style="
              margin-top:7px;
              color:${COLORS.black};
              font-family:Georgia,'Times New Roman',serif;
              font-size:21px;
              line-height:1.3;
            "
          >
            Compre pela plataforma de sua preferência
          </div>

          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="margin-top:15px;"
          >
            <tr>
              <td
                style="
                  padding:0 8px 8px 0;
                "
              >
                <a
                  href="${AMAZON_PHYSICAL_URL}"
                  style="
                    display:inline-block;
                    padding:11px 16px;
                    color:${COLORS.softCream};
                    background:${COLORS.brown};
                    border-radius:999px;
                    font-family:Arial,sans-serif;
                    font-size:13px;
                    font-weight:700;
                    text-decoration:none;
                  "
                >
                  Livro físico na Amazon
                </a>
              </td>

              <td
                style="
                  padding:0 0 8px 0;
                "
              >
                <a
                  href="${AMAZON_EBOOK_URL}"
                  style="
                    display:inline-block;
                    padding:11px 16px;
                    color:${COLORS.softCream};
                    background:${COLORS.brown};
                    border-radius:999px;
                    font-family:Arial,sans-serif;
                    font-size:13px;
                    font-weight:700;
                    text-decoration:none;
                  "
                >
                  eBook na Amazon
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
}

function primaryButton({
  label,
  url,
}) {
  return `
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="margin:30px 0 0;"
    >
      <tr>
        <td
          bgcolor="${COLORS.lightGold}"
          style="
            border-radius:999px;
          "
        >
          <a
            href="${url}"
            style="
              display:inline-block;
              padding:15px 25px;
              color:${COLORS.black};
              font-family:Arial,sans-serif;
              font-size:14px;
              font-weight:700;
              line-height:1;
              text-decoration:none;
            "
          >
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `
}

function renderParagraphs(paragraphs) {
  return paragraphs
    .map(
      (paragraph) => `
        <p
          style="
            margin:0 0 18px;
            color:${COLORS.brown};
            font-family:Arial,sans-serif;
            font-size:16px;
            line-height:1.75;
          "
        >
          ${escapeHtml(paragraph)}
        </p>
      `
    )
    .join("")
}


function selectEmailDesign({
  sequenceCode,
  emailNumber,
  productType,
}) {
  const code =
    String(sequenceCode || "")
      .toLowerCase()

  const number =
    Math.max(
      1,
      Number(emailNumber || 1)
    )

  const normalizedProduct =
    normalizeProductType({
      productType,
      sequenceCode,
    })

  if (code.includes("checkout")) {
    const designs = [
      {
        layout: 1,
        banner:
          normalizedProduct === "digital"
            ? "amazonEbook"
            : "websitePhysical",
        url:
          normalizedProduct === "digital"
            ? AMAZON_EBOOK_URL
            : CHECKOUT_URL,
      },
      {
        layout: 2,
        banner:
          normalizedProduct === "digital"
            ? "amazonEbook"
            : "amazonPhysical",
        url:
          normalizedProduct === "digital"
            ? AMAZON_EBOOK_URL
            : AMAZON_PHYSICAL_URL,
      },
      {
        layout: 3,
        banner: "restart",
        url: CHECKOUT_URL,
      },
      {
        layout: 4,
        banner: "story",
        url: CHECKOUT_URL,
      },
      {
        layout: 5,
        banner: "presentation",
        url: CHECKOUT_URL,
      },
      {
        layout: 6,
        banner: "websitePhysical",
        url: CHECKOUT_URL,
      },
      {
        layout: 7,
        banner: "amazonPhysical",
        url: AMAZON_PHYSICAL_URL,
      },
      {
        layout: 8,
        banner: "restart",
        url: CHECKOUT_URL,
      },
    ]

    return designs[
      (number - 1) %
      designs.length
    ]
  }

  if (code.includes("customer")) {
    const designs = [
      {
        layout: 4,
        banner: "presentation",
        url: BOOK_URL,
      },
      {
        layout: 2,
        banner: "restart",
        url: BOOK_URL,
      },
      {
        layout: 5,
        banner: "story",
        url: BOOK_URL,
      },
    ]

    return designs[
      (number - 1) %
      designs.length
    ]
  }

  const designs = [
    {
      layout: 1,
      banner: "presentation",
      url: BOOK_URL,
    },
    {
      layout: 2,
      banner: "story",
      url: BOOK_URL,
    },
    {
      layout: 3,
      banner: "restart",
      url: BOOK_URL,
    },
    {
      layout: 4,
      banner: "presentation",
      url: BOOK_URL,
    },
    {
      layout: 5,
      banner: "story",
      url: BOOK_URL,
    },
    {
      layout: 6,
      banner: "restart",
      url: BOOK_URL,
    },
    {
      layout: 7,
      banner: "presentation",
      url: BOOK_URL,
    },
    {
      layout: 8,
      banner: "story",
      url: BOOK_URL,
    },
  ]

  return designs[
    (number - 1) %
    designs.length
  ]
}

function renderEmailBanner({
  design,
  subject,
}) {
  const source =
    EMAIL_BANNERS[
      design.banner
    ] ||
    EMAIL_BANNERS.presentation

  return `
    <a
      href="${design.url}"
      target="_blank"
      rel="noopener noreferrer"
      style="
        display:block;
        text-decoration:none;
      "
    >
      <img
        src="${source}"
        width="660"
        alt="${escapeHtml(subject)}"
        style="
          display:block;
          width:100%;
          max-width:660px;
          height:auto;
          border:0;
        "
      >
    </a>
  `
}

function renderBodyParagraphs(
  paragraphs,
  align = "left"
) {
  return paragraphs
    .map(
      (paragraph) => `
        <p
          style="
            margin:0 0 18px;
            color:${COLORS.brown};
            font-family:
              Arial,
              Helvetica,
              sans-serif;
            font-size:16px;
            line-height:1.72;
            text-align:${align};
          "
        >
          ${escapeHtml(paragraph)}
        </p>
      `
    )
    .join("")
}

function renderQuote(
  quote,
  variant = "light"
) {
  if (variant === "dark") {
    return `
      <div
        style="
          margin:28px 0 0;
          padding:24px 26px;
          background:${COLORS.dark};
          color:${COLORS.gold};
          font-family:
            Georgia,
            'Times New Roman',
            serif;
          font-size:22px;
          font-style:italic;
          line-height:1.5;
          text-align:center;
        "
      >
        “${escapeHtml(quote)}”
      </div>
    `
  }

  return `
    <div
      style="
        margin:28px 0 0;
        padding:5px 0 5px 22px;
        border-left:
          3px solid
          ${COLORS.gold};
        color:${COLORS.black};
        font-family:
          Georgia,
          'Times New Roman',
          serif;
        font-size:21px;
        font-style:italic;
        line-height:1.5;
      "
    >
      “${escapeHtml(quote)}”
    </div>
  `
}

function renderEmailButton({
  label,
  url,
  dark = false,
  centered = false,
}) {
  return `
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        margin:
          30px
          ${centered ? "auto" : "0"}
          0;
      "
    >
      <tr>
        <td
          bgcolor="${
            dark
              ? COLORS.dark
              : COLORS.lightGold
          }"
        >
          <a
            href="${url}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              display:inline-block;
              padding:15px 24px;
              color:${
                dark
                  ? COLORS.softCream
                  : COLORS.black
              };
              font-family:
                Arial,
                Helvetica,
                sans-serif;
              font-size:13px;
              font-weight:700;
              letter-spacing:0.5px;
              text-decoration:none;
              text-transform:uppercase;
            "
          >
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `
}

function renderPurchaseChoices() {
  return `
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        margin-top:34px;
        border-collapse:collapse;
      "
    >
      <tr>
        <td
          style="
            padding:24px;
            background:#F0E2CE;
            border-top:
              1px solid #D5BB94;
            border-bottom:
              1px solid #D5BB94;
          "
        >
          <div
            style="
              color:${COLORS.brown};
              font-family:Arial,sans-serif;
              font-size:11px;
              font-weight:700;
              letter-spacing:2px;
              text-transform:uppercase;
            "
          >
            Escolha onde comprar
          </div>

          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="
              margin-top:18px;
              border-collapse:collapse;
            "
          >
            <tr>
              <td
                width="33%"
                style="
                  padding-right:10px;
                  vertical-align:top;
                "
              >
                <a
                  href="${CHECKOUT_URL}"
                  style="
                    color:${COLORS.black};
                    font-family:Arial,sans-serif;
                    font-size:13px;
                    font-weight:700;
                    text-decoration:underline;
                  "
                >
                  Website oficial
                </a>

                <div
                  style="
                    margin-top:6px;
                    color:${COLORS.gray};
                    font-family:Arial,sans-serif;
                    font-size:11px;
                    line-height:1.4;
                  "
                >
                  Livro físico e eBook
                </div>
              </td>

              <td
                width="33%"
                style="
                  padding:0 10px;
                  border-left:
                    1px solid #D5BB94;
                  vertical-align:top;
                "
              >
                <a
                  href="${AMAZON_PHYSICAL_URL}"
                  style="
                    color:${COLORS.black};
                    font-family:Arial,sans-serif;
                    font-size:13px;
                    font-weight:700;
                    text-decoration:underline;
                  "
                >
                  Livro na Amazon
                </a>

                <div
                  style="
                    margin-top:6px;
                    color:${COLORS.gray};
                    font-family:Arial,sans-serif;
                    font-size:11px;
                    line-height:1.4;
                  "
                >
                  Exemplar físico
                </div>
              </td>

              <td
                width="33%"
                style="
                  padding-left:10px;
                  border-left:
                    1px solid #D5BB94;
                  vertical-align:top;
                "
              >
                <a
                  href="${AMAZON_EBOOK_URL}"
                  style="
                    color:${COLORS.black};
                    font-family:Arial,sans-serif;
                    font-size:13px;
                    font-weight:700;
                    text-decoration:underline;
                  "
                >
                  eBook na Amazon
                </a>

                <div
                  style="
                    margin-top:6px;
                    color:${COLORS.gray};
                    font-family:Arial,sans-serif;
                    font-size:11px;
                    line-height:1.4;
                  "
                >
                  Leitura no Kindle
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
}

function renderSuperacaoFooter({
  unsubscribeUrl,
}) {
  return `
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        width:100%;
        border-collapse:collapse;
      "
    >
      <tr>
        <td
          align="center"
          style="
            padding:30px 28px 24px;
            background:#ECE8E2;
          "
        >
          <div
            style="
              color:${COLORS.black};
              font-family:
                Georgia,
                'Times New Roman',
                serif;
              font-size:19px;
              font-weight:700;
            "
          >
            Acompanhe Gilberto de Souza
          </div>

          <div
            style="
              margin-top:8px;
              color:${COLORS.gray};
              font-family:Arial,sans-serif;
              font-size:12px;
              line-height:1.5;
            "
          >
            Reflexões, novidades e conteúdos
            sobre o livro Superação.
          </div>

          <div
            style="
              margin-top:18px;
            "
          >
            <a
              href="${INSTAGRAM_URL}"
              target="_blank"
              rel="noopener noreferrer"
              style="
                display:inline-block;
                width:44px;
                height:44px;
                text-decoration:none;
              "
            >
              <img
                src="${INSTAGRAM_ICON_URL}"
                width="44"
                height="44"
                alt="Instagram de Gilberto de Souza"
                style="
                  display:block;
                  width:44px;
                  height:44px;
                  border:0;
                  border-radius:12px;
                "
              >
            </a>
          </div>

          <div
            style="
              margin-top:9px;
              color:${COLORS.brown};
              font-family:Arial,sans-serif;
              font-size:12px;
              font-weight:700;
            "
          >
            @gilberto_souza_autor
          </div>
        </td>
      </tr>

      <tr>
        <td
          align="center"
          style="
            padding:28px 30px 32px;
            background:#F7F5F2;
            border-top:
              1px solid #D9D2C9;
          "
        >
          <div
            style="
              color:#555555;
              font-family:Arial,sans-serif;
              font-size:10px;
              line-height:1.7;
              text-align:center;
            "
          >
            <a
              href="${BOOK_URL}"
              style="
                color:#444444;
                text-decoration:underline;
              "
            >
              Ver no navegador
            </a>

            <br><br>

            Você recebeu esta mensagem porque
            se cadastrou, iniciou uma compra
            ou adquiriu o livro Superação.

            <br><br>

            <a
              href="${INSTAGRAM_URL}"
              style="
                color:#444444;
                text-decoration:underline;
              "
            >
              Instagram
            </a>

            &nbsp;|&nbsp;

            <a
              href="${unsubscribeUrl}"
              style="
                color:#444444;
                text-decoration:underline;
              "
            >
              Cancelar inscrição
            </a>

            <br><br>

            © ${new Date().getFullYear()}
            Gilberto de Souza.
            Todos os direitos reservados.

            <br>

            Comunicação oficial do livro Superação.
          </div>
        </td>
      </tr>
    </table>
  `
}

function renderContentLayout({
  design,
  content,
  recipientName,
}) {
  const banner =
    renderEmailBanner({
      design,
      subject:
        content.subject,
    })

  const paragraphs =
    renderBodyParagraphs(
      content.paragraphs,
      design.layout === 4
        ? "center"
        : "left"
    )

  const centered =
    design.layout === 2 ||
    design.layout === 4

  const dark =
    design.layout === 3 ||
    design.layout === 6

  const button =
    renderEmailButton({
      label:
        content.primaryLabel,
      url:
        content.primaryUrl,
      dark,
      centered,
    })

  const purchase =
    content.showPurchaseOptions
      ? renderPurchaseChoices()
      : ""

  if (design.layout === 2) {
    return `
      <tr>
        <td
          style="
            padding:42px 58px 28px;
            background:${COLORS.softCream};
            text-align:center;
          "
        >
          <div
            style="
              color:${COLORS.gold};
              font-family:Arial,sans-serif;
              font-size:10px;
              font-weight:700;
              letter-spacing:2.5px;
              text-transform:uppercase;
            "
          >
            ${escapeHtml(content.eyebrow)}
          </div>

          <h1
            style="
              margin:16px 0 20px;
              color:${COLORS.black};
              font-family:
                Georgia,
                'Times New Roman',
                serif;
              font-size:35px;
              font-weight:400;
              line-height:1.2;
            "
          >
            ${escapeHtml(content.title)}
          </h1>

          <p
            style="
              margin:0;
              color:${COLORS.brown};
              font-family:Arial,sans-serif;
              font-size:15px;
              line-height:1.6;
            "
          >
            Olá, ${recipientName}.
          </p>
        </td>
      </tr>

      <tr>
        <td>${banner}</td>
      </tr>

      <tr>
        <td
          style="
            padding:38px 58px 46px;
            background:${COLORS.softCream};
          "
        >
          ${paragraphs}
          ${renderQuote(content.quote)}
          ${button}
          ${purchase}
        </td>
      </tr>
    `
  }

  if (design.layout === 3) {
    return `
      <tr>
        <td
          style="
            padding:38px 44px;
            background:${COLORS.dark};
          "
        >
          <div
            style="
              color:${COLORS.gold};
              font-family:Arial,sans-serif;
              font-size:10px;
              font-weight:700;
              letter-spacing:2.5px;
              text-transform:uppercase;
            "
          >
            ${escapeHtml(content.eyebrow)}
          </div>

          <h1
            style="
              margin:15px 0 20px;
              color:${COLORS.softCream};
              font-family:
                Georgia,
                'Times New Roman',
                serif;
              font-size:37px;
              font-weight:400;
              line-height:1.18;
            "
          >
            ${escapeHtml(content.title)}
          </h1>

          <p
            style="
              margin:0;
              color:${COLORS.muted};
              font-family:Arial,sans-serif;
              font-size:15px;
              line-height:1.6;
            "
          >
            Olá, ${recipientName}.
          </p>
        </td>
      </tr>

      <tr>
        <td>${banner}</td>
      </tr>

      <tr>
        <td
          style="
            padding:40px 46px 46px;
            background:${COLORS.softCream};
          "
        >
          ${paragraphs}
          ${renderQuote(
            content.quote,
            "dark"
          )}
          ${button}
          ${purchase}
        </td>
      </tr>
    `
  }

  if (design.layout === 4) {
    return `
      <tr>
        <td>${banner}</td>
      </tr>

      <tr>
        <td
          align="center"
          style="
            padding:42px 62px 18px;
            background:${COLORS.softCream};
          "
        >
          <div
            style="
              color:${COLORS.gold};
              font-family:Arial,sans-serif;
              font-size:10px;
              font-weight:700;
              letter-spacing:2.5px;
              text-transform:uppercase;
            "
          >
            ${escapeHtml(content.eyebrow)}
          </div>

          <h1
            style="
              margin:16px 0 0;
              color:${COLORS.black};
              font-family:
                Georgia,
                'Times New Roman',
                serif;
              font-size:34px;
              font-weight:400;
              line-height:1.22;
            "
          >
            ${escapeHtml(content.title)}
          </h1>
        </td>
      </tr>

      <tr>
        <td
          style="
            padding:24px 62px 46px;
            background:${COLORS.softCream};
          "
        >
          <p
            style="
              margin:0 0 22px;
              color:${COLORS.brown};
              font-family:Arial,sans-serif;
              font-size:15px;
              line-height:1.6;
              text-align:center;
            "
          >
            Olá, ${recipientName}.
          </p>

          ${paragraphs}
          ${renderQuote(content.quote)}
          ${button}
          ${purchase}
        </td>
      </tr>
    `
  }

  if (design.layout === 5) {
    return `
      <tr>
        <td
          style="
            padding:44px 46px 32px;
            background:${COLORS.softCream};
          "
        >
          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
          >
            <tr>
              <td
                width="16"
                style="
                  width:16px;
                  border-left:
                    4px solid
                    ${COLORS.gold};
                "
              >
                &nbsp;
              </td>

              <td
                style="
                  padding-left:18px;
                "
              >
                <div
                  style="
                    color:${COLORS.brown};
                    font-family:Arial,sans-serif;
                    font-size:10px;
                    font-weight:700;
                    letter-spacing:2px;
                    text-transform:uppercase;
                  "
                >
                  ${escapeHtml(content.eyebrow)}
                </div>

                <h1
                  style="
                    margin:13px 0 0;
                    color:${COLORS.black};
                    font-family:
                      Georgia,
                      'Times New Roman',
                      serif;
                    font-size:35px;
                    font-weight:400;
                    line-height:1.2;
                  "
                >
                  ${escapeHtml(content.title)}
                </h1>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td>${banner}</td>
      </tr>

      <tr>
        <td
          style="
            padding:38px 46px 48px;
            background:${COLORS.softCream};
          "
        >
          <p
            style="
              margin:0 0 22px;
              color:${COLORS.brown};
              font-family:Arial,sans-serif;
              font-size:15px;
              line-height:1.6;
            "
          >
            Olá, ${recipientName}.
          </p>

          ${paragraphs}
          ${renderQuote(content.quote)}
          ${button}
          ${purchase}
        </td>
      </tr>
    `
  }

  if (design.layout === 6) {
    return `
      <tr>
        <td>${banner}</td>
      </tr>

      <tr>
        <td
          style="
            padding:40px 42px 22px;
            background:${COLORS.dark};
          "
        >
          <div
            style="
              color:${COLORS.gold};
              font-family:Arial,sans-serif;
              font-size:10px;
              font-weight:700;
              letter-spacing:2.4px;
              text-transform:uppercase;
            "
          >
            ${escapeHtml(content.eyebrow)}
          </div>

          <h1
            style="
              margin:15px 0 0;
              color:${COLORS.softCream};
              font-family:
                Georgia,
                'Times New Roman',
                serif;
              font-size:35px;
              font-weight:400;
              line-height:1.2;
            "
          >
            ${escapeHtml(content.title)}
          </h1>
        </td>
      </tr>

      <tr>
        <td
          style="
            padding:36px 42px 46px;
            background:${COLORS.softCream};
          "
        >
          <p
            style="
              margin:0 0 22px;
              color:${COLORS.brown};
              font-family:Arial,sans-serif;
              font-size:15px;
              line-height:1.6;
            "
          >
            Olá, ${recipientName}.
          </p>

          ${paragraphs}
          ${renderQuote(
            content.quote,
            "dark"
          )}
          ${button}
          ${purchase}
        </td>
      </tr>
    `
  }

  if (design.layout === 7) {
    return `
      <tr>
        <td
          style="
            padding:36px 44px 28px;
            background:#F1E3CF;
          "
        >
          <div
            style="
              color:${COLORS.brown};
              font-family:Arial,sans-serif;
              font-size:10px;
              font-weight:700;
              letter-spacing:2.2px;
              text-transform:uppercase;
            "
          >
            ${escapeHtml(content.eyebrow)}
          </div>

          <h1
            style="
              margin:14px 0 0;
              color:${COLORS.black};
              font-family:
                Georgia,
                'Times New Roman',
                serif;
              font-size:36px;
              font-weight:400;
              line-height:1.2;
            "
          >
            ${escapeHtml(content.title)}
          </h1>
        </td>
      </tr>

      <tr>
        <td
          style="
            padding:34px 44px;
            background:${COLORS.softCream};
          "
        >
          <p
            style="
              margin:0 0 22px;
              color:${COLORS.brown};
              font-family:Arial,sans-serif;
              font-size:15px;
              line-height:1.6;
            "
          >
            Olá, ${recipientName}.
          </p>

          ${paragraphs}
        </td>
      </tr>

      <tr>
        <td>${banner}</td>
      </tr>

      <tr>
        <td
          style="
            padding:18px 44px 46px;
            background:${COLORS.softCream};
          "
        >
          ${renderQuote(content.quote)}
          ${button}
          ${purchase}
        </td>
      </tr>
    `
  }

  if (design.layout === 8) {
    return `
      <tr>
        <td
          style="
            padding:40px 46px 30px;
            background:${COLORS.softCream};
          "
        >
          <div
            style="
              color:${COLORS.gold};
              font-family:Arial,sans-serif;
              font-size:10px;
              font-weight:700;
              letter-spacing:2.5px;
              text-transform:uppercase;
            "
          >
            ${escapeHtml(content.eyebrow)}
          </div>

          <h1
            style="
              margin:16px 0 22px;
              color:${COLORS.black};
              font-family:
                Georgia,
                'Times New Roman',
                serif;
              font-size:36px;
              font-weight:400;
              line-height:1.2;
            "
          >
            ${escapeHtml(content.title)}
          </h1>

          <p
            style="
              margin:0 0 22px;
              color:${COLORS.brown};
              font-family:Arial,sans-serif;
              font-size:15px;
              line-height:1.6;
            "
          >
            Olá, ${recipientName}.
          </p>

          ${paragraphs}
        </td>
      </tr>

      <tr>
        <td>${banner}</td>
      </tr>

      <tr>
        <td
          style="
            padding:30px 46px 46px;
            background:${COLORS.softCream};
          "
        >
          ${renderQuote(content.quote)}
          ${button}
          ${purchase}
        </td>
      </tr>
    `
  }

  return `
    <tr>
      <td>${banner}</td>
    </tr>

    <tr>
      <td
        style="
          padding:42px 46px 48px;
          background:${COLORS.softCream};
        "
      >
        <div
          style="
            color:${COLORS.gold};
            font-family:Arial,sans-serif;
            font-size:10px;
            font-weight:700;
            letter-spacing:2.5px;
            text-transform:uppercase;
          "
        >
          ${escapeHtml(content.eyebrow)}
        </div>

        <h1
          style="
            margin:16px 0 23px;
            color:${COLORS.black};
            font-family:
              Georgia,
              'Times New Roman',
              serif;
            font-size:36px;
            font-weight:400;
            line-height:1.2;
          "
        >
          ${escapeHtml(content.title)}
        </h1>

        <p
          style="
            margin:0 0 22px;
            color:${COLORS.brown};
            font-family:Arial,sans-serif;
            font-size:15px;
            line-height:1.6;
          "
        >
          Olá, ${recipientName}.
        </p>

        ${paragraphs}
        ${renderQuote(content.quote)}
        ${button}
        ${purchase}
      </td>
    </tr>
  `
}

function emailLayout({
  email,
  name,
  sequenceCode,
  emailNumber,
  productType,
  content,
}) {
  const recipientName =
    escapeHtml(
      firstName(name)
    )

  const safeEmail =
    String(email || "")
      .trim()
      .toLowerCase()

  const unsubscribeUrl =
    `${SITE_URL}/api/unsubscribe?email=` +
    encodeURIComponent(
      safeEmail
    )

  const design =
    selectEmailDesign({
      sequenceCode,
      emailNumber,
      productType,
    })

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">

    <meta
      name="viewport"
      content="width=device-width,initial-scale=1"
    >

    <meta
      name="x-apple-disable-message-reformatting"
    >

    <title>
      ${escapeHtml(content.subject)}
    </title>
  </head>

  <body
    style="
      margin:0;
      padding:0;
      background:#E9E5DF;
      -webkit-text-size-adjust:100%;
    "
  >
    <div
      style="
        display:none;
        max-height:0;
        overflow:hidden;
        opacity:0;
        color:transparent;
      "
    >
      ${escapeHtml(content.preheader)}
    </div>

    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      bgcolor="#E9E5DF"
      style="
        width:100%;
        background:#E9E5DF;
        border-collapse:collapse;
      "
    >
      <tr>
        <td
          align="center"
          style="
            padding:26px 10px 44px;
          "
        >
          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="
              width:100%;
              max-width:660px;
              background:${COLORS.softCream};
              border-collapse:collapse;
              box-shadow:
                0 10px 28px
                rgba(0,0,0,0.08);
            "
          >
            ${renderContentLayout({
              design,
              content,
              recipientName,
            })}

            <tr>
              <td>
                ${renderSuperacaoFooter({
                  unsubscribeUrl,
                })}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function getSuperacaoEmailSubject({
  sequenceCode,
  emailNumber,
}) {
  const emails =
    getSequenceEmails(sequenceCode)

  const index =
    Math.max(
      0,
      Number(emailNumber || 1) - 1
    )

  return (
    emails[index]?.subject ||
    emails[0]?.subject ||
    "Superação"
  )
}

export function getSuperacaoEmailHtml({
  sequenceCode,
  emailNumber,
  name,
  email,
  productType,
}) {
  const emails =
    getSequenceEmails(sequenceCode)

  const index =
    Math.max(
      0,
      Number(emailNumber || 1) - 1
    )

  const content =
    emails[index] ||
    emails[0]

  return emailLayout({
    email,
    name,
    sequenceCode,
    emailNumber,
    productType,
    content,
  })
}
