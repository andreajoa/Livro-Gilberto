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
    ['You do not have to carry this pain alone','The pain nobody sees','You may look strong on the outside while still trying to understand what happened inside. This is a reminder: you do not have to walk through this without direction.'],
    ['The mistake that keeps many men stuck in the past','The question that traps your mind','When you keep trying to understand why she chose another path, your life stays frozen in the same place. Healing begins when you stop orbiting her decision.'],
    ['A different way to start again','Starting again is not forgetting','Starting again means recovering clarity, self-respect, and direction. You do not need to erase the past; you need to stop letting it control your future.'],
    ['The day you stop waiting for answers','Not every answer sets you free','Sometimes the answer you are waiting for never comes. And even if it did, it might not heal you. What heals is choosing yourself again.'],
    ['Why being replaced hurts so deeply','It is not just missing her','Being replaced wounds identity, pride, memory, and the future you imagined. That is why it hurts so much. But pain can become reconstruction.'],
    ['How to stop comparing yourself to someone else','The other man does not define you','Comparing your life to his only deepens the wound. You do not need to win a comparison; you need to rebuild your own strength.'],
    ['The danger of watching the past','Social media can become a prison','Every visit to her profile can reopen the wound. Sometimes peace begins with distance, silence, and emotional discipline.'],
    ['Hope can also become a prison','Waiting can stop you from living','Hope without reality can keep a man stuck for months or years. There is a difference between faith and attachment to what is already over.'],
    ['What rejection tries to do to you','Rejection lies','It tries to make you believe you lost value. But your value did not decrease because someone stopped seeing it.'],
    ['How to rebuild your self-worth slowly','Rebuilding starts small','It is not one big speech that changes everything. It is small repeated actions: sleeping better, caring for your body, organizing your mind, and refusing to beg for love.'],
    ['You can still rebuild your life','The end does not have to be the end of you','What ended was a relationship. Not your ability to love, live, grow, and be respected again.'],
    ['What changes when you come back to yourself','Coming back to yourself is power','When you stop living to prove something to her, your energy returns. And with it, your dignity.'],
    ['A quiet decision that changes everything','The decision not to abandon yourself','The turning point happens when you decide: I may have been left, but I will not abandon myself.'],
    ['You were not destroyed, you are being rebuilt','There is life after this','Maybe it still hurts today. But pain is not destiny. It is a season. And seasons can be crossed with direction.'],
    ['An invitation to start today','Take the first step','If you made it this far, maybe you are ready to stop surviving the past and start rebuilding your life with clarity.']
  ],
  es: [
    ['No tienes que cargar este dolor solo','El dolor que nadie ve','Tal vez pareces fuerte por fuera, pero por dentro sigues intentando entender qué pasó. Este correo es un recordatorio: no tienes que atravesar esto sin dirección.'],
    ['El error que mantiene a muchos hombres atrapados en el pasado','La pregunta que atrapa tu mente','Cuando vives intentando entender por qué ella eligió otro camino, tu vida queda detenida en el mismo lugar. La sanación empieza cuando dejas de girar alrededor de su decisión.'],
    ['Una forma diferente de empezar de nuevo','Empezar de nuevo no es olvidar','Empezar de nuevo es recuperar claridad, respeto propio y dirección. No necesitas borrar el pasado; necesitas impedir que siga controlando tu futuro.'],
    ['El día en que dejas de esperar respuestas','No toda respuesta libera','A veces la respuesta que esperas nunca llega. Y aunque llegara, tal vez no sanaría. Lo que sana es volver a elegirte.'],
    ['Por qué ser reemplazado duele tanto','No es solo extrañarla','Ser reemplazado hiere identidad, orgullo, memoria y el futuro que imaginaste. Por eso duele tanto. Pero ese dolor puede convertirse en reconstrucción.'],
    ['Cómo dejar de compararte con otra persona','El otro hombre no define tu valor','Comparar tu vida con la de él solo profundiza la herida. No necesitas ganar una comparación; necesitas reconstruir tu propia fuerza.'],
    ['El peligro de vigilar el pasado','Las redes sociales pueden ser una prisión','Cada visita a su perfil puede abrir la herida otra vez. A veces la paz comienza con distancia, silencio y disciplina emocional.'],
    ['La esperanza también puede convertirse en prisión','Esperar puede impedirte vivir','La esperanza sin realidad puede mantener a un hombre atrapado durante meses o años. Hay una diferencia entre fe y apego a lo que ya terminó.'],
    ['Lo que el rechazo intenta hacer contigo','El rechazo miente','Intenta hacerte creer que perdiste valor. Pero tu valor no disminuyó porque alguien dejó de verlo.'],
    ['Cómo reconstruir tu autoestima poco a poco','La reconstrucción empieza pequeña','No es un gran discurso lo que cambia todo. Son pequeñas acciones repetidas: dormir mejor, cuidar tu cuerpo, ordenar tu mente y dejar de rogar amor.'],
    ['Todavía puedes reconstruir tu vida','El final no tiene que ser tu final','Lo que terminó fue una relación. No tu capacidad de amar, vivir, crecer y volver a ser respetado.'],
    ['Lo que cambia cuando vuelves a ti mismo','Volver a ti es poder','Cuando dejas de vivir para demostrarle algo a ella, tu energía vuelve. Y con ella, tu dignidad.'],
    ['Una decisión silenciosa que cambia todo','La decisión de no abandonarte','El punto de cambio llega cuando decides: puede que me hayan dejado, pero yo no voy a abandonarme.'],
    ['No fuiste destruido, estás en reconstrucción','Hay vida después de esto','Tal vez hoy todavía duele. Pero el dolor no es destino. Es una etapa. Y las etapas se atraviesan con dirección.'],
    ['Una invitación para empezar hoy','Da el primer paso','Si llegaste hasta aquí, tal vez estás listo para dejar de sobrevivir al pasado y comenzar a reconstruir tu vida con claridad.']
  ]
}

function getLeadTopic(language, emailNumber) {
  const lang = LEAD_TOPICS[language] ? language : 'pt'
  return LEAD_TOPICS[lang][emailNumber - 1] || LEAD_TOPICS[lang][0]
}

function retailerBlock(language, siteUrl) {
  const r = RETAILERS[language] || RETAILERS.pt
  return `
    <div style="margin-top:26px;padding:22px;border:1px solid rgba(95,211,227,.25);border-radius:14px;background:#071224;">
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#5FD3E3;font-weight:800;letter-spacing:.5px;margin-bottom:14px;text-align:center;">${r.label}</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td style="padding:6px;"><a href="${r.amazon}" style="display:block;text-align:center;background:#FFB800;color:#06101F;text-decoration:none;font-family:Arial,sans-serif;font-size:13px;font-weight:800;padding:13px 10px;border-radius:9px;">${r.amazonText}</a></td>
        </tr>
        <tr>
          <td style="padding:6px;"><a href="${r.barnes}" style="display:block;text-align:center;background:#12315A;color:#FFFFFF;text-decoration:none;font-family:Arial,sans-serif;font-size:13px;font-weight:800;padding:13px 10px;border-radius:9px;border:1px solid rgba(95,211,227,.25);">${r.barnesText}</a></td>
        </tr>
        <tr>
          <td style="padding:6px;"><a href="${siteUrl}" style="display:block;text-align:center;background:#5FD3E3;color:#06101F;text-decoration:none;font-family:Arial,sans-serif;font-size:13px;font-weight:900;padding:13px 10px;border-radius:9px;">${r.siteText}</a></td>
        </tr>
      </table>
    </div>
  `
}


export function getLeadEmailSubject({ language = 'pt', emailNumber = 1 }) {
  const lang = COPY[language] ? language : 'pt'
  return getLeadTopic(lang, emailNumber)[0]
}

export function getLeadEmailHtml({ language = 'pt', name = '', emailNumber = 1, email = '' }) {
  const lang = COPY[language] ? language : 'pt'
  const root = COPY[lang]
  const item = root.emails[emailNumber] || root.emails[((emailNumber - 1) % 3) + 1] || root.emails[1]
  const topic = getLeadTopic(lang, emailNumber)
  const firstName = String(name || '').trim().split(' ')[0] || ''
  const buyUrl = `${baseUrl()}${lang === 'pt' ? '' : `/${lang}`}#buy`

  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${topic[0]}</title>
</head>
<body style="margin:0;padding:0;background:#f3f5f8;">
  <div style="display:none;max-height:0;overflow:hidden;color:transparent;">
    ${topic[0]}
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f8;margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="680" cellspacing="0" cellpadding="0" style="width:100%;max-width:680px;background:${COLORS.bg};border-radius:18px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.24);">

          <tr>
            <td style="padding:18px 24px;text-align:center;background:${COLORS.bg};">
              <div style="font-family:Arial,sans-serif;font-size:11px;color:${COLORS.soft};margin-bottom:18px;">
                Se este email não aparecer corretamente, acesse o site oficial.
              </div>
              <div style="font-family:Georgia,serif;font-size:22px;letter-spacing:8px;color:${COLORS.text};font-weight:700;">
                ${root.brand}
              </div>
              <div style="font-family:Arial,sans-serif;font-size:13px;letter-spacing:3px;color:${COLORS.cyan};font-weight:700;margin-top:8px;">
                ${root.official}
              </div>
              <div style="width:120px;height:2px;background:${COLORS.cyan};margin:14px auto 0;"></div>
            </td>
          </tr>

          <tr>
            <td background="${asset(item.hero)}" style="background-image:url('${asset(item.hero)}');background-size:cover;background-position:center;padding:92px 40px 86px;">
              <table role="presentation" width="100%">
                <tr>
                  <td width="42%"></td>
                  <td width="58%" style="text-align:left;">
                    <h1 style="font-family:Georgia,serif;font-size:42px;line-height:1.08;color:${COLORS.text};margin:0;font-weight:800;">
                      ${topic[0]}
                    </h1>
                    <div style="width:70px;height:2px;background:${COLORS.cyan};margin-top:26px;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:34px 40px 10px;background:linear-gradient(180deg,#0D1B3E 0%,#071224 100%);">
              <p style="font-family:Georgia,serif;font-size:20px;line-height:1.7;color:${COLORS.cyan};margin:0 0 18px;">
                ${item.greeting(firstName)}
              </p>

              ${item.body.slice(0,4).map(p => `
                <p style="font-family:Arial,sans-serif;font-size:17px;line-height:1.8;color:${COLORS.text};margin:0 0 14px;">
                  ${p}
                </p>
              `).join('')}

              <div style="margin:24px auto 24px;max-width:430px;border:1px solid rgba(95,211,227,.55);border-radius:8px;padding:20px;text-align:center;">
                <div style="font-family:Georgia,serif;font-size:30px;line-height:1.2;color:${COLORS.text};font-weight:800;">
                  ${item.quote}
                </div>
              </div>

              <p style="font-family:Arial,sans-serif;font-size:17px;line-height:1.8;color:${COLORS.text};margin:0 0 20px;">
                ${item.body[item.body.length - 1]}
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px;background:#071224;">
              <div style="height:1px;background:${COLORS.cyan};opacity:.7;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:30px 40px;background:#071224;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="28%" valign="top" style="padding-right:24px;">
                    <div style="font-size:58px;line-height:1;color:${COLORS.cyan};text-align:center;">⌁</div>
                  </td>
                  <td width="72%" valign="top">
                    <h2 style="font-family:Georgia,serif;font-size:24px;line-height:1.2;color:${COLORS.cyan};margin:0 0 14px;">
                      ${topic[1]}
                    </h2>
                    <p style="font-family:Arial,sans-serif;font-size:17px;line-height:1.8;color:${COLORS.text};margin:0;">
                      ${topic[2]}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0;background:#050B15;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="45%" valign="middle" style="padding:28px 20px 28px 34px;">
                    <img src="${asset(item.book)}" alt="${item.bookTitle}" width="250" style="width:100%;max-width:250px;display:block;border:0;border-radius:8px;">
                  </td>
                  <td width="55%" valign="middle" style="padding:34px 34px 34px 10px;">
                    <h2 style="font-family:Georgia,serif;font-size:32px;line-height:1.12;color:${COLORS.text};margin:0 0 16px;">
                      ${item.bookTitle}
                    </h2>
                    <div style="width:70px;height:2px;background:${COLORS.cyan};margin:0 0 18px;"></div>
                    <p style="font-family:Arial,sans-serif;font-size:17px;line-height:1.7;color:${COLORS.text};margin:0 0 24px;">
                      ${item.bookSub}
                    </p>
                    <a href="${buyUrl}" style="display:inline-block;background:${COLORS.cyan};color:#06101F;text-decoration:none;font-family:Arial,sans-serif;font-size:15px;font-weight:800;letter-spacing:.4px;padding:16px 26px;border-radius:10px;">
                      ${root.cta} →
                    </a>
                    ${retailerBlock(lang, buyUrl)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:30px 40px;background:${COLORS.card};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="96" valign="middle">
                    <img src="${asset(item.author)}" alt="Gilberto de Souza" width="82" height="82" style="width:82px;height:82px;border-radius:50%;border:2px solid ${COLORS.cyan};object-fit:cover;display:block;">
                  </td>
                  <td valign="middle" style="padding-left:18px;">
                    <div style="font-family:Georgia,serif;font-size:22px;color:${COLORS.cyan};margin-bottom:4px;">Gilberto de Souza</div>
                    <div style="font-family:Arial,sans-serif;font-size:14px;color:${COLORS.muted};">Autor</div>
                  </td>
                  <td valign="middle" style="padding-left:24px;text-align:left;">
                    <div style="font-family:Georgia,serif;font-size:24px;line-height:1.35;color:${COLORS.text};">
                      “${item.signature}”
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 30px;background:#071224;border-top:1px solid rgba(95,211,227,.18);border-bottom:1px solid rgba(95,211,227,.18);">
              <table role="presentation" width="100%">
                <tr>
                  <td align="center" style="font-family:Arial,sans-serif;color:${COLORS.muted};font-size:13px;">🔒 ${root.secure1}</td>
                  <td align="center" style="font-family:Arial,sans-serif;color:${COLORS.muted};font-size:13px;">📖 ${root.secure2}</td>
                  <td align="center" style="font-family:Arial,sans-serif;color:${COLORS.muted};font-size:13px;">🛡️ ${root.secure3}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 34px;text-align:center;background:${COLORS.bg};">
              <p style="font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:${COLORS.soft};margin:0 0 6px;">
                ${root.footer}
              </p>
              <p style="font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:${COLORS.soft};margin:0;">
                ${root.unsubscribe} <a href="${unsubscribeUrl(email, lang)}" style="color:#5FD3E3;text-decoration:none;">${unsubscribeText(lang)}</a>
              </p>
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
  const lang = COPY[language] ? language : 'pt'
  const root = COPY[lang]
  const topic = getCustomerTopic(lang, emailNumber)
  const firstName = String(name || '').trim().split(' ')[0] || ''
  const buyUrl = `${baseUrl()}${lang === 'pt' ? '' : `/${lang}`}#buy`
  const instagram = 'https://www.instagram.com/gilberto.rebuild/'

  return `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f3f5f8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f8;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="680" cellspacing="0" cellpadding="0" style="width:100%;max-width:680px;background:#060C18;border-radius:18px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.24);">
          <tr>
            <td style="padding:28px 24px;text-align:center;background:#060C18;">
              <div style="font-family:Georgia,serif;font-size:22px;letter-spacing:8px;color:#fff;font-weight:700;">${root.brand}</div>
              <div style="font-family:Arial,sans-serif;font-size:13px;letter-spacing:3px;color:#5FD3E3;font-weight:700;margin-top:8px;">CLIENTE OFICIAL</div>
              <div style="width:120px;height:2px;background:#5FD3E3;margin:14px auto 0;"></div>
            </td>
          </tr>

          <tr>
            <td background="${asset('/email-assets/email3-hero.png')}" style="background-image:url('${asset('/email-assets/email3-hero.png')}');background-size:cover;background-position:center;padding:86px 42px;">
              <h1 style="font-family:Georgia,serif;font-size:42px;line-height:1.08;color:#fff;margin:0;max-width:430px;">${topic[0]}</h1>
              <div style="width:70px;height:2px;background:#5FD3E3;margin-top:24px;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:38px 42px;background:#0D1B3E;">
              <p style="font-family:Georgia,serif;font-size:20px;color:#5FD3E3;margin:0 0 18px;">${firstName ? `Olá, ${firstName}.` : 'Olá.'}</p>
              <h2 style="font-family:Georgia,serif;font-size:28px;color:#fff;margin:0 0 16px;">${topic[1]}</h2>
              <p style="font-family:Arial,sans-serif;font-size:17px;line-height:1.8;color:#B8C8E0;margin:0 0 26px;">${topic[2]}</p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050B15;border-radius:14px;">
                <tr>
                  <td width="42%" style="padding:28px;">
                    <img src="${asset('/email-assets/book-pt.png')}" width="210" style="width:100%;max-width:210px;border-radius:8px;display:block;">
                  </td>
                  <td width="58%" style="padding:28px 28px 28px 0;">
                    <h3 style="font-family:Georgia,serif;font-size:26px;color:#fff;margin:0 0 14px;">Você já deu o primeiro passo.</h3>
                    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#B8C8E0;margin:0 0 20px;">Agora continue caminhando com clareza.</p>
                    <a href="${instagram}" style="display:inline-block;background:#5FD3E3;color:#06101F;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:900;padding:14px 20px;border-radius:10px;">SEGUIR NO INSTAGRAM →</a>
                  </td>
                </tr>
              </table>

              ${retailerBlock(lang, buyUrl)}
            </td>
          </tr>

          <tr>
            <td style="padding:24px 34px;text-align:center;background:#060C18;">
              <p style="font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#7182A6;margin:0 0 8px;">${root.footer}</p>
              <p style="font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#7182A6;margin:0;"><a href="${unsubscribeUrl(email, lang)}" style="color:#5FD3E3;text-decoration:none;">${unsubscribeText(lang)}</a></p>
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

export function getCheckoutEmailHtml({ language = 'pt', name = '', emailNumber = 1, email = '' }) {
  const lang = COPY[language] ? language : 'pt'
  const root = COPY[lang]
  const topic = getCheckoutTopic(lang, emailNumber)
  const item = root.emails[((emailNumber - 1) % 3) + 1] || root.emails[1]
  const firstName = String(name || '').trim().split(' ')[0] || ''
  const buyUrl = `${baseUrl()}${lang === 'pt' ? '' : `/${lang}`}#buy`
  const instagram = 'https://www.instagram.com/gilberto.rebuild/'

  return `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f3f5f8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f8;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="680" cellspacing="0" cellpadding="0" style="width:100%;max-width:680px;background:#060C18;border-radius:18px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.24);">
          <tr>
            <td style="padding:28px 24px;text-align:center;background:#060C18;">
              <div style="font-family:Georgia,serif;font-size:22px;letter-spacing:8px;color:#fff;font-weight:700;">${root.brand}</div>
              <div style="font-family:Arial,sans-serif;font-size:13px;letter-spacing:3px;color:#5FD3E3;font-weight:700;margin-top:8px;">ACESSO PENDENTE</div>
              <div style="width:120px;height:2px;background:#5FD3E3;margin:14px auto 0;"></div>
            </td>
          </tr>
          <tr>
            <td background="${asset(item.hero)}" style="background-image:url('${asset(item.hero)}');background-size:cover;background-position:center;padding:86px 42px;">
              <h1 style="font-family:Georgia,serif;font-size:42px;line-height:1.08;color:#fff;margin:0;max-width:430px;">${topic[0]}</h1>
              <div style="width:70px;height:2px;background:#5FD3E3;margin-top:24px;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:38px 42px;background:#0D1B3E;">
              <p style="font-family:Georgia,serif;font-size:20px;color:#5FD3E3;margin:0 0 18px;">${firstName ? `Olá, ${firstName}.` : 'Olá.'}</p>
              <h2 style="font-family:Georgia,serif;font-size:28px;color:#fff;margin:0 0 16px;">${topic[1]}</h2>
              <p style="font-family:Arial,sans-serif;font-size:17px;line-height:1.8;color:#B8C8E0;margin:0 0 26px;">${topic[2]}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050B15;border-radius:14px;">
                <tr>
                  <td width="42%" style="padding:28px;">
                    <img src="${asset(item.book)}" width="210" style="width:100%;max-width:210px;border-radius:8px;display:block;">
                  </td>
                  <td width="58%" style="padding:28px 28px 28px 0;">
                    <h3 style="font-family:Georgia,serif;font-size:26px;color:#fff;margin:0 0 14px;">Sua reconstrução pode começar agora.</h3>
                    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#B8C8E0;margin:0 0 20px;">Escolha o formato que mais combina com você e continue de onde parou.</p>
                    <a href="${buyUrl}" style="display:inline-block;background:#5FD3E3;color:#06101F;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:900;padding:14px 20px;border-radius:10px;">CONCLUIR AGORA →</a>
                  </td>
                </tr>
              </table>
              ${retailerBlock(lang, buyUrl)}
              <p style="font-family:Arial,sans-serif;font-size:13px;line-height:1.7;color:#7182A6;margin:24px 0 0;text-align:center;">Instagram: <a href="${instagram}" style="color:#5FD3E3;text-decoration:none;">@gilberto.rebuild</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 34px;text-align:center;background:#060C18;">
              <p style="font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#7182A6;margin:0 0 8px;">${root.footer}</p>
              <p style="font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#7182A6;margin:0;"><a href="${unsubscribeUrl(email, lang)}" style="color:#5FD3E3;text-decoration:none;">${unsubscribeText(lang)}</a></p>
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
    ['How to truly listen to your wife','Listening is not waiting to reply','Many men think they are listening, but they are actually preparing a defense. Real listening tries to understand before trying to win.'],
    ['The most common mistake husbands make','Presence is not just being home','Being physically close does not mean being emotionally present. Your wife notices when you are there, but your mind is far away.'],
    ['What makes a woman feel loved','Love also lives in details','Often, what touches a woman most is not something huge. It is noticing that you paid attention, remembered, and cared.'],
    ['How to avoid unnecessary arguments','Not every conversation needs to become a battle','Arguments grow when both people try to win. A marriage improves when at least one person chooses the relationship over pride.'],
    ['The importance of presence','Your attention communicates value','When you give real attention, your wife feels she still matters. Small moments of presence can heal large emotional distances.'],
    ['The power of small actions','A marriage is not lost all at once','It weakens through small absences, small neglects, and small coldness. But it can also be rebuilt through repeated small actions.'],
    ['When pride gets in the way','Apologizing does not make you smaller','Many men confuse humility with weakness. But recognizing a mistake is one of the strongest forms of emotional leadership.'],
    ['How to rebuild trust','Trust returns through consistency','One promise is not enough. Trust returns when your actions begin to repeat what your words say.'],
    ['Masculine communication','Speaking less does not always mean communicating better','Silence can feel like protection, but often becomes distance. A mature man learns to speak without hurting and listen without running.'],
    ['Leadership inside marriage','Leadership is not control','Healthy leadership creates safety, direction, and respect. It is not domination. It is service with firmness and responsibility.'],
    ['What your wife really needs','She may not need perfection','Often your wife does not need a perfect man. She needs a present, honest, respectful man who is willing to grow.'],
    ['How to create connection again','Connection returns with intention','Connection does not return by accident. It returns when you decide to communicate better, observe more, react less, and love through actions.'],
    ['The husband she deserves','You can become better too','Being a good husband is not something you are born with. It is learning, correcting, growing, and choosing not to repeat old patterns.'],
    ['Love is a decision','Feelings change, decisions sustain','Every relationship faces difficult seasons. Mature love is not only emotion. It is also choice, posture, and commitment.'],
    ['Building a stronger marriage','A strong relationship is built daily','A strong marriage is not built with big speeches. It is built in how you treat, respond, respect, and care every day.']
  ],
  es: [
    ['Cómo escuchar de verdad a tu esposa','Escuchar no es esperar tu turno para responder','Muchos hombres creen que escuchan, pero en realidad están preparando una defensa. Escuchar de verdad es intentar entender antes de intentar ganar.'],
    ['El error más común de los esposos','Presencia no es solo estar en casa','Estar físicamente cerca no significa estar emocionalmente presente. Tu esposa nota cuando estás ahí, pero tu mente está lejos.'],
    ['Lo que hace que una mujer se sienta amada','El amor también vive en los detalles','Muchas veces lo que más toca a una mujer no es algo enorme. Es notar que prestaste atención, recordaste y te importó.'],
    ['Cómo evitar discusiones innecesarias','No toda conversación debe convertirse en batalla','Una discusión crece cuando ambos intentan ganar. Un matrimonio mejora cuando al menos uno decide proteger la relación antes que el orgullo.'],
    ['La importancia de estar presente','Tu atención comunica valor','Cuando entregas atención real, tu esposa siente que todavía importa. Pequeños momentos de presencia pueden sanar grandes distancias emocionales.'],
    ['El poder de las pequeñas acciones','El matrimonio no se pierde de una vez','Se debilita con pequeñas ausencias, pequeños descuidos y pequeñas frialdades. Pero también puede reconstruirse con pequeñas acciones repetidas.'],
    ['Cuando el orgullo estorba','Pedir perdón no te hace menos hombre','Muchos hombres confunden humildad con debilidad. Pero reconocer un error es una de las formas más fuertes de liderazgo emocional.'],
    ['Cómo reconstruir la confianza','La confianza vuelve con consistencia','No basta prometer cambio una vez. La confianza vuelve cuando tus acciones empiezan a repetir lo que dicen tus palabras.'],
    ['Comunicación masculina','Hablar menos no siempre es comunicar mejor','El silencio puede parecer protección, pero muchas veces se convierte en distancia. Un hombre maduro aprende a hablar sin herir y escuchar sin huir.'],
    ['Liderazgo dentro del matrimonio','Liderar no es controlar','El liderazgo saludable crea seguridad, dirección y respeto. No es dominar. Es servir con firmeza y responsabilidad.'],
    ['Lo que tu esposa realmente necesita','Tal vez ella no quiere perfección','Muchas veces tu esposa no necesita un hombre perfecto. Necesita un hombre presente, honesto, respetuoso y dispuesto a crecer.'],
    ['Cómo crear conexión otra vez','La conexión vuelve con intención','La conexión no vuelve por accidente. Vuelve cuando decides comunicarte mejor, observar más, reaccionar menos y amar con acciones concretas.'],
    ['El esposo que ella merece','Tú también puedes mejorar','Ser un buen esposo no es nacer listo. Es aprender, corregir, crecer y elegir cada día no repetir viejos patrones.'],
    ['El amor es una decisión','El sentimiento cambia, la decisión sostiene','Toda relación pasa por etapas difíciles. El amor maduro no depende solo de emoción. También depende de elección, postura y compromiso.'],
    ['Construyendo un matrimonio fuerte','Una relación fuerte se construye cada día','Un matrimonio fuerte no nace de grandes discursos. Nace de la forma en que tratas, respondes, respetas y cuidas todos los días.']
  ]
}

function getManualTopic(language, emailNumber) {
  const lang = MANUAL_TOPICS[language] ? language : 'pt'
  return MANUAL_TOPICS[lang][emailNumber - 1] || MANUAL_TOPICS[lang][0]
}

export function getManualEmailHtml({ language = 'pt', name = '', emailNumber = 1, email = '' }) {
  const lang = COPY[language] ? language : 'pt'
  const root = COPY[lang]
  const topic = getManualTopic(lang, emailNumber)
  const item = root.emails[((emailNumber - 1) % 3) + 1] || root.emails[1]
  const firstName = String(name || '').trim().split(' ')[0] || ''
  const buyUrl = `${baseUrl()}${lang === 'pt' ? '' : `/${lang}`}#buy`
  const instagram = 'https://www.instagram.com/gilberto.rebuild/'

  return `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f3f5f8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f8;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="680" cellspacing="0" cellpadding="0" style="width:100%;max-width:680px;background:#060C18;border-radius:18px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.24);">
          <tr>
            <td style="padding:28px 24px;text-align:center;background:#060C18;">
              <div style="font-family:Georgia,serif;font-size:22px;letter-spacing:8px;color:#fff;font-weight:700;">${root.brand}</div>
              <div style="font-family:Arial,sans-serif;font-size:13px;letter-spacing:3px;color:#5FD3E3;font-weight:700;margin-top:8px;">MANUAL DO HOMEM</div>
              <div style="width:120px;height:2px;background:#5FD3E3;margin:14px auto 0;"></div>
            </td>
          </tr>
          <tr>
            <td background="${asset(item.hero)}" style="background-image:url('${asset(item.hero)}');background-size:cover;background-position:center;padding:86px 42px;">
              <h1 style="font-family:Georgia,serif;font-size:42px;line-height:1.08;color:#fff;margin:0;max-width:430px;">${topic[0]}</h1>
              <div style="width:70px;height:2px;background:#5FD3E3;margin-top:24px;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:38px 42px;background:#0D1B3E;">
              <p style="font-family:Georgia,serif;font-size:20px;color:#5FD3E3;margin:0 0 18px;">${firstName ? `Olá, ${firstName}.` : 'Olá.'}</p>
              <h2 style="font-family:Georgia,serif;font-size:28px;color:#fff;margin:0 0 16px;">${topic[1]}</h2>
              <p style="font-family:Arial,sans-serif;font-size:17px;line-height:1.8;color:#B8C8E0;margin:0 0 26px;">${topic[2]}</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050B15;border-radius:14px;">
                <tr>
                  <td width="42%" style="padding:28px;">
                    <img src="${asset(item.book)}" width="210" style="width:100%;max-width:210px;border-radius:8px;display:block;">
                  </td>
                  <td width="58%" style="padding:28px 28px 28px 0;">
                    <h3 style="font-family:Georgia,serif;font-size:26px;color:#fff;margin:0 0 14px;">Continue construindo maturidade emocional.</h3>
                    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#B8C8E0;margin:0 0 20px;">O livro aprofunda a reconstrução interior que sustenta relacionamentos mais fortes.</p>
                    <a href="${instagram}" style="display:inline-block;background:#5FD3E3;color:#06101F;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:900;padding:14px 20px;border-radius:10px;">SEGUIR NO INSTAGRAM →</a>
                  </td>
                </tr>
              </table>
              ${retailerBlock(lang, buyUrl)}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 34px;text-align:center;background:#060C18;">
              <p style="font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#7182A6;margin:0 0 8px;">${root.footer}</p>
              <p style="font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:#7182A6;margin:0;"><a href="${unsubscribeUrl(email, lang)}" style="color:#5FD3E3;text-decoration:none;">${unsubscribeText(lang)}</a></p>
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
