import {
  EMAIL_VISUAL_CONFIG,
  pickEmailBanner,
  getStageVisual
} from './emailVisualConfig'

const DESIGNS = [
  { hero: '/email-assets/sequence/hero-01.jpeg', accent: '#45C7D5', layout: 'hero' },
  { hero: '/email-assets/sequence/hero-02.png', accent: '#61D6C7', layout: 'split' },
  { hero: '/email-assets/sequence/hero-03.png', accent: '#72C9E8', layout: 'minimal' },
  { hero: '/email-assets/sequence/hero-04.png', accent: '#8BC4B2', layout: 'quote' },
  { hero: '/email-assets/sequence/hero-05.png', accent: '#D1A96E', layout: 'split' },
  { hero: '/email-assets/sequence/hero-06.png', accent: '#6EB7D2', layout: 'hero' },
  { hero: '/email-assets/sequence/hero-07.png', accent: '#87C9BD', layout: 'minimal' },
  { hero: '/email-assets/sequence/hero-08.png', accent: '#D2A66A', layout: 'quote' },
  { hero: '/email-assets/sequence/hero-09.png', accent: '#65BFCF', layout: 'split' },
  { hero: '/email-assets/sequence/hero-10.png', accent: '#C6A778', layout: 'minimal' },
  { hero: '/email-assets/sequence/hero-11.png', accent: '#76CFC4', layout: 'hero' },
  { hero: '/email-assets/sequence/hero-12.png', accent: '#67B9D4', layout: 'author' },
  { hero: '/email-assets/sequence/hero-13.png', accent: '#86C7AF', layout: 'author' },
  { hero: '/email-assets/sequence/hero-14.png', accent: '#D3AA6B', layout: 'quote' },
  { hero: '/email-assets/sequence/hero-15.png', accent: '#59C7D5', layout: 'final' }
]

const TEXTS = {
  pt: {
    brand: 'GILBERTO DE SOUZA',
    lead: 'RECONSTRUÇÃO EMOCIONAL',
    checkout: 'SEU ACESSO ESTÁ ESPERANDO',
    manual: 'MATURIDADE E RELACIONAMENTOS',
    customer: 'CLIENTE OFICIAL',
    greeting: 'Olá',
    cta: 'QUERO CONHECER O LIVRO',
    checkoutCta: 'CONCLUIR MEU ACESSO',
    manualCta: 'CONHECER O LIVRO',
    customerCta: 'ACOMPANHAR NO INSTAGRAM',
    bookTitle: 'Como vencer a dor de ser trocado por outro',
    bookText: 'Um caminho de clareza, autoestima e reconstrução.',
    author: 'Autor',
    footer: 'Você recebeu este email porque se cadastrou no site oficial de Gilberto de Souza.',
    unsubscribe: 'Cancelar inscrição'
  },
  en: {
    brand: 'GILBERTO DE SOUZA',
    lead: 'EMOTIONAL REBUILDING',
    checkout: 'YOUR ACCESS IS WAITING',
    manual: 'MATURITY AND RELATIONSHIPS',
    customer: 'OFFICIAL CUSTOMER',
    greeting: 'Hello',
    cta: 'DISCOVER THE BOOK',
    checkoutCta: 'COMPLETE MY ACCESS',
    manualCta: 'DISCOVER THE BOOK',
    customerCta: 'FOLLOW ON INSTAGRAM',
    bookTitle: 'How to overcome the pain of being replaced',
    bookText: 'A path toward clarity, self-worth, and rebuilding.',
    author: 'Author',
    footer: 'You received this email because you registered on the official Gilberto de Souza website.',
    unsubscribe: 'Unsubscribe'
  },
  es: {
    brand: 'GILBERTO DE SOUZA',
    lead: 'RECONSTRUCCIÓN EMOCIONAL',
    checkout: 'TU ACCESO TE ESTÁ ESPERANDO',
    manual: 'MADUREZ Y RELACIONES',
    customer: 'CLIENTE OFICIAL',
    greeting: 'Hola',
    cta: 'CONOCER EL LIBRO',
    checkoutCta: 'COMPLETAR MI ACCESO',
    manualCta: 'CONOCER EL LIBRO',
    customerCta: 'SEGUIR EN INSTAGRAM',
    bookTitle: 'Cómo vencer el dolor de ser reemplazado',
    bookText: 'Un camino de claridad, autoestima y reconstrucción.',
    author: 'Autor',
    footer: 'Recibiste este correo porque te registraste en el sitio oficial de Gilberto de Souza.',
    unsubscribe: 'Cancelar suscripción'
  }
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function absolute(baseUrl, path) {
  return `${String(baseUrl || '').replace(/\/$/, '')}${path}`
}

function bookFor(language) {
  if (language === 'en') return '/email-assets/sequence/book-en.png'
  if (language === 'es') return '/email-assets/sequence/book-es.jpg'
  return '/email-assets/sequence/book-pt.jpg'
}

function labelFor(kind, copy) {
  if (kind === 'checkout') return copy.checkout
  if (kind === 'manual') return copy.manual
  if (kind === 'customer') return copy.customer
  return copy.lead
}

function buttonFor(kind, copy) {
  if (kind === 'checkout') return copy.checkoutCta
  if (kind === 'manual') return copy.manualCta
  if (kind === 'customer') return copy.customerCta
  return copy.cta
}

function heroBlock({ design, heroUrl, headline, accent }) {
  if (design.layout === 'minimal') {
    return `
      <tr>
        <td>
          <img
            src="${heroUrl}"
            alt=""
            width="680"
            class="hero-image"
            style="display:block;width:100%;max-width:680px;height:auto;border:0;"
          >
        </td>
      </tr>
      <tr>
        <td class="mobile-pad" style="padding:38px 46px 16px;background:#FFFFFF;text-align:center;">
          <div style="width:48px;height:2px;background:${accent};margin:0 auto 20px;"></div>
          <h1 class="headline" style="font-family:Georgia,serif;font-size:38px;line-height:1.15;color:#10233D;margin:0;font-weight:700;">
            ${headline}
          </h1>
        </td>
      </tr>
    `
  }

  if (design.layout === 'split' || design.layout === 'author') {
    return `
      <tr>
        <td style="background:#F8FAFC;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td width="52%" class="mobile-stack mobile-pad" style="padding:42px 30px 42px 42px;vertical-align:middle;">
                <div style="width:48px;height:2px;background:${accent};margin:0 0 20px;"></div>
                <h1 class="headline" style="font-family:Georgia,serif;font-size:36px;line-height:1.13;color:#10233D;margin:0;font-weight:700;">
                  ${headline}
                </h1>
              </td>
              <td width="48%" class="mobile-stack" style="vertical-align:middle;">
                <img
                  src="${heroUrl}"
                  alt=""
                  width="326"
                  style="display:block;width:100%;max-width:326px;height:auto;border:0;"
                >
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
  }

  return `
    <tr>
      <td>
        <img
          src="${heroUrl}"
          alt=""
          width="680"
          class="hero-image"
          style="display:block;width:100%;max-width:680px;height:auto;border:0;"
        >
      </td>
    </tr>
    <tr>
      <td class="mobile-pad" style="padding:36px 46px 20px;background:#10233D;">
        <div style="width:48px;height:2px;background:${accent};margin:0 0 20px;"></div>
        <h1 class="headline" style="font-family:Georgia,serif;font-size:38px;line-height:1.14;color:#FFFFFF;margin:0;font-weight:700;">
          ${headline}
        </h1>
      </td>
    </tr>
  `
}


function internationalParagraphs(value) {
  return String(value || '')
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((paragraph) => `
      <p class="email-body-copy" style="
        font-family:Arial,Helvetica,sans-serif;
        font-size:16px;
        line-height:1.72;
        color:#43464B;
        margin:0 0 19px;
      ">
        ${escapeHtml(paragraph).replaceAll('\n', '<br>')}
      </p>
    `)
    .join('')
}

function internationalLabels(lang) {
  if (lang === 'es') {
    return {
      ps: 'P. D.',
      author: 'Autor',
      website: 'Sitio oficial',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Uso',
      contact: 'Contacto',
      unsubscribe: 'Cancelar suscripción',
      official: 'Sitio oficial del autor'
    }
  }

  return {
    ps: 'P.S.',
    author: 'Author',
    website: 'Official website',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    contact: 'Contact',
    unsubscribe: 'Unsubscribe',
    official: 'Official author website'
  }
}

function localizedSiteUrl(baseUrl, lang) {
  const clean = String(baseUrl || '').replace(/\/$/, '')

  if (lang === 'en') return `${clean}/en`
  if (lang === 'es') return `${clean}/es`

  return clean
}

function resolveInternationalCta({
  kind,
  lang,
  emailNumber,
  stage
}) {
  if (kind === 'customer') {
    if (Number(emailNumber) === 3) {
      return stage.ctas?.[lang]?.follow ||
        (lang === 'es' ? 'Seguir en Instagram' : 'Follow on Instagram')
    }

    return lang === 'es'
      ? 'Visitar el sitio oficial'
      : 'Visit official website'
  }

  const strong = [5, 10, 15].includes(Number(emailNumber))

  return strong
    ? stage.ctas?.[lang]?.strong || stage.ctas?.[lang]?.default
    : stage.ctas?.[lang]?.default
}

function renderInternationalEmail({
  kind,
  lang,
  copy,
  firstName,
  headline,
  sectionTitle,
  body,
  ps,
  destination,
  unsubscribeHref,
  bookUrl,
  authorUrl,
  baseUrl,
  emailNumber
}) {
  const visual = EMAIL_VISUAL_CONFIG
  const stage = getStageVisual(kind)
  const labels = internationalLabels(lang)
  const colors = visual.tokens.colors

  const bannerPath = pickEmailBanner(kind, Number(emailNumber))
  const bannerUrl = bannerPath
    ? absolute(baseUrl, bannerPath)
    : ''

  const benefits =
    stage.benefits?.[lang] ||
    stage.benefits?.en ||
    []

  const productTitle =
    stage.productTitle?.[lang] ||
    stage.productTitle?.en ||
    copy.bookTitle

  const productSubtitle =
    stage.productSubtitle?.[lang] ||
    stage.productSubtitle?.en ||
    copy.bookText

  const websiteUrl = localizedSiteUrl(baseUrl, lang)

  const finalDestination =
    kind === 'customer'
      ? (
          Number(emailNumber) === 3
            ? visual.footer.instagram
            : websiteUrl
        )
      : destination

  const ctaText = resolveInternationalCta({
    kind,
    lang,
    emailNumber,
    stage
  })

  const footerCopy =
    visual.footer.copy?.[lang] ||
    visual.footer.copy.en

  const privacyUrl =
    visual.footer.links.privacy?.[lang] ||
    visual.footer.links.privacy.en

  const termsUrl =
    visual.footer.links.terms?.[lang] ||
    visual.footer.links.terms.en

  const contactUrl =
    visual.footer.links.contact?.[lang] ||
    visual.footer.links.contact.en

  const greeting =
    lang === 'es'
      ? `Hola${firstName ? `, ${firstName}` : ''}:`
      : `Hi${firstName ? `, ${firstName}` : ''},`

  return `
<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>${headline}</title>

  <style>
    body,
    table,
    td,
    p,
    a {
      -webkit-text-size-adjust:100%;
      -ms-text-size-adjust:100%;
    }

    table,
    td {
      border-collapse:collapse !important;
    }

    img {
      border:0;
      outline:none;
      text-decoration:none;
    }

    .email-wrapper {
      width:100% !important;
      max-width:600px !important;
    }

    @media only screen and (max-width:620px) {
      .email-outer {
        padding:0 !important;
      }

      .email-wrapper {
        width:100% !important;
        max-width:100% !important;
      }

      .email-pad {
        padding-left:22px !important;
        padding-right:22px !important;
      }

      .email-stack {
        display:block !important;
        width:100% !important;
        max-width:100% !important;
        box-sizing:border-box !important;
      }

      .email-headline {
        font-size:28px !important;
        line-height:1.17 !important;
      }

      .email-subheadline {
        font-size:17px !important;
      }

      .email-body-copy {
        font-size:16px !important;
        line-height:1.68 !important;
      }

      .email-hero {
        width:100% !important;
        max-width:100% !important;
        height:auto !important;
      }

      .email-book {
        width:145px !important;
        max-width:145px !important;
        margin:0 auto 20px !important;
      }

      .email-product-copy {
        text-align:center !important;
      }

      .email-cta {
        display:block !important;
        width:100% !important;
        box-sizing:border-box !important;
        text-align:center !important;
      }

      .email-benefit {
        display:block !important;
        width:100% !important;
        padding:7px 0 !important;
        text-align:left !important;
      }

      .email-author-cell {
        text-align:center !important;
      }

      .email-author-photo {
        margin:0 auto 12px !important;
      }

      .email-footer-link {
        display:inline-block !important;
        margin:5px 7px !important;
      }
    }
  </style>
</head>

<body style="
  margin:0;
  padding:0;
  background:${colors.pageBg};
">

  <div style="
    display:none;
    max-height:0;
    overflow:hidden;
    opacity:0;
    color:transparent;
  ">
    ${sectionTitle}
  </div>

  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    style="
      width:100%;
      background:${colors.pageBg};
    ">
    <tr>
      <td
        align="center"
        class="email-outer"
        style="padding:26px 12px;"
      >

        <table
          role="presentation"
          width="600"
          cellspacing="0"
          cellpadding="0"
          class="email-wrapper"
          style="
            width:100%;
            max-width:600px;
            background:${colors.cardBg};
          "
        >

          <!-- CABEÇALHO -->
          <tr>
            <td
              class="email-pad"
              style="
                padding:25px 34px 21px;
                border-bottom:1px solid ${colors.border};
                background:#FFFFFF;
              "
            >
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>
                  <td style="vertical-align:middle;">
                    <div style="
                      font-family:Georgia,'Times New Roman',serif;
                      font-size:17px;
                      font-weight:700;
                      letter-spacing:1.3px;
                      color:${colors.navy};
                    ">
                      GILBERTO DE SOUZA
                    </div>

                    <div style="
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:11px;
                      color:${colors.muted};
                      margin-top:5px;
                    ">
                      ${labels.official}
                    </div>
                  </td>

                  <td
                    align="right"
                    style="vertical-align:middle;"
                  >
                    <div style="
                      width:38px;
                      height:2px;
                      background:${colors.gold};
                    "></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MANCHETE -->
          <tr>
            <td
              class="email-pad"
              style="padding:37px 42px 22px;"
            >
              <div style="
                font-family:Arial,Helvetica,sans-serif;
                font-size:11px;
                font-weight:700;
                letter-spacing:1.7px;
                text-transform:uppercase;
                color:${colors.gold};
                margin-bottom:12px;
              ">
                ${stage.kicker?.[lang] || stage.kicker?.en || ''}
              </div>

              <h1
                class="email-headline"
                style="
                  font-family:Georgia,'Times New Roman',serif;
                  font-size:35px;
                  line-height:1.17;
                  color:${colors.navy};
                  font-weight:700;
                  margin:0 0 13px;
                "
              >
                ${headline}
              </h1>

              <p
                class="email-subheadline"
                style="
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:18px;
                  line-height:1.5;
                  color:${colors.muted};
                  margin:0;
                "
              >
                ${sectionTitle}
              </p>
            </td>
          </tr>

          <!-- BANNER OPCIONAL -->
          ${
            bannerUrl
              ? `
                <tr>
                  <td style="padding:10px 0 27px;">
                    <img
                      src="${bannerUrl}"
                      alt=""
                      width="600"
                      class="email-hero"
                      style="
                        display:block;
                        width:100%;
                        max-width:600px;
                        height:auto;
                      "
                    >
                  </td>
                </tr>
              `
              : ''
          }

          <!-- TEXTO -->
          <tr>
            <td
              class="email-pad"
              style="padding:11px 42px 21px;"
            >
              <p style="
                font-family:Arial,Helvetica,sans-serif;
                font-size:16px;
                line-height:1.7;
                color:${colors.text};
                margin:0 0 21px;
              ">
                ${greeting}
              </p>

              ${internationalParagraphs(body)}
            </td>
          </tr>

          <!-- DESTAQUE EDITORIAL -->
          <tr>
            <td
              class="email-pad"
              style="padding:5px 42px 28px;"
            >
              <div style="
                border-left:3px solid ${colors.gold};
                background:${colors.lightPanel};
                padding:20px 22px;
              ">
                <div style="
                  font-family:Georgia,'Times New Roman',serif;
                  font-size:20px;
                  line-height:1.45;
                  color:${colors.navy};
                ">
                  ${sectionTitle}
                </div>
              </div>
            </td>
          </tr>

          <!-- PRODUTO -->
          <tr>
            <td style="
              background:${colors.lightPanel};
              border-top:1px solid ${colors.border};
              border-bottom:1px solid ${colors.border};
            ">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>
                  <td
                    width="37%"
                    class="email-stack email-pad"
                    style="
                      padding:31px 18px 31px 36px;
                      text-align:center;
                      vertical-align:middle;
                    "
                  >
                    <img
                      src="${bookUrl}"
                      alt="${copy.bookTitle}"
                      width="165"
                      class="email-book"
                      style="
                        display:inline-block;
                        width:100%;
                        max-width:165px;
                        height:auto;
                        box-shadow:0 8px 22px rgba(20,35,50,.14);
                      "
                    >
                  </td>

                  <td
                    width="63%"
                    class="email-stack email-pad email-product-copy"
                    style="
                      padding:32px 36px 32px 12px;
                      vertical-align:middle;
                    "
                  >
                    <h2 style="
                      font-family:Georgia,'Times New Roman',serif;
                      font-size:26px;
                      line-height:1.23;
                      color:${colors.navy};
                      margin:0 0 11px;
                    ">
                      ${productTitle}
                    </h2>

                    <p style="
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:15px;
                      line-height:1.65;
                      color:${colors.muted};
                      margin:0 0 21px;
                    ">
                      ${productSubtitle}
                    </p>

                    <a
                      href="${finalDestination}"
                      class="email-cta"
                      style="
                        display:inline-block;
                        background:${colors.blue};
                        color:#FFFFFF;
                        text-decoration:none;
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:15px;
                        font-weight:700;
                        padding:15px 22px;
                        border-radius:4px;
                      "
                    >
                      ${ctaText}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BENEFÍCIOS -->
          <tr>
            <td
              class="email-pad"
              style="
                padding:20px 34px;
                background:#FFFFFF;
              "
            >
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>
                  ${benefits.map((item) => `
                    <td
                      width="33.33%"
                      class="email-benefit"
                      style="
                        padding:7px 9px;
                        text-align:center;
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:12px;
                        line-height:1.45;
                        color:${colors.muted};
                      "
                    >
                      <span style="
                        color:${colors.gold};
                        font-weight:700;
                        margin-right:4px;
                      ">✓</span>
                      ${escapeHtml(item)}
                    </td>
                  `).join('')}
                </tr>
              </table>
            </td>
          </tr>

          <!-- AUTOR + PS -->
          <tr>
            <td
              class="email-pad"
              style="
                padding:29px 42px;
                border-top:1px solid ${colors.border};
              "
            >
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>
                  <td
                    width="68"
                    class="email-stack email-author-cell"
                    style="vertical-align:middle;"
                  >
                    <img
                      src="${authorUrl}"
                      alt="Gilberto de Souza"
                      width="52"
                      height="52"
                      class="email-author-photo"
                      style="
                        display:block;
                        width:52px;
                        height:52px;
                        border-radius:50%;
                        object-fit:cover;
                      "
                    >
                  </td>

                  <td
                    class="email-stack email-author-cell"
                    style="vertical-align:middle;"
                  >
                    <div style="
                      font-family:Georgia,'Times New Roman',serif;
                      font-size:19px;
                      color:${colors.navy};
                      margin-bottom:4px;
                    ">
                      Gilberto de Souza
                    </div>

                    <div style="
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:12px;
                      color:${colors.muted};
                    ">
                      ${labels.author}
                    </div>
                  </td>
                </tr>
              </table>

              ${
                ps
                  ? `
                    <div style="
                      margin-top:23px;
                      padding-top:19px;
                      border-top:1px solid ${colors.border};
                      font-family:Arial,Helvetica,sans-serif;
                      font-size:14px;
                      line-height:1.65;
                      color:${colors.text};
                    ">
                      <strong style="color:${colors.navy};">
                        ${labels.ps}
                      </strong>
                      ${ps}
                    </div>
                  `
                  : ''
              }
            </td>
          </tr>

          <!-- RODAPÉ -->
          <tr>
            <td
              class="email-pad"
              style="
                padding:26px 30px;
                text-align:center;
                background:#EFEFED;
                border-top:1px solid ${colors.border};
              "
            >
              <div style="
                font-family:Georgia,'Times New Roman',serif;
                font-size:15px;
                letter-spacing:1px;
                color:${colors.navy};
                margin-bottom:14px;
              ">
                GILBERTO DE SOUZA
              </div>

              <div style="
                font-family:Arial,Helvetica,sans-serif;
                font-size:11px;
                line-height:1.8;
                color:${colors.muted};
                margin-bottom:13px;
              ">
                <a
                  class="email-footer-link"
                  href="${websiteUrl}"
                  style="
                    color:${colors.navy};
                    text-decoration:none;
                  "
                >
                  ${labels.website}
                </a>

                &nbsp;·&nbsp;

                <a
                  class="email-footer-link"
                  href="${privacyUrl}"
                  style="
                    color:${colors.navy};
                    text-decoration:none;
                  "
                >
                  ${labels.privacy}
                </a>

                &nbsp;·&nbsp;

                <a
                  class="email-footer-link"
                  href="${termsUrl}"
                  style="
                    color:${colors.navy};
                    text-decoration:none;
                  "
                >
                  ${labels.terms}
                </a>

                &nbsp;·&nbsp;

                <a
                  class="email-footer-link"
                  href="${contactUrl}"
                  style="
                    color:${colors.navy};
                    text-decoration:none;
                  "
                >
                  ${labels.contact}
                </a>

                &nbsp;·&nbsp;

                <a
                  class="email-footer-link"
                  href="${visual.footer.instagram}"
                  style="
                    color:${colors.navy};
                    text-decoration:none;
                  "
                >
                  Instagram
                </a>
              </div>

              <p style="
                font-family:Arial,Helvetica,sans-serif;
                font-size:10.5px;
                line-height:1.65;
                color:${colors.soft};
                margin:0 0 8px;
              ">
                ${footerCopy.why}
              </p>

              <p style="
                font-family:Arial,Helvetica,sans-serif;
                font-size:10.5px;
                line-height:1.65;
                color:${colors.soft};
                margin:0 0 8px;
              ">
                ${visual.footer.contactEmail}
              </p>

              <a
                href="${unsubscribeHref}"
                style="
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:10.5px;
                  color:${colors.muted};
                  text-decoration:underline;
                "
              >
                ${labels.unsubscribe}
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

export function renderSequenceEmail({
  kind = 'lead',
  language = 'pt',
  name = '',
  emailNumber = 1,
  topic = [],
  baseUrl = '',
  buyUrl = '',
  unsubscribeHref = '',
  retailerHtml = '',
  instagramUrl = 'https://www.instagram.com/gilberto.rebuild/'
}) {
  const lang = TEXTS[language] ? language : 'pt'
  const copy = TEXTS[lang]
  const index = Math.max(0, Math.min(14, Number(emailNumber || 1) - 1))
  const design = DESIGNS[index]
  const accent = design.accent

  const headline = escapeHtml(topic[0] || '')
  const sectionTitle = escapeHtml(topic[1] || '')
  const body = escapeHtml(topic[2] || '')
  const ps = escapeHtml(topic[3] || '')
  const firstName = escapeHtml(String(name || '').trim().split(' ')[0] || '')
  const heroUrl = absolute(baseUrl, design.hero)
  const bookUrl = absolute(baseUrl, bookFor(lang))
  const authorUrl = absolute(baseUrl, '/email-assets/sequence/gilberto-perfil.jpeg')

  const destination = kind === 'customer' ? instagramUrl : buyUrl
  const button = buttonFor(kind, copy)

  if (lang !== 'pt') {
    return renderInternationalEmail({
      kind,
      lang,
      copy,
      firstName,
      headline,
      sectionTitle,
      body: topic[2] || '',
      ps,
      destination,
      button,
      unsubscribeHref,
      bookUrl,
      authorUrl,
      baseUrl,
      emailNumber
    })
  }

  return `
<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>${headline}</title>

  <style>
    body, table, td, p, a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table, td {
      border-collapse: collapse !important;
    }

    img {
      border: 0;
      outline: none;
      text-decoration: none;
    }

    @media only screen and (max-width: 620px) {
      .outer-pad {
        padding: 0 !important;
      }

      .wrapper {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0 !important;
      }

      .mobile-stack {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        text-align: center !important;
      }

      .mobile-pad {
        padding: 28px 22px !important;
      }

      .headline {
        font-size: 29px !important;
        line-height: 1.16 !important;
      }

      .body-copy {
        font-size: 16px !important;
        line-height: 1.7 !important;
      }

      .book-image {
        width: 170px !important;
        max-width: 170px !important;
        margin: 0 auto !important;
      }

      .author-image {
        margin: 0 auto 14px !important;
      }

      .cta {
        display: block !important;
        width: auto !important;
        text-align: center !important;
      }

      .hero-image {
        width: 100% !important;
        height: auto !important;
      }
    }
  </style>
</head>

<body style="margin:0;padding:0;background:#EEF2F5;">

  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${headline}
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#EEF2F5;">
    <tr>
      <td align="center" class="outer-pad" style="padding:28px 12px;">

        <table
          role="presentation"
          width="680"
          cellspacing="0"
          cellpadding="0"
          class="wrapper"
          style="width:100%;max-width:680px;background:#FFFFFF;border-radius:16px;overflow:hidden;"
        >

          <tr>
            <td style="padding:24px 30px;text-align:center;background:#FFFFFF;border-bottom:1px solid #E6EBEF;">
              <div style="font-family:Georgia,serif;font-size:20px;letter-spacing:5px;color:#10233D;font-weight:700;">
                ${copy.brand}
              </div>

              <div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:2.4px;color:${accent};font-weight:700;margin-top:9px;">
                ${labelFor(kind, copy)}
              </div>
            </td>
          </tr>

          ${heroBlock({
            design,
            heroUrl,
            headline,
            accent
          })}

          <tr>
            <td class="mobile-pad" style="padding:32px 46px;background:#FFFFFF;">
              <p style="font-family:Georgia,serif;font-size:19px;color:${accent};margin:0 0 18px;">
                ${copy.greeting}${firstName ? `, ${firstName}` : ''}.
              </p>

              <h2 style="font-family:Georgia,serif;font-size:25px;line-height:1.3;color:#10233D;margin:0 0 15px;">
                ${sectionTitle}
              </h2>

              <p class="body-copy" style="font-family:Arial,sans-serif;font-size:17px;line-height:1.8;color:#42536A;margin:0;">
                ${body}
              </p>
            </td>
          </tr>

          ${
            design.layout === 'quote' || design.layout === 'final'
              ? `
              <tr>
                <td class="mobile-pad" style="padding:5px 46px 35px;background:#FFFFFF;">
                  <div style="padding:24px;border-left:3px solid ${accent};background:#F7F9FA;">
                    <div style="font-family:Georgia,serif;font-size:23px;line-height:1.45;color:#10233D;">
                      “A reconstrução começa quando você decide não se abandonar.”
                    </div>
                  </div>
                </td>
              </tr>
              `
              : ''
          }

          <tr>
            <td style="background:#F7F9FA;border-top:1px solid #E6EBEF;border-bottom:1px solid #E6EBEF;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="38%" class="mobile-stack mobile-pad" style="padding:30px 18px 30px 38px;text-align:center;vertical-align:middle;">
                    <img
                      src="${bookUrl}"
                      alt="${copy.bookTitle}"
                      width="210"
                      class="book-image"
                      style="display:inline-block;width:100%;max-width:210px;height:auto;border-radius:8px;"
                    >
                  </td>

                  <td width="62%" class="mobile-stack mobile-pad" style="padding:32px 38px 32px 14px;vertical-align:middle;">
                    <h3 style="font-family:Georgia,serif;font-size:27px;line-height:1.25;color:#10233D;margin:0 0 13px;">
                      ${copy.bookTitle}
                    </h3>

                    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#5D6C7D;margin:0 0 22px;">
                      ${copy.bookText}
                    </p>

                    <a
                      href="${destination}"
                      class="cta"
                      style="display:inline-block;background:${accent};color:#071729;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:800;padding:15px 22px;border-radius:7px;"
                    >
                      ${button} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            kind !== 'customer' && retailerHtml
              ? `
              <tr>
                <td class="mobile-pad" style="padding:26px 38px;background:#FFFFFF;">
                  ${retailerHtml}
                </td>
              </tr>
              `
              : ''
          }

          <tr>
            <td class="mobile-pad" style="padding:28px 38px;background:#10233D;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="92" class="mobile-stack" style="vertical-align:middle;">
                    <img
                      src="${authorUrl}"
                      alt="Gilberto de Souza"
                      width="76"
                      height="76"
                      class="author-image"
                      style="display:block;width:76px;height:76px;border-radius:50%;object-fit:cover;border:2px solid ${accent};"
                    >
                  </td>

                  <td class="mobile-stack" style="vertical-align:middle;">
                    <div style="font-family:Georgia,serif;font-size:21px;color:#FFFFFF;margin-bottom:5px;">
                      Gilberto de Souza
                    </div>

                    <div style="font-family:Arial,sans-serif;font-size:13px;color:#AEBBCD;">
                      ${copy.author}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="mobile-pad" style="padding:22px 30px;text-align:center;background:#0A1728;">
              <p style="font-family:Arial,sans-serif;font-size:11px;line-height:1.7;color:#8493A7;margin:0 0 7px;">
                ${copy.footer}
              </p>

              <p style="font-family:Arial,sans-serif;font-size:11px;line-height:1.7;margin:0;">
                <a
                  href="${unsubscribeHref}"
                  style="color:${accent};text-decoration:none;"
                >
                  ${copy.unsubscribe}
                </a>
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
