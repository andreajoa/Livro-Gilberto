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

export function getLeadEmailSubject({ language = 'pt', emailNumber = 1 }) {
  const lang = COPY[language] ? language : 'pt'
  return COPY[lang].emails[emailNumber]?.subject || COPY[lang].emails[1].subject
}

export function getLeadEmailHtml({ language = 'pt', name = '', emailNumber = 1 }) {
  const lang = COPY[language] ? language : 'pt'
  const root = COPY[lang]
  const item = root.emails[emailNumber] || root.emails[1]
  const firstName = String(name || '').trim().split(' ')[0] || ''
  const buyUrl = `${baseUrl()}${lang === 'pt' ? '' : `/${lang}`}#buy`

  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${item.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f3f5f8;">
  <div style="display:none;max-height:0;overflow:hidden;color:transparent;">
    ${item.headline}
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
                      ${item.headline.replace('carregar essa dor', `<span style="color:${COLORS.cyan};">carregar essa dor</span>`)}
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
                      ${item.insightTitle}
                    </h2>
                    <p style="font-family:Arial,sans-serif;font-size:17px;line-height:1.8;color:${COLORS.text};margin:0;">
                      ${item.insight}
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
