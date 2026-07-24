import { renderSequenceEmail } from './emailDesignSystem'

function baseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gilberto-souza.com').replace(/\/$/, '')
}

function asset(path) {
  return `${baseUrl()}${path}`
}

function unsubscribeUrl(email, language) {
  const safeEmail = encodeURIComponent(String(email || ''))
  const safeLang = encodeURIComponent(String(language || 'pt'))
  return `${baseUrl()}/api/unsubscribe?email=${safeEmail}&lang=${safeLang}`
}

function unsubscribeText(language) {
  if (language === 'en') return 'Unsubscribe'
  if (language === 'es') return 'Cancelar suscripción'
  return 'Cancelar inscrição'
}

const COLORS = {
  bg: '#060C18',
  card: '#0D1B3E',
  card2: '#09162B',
  cyan: '#5FD3E3',
  text: '#FFFFFF',
  muted: '#B8C8E0',
  soft: '#7182A6'
}

const COPY = {
  pt: {
    brand: 'GILBERTO DE SOUZA',
    official: 'LIVRO OFICIAL',
    cta: 'QUERO CONHECER O LIVRO',
    secure1: 'Compra segura',
    secure2: 'Acesso imediato',
    secure3: 'Satisfação garantida',
    footer: 'Você recebeu este email porque se cadastrou no site oficial de Gilberto de Souza.',
    unsubscribe: 'Se não deseja mais receber nossos emails, responda este email solicitando remoção.',
    emails: {
      1: {
        hero: '/email-assets/email1-hero.jpeg',
        book: '/email-assets/book-pt.png',
        author: '/email-assets/gilberto-perfil.jpeg',
        subject: 'Você não precisa carregar essa dor sozinho',
        headline: 'Você não precisa carregar essa dor sozinho.',
        greeting: (name) => name ? `Olá, ${name}.` : 'Olá.',
        quote: '“Por que ela me trocou?”',
        insightTitle: 'A verdade que descobri depois do meu casamento terminar foi simples:',
        insight: 'A cura começa quando você para de procurar respostas nela e começa a recuperar quem você era antes dela.',
        body: [
          'Existem dores que ninguém vê.',
          'Você continua trabalhando, sorrindo e seguindo em frente...',
          'Mas por dentro, ainda tenta entender o que aconteceu.',
          'Talvez a pergunta que não sai da sua cabeça seja:',
          'E quanto mais você tenta encontrar a resposta, mais preso você fica ao passado.'
        ],
        bookTitle: 'Como vencer a dor de ser trocado por outro',
        bookSub: 'Você não está sozinho. Eu já estive aí.',
        signature: 'Escrevi este livro porque eu precisei dele.'
      },
      2: {
        hero: '/email-assets/email2-hero.png',
        book: '/email-assets/email2-book.png',
        author: '/email-assets/gilberto-perfil.jpeg',
        subject: 'O erro que mantém muitos homens presos ao passado',
        headline: 'O erro que mantém muitos homens presos ao passado.',
        greeting: (name) => name ? `Olá, ${name}.` : 'Olá.',
        quote: '“Eu só preciso entender por quê.”',
        insightTitle: 'Mas entender tudo nem sempre cura.',
        insight: 'Às vezes, a busca por explicação vira uma prisão. Você não precisa de mais dor. Você precisa de direção.',
        body: [
          'Muitos homens acham que vão se curar quando finalmente entenderem cada detalhe do fim.',
          'Eles repetem conversas na cabeça, procuram sinais, comparam o passado com o presente.',
          'Mas quanto mais tentam controlar a explicação, mais perdem o controle da própria paz.',
          'O recomeço começa quando você para de viver em função da resposta dela.'
        ],
        bookTitle: 'Recupere clareza, autoestima e direção',
        bookSub: 'Um guia para atravessar a dor sem se perder nela.',
        signature: 'Você não precisa se tornar frio para se proteger.'
      },
      3: {
        hero: '/email-assets/email3-hero.png',
        book: '/email-assets/email3-book.png',
        author: '/email-assets/gilberto-perfil.jpeg',
        subject: 'Uma forma diferente de recomeçar',
        headline: 'Uma forma diferente de recomeçar.',
        greeting: (name) => name ? `Olá, ${name}.` : 'Olá.',
        quote: '“O fim não precisa ser o fim de você.”',
        insightTitle: 'Recomeçar não é fingir que nada aconteceu.',
        insight: 'Recomeçar é olhar para a dor com coragem e decidir que ela não terá a palavra final sobre sua vida.',
        body: [
          'Talvez você não consiga mudar o que aconteceu.',
          'Mas pode mudar o que isso vai fazer com você daqui para frente.',
          'Você pode voltar a dormir melhor, pensar com mais clareza e recuperar respeito por si mesmo.',
          'O livro foi escrito para acompanhar esse processo passo a passo.'
        ],
        bookTitle: 'Comece hoje a reconstruir sua vida',
        bookSub: 'eBook + Audiobook com acesso imediato.',
        signature: 'A dor explica uma fase. Ela não precisa definir seu futuro.'
      }
    }
  }
}


const RETAILERS = {
  pt: {
    amazon: 'https://www.amazon.com/dp/B0H2LM4TXH',
    barnes: 'https://www.barnesandnoble.com/w/como-vencer-a-dor-de-ser-trocado-por-outro-gilberto-de-souza/1150279850?ean=9798256373542',
    label: 'Escolha como deseja comprar',
    amazonText: 'Comprar livro físico na Amazon',
    barnesText: 'Comprar livro físico na Barnes & Noble',
    siteText: 'Comprar eBook + Audiobook no site oficial'
  },
  en: {
    amazon: 'https://www.amazon.com/dp/B0H2LXHCH4',
    barnes: 'https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504',
    label: 'Choose the format you trust most',
    amazonText: 'Buy paperback on Amazon',
    barnesText: 'Buy paperback on Barnes & Noble',
    siteText: 'Get eBook + Audiobook instantly'
  },
  es: {
    amazon: 'https://www.amazon.com/dp/B0H2LHZT7X',
    barnes: 'https://www.barnesandnoble.com/w/como-vencer-el-dolor-de-ser-reemplazado-por-otro-gilberto-de-souza/1150279538?ean=9786584622050',
    label: 'Elige el formato que más confianza te dé',
    amazonText: 'Comprar libro físico en Amazon',
    barnesText: 'Comprar libro físico en Barnes & Noble',
    siteText: 'Obtener eBook + Audiolibro al instante'
  }
}

const LEAD_TOPICS = {
  pt: [
    ['Você não precisa carregar essa dor sozinho','A dor que ninguém vê','Talvez você continue trabalhando, sorrindo e respondendo “estou bem”. Mas por dentro ainda existe uma pergunta que não deixa sua mente descansar. Este email é um lembrete: você não precisa atravessar essa dor sem direção.'],
    ['O erro que mantém muitos homens presos ao passado','A pergunta que prende sua mente','Quando um homem é deixado, ele tenta encontrar uma explicação perfeita. Ele revisa conversas, lembra detalhes e procura sinais. Mas quanto mais ele tenta entender a decisão dela, mais sua vida fica parada no mesmo lugar.'],
    ['Uma forma diferente de recomeçar','Recomeçar não é esquecer','Você não precisa apagar a história, fingir que não amou ou agir como se nada tivesse acontecido. Recomeçar é parar de permitir que o passado continue decidindo quem você será amanhã.'],
    ['O dia em que você para de esperar respostas','Nem toda resposta liberta','Talvez a resposta que você espera nunca venha. E talvez, mesmo que viesse, ela não curasse tudo. A paz começa quando você entende que não precisa da explicação dela para recuperar seu valor.'],
    ['Por que ser trocado dói tanto','Não é só saudade','Ser trocado não fere apenas o coração. Fere identidade, orgulho, memória e o futuro que você imaginou. Por isso dói tanto. Mas essa dor não precisa virar prisão; ela pode virar reconstrução.'],
    ['Como parar de se comparar com outra pessoa','O outro homem não define você','A comparação é uma armadilha silenciosa. Você começa a se perguntar o que ele tem, o que você perdeu, onde falhou. Mas sua reconstrução não começa vencendo outro homem. Começa voltando a respeitar quem você é.'],
    ['O perigo de vigiar o passado','Redes sociais podem virar prisão','Cada visita ao perfil dela pode parecer pequena, mas reabre a ferida. Às vezes você não está buscando informação; está buscando dor familiar. Paz começa quando você para de alimentar aquilo que destrói sua mente.'],
    ['A esperança também pode virar prisão','Esperar pode impedir você de viver','Existe uma esperança que cura. Mas existe uma esperança que prende. Quando você espera alguém voltar enquanto sua vida fica parada, talvez não seja amor. Talvez seja medo de aceitar que você precisa seguir.'],
    ['O que a rejeição tenta fazer com você','A rejeição mente','A rejeição tenta convencer você de que perdeu valor. Ela tenta fazer você acreditar que foi insuficiente. Mas o seu valor não diminuiu porque alguém deixou de enxergá-lo.'],
    ['Como recuperar sua autoestima aos poucos','Reconstrução começa pequeno','A autoestima não volta em um único dia. Ela volta quando você para de se humilhar, cuida do corpo, organiza a mente, dorme melhor e começa a cumprir pequenas promessas feitas a si mesmo.'],
    ['Você ainda pode reconstruir sua vida','O fim não precisa ser o fim de você','O que terminou foi uma relação. Não foi sua capacidade de amar, crescer, vencer e ser respeitado novamente. Existe uma versão sua depois dessa dor — e ela pode ser mais forte do que a anterior.'],
    ['O que muda quando você volta para si mesmo','Voltar para si é recuperar poder','Quando você para de viver tentando provar algo para ela, sua energia volta. Sua dignidade volta. Sua visão volta. O homem que estava escondido atrás da dor começa a respirar de novo.'],
    ['Uma decisão silenciosa que muda tudo','A decisão de não se abandonar','O maior ponto de virada não acontece quando ela volta, pede desculpas ou explica tudo. Acontece quando você decide: eu posso ter sido deixado, mas não vou me abandonar.'],
    ['Você não foi destruído, você está em reconstrução','Existe vida depois disso','Talvez hoje ainda doa. Talvez algumas noites ainda sejam difíceis. Mas dor não é destino. É uma fase. E fases podem ser atravessadas quando você tem direção.'],
    ['Um convite para começar hoje','Dê o primeiro passo','Se você chegou até aqui, talvez já saiba que continuar parado vai custar caro. Este é o convite: pare de sobreviver ao passado e comece a reconstruir sua vida com clareza, respeito próprio e direção.']
  ],
  en: [
    ['I need to tell you why I wrote this book','For a long time, I kept this part of my story to myself.','There was a season when rejection made me question everything about myself.\n\nI kept going through the motions. I worked, talked to people, and tried to look strong. But inside, I was still asking the same question: Why was I not enough?\n\nThat question did more damage than the breakup itself.\n\nI wrote this book because I eventually discovered that healing did not begin when I understood her decision. It began when I stopped allowing her decision to define my value.','Tomorrow, I will tell you about the question that kept me trapped longer than it should have.'],
    ['The question that kept me trapped','I thought one answer would finally set me free.','I replayed conversations in my mind.\n\nI searched for the moment when everything changed. I compared myself to another man. I believed that if I could understand exactly why it happened, the pain would finally make sense.\n\nBut every answer created another question.\n\nThe wall in front of me was not the lack of information. It was my belief that her explanation was required before I could move forward.','In the next email, I will share the realization that changed the direction of my recovery.'],
    ['The realization that changed everything','Her decision was not a verdict on my worth.','One day, I finally understood something I had been unable to see.\n\nThe deepest wound was not that she chose another path.\n\nThe deepest wound was that I had allowed that choice to become evidence that I was less valuable.\n\nThat was the turning point.\n\nI could not control what she chose, but I could decide whether I would continue abandoning myself because of it.','Tomorrow, I will show you what began to change when I made that decision.'],
    ['What changed when I stopped chasing answers','The benefits reached far beyond the relationship.','When I stopped building my life around unanswered questions, small things began to change.\n\nI slept with less anxiety.\n\nI stopped checking for signs.\n\nI started thinking more clearly.\n\nI became more disciplined with my body, my time, and my decisions.\n\nHealing was no longer about getting her back. It became about getting myself back.','The next email is about the decision you may be postponing right now.'],
    ['You can wait another year—or begin today','Time passes even when nothing changes.','You can spend another year hoping that time alone will remove the pain.\n\nOr you can begin rebuilding with direction.\n\nThe book was written to help you understand what rejection does to identity, self-respect, focus, and hope—and how to reclaim each one.\n\nYou do not need to feel completely ready.\n\nYou only need to stop choosing the same pain every day.','Tomorrow, I will tell you about a habit that looks harmless but keeps many men emotionally attached.'],
    ['I watched a man open her profile again','He closed it. Five minutes later, he opened it again.','I knew exactly what he was looking for.\n\nA clue.\n\nA change.\n\nSomething that would confirm she missed him—or prove that the other man was not better.\n\nBut social media rarely gives closure. It gives fragments, and the mind turns those fragments into new stories.\n\nThe problem is not the profile.\n\nThe problem is using her life to measure your worth.','Next, I want to talk about the comparison that slowly destroys a man’s confidence.'],
    ['What does he have that I do not?','That question has no winning answer.','If you decide he is better, you feel defeated.\n\nIf you decide you are better, you still remain emotionally tied to the competition.\n\nEither way, your attention stays on him instead of your own rebuilding.\n\nYour recovery does not begin when you defeat another man in your mind.\n\nIt begins when you stop treating your life like a comparison.','Tomorrow: the kind of hope that quietly becomes a prison.'],
    ['Hope can become a prison','Not every form of hope is helping you heal.','Hope is powerful when it moves you forward.\n\nBut hope becomes dangerous when it keeps your life suspended.\n\nMaybe she will return.\n\nMaybe she will regret it.\n\nMaybe one message will change everything.\n\nMeanwhile, months pass and your identity remains attached to a possibility you cannot control.\n\nAcceptance is not giving up. It is refusing to remain imprisoned by an outcome that does not belong to you.','Next, I will show you the lie rejection tries to make you believe.'],
    ['The lie rejection tells every man','It sounds personal, but it is not the truth.','Rejection says: You were not enough.\n\nIt says: Someone else had what you lacked.\n\nIt says: Your best years are behind you.\n\nThose thoughts can feel true because they are connected to pain. But pain is not proof.\n\nSomeone choosing another direction does not remove your character, experience, ability, purpose, or future.','Tomorrow: how self-worth actually returns.'],
    ['Self-worth does not return through one big moment','It returns through small promises kept.','You rebuild self-respect when you stop begging for attention.\n\nWhen you sleep instead of checking her profile.\n\nWhen you train your body.\n\nWhen you complete what you said you would complete.\n\nWhen you speak to yourself with honesty instead of humiliation.\n\nConfidence is not a speech. It is evidence you create through repeated action.','Next, I will tell you why the end of the relationship does not have to become the end of you.'],
    ['What ended was a relationship—not your future','Pain often makes the ending feel larger than it is.','A relationship ended.\n\nYour capacity to love did not.\n\nYour ability to grow did not.\n\nYour potential to build a meaningful life did not.\n\nYour future was not canceled because one chapter closed.\n\nBut you must stop reading the same final page if you want to begin the next one.','Tomorrow: what happens when you finally return to yourself.'],
    ['The day your energy comes back','It begins when you stop trying to prove something to her.','So much energy is lost trying to be seen by someone who has already turned away.\n\nYou imagine the success she might notice.\n\nThe photo she might react to.\n\nThe change that might make her reconsider.\n\nBut rebuilding for her keeps her at the center of your life.\n\nRebuilding for yourself gives your life back to you.','Next, I will share the quiet sentence that marks the real turning point.'],
    ['The quiet decision that changes everything','It is not dramatic, but it is powerful.','The turning point is rarely a perfect morning when all the pain disappears.\n\nIt is usually one private decision:\n\nI may have been left, but I will not continue abandoning myself.\n\nThat sentence changes where you place your attention.\n\nIt changes what you tolerate.\n\nIt changes what you do next.','Tomorrow: why pain is a season, not an identity.'],
    ['You are not destroyed','You are in the middle of rebuilding.','There may still be difficult nights.\n\nCertain memories may still appear without warning.\n\nThat does not mean you are failing.\n\nHealing is not the absence of emotion. It is the growing ability to feel without losing your direction.\n\nPain can describe this season. It does not have to name the rest of your life.','Tomorrow, I will send you one final invitation.'],
    ['Your next chapter can begin today','The first step does not need to be dramatic.','You have now seen the central truth behind this entire sequence:\n\nHer decision does not determine your value.\n\nBut understanding that idea is only the beginning. You still need a process for rebuilding identity, discipline, clarity, and direction.\n\nThat is what I organized inside the book.\n\nYou can continue carrying this alone, or you can take the first structured step today.','Do not wait until you feel no pain. Begin so the pain no longer controls your direction.']
],
  es: [
    ['Necesito contarte por qué escribí este libro','Durante mucho tiempo guardé esta parte de mi historia.','Hubo una etapa en la que el rechazo me hizo cuestionar todo sobre mí.\n\nSeguía trabajando, hablando con la gente e intentando parecer fuerte. Pero por dentro repetía la misma pregunta: ¿Por qué no fui suficiente?\n\nEsa pregunta me hizo más daño que el final de la relación.\n\nEscribí este libro porque descubrí que la sanación no comenzó cuando entendí su decisión. Comenzó cuando dejé de permitir que su decisión definiera mi valor.','Mañana te contaré cuál fue la pregunta que me mantuvo atrapado más tiempo del necesario.'],
    ['La pregunta que me mantuvo atrapado','Creía que una respuesta finalmente me liberaría.','Repetía conversaciones en mi mente.\n\nBuscaba el momento exacto en que todo cambió. Me comparaba con otro hombre. Pensaba que, si lograba entender por qué ocurrió, el dolor finalmente tendría sentido.\n\nPero cada respuesta creaba otra pregunta.\n\nEl muro frente a mí no era la falta de información. Era la creencia de que necesitaba su explicación para poder avanzar.','En el próximo correo compartiré la comprensión que cambió el rumbo de mi recuperación.'],
    ['La comprensión que lo cambió todo','Su decisión no era una sentencia sobre mi valor.','Un día comprendí algo que antes no lograba ver.\n\nLa herida más profunda no era que ella hubiera elegido otro camino.\n\nLa herida más profunda era que yo había convertido esa elección en una prueba de que valía menos.\n\nEse fue el punto de cambio.\n\nNo podía controlar su elección, pero sí podía decidir si seguiría abandonándome por causa de ella.','Mañana te mostraré lo que comenzó a cambiar después de tomar esa decisión.'],
    ['Lo que cambió cuando dejé de perseguir respuestas','Los beneficios fueron mucho más allá de la relación.','Cuando dejé de construir mi vida alrededor de preguntas sin respuesta, pequeñas cosas comenzaron a cambiar.\n\nDormía con menos ansiedad.\n\nDejé de buscar señales.\n\nEmpecé a pensar con más claridad.\n\nMe volví más disciplinado con mi cuerpo, mi tiempo y mis decisiones.\n\nSanar dejó de significar recuperarla. Comenzó a significar recuperarme a mí mismo.','El próximo correo trata sobre la decisión que quizá estás posponiendo.'],
    ['Puedes esperar otro año o comenzar hoy','El tiempo pasa incluso cuando nada cambia.','Puedes pasar otro año esperando que el tiempo elimine el dolor por sí solo.\n\nO puedes comenzar a reconstruirte con dirección.\n\nEl libro fue escrito para ayudarte a entender lo que el rechazo hace con la identidad, el respeto propio, el enfoque y la esperanza, y cómo recuperar cada uno.\n\nNo necesitas sentirte completamente listo.\n\nSolo necesitas dejar de elegir el mismo dolor todos los días.','Mañana te hablaré de un hábito que parece inofensivo, pero mantiene a muchos hombres emocionalmente atados.'],
    ['Vi a un hombre abrir su perfil otra vez','Lo cerró. Cinco minutos después, volvió a abrirlo.','Yo sabía exactamente lo que estaba buscando.\n\nUna señal.\n\nUn cambio.\n\nAlgo que confirmara que ella lo extrañaba o demostrara que el otro hombre no era mejor.\n\nPero las redes sociales casi nunca ofrecen cierre. Ofrecen fragmentos, y la mente convierte esos fragmentos en nuevas historias.\n\nEl problema no es el perfil.\n\nEl problema es usar la vida de ella para medir tu valor.','Después hablaremos de la comparación que destruye lentamente la confianza de un hombre.'],
    ['¿Qué tiene él que yo no tengo?','Esa pregunta no tiene una respuesta ganadora.','Si decides que él es mejor, te sientes derrotado.\n\nSi decides que tú eres mejor, continúas emocionalmente unido a la competencia.\n\nEn ambos casos, tu atención sigue puesta en él y no en tu reconstrucción.\n\nTu recuperación no comienza cuando derrotas a otro hombre en tu mente.\n\nComienza cuando dejas de tratar tu vida como una comparación.','Mañana: la clase de esperanza que silenciosamente se convierte en prisión.'],
    ['La esperanza también puede ser una prisión','No toda esperanza te está ayudando a sanar.','La esperanza es poderosa cuando te impulsa hacia adelante.\n\nPero se vuelve peligrosa cuando deja tu vida suspendida.\n\nTal vez ella vuelva.\n\nTal vez se arrepienta.\n\nTal vez un mensaje cambie todo.\n\nMientras tanto, pasan los meses y tu identidad permanece atada a una posibilidad que no controlas.\n\nAceptar no es rendirse. Es negarte a seguir preso de un resultado que no te pertenece.','Después te mostraré la mentira que el rechazo intenta hacerte creer.'],
    ['La mentira que el rechazo le cuenta a todo hombre','Parece personal, pero no es la verdad.','El rechazo dice: no fuiste suficiente.\n\nDice: otro hombre tenía lo que a ti te faltaba.\n\nDice: tus mejores años quedaron atrás.\n\nEsos pensamientos parecen verdaderos porque están conectados al dolor. Pero el dolor no es una prueba.\n\nQue alguien elija otro camino no elimina tu carácter, tu experiencia, tu capacidad, tu propósito ni tu futuro.','Mañana: cómo regresa realmente la autoestima.'],
    ['La autoestima no vuelve en un solo momento','Regresa mediante pequeñas promesas cumplidas.','Reconstruyes el respeto propio cuando dejas de rogar atención.\n\nCuando duermes en lugar de revisar su perfil.\n\nCuando cuidas tu cuerpo.\n\nCuando terminas lo que dijiste que terminarías.\n\nCuando te hablas con honestidad en lugar de humillarte.\n\nLa confianza no es un discurso. Es evidencia creada mediante acciones repetidas.','Después te contaré por qué el final de la relación no tiene que ser tu final.'],
    ['Terminó una relación, no tu futuro','El dolor hace que el final parezca más grande de lo que es.','Terminó una relación.\n\nTu capacidad de amar no terminó.\n\nTu capacidad de crecer no terminó.\n\nTu posibilidad de construir una vida con sentido no terminó.\n\nTu futuro no fue cancelado porque un capítulo se cerró.\n\nPero debes dejar de leer la misma última página para poder comenzar la siguiente.','Mañana: lo que ocurre cuando finalmente vuelves a ti.'],
    ['El día en que recuperas tu energía','Comienza cuando dejas de intentar demostrarle algo.','Se pierde mucha energía intentando ser visto por alguien que ya decidió mirar hacia otro lado.\n\nImaginas el éxito que ella podría notar.\n\nLa foto a la que podría reaccionar.\n\nEl cambio que podría hacerla reconsiderar.\n\nPero reconstruirte para ella la mantiene en el centro de tu vida.\n\nReconstruirte para ti te devuelve tu vida.','Después compartiré la frase silenciosa que marca el verdadero punto de cambio.'],
    ['La decisión silenciosa que cambia todo','No es dramática, pero es poderosa.','El punto de cambio rara vez es una mañana perfecta en la que desaparece todo el dolor.\n\nNormalmente es una decisión privada:\n\nPuede que me hayan dejado, pero yo no voy a seguir abandonándome.\n\nEsa frase cambia dónde colocas tu atención.\n\nCambia lo que toleras.\n\nCambia lo que haces después.','Mañana: por qué el dolor es una etapa y no una identidad.'],
    ['No estás destruido','Estás en medio de una reconstrucción.','Todavía pueden existir noches difíciles.\n\nAlgunos recuerdos pueden aparecer sin aviso.\n\nEso no significa que estés fracasando.\n\nSanar no es dejar de sentir. Es aumentar tu capacidad de sentir sin perder la dirección.\n\nEl dolor puede describir esta etapa. No tiene que nombrar el resto de tu vida.','Mañana recibirás una última invitación.'],
    ['Tu próximo capítulo puede comenzar hoy','El primer paso no necesita ser dramático.','Ya has visto la verdad central detrás de esta secuencia:\n\nSu decisión no determina tu valor.\n\nPero comprender esa idea es apenas el comienzo. También necesitas un proceso para reconstruir identidad, disciplina, claridad y dirección.\n\nEso es lo que organicé dentro del libro.\n\nPuedes continuar cargando todo solo o dar hoy el primer paso estructurado.','No esperes hasta dejar de sentir dolor. Comienza para que el dolor deje de controlar tu dirección.']
]
}

function getLeadTopic(language, emailNumber) {
  const lang = LEAD_TOPICS[language] ? language : 'pt'
  return LEAD_TOPICS[lang][emailNumber - 1] || LEAD_TOPICS[lang][0]
}


function retailerImageBlock(language, emailNumber = 1) {
  const root = 'https://www.gilberto-souza.com'
  const retailers = RETAILERS[language] || RETAILERS.en
  const number = Math.max(1, Number(emailNumber || 1))
  const spanish = language === 'es'

  const amazonBanner = spanish
    ? 'amazon-banner-es.png'
    : number % 2 === 0
      ? 'amazon-banner-paperback.png'
      : 'amazon-banner-en.png'

  const barnesBanner = spanish
    ? 'barnes-banner-es.png'
    : number % 2 === 0
      ? 'order-copy-banner-barnes.png'
      : 'barnes-banner-en.png'

  const amazonAlt = spanish
    ? 'Comprar el libro impreso en Amazon'
    : 'Buy the paperback on Amazon'

  const barnesAlt = spanish
    ? 'Comprar el libro impreso en Barnes & Noble'
    : 'Buy the paperback at Barnes & Noble'

  const barnesHeader = `
    <img
      src="${root}/email-assets/retailers/barnes-header.png"
      alt="Barnes & Noble — Now available"
      width="600"
      style="
        display:block;
        width:100%;
        max-width:600px;
        height:auto;
        margin:0 0 8px;
        padding:0;
        border:0;
        outline:none;
        text-decoration:none;
      "
    >
  `

  return `
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="
        width:100%;
        max-width:600px;
        margin:0 auto;
        border-collapse:collapse;
      "
    >
      <tr>
        <td style="padding:0 0 13px;">
          <a
            href="${retailers.amazon}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              display:block;
              width:100%;
              margin:0;
              padding:0;
              text-decoration:none;
            "
          >
            <img
              src="${root}/email-assets/retailers/${amazonBanner}"
              alt="${amazonAlt}"
              width="600"
              style="
                display:block;
                width:100%;
                max-width:600px;
                height:auto;
                margin:0;
                padding:0;
                border:0;
                outline:none;
                text-decoration:none;
              "
            >
          </a>
        </td>
      </tr>

      <tr>
        <td style="padding:0;">
          ${barnesHeader}

          <a
            href="${retailers.barnes}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              display:block;
              width:100%;
              margin:0;
              padding:0;
              text-decoration:none;
            "
          >
            <img
              src="${root}/email-assets/retailers/${barnesBanner}"
              alt="${barnesAlt}"
              width="600"
              style="
                display:block;
                width:100%;
                max-width:600px;
                height:auto;
                margin:0;
                padding:0;
                border:0;
                outline:none;
                text-decoration:none;
              "
            >
          </a>
        </td>
      </tr>
    </table>
  `
}


function retailerLegacyBlock(language, siteUrl) {
  const r = RETAILERS[language] || RETAILERS.pt

  const root = 'https://www.gilberto-souza.com'

  const cover =
    language === 'en'
      ? `${root}/books/en/book-front.png`
      : language === 'es'
        ? `${root}/books/es/book-front.jpg`
        : `${root}/books/pt/book-front.jpg`

  const copy = {
    pt: {
      title: 'Prefere o livro físico?',
      amazonEyebrow: 'COMPRA SEGURA NA AMAZON',
      amazonTitle: 'Compre a edição impressa na Amazon',
      amazonCta: 'VER NA AMAZON →',
      barnesEyebrow: 'LIVRARIA INTERNACIONAL',
      barnesTitle: 'Disponível também na Barnes & Noble',
      barnesCta: 'VER NA BARNES & NOBLE →'
    },

    en: {
      title: 'Prefer the printed edition?',
      amazonEyebrow: 'SHOP SECURELY ON AMAZON',
      amazonTitle: 'Buy the paperback directly from Amazon',
      amazonCta: 'VIEW ON AMAZON →',
      barnesEyebrow: 'TRUSTED BOOK RETAILER',
      barnesTitle: 'Also available at Barnes & Noble',
      barnesCta: 'VIEW AT BARNES & NOBLE →'
    },

    es: {
      title: '¿Prefieres la edición impresa?',
      amazonEyebrow: 'COMPRA SEGURA EN AMAZON',
      amazonTitle: 'Compra el libro impreso directamente en Amazon',
      amazonCta: 'VER EN AMAZON →',
      barnesEyebrow: 'LIBRERÍA INTERNACIONAL',
      barnesTitle: 'También disponible en Barnes & Noble',
      barnesCta: 'VER EN BARNES & NOBLE →'
    }
  }[language] || null

  const t = copy || {
    title: 'Prefer the printed edition?',
    amazonEyebrow: 'SHOP SECURELY ON AMAZON',
    amazonTitle: 'Buy the paperback directly from Amazon',
    amazonCta: 'VIEW ON AMAZON →',
    barnesEyebrow: 'TRUSTED BOOK RETAILER',
    barnesTitle: 'Also available at Barnes & Noble',
    barnesCta: 'VIEW AT BARNES & NOBLE →'
  }

  return `
    <div style="
      width:100%;
      margin:0;
      padding:0;
    ">

      <div style="
        font-family:Georgia,'Times New Roman',serif;
        font-size:19px;
        line-height:1.4;
        color:#17324D;
        text-align:center;
        margin:0 0 15px;
      ">
        ${t.title}
      </div>

      <!-- AMAZON -->
      <a
        href="${r.amazon}"
        target="_blank"
        rel="noopener noreferrer"
        style="
          display:block;
          width:100%;
          box-sizing:border-box;
          text-decoration:none;
          background:#232F3E;
          border:1px solid #192536;
          margin:0 0 12px;
        "
      >
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          class="retailer-table"
          style="width:100%;table-layout:fixed;"
        >
          <tr>
            <td
              width="86"
              class="retailer-cover-cell"
              style="
                width:86px;
                padding:11px 12px;
                vertical-align:middle;
                text-align:center;
              "
            >
              <img
                src="${cover}"
                alt=""
                width="48"
                style="
                  display:inline-block;
                  width:48px;
                  max-width:48px;
                  height:auto;
                  box-shadow:0 4px 10px rgba(0,0,0,.28);
                "
              >
            </td>

            <td
              class="retailer-copy-cell"
              style="
              padding:12px 7px;
              vertical-align:middle;
            ">
              <img
                src="${root}/retailer-logos/amazon.png"
                alt="Amazon"
                height="24"
                class="retailer-logo"
                style="
                  display:block;
                  height:24px;
                  width:auto;
                  max-width:110px;
                  margin:0 0 6px;
                "
              >

              <div style="
                font-family:Arial,Helvetica,sans-serif;
                font-size:9px;
                font-weight:700;
                letter-spacing:1.2px;
                color:#F7C65C;
                margin-bottom:4px;
              ">
                ${t.amazonEyebrow}
              </div>

              <div style="
                font-family:Georgia,'Times New Roman',serif;
                font-size:15px;
                line-height:1.35;
                color:#FFFFFF;
              ">
                ${t.amazonTitle}
              </div>
            </td>

            <td
              width="132"
              align="right"
              class="retailer-cta-cell"
              style="
                width:132px;
                padding:12px 16px 12px 8px;
                vertical-align:middle;
              "
            >
              <span
                class="retailer-cta"
                style="
                display:inline-block;
                font-family:Arial,Helvetica,sans-serif;
                font-size:10px;
                font-weight:800;
                letter-spacing:.4px;
                color:#F7C65C;
                white-space:nowrap;
              ">
                ${t.amazonCta}
              </span>
            </td>
          </tr>
        </table>
      </a>

      <!-- BARNES & NOBLE -->
      <a
        href="${r.barnes}"
        target="_blank"
        rel="noopener noreferrer"
        style="
          display:block;
          width:100%;
          box-sizing:border-box;
          text-decoration:none;
          background:#F4F0E8;
          border:1px solid #DED5C5;
          margin:0;
        "
      >
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          class="retailer-table"
          style="width:100%;table-layout:fixed;"
        >
          <tr>
            <td
              width="86"
              class="retailer-cover-cell"
              style="
                width:86px;
                padding:11px 12px;
                vertical-align:middle;
                text-align:center;
              "
            >
              <img
                src="${cover}"
                alt=""
                width="48"
                style="
                  display:inline-block;
                  width:48px;
                  max-width:48px;
                  height:auto;
                  box-shadow:0 4px 10px rgba(20,35,50,.18);
                "
              >
            </td>

            <td
              class="retailer-copy-cell"
              style="
              padding:12px 7px;
              vertical-align:middle;
            ">
              <img
                src="${root}/retailer-logos/barnes.png"
                alt="Barnes & Noble"
                height="28"
                class="retailer-logo"
                style="
                  display:block;
                  height:28px;
                  width:auto;
                  max-width:145px;
                  margin:0 0 5px;
                "
              >

              <div style="
                font-family:Arial,Helvetica,sans-serif;
                font-size:9px;
                font-weight:700;
                letter-spacing:1.2px;
                color:#967230;
                margin-bottom:4px;
              ">
                ${t.barnesEyebrow}
              </div>

              <div style="
                font-family:Georgia,'Times New Roman',serif;
                font-size:15px;
                line-height:1.35;
                color:#17324D;
              ">
                ${t.barnesTitle}
              </div>
            </td>

            <td
              width="158"
              align="right"
              class="retailer-cta-cell"
              style="
                width:158px;
                padding:12px 16px 12px 8px;
                vertical-align:middle;
              "
            >
              <span
                class="retailer-cta"
                style="
                display:inline-block;
                font-family:Arial,Helvetica,sans-serif;
                font-size:10px;
                font-weight:800;
                letter-spacing:.35px;
                color:#17324D;
                white-space:nowrap;
              ">
                ${t.barnesCta}
              </span>
            </td>
          </tr>
        </table>
      </a>
    </div>
  `
}


function retailerBlock(language, siteUrl, emailNumber = 1) {
  if (language === 'en' || language === 'es') {
    return retailerImageBlock(language, emailNumber)
  }

  return retailerLegacyBlock(language, siteUrl)
}


export function getLeadEmailSubject({ language = 'pt', emailNumber = 1 }) {
  const lang = LEAD_TOPICS[language] ? language : 'pt'
  return getLeadTopic(lang, emailNumber)[0]
}


export function getLeadEmailHtml({ language = 'pt', name = '', emailNumber = 1, email = '' }) {
  const lang = LEAD_TOPICS[language] ? language : 'pt'
  const topic = getLeadTopic(lang, emailNumber)
  const rootUrl = baseUrl()
  const buyUrl = `${rootUrl}${lang === 'pt' ? '' : `/${lang}`}#buy`

  return renderSequenceEmail({
    kind: 'lead',
    language: lang,
    name,
    emailNumber,
    email,
    topic,
    baseUrl: rootUrl,
    buyUrl,
    unsubscribeHref: unsubscribeUrl(email, lang),
    retailerHtml: retailerBlock(lang, buyUrl, emailNumber)
  })
}


const CUSTOMER_TOPICS = {
  pt: [
    ['Seu acesso está pronto — comece por aqui','Obrigado pela sua compra','Seu eBook + Audiobook já está disponível. Comece pelo primeiro capítulo e escute com calma. Esse processo não precisa ser apressado. O importante é você começar.'],
    ['Como aproveitar melhor o livro e o audiobook','Um passo por vez','Separe um momento do dia para ouvir o audiobook sem distrações. Anote as frases que mais mexerem com você. A reconstrução acontece quando você transforma leitura em prática.'],
    ['Continue acompanhando o Gilberto','Siga essa reconstrução de perto','Continue recebendo reflexões, frases e conteúdos práticos no Instagram oficial do Gilberto. Isso vai ajudar você a manter a mente focada na sua recuperação.']
  ],
  en: [
    ['Your access is ready — start here','Thank you for your purchase','Your eBook + Audiobook is now available. Start with the first chapter and listen slowly. This process does not need to be rushed. What matters is that you begin.'],
    ['How to get the most from the book and audiobook','One step at a time','Choose a quiet moment to listen without distractions. Write down the lines that hit you the hardest. Rebuilding begins when reading becomes practice.'],
    ['Keep following Gilberto','Stay close to the rebuilding process','Follow Gilberto’s official Instagram for reflections, quotes, and practical content that will help you stay focused on recovery.']
  ],
  es: [
    ['Tu acceso está listo — empieza aquí','Gracias por tu compra','Tu eBook + Audiolibro ya está disponible. Empieza por el primer capítulo y escucha con calma. Este proceso no necesita ser apresurado. Lo importante es empezar.'],
    ['Cómo aprovechar mejor el libro y el audiolibro','Un paso a la vez','Elige un momento tranquilo para escuchar sin distracciones. Anota las frases que más te impacten. La reconstrucción comienza cuando la lectura se convierte en práctica.'],
    ['Sigue acompañando a Gilberto','Mantente cerca de esta reconstrucción','Sigue el Instagram oficial de Gilberto para recibir reflexiones, frases y contenido práctico que te ayudará a mantener el foco en tu recuperación.']
  ]
}

function getCustomerTopic(language, emailNumber) {
  const lang = CUSTOMER_TOPICS[language] ? language : 'pt'
  return CUSTOMER_TOPICS[lang][emailNumber - 1] || CUSTOMER_TOPICS[lang][0]
}

export function getCustomerEmailSubject({ language = 'pt', emailNumber = 1 }) {
  return getCustomerTopic(language, emailNumber)[0]
}


export function getCustomerEmailHtml({ language = 'pt', name = '', emailNumber = 1, email = '' }) {
  const lang = CUSTOMER_TOPICS[language] ? language : 'pt'
  const topic = getCustomerTopic(lang, emailNumber)
  const rootUrl = baseUrl()
  const buyUrl = `${rootUrl}${lang === 'pt' ? '' : `/${lang}`}#buy`

  return renderSequenceEmail({
    kind: 'customer',
    language: lang,
    name,
    emailNumber,
    email,
    topic,
    baseUrl: rootUrl,
    buyUrl,
    unsubscribeHref: unsubscribeUrl(email, lang),
    instagramUrl:
      lang === 'pt'
        ? 'https://www.instagram.com/gilberto_souza_autor/'
        : 'https://www.instagram.com/gilberto.rebuild/'
  })
}


const CHECKOUT_TOPICS = {
  pt: [
    ['Seu acesso ainda está esperando por você','Você chegou muito perto de começar','Você já deu o passo mais difícil: parou, olhou para essa dor e considerou fazer algo por você. Talvez tenha fechado a página por dúvida, pressa ou medo. Mas sua reconstrução ainda pode começar hoje.'],
    ['Você chegou perto de começar','O quase também revela desejo','Quando alguém chega até o checkout, isso mostra uma coisa: existe uma parte de você cansada de continuar carregando tudo sozinho. Não ignore esse sinal.'],
    ['Ainda pensando?','A dúvida também fala','Talvez você esteja pensando se o livro realmente pode ajudar. A verdade é simples: ele não promete apagar o passado, mas pode ajudar você a atravessar essa fase com mais clareza.'],
    ['O custo de continuar parado','Adiar também tem preço','Às vezes parece mais fácil deixar para depois. Mas cada dia preso à mesma dor cobra energia, sono, foco e paz. A pergunta é: quanto custa continuar do mesmo jeito?'],
    ['Quanto tempo você vai carregar isso?','A dor não precisa virar identidade','Existe uma diferença entre sentir dor e morar dentro dela. Você não precisa transformar uma perda em uma sentença sobre o resto da sua vida.'],
    ['O que acontece quando você adia','O tempo sozinho nem sempre cura','Muita gente diz que o tempo cura tudo. Mas tempo sem direção pode apenas prolongar a confusão. Cura exige decisão, clareza e movimento.'],
    ['Uma mensagem pessoal para você','Eu sei como esse silêncio pesa','Se você está lendo isso, talvez ainda exista uma parte sua procurando força. Eu escrevi este livro para homens que não conseguem explicar em voz alta o que estão sentindo.'],
    ['Talvez este seja o momento certo','Nem todo recomeço parece grande','Às vezes o recomeço não começa com uma grande mudança. Começa com uma pequena decisão: hoje eu vou parar de me abandonar.'],
    ['Você merece paz','Paz não é fraqueza','Você não precisa continuar em guerra com lembranças, perguntas e comparações. Paz não significa que nada doeu. Significa que a dor não manda mais em você.'],
    ['Não espere mais um ano','O tempo vai passar de qualquer forma','Daqui a alguns meses, sua vida pode estar exatamente igual — ou você pode ter começado a reconstruí-la. O tempo vai passar. A decisão é o que muda o resultado.'],
    ['O livro que eu gostaria de ter lido antes','Eu escrevi o que precisei ouvir','Este livro nasceu de uma dor real. Não foi escrito de fora. Foi escrito por alguém que também precisou aprender a se levantar depois de ser quebrado por dentro.'],
    ['Uma pergunta importante','E se você pudesse atravessar isso diferente?','E se, em vez de apenas tentar esquecer, você pudesse entender o que essa dor está tentando revelar sobre seus limites, sua autoestima e sua reconstrução?'],
    ['Seu próximo capítulo começa aqui','O passado não precisa escrever o final','O que aconteceu faz parte da sua história, mas não precisa ser o título da sua vida inteira. Existe um próximo capítulo esperando por uma decisão sua.'],
    ['Uma última reflexão','Talvez você não precise de mais tempo','Talvez você não precise esperar se sentir pronto. Talvez o primeiro passo seja justamente o que vai ajudar você a se sentir pronto.'],
    ['Último convite','Comece antes que a dor vire rotina','Este é meu convite final nesta sequência: não normalize viver preso ao que acabou. Se o livro puder ser uma luz neste momento, permita-se começar.']
  ],
  en: [
    ['Your access is still waiting for you','You were very close to starting','You already took the hardest step: you stopped, looked at the pain, and considered doing something for yourself. Maybe you closed the page out of doubt or fear. But rebuilding can still begin today.'],
    ['You were one step away','Almost buying says something','When someone reaches checkout, it means part of them is tired of carrying everything alone. Do not ignore that signal.'],
    ['Still thinking about it?','Doubt is also a message','Maybe you wonder if the book can really help. It will not erase the past, but it can help you move through this season with more clarity.'],
    ['The cost of staying stuck','Postponing also has a price','It may feel easier to leave it for later. But every day stuck in the same pain costs energy, sleep, focus, and peace.'],
    ['How long will you carry this pain?','Pain does not have to become identity','There is a difference between feeling pain and living inside it. You do not have to turn a loss into a sentence over your future.'],
    ['What happens when you postpone healing','Time alone does not always heal','People say time heals everything. But time without direction can simply extend confusion. Healing requires decision, clarity, and movement.'],
    ['A personal message for you','I know how heavy the silence feels','If you are reading this, maybe a part of you is still looking for strength. I wrote this book for men who cannot explain out loud what they feel.'],
    ['Maybe this is the right moment','Not every restart looks dramatic','Sometimes rebuilding starts with one quiet decision: today I will stop abandoning myself.'],
    ['You deserve peace','Peace is not weakness','You do not have to keep fighting memories, questions, and comparisons. Peace means the pain no longer controls you.'],
    ['Do not lose another year','Time will pass anyway','A few months from now, your life may look the same — or you may have started rebuilding it. Time will pass. Your decision changes the result.'],
    ['The book I wish I had earlier','I wrote what I needed to hear','This book came from real pain. It was not written from the outside. It was written by someone who had to learn how to stand again.'],
    ['One important question','What if you could go through this differently?','What if instead of trying to forget, you could understand what this pain is revealing about your boundaries, self-worth, and rebuilding?'],
    ['Your next chapter starts here','The past does not have to write the ending','What happened is part of your story, but it does not have to be the title of your entire life.'],
    ['A final reflection','Maybe you do not need more time','Maybe you do not need to wait until you feel ready. Maybe the first step is what helps you become ready.'],
    ['Last invitation','Start before pain becomes routine','This is my final invitation in this sequence: do not normalize living trapped in what ended. If this book can be a light right now, allow yourself to begin.']
  ],
  es: [
    ['Tu acceso todavía te está esperando','Estuviste muy cerca de empezar','Ya diste el paso más difícil: te detuviste, miraste este dolor y consideraste hacer algo por ti. Tal vez cerraste la página por duda o miedo. Pero tu reconstrucción todavía puede comenzar hoy.'],
    ['Estuviste a un paso','Casi comprar también dice algo','Cuando alguien llega al checkout, eso muestra que una parte de él está cansada de cargar todo solo. No ignores esa señal.'],
    ['¿Todavía lo estás pensando?','La duda también habla','Tal vez te preguntas si el libro realmente puede ayudarte. No promete borrar el pasado, pero puede ayudarte a atravesar esta etapa con más claridad.'],
    ['El costo de quedarse atrapado','Postergar también tiene precio','A veces parece más fácil dejarlo para después. Pero cada día atrapado en el mismo dolor cobra energía, sueño, enfoque y paz.'],
    ['¿Cuánto tiempo más cargarás este dolor?','El dolor no tiene que convertirse en identidad','Hay una diferencia entre sentir dolor y vivir dentro de él. No necesitas convertir una pérdida en una sentencia sobre tu futuro.'],
    ['Qué ocurre cuando pospones tu recuperación','El tiempo solo no siempre cura','Muchos dicen que el tiempo cura todo. Pero el tiempo sin dirección solo puede alargar la confusión. Sanar exige decisión, claridad y movimiento.'],
    ['Un mensaje personal para ti','Sé cuánto pesa este silencio','Si estás leyendo esto, tal vez una parte de ti todavía busca fuerza. Escribí este libro para hombres que no logran explicar en voz alta lo que sienten.'],
    ['Tal vez este sea el momento correcto','No todo reinicio parece grande','A veces la reconstrucción empieza con una decisión silenciosa: hoy voy a dejar de abandonarme.'],
    ['Mereces paz','La paz no es debilidad','No necesitas seguir peleando con recuerdos, preguntas y comparaciones. Paz significa que el dolor ya no manda sobre ti.'],
    ['No pierdas otro año','El tiempo pasará de todos modos','Dentro de unos meses tu vida puede estar igual — o puedes haber comenzado a reconstruirla. El tiempo pasará. Tu decisión cambia el resultado.'],
    ['El libro que me hubiera gustado leer antes','Escribí lo que necesitaba escuchar','Este libro nació de un dolor real. No fue escrito desde afuera. Fue escrito por alguien que también tuvo que aprender a levantarse.'],
    ['Una pregunta importante','¿Y si pudieras atravesar esto de otra manera?','¿Y si en lugar de solo intentar olvidar, pudieras entender lo que este dolor revela sobre tus límites, tu autoestima y tu reconstrucción?'],
    ['Tu próximo capítulo comienza aquí','El pasado no tiene que escribir el final','Lo que ocurrió es parte de tu historia, pero no tiene que ser el título de toda tu vida.'],
    ['Una última reflexión','Tal vez no necesitas más tiempo','Tal vez no necesitas esperar a sentirte listo. Tal vez el primer paso es justamente lo que te ayudará a estar listo.'],
    ['Última invitación','Empieza antes de que el dolor se vuelva rutina','Esta es mi última invitación en esta secuencia: no normalices vivir atrapado en lo que terminó. Si este libro puede ser una luz ahora, permítete empezar.']
  ]
}

function getCheckoutTopic(language, emailNumber) {
  const lang = CHECKOUT_TOPICS[language] ? language : 'pt'
  return CHECKOUT_TOPICS[lang][emailNumber - 1] || CHECKOUT_TOPICS[lang][0]
}


export function getCheckoutEmailSubject({
  language = 'pt',
  emailNumber = 1
}) {
  const lang = CHECKOUT_TOPICS[language] ? language : 'pt'
  return getCheckoutTopic(lang, emailNumber)[0]
}


export function getCheckoutEmailHtml({ language = 'pt', name = '', emailNumber = 1, email = '' }) {
  const lang = CHECKOUT_TOPICS[language] ? language : 'pt'
  const topic = getCheckoutTopic(lang, emailNumber)
  const rootUrl = baseUrl()
  const buyUrl = `${rootUrl}${lang === 'pt' ? '' : `/${lang}`}#buy`

  return renderSequenceEmail({
    kind: 'checkout',
    language: lang,
    name,
    emailNumber,
    email,
    topic,
    baseUrl: rootUrl,
    buyUrl,
    unsubscribeHref: unsubscribeUrl(email, lang),
    retailerHtml: retailerBlock(lang, buyUrl, emailNumber)
  })
}


const MANUAL_TOPICS = {
  pt: [
    ['Como ouvir sua esposa de verdade','Ouvir não é esperar sua vez de responder','Muitos homens acham que estão ouvindo, mas na verdade estão preparando defesa. Ouvir de verdade é tentar entender antes de tentar vencer.'],
    ['O erro mais comum dos maridos','Presença não é apenas estar em casa','Estar fisicamente perto não significa estar emocionalmente presente. Sua esposa percebe quando você está ali, mas sua mente está longe.'],
    ['O que faz uma mulher se sentir amada','Amor também é atenção aos detalhes','Muitas vezes, o que mais toca uma mulher não é algo grande. É perceber que você prestou atenção, lembrou e se importou.'],
    ['Como evitar discussões desnecessárias','Nem toda conversa precisa virar disputa','Uma discussão cresce quando os dois tentam vencer. Um casamento melhora quando pelo menos um decide proteger a relação antes do orgulho.'],
    ['A importância da presença','Sua atenção comunica valor','Quando você entrega atenção real, sua esposa sente que ainda importa. Pequenos momentos de presença podem curar grandes distâncias emocionais.'],
    ['O poder das pequenas atitudes','O casamento não se perde de uma vez','Ele se enfraquece em pequenas ausências, pequenos descuidos e pequenas friezas. Mas também pode ser reconstruído com pequenas atitudes repetidas.'],
    ['Quando o orgulho atrapalha','Pedir desculpas não diminui você','Muitos homens confundem humildade com fraqueza. Mas saber reconhecer um erro é uma das formas mais fortes de liderança emocional.'],
    ['Como reconstruir confiança','Confiança volta com consistência','Não adianta prometer mudança uma vez e desaparecer depois. Confiança volta quando suas atitudes começam a repetir aquilo que suas palavras dizem.'],
    ['Comunicação masculina','Falar menos não significa comunicar melhor','O silêncio pode parecer proteção, mas muitas vezes vira distância. Um homem maduro aprende a falar sem ferir e ouvir sem fugir.'],
    ['Liderança dentro do casamento','Liderar não é controlar','Liderança saudável é criar segurança, direção e respeito. Não é mandar. Não é dominar. É servir com firmeza e responsabilidade.'],
    ['O que sua esposa realmente precisa','Ela talvez não queira perfeição','Muitas vezes sua esposa não precisa de um homem perfeito. Ela precisa de um homem presente, honesto, respeitoso e disposto a crescer.'],
    ['Como criar conexão novamente','Conexão volta com intenção','A conexão não volta por acidente. Ela volta quando você decide conversar melhor, observar mais, reagir menos e amar com atitudes concretas.'],
    ['O marido que ela merece','Você também pode se tornar melhor','Ser um bom marido não é nascer pronto. É aprender, corrigir, crescer e escolher todos os dias não repetir velhos padrões.'],
    ['Amor é decisão','Sentimento muda, decisão sustenta','Todo relacionamento passa por fases difíceis. O amor maduro não depende apenas de emoção. Ele também depende de escolha, postura e compromisso.'],
    ['Construindo um casamento forte','Uma relação forte é construída no cotidiano','Casamento forte não nasce de grandes discursos. Nasce da forma como você trata, responde, respeita e cuida todos os dias.']
  ],
  en: [
    ['Why knowing the truth is not always enough','Information does not automatically create transformation.','You may already understand that her decision does not define your worth.\n\nBut understanding and living are different things.\n\nReal change begins when the new belief enters your daily decisions: what you check, what you tolerate, what you repeat, and what you stop doing.','Tomorrow: the first objection men use to delay rebuilding.'],
    ['I do not have time to deal with this right now','Avoidance often disguises itself as responsibility.','You may be busy with work, family, bills, and obligations.\n\nBut unresolved pain does not wait quietly. It affects sleep, focus, patience, confidence, and future relationships.\n\nRebuilding does not require abandoning your responsibilities. It requires stopping the pain from silently controlling them.','Next: what to do when you believe nothing can really help.'],
    ['What if nothing changes?','That fear is understandable, but it can become an excuse.','You may have tried distraction, silence, dating again, working harder, or pretending it no longer matters.\n\nThose approaches often fail because they manage symptoms without rebuilding identity.\n\nA structured process is different from simply waiting to feel better.','Tomorrow: why strong men still need direction.'],
    ['Strong men do not ask for help—right?','That belief has trapped many men for years.','Strength is not the ability to suffer indefinitely without speaking.\n\nStrength is the ability to face what is happening, accept responsibility for the next step, and choose tools that move you forward.\n\nSilence can look strong while quietly destroying clarity.','Next: the private cost of pretending you are fine.'],
    ['The cost of saying I am fine','People may believe you. Your body often does not.','You can smile, work, joke, and still carry tension into every quiet moment.\n\nPretending protects your image, but it does not rebuild your inner life.\n\nYou do not have to announce your pain to everyone. But you do need to stop lying to yourself about its cost.','Tomorrow: why a new relationship is not always a new beginning.'],
    ['A new relationship will not automatically heal the old wound','Unhealed beliefs travel with you.','You can meet someone new and still compare, fear abandonment, seek constant reassurance, or react to wounds created by someone else.\n\nMoving on is not the same as rebuilding.\n\nA healthy next chapter requires more than a new person. It requires a stronger version of you.','Next: the mistake of trying to make her regret losing you.'],
    ['Trying to make her regret it keeps her in control','Your success becomes another message directed at her.','You train so she notices.\n\nYou post so she reacts.\n\nYou improve so she questions her choice.\n\nThat may feel like motivation, but it still places her at the center.\n\nThe real victory is building a life that no longer requires her attention.','Tomorrow: the difference between distraction and recovery.'],
    ['Distraction is not the same as recovery','Feeling nothing for a few hours is not the same as healing.','Entertainment, work, alcohol, travel, or a new relationship can temporarily quiet the mind.\n\nBut what returns in silence still needs to be faced.\n\nRecovery gives you the ability to be alone without being consumed.','Next: the question to ask instead of Why did she do this?'],
    ['Ask this instead of Why did she do this?','A better question creates a better direction.','Instead of asking why she chose what she chose, ask:\n\nWhat do I need to rebuild so this experience does not define my future?\n\nThat question returns power to you because it focuses on decisions you can actually make.','Tomorrow: how to know whether you are progressing.'],
    ['Three signs that you are rebuilding','Progress is often quieter than people expect.','You are progressing when you check less, compare less, and keep more promises to yourself.\n\nYou are progressing when memories still hurt but no longer decide your entire day.\n\nYou are progressing when your future begins to feel larger than your past.','Next: why one bad day does not erase your progress.'],
    ['One difficult day does not mean you are back at the beginning','Recovery is not a straight line.','A memory, date, song, or unexpected message can reopen emotion.\n\nThat does not erase the work you have done.\n\nThe goal is not to become incapable of feeling. The goal is to stop losing yourself whenever emotion appears.','Tomorrow: the discipline that protects emotional recovery.'],
    ['Emotional recovery needs boundaries','What you repeatedly allow will repeatedly affect you.','Boundaries may mean muting an account, ending unnecessary conversations, refusing late-night checking, or declining information from mutual friends.\n\nA boundary is not revenge.\n\nIt is a structure that protects the direction you have chosen.','Next: why your future deserves more attention than her present.'],
    ['Your future needs your attention now','Every hour spent studying her life is taken from your own.','There is a version of your life that cannot be built while your attention remains trapped in the past.\n\nYour health, work, faith, relationships, and purpose need the energy you have been giving to unanswered questions.','Tomorrow: what the book was designed to help you do.'],
    ['This is not a book about getting her back','It is a book about getting yourself back.','The goal is not manipulation, revenge, or appearing unaffected.\n\nThe goal is clarity, emotional discipline, self-respect, and a future no longer controlled by rejection.\n\nThat is the process organized inside the book.','Tomorrow, I will send one final message about your decision.'],
    ['You already know what continuing like this costs','The remaining question is what you will choose next.','You do not need another year of repeating the same questions.\n\nYou need a direction strong enough to interrupt the cycle.\n\nThe book cannot make the decision for you. But it can guide the decision once you make it.','Start before the pain becomes the most familiar part of your life.']
],
  es: [
    ['Saber la verdad no siempre es suficiente','La información no crea transformación automáticamente.','Tal vez ya entiendes que su decisión no define tu valor.\n\nPero comprender algo y vivirlo son cosas diferentes.\n\nEl cambio real comienza cuando la nueva creencia entra en tus decisiones diarias: lo que revisas, lo que toleras, lo que repites y lo que decides dejar.','Mañana: la primera objeción que muchos hombres usan para retrasar su reconstrucción.'],
    ['Ahora no tengo tiempo para enfrentar esto','La evasión muchas veces se disfraza de responsabilidad.','Tal vez estás ocupado con trabajo, familia, cuentas y obligaciones.\n\nPero el dolor no resuelto no espera en silencio. Afecta el sueño, el enfoque, la paciencia, la confianza y las relaciones futuras.\n\nReconstruirte no exige abandonar tus responsabilidades. Exige impedir que el dolor las controle en secreto.','Después: qué hacer cuando piensas que nada puede ayudarte.'],
    ['¿Y si nada cambia?','Ese miedo es comprensible, pero puede convertirse en excusa.','Tal vez intentaste distraerte, guardar silencio, conocer a otra persona, trabajar más o fingir que ya no importa.\n\nEsos caminos suelen fallar porque administran síntomas sin reconstruir la identidad.\n\nUn proceso estructurado es diferente de simplemente esperar sentirte mejor.','Mañana: por qué los hombres fuertes también necesitan dirección.'],
    ['Los hombres fuertes no piden ayuda, ¿verdad?','Esa creencia ha atrapado a muchos durante años.','La fuerza no consiste en sufrir indefinidamente sin hablar.\n\nConsiste en enfrentar lo que ocurre, asumir responsabilidad por el próximo paso y elegir herramientas que te hagan avanzar.\n\nEl silencio puede parecer fuerte mientras destruye lentamente la claridad.','Después: el costo privado de fingir que estás bien.'],
    ['El costo de decir estoy bien','La gente puede creerte. Tu cuerpo muchas veces no.','Puedes sonreír, trabajar, bromear y aun así llevar tensión a cada momento de silencio.\n\nFingir protege tu imagen, pero no reconstruye tu vida interior.\n\nNo tienes que contarle tu dolor a todo el mundo. Pero debes dejar de mentirte sobre su costo.','Mañana: por qué una nueva relación no siempre es un nuevo comienzo.'],
    ['Una nueva relación no sana automáticamente la herida anterior','Las creencias no sanadas viajan contigo.','Puedes conocer a alguien nuevo y aun así comparar, temer el abandono, buscar confirmación constante o reaccionar a heridas causadas por otra persona.\n\nSeguir adelante no es lo mismo que reconstruirte.\n\nUn próximo capítulo saludable necesita más que una persona nueva. Necesita una versión más fuerte de ti.','Después: el error de intentar hacer que ella se arrepienta.'],
    ['Intentar que se arrepienta mantiene su control','Tu éxito se convierte en otro mensaje dirigido a ella.','Entrenas para que lo note.\n\nPublicas para que reaccione.\n\nMejoras para que cuestione su decisión.\n\nEso puede parecer motivación, pero todavía la coloca en el centro.\n\nLa verdadera victoria es construir una vida que ya no necesite su atención.','Mañana: la diferencia entre distracción y recuperación.'],
    ['Distraerte no es lo mismo que recuperarte','No sentir durante unas horas no significa sanar.','El entretenimiento, el trabajo, el alcohol, los viajes o una nueva relación pueden silenciar temporalmente la mente.\n\nPero lo que vuelve en el silencio todavía necesita ser enfrentado.\n\nRecuperarte significa poder estar solo sin ser consumido.','Después: la pregunta que debes hacer en lugar de ¿por qué hizo esto?'],
    ['Pregunta esto en lugar de ¿por qué lo hizo?','Una pregunta mejor crea una dirección mejor.','En lugar de preguntar por qué ella eligió lo que eligió, pregunta:\n\n¿Qué necesito reconstruir para que esta experiencia no defina mi futuro?\n\nEsa pregunta te devuelve poder porque se concentra en decisiones que realmente puedes tomar.','Mañana: cómo saber si estás avanzando.'],
    ['Tres señales de que te estás reconstruyendo','El progreso suele ser más silencioso de lo que imaginas.','Estás avanzando cuando revisas menos, comparas menos y cumples más promesas hechas a ti mismo.\n\nEstás avanzando cuando los recuerdos todavía duelen, pero ya no deciden todo tu día.\n\nEstás avanzando cuando tu futuro comienza a sentirse más grande que tu pasado.','Después: por qué un día difícil no elimina tu progreso.'],
    ['Un día difícil no significa que volviste al comienzo','La recuperación no es una línea recta.','Un recuerdo, una fecha, una canción o un mensaje inesperado puede despertar emociones.\n\nEso no borra el trabajo que ya hiciste.\n\nEl objetivo no es dejar de sentir. Es dejar de perderte cada vez que aparece una emoción.','Mañana: la disciplina que protege la recuperación emocional.'],
    ['La recuperación emocional necesita límites','Lo que permites repetidamente te afecta repetidamente.','Los límites pueden significar silenciar una cuenta, terminar conversaciones innecesarias, dejar de revisar de madrugada o rechazar información de amigos en común.\n\nUn límite no es venganza.\n\nEs una estructura que protege la dirección que elegiste.','Después: por qué tu futuro merece más atención que su presente.'],
    ['Tu futuro necesita tu atención ahora','Cada hora dedicada a estudiar su vida se la quitas a la tuya.','Existe una versión de tu vida que no puede construirse mientras tu atención permanece atrapada en el pasado.\n\nTu salud, trabajo, fe, relaciones y propósito necesitan la energía que entregaste a preguntas sin respuesta.','Mañana: lo que el libro fue diseñado para ayudarte a hacer.'],
    ['Este no es un libro para recuperarla','Es un libro para recuperarte a ti.','El objetivo no es manipular, vengarte ni aparentar que nada te afectó.\n\nEl objetivo es claridad, disciplina emocional, respeto propio y un futuro que ya no sea controlado por el rechazo.\n\nEse es el proceso organizado dentro del libro.','Mañana recibirás un último mensaje sobre tu decisión.'],
    ['Ya sabes cuánto cuesta continuar así','La pregunta restante es qué elegirás ahora.','No necesitas otro año repitiendo las mismas preguntas.\n\nNecesitas una dirección suficientemente fuerte para interrumpir el ciclo.\n\nEl libro no puede decidir por ti. Pero puede guiarte después de tomar la decisión.','Comienza antes de que el dolor se convierta en la parte más familiar de tu vida.']
]
}

function getManualTopic(language, emailNumber) {
  const lang = MANUAL_TOPICS[language] ? language : 'pt'
  return MANUAL_TOPICS[lang][emailNumber - 1] || MANUAL_TOPICS[lang][0]
}


export function getManualEmailSubject({ language = 'pt', emailNumber = 1 }) {
  const lang = MANUAL_TOPICS[language] ? language : 'pt'
  return getManualTopic(lang, emailNumber)[0]
}


export function getManualEmailHtml({ language = 'pt', name = '', emailNumber = 1, email = '' }) {
  const lang = MANUAL_TOPICS[language] ? language : 'pt'
  const topic = getManualTopic(lang, emailNumber)
  const rootUrl = baseUrl()
  const buyUrl = `${rootUrl}${lang === 'pt' ? '' : `/${lang}`}#buy`

  return renderSequenceEmail({
    kind: 'manual',
    language: lang,
    name,
    emailNumber,
    email,
    topic,
    baseUrl: rootUrl,
    buyUrl,
    unsubscribeHref: unsubscribeUrl(email, lang),
    retailerHtml: retailerBlock(lang, buyUrl, emailNumber)
  })
}
