function baseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gilberto-souza.com').replace(/\/$/, '')
}

function asset(path) {
  return `${baseUrl()}${path}`
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
    ['Você não precisa carregar essa dor sozinho','A dor que ninguém vê','Talvez você esteja tentando parecer forte por fora, mas por dentro ainda tenta entender por que tudo aconteceu. Esse email é um lembrete simples: você não precisa atravessar isso sem direção.'],
    ['O erro que mantém muitos homens presos ao passado','A pergunta que prende sua mente','Quando você vive tentando entender por que ela escolheu outro caminho, sua vida fica parada no mesmo ponto. A cura começa quando você para de girar em torno da decisão dela.'],
    ['Uma forma diferente de recomeçar','Recomeçar não é esquecer','Recomeçar é recuperar clareza, respeito próprio e direção. Você não precisa apagar o passado; precisa impedir que ele continue comandando seu futuro.'],
    ['O dia em que você para de esperar respostas','Nem toda resposta liberta','Às vezes a resposta que você espera nunca chega. E mesmo que chegasse, talvez ela não curasse. O que cura é voltar a se escolher.'],
    ['Por que ser trocado dói tanto','Não é só saudade','Ser trocado fere identidade, orgulho, memória e futuro imaginado. Por isso dói tanto. Mas essa dor pode ser transformada em reconstrução.'],
    ['Como parar de se comparar com outra pessoa','O outro homem não define você','Comparar sua vida com a dele só aumenta a ferida. Você não precisa vencer uma comparação; precisa reconstruir sua própria força.'],
    ['O perigo de vigiar o passado','Redes sociais podem virar prisão','Cada visita ao perfil dela pode reabrir a ferida. Às vezes, paz começa com distância, silêncio e disciplina emocional.'],
    ['A esperança também pode virar prisão','Esperar pode impedir você de viver','Esperança sem realidade pode manter um homem preso por meses ou anos. Existe uma diferença entre fé e apego ao que já acabou.'],
    ['O que a rejeição tenta fazer com você','A rejeição mente','Ela tenta fazer você acreditar que perdeu valor. Mas o seu valor não diminuiu porque alguém deixou de enxergar você.'],
    ['Como recuperar sua autoestima aos poucos','Reconstrução começa pequeno','Não é um grande discurso que muda tudo. São pequenas atitudes repetidas: dormir melhor, cuidar do corpo, organizar a mente e parar de se humilhar por amor.'],
    ['Você ainda pode reconstruir sua vida','O fim não precisa ser o fim de você','O que terminou foi uma relação. Não foi sua capacidade de amar, viver, crescer e ser respeitado novamente.'],
    ['O que muda quando você volta para si mesmo','Voltar para si é poder','Quando você deixa de viver tentando provar algo para ela, sua energia volta. E com ela, sua dignidade também.'],
    ['Uma decisão silenciosa que muda tudo','A decisão de não se abandonar','O maior ponto de virada acontece quando você decide: eu posso ter sido deixado, mas não vou me abandonar.'],
    ['Você não foi destruído, você está em reconstrução','Existe vida depois disso','Talvez hoje ainda doa. Mas dor não é destino. É fase. E fases podem ser atravessadas com direção.'],
    ['Um convite para começar hoje','Dê o primeiro passo','Se você chegou até aqui, talvez esteja pronto para parar de sobreviver ao passado e começar a reconstruir sua vida com clareza.']
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

export function getLeadEmailHtml({ language = 'pt', name = '', emailNumber = 1 }) {
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
                ${root.unsubscribe}
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
