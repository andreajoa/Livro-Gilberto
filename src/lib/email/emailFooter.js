const SITE_URL =
  'https://www.gilberto-souza.com'

const CONTACT_EMAIL =
  'contato@gilberto-souza.com'

const INSTAGRAM = {
  pt: 'https://www.instagram.com/gilberto_souza_autor/',
  en: 'https://www.instagram.com/gilberto.rebuild/',
  es: 'https://www.instagram.com/gilberto.rebuild/'
}

const RETAILERS = {
  pt: {
    amazon:
      'https://www.amazon.com/dp/B0H2LM4TXH',

    barnes:
      'https://www.barnesandnoble.com/w/como-vencer-a-dor-de-ser-trocado-por-outro-gilberto-de-souza/1150279850?ean=9798256373542'
  },

  en: {
    amazon:
      'https://www.amazon.com/dp/B0H2LXHCH4',

    barnes:
      'https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504'
  },

  es: {
    amazon:
      'https://www.amazon.com/dp/B0H2LHZT7X',

    barnes:
      'https://www.barnesandnoble.com/w/como-vencer-el-dolor-de-ser-reemplazado-por-otro-gilberto-de-souza/1150279538?ean=9786584622050'
  }
}

const COPY = {
  pt: {
    explore:
      'Encontre os livros de Gilberto de Souza',

    amazon:
      'Amazon',

    barnes:
      'Barnes & Noble',

    follow:
      'Acompanhe Gilberto no Instagram',

    website:
      'Site oficial',

    preferences:
      'Atualizar preferências',

    unsubscribe:
      'Cancelar inscrição',

    privacy:
      'Política de Privacidade',

    terms:
      'Termos de Uso',

    contact:
      'Contato',

    why:
      'Você recebeu este email porque se cadastrou no site oficial de Gilberto de Souza ou realizou uma compra em uma de nossas páginas.',

    availability:
      'Ofertas, preços, formatos e disponibilidade podem variar. Compras realizadas na Amazon ou na Barnes & Noble estão sujeitas às condições de cada plataforma.',

    copyright:
      '© 2026 Gilberto de Souza. Todos os direitos reservados.',

    advertisement:
      'Esta mensagem pode conter informações promocionais sobre livros e conteúdos de Gilberto de Souza.'
  },

  en: {
    explore:
      'Find Gilberto de Souza’s books',

    amazon:
      'Amazon',

    barnes:
      'Barnes & Noble',

    follow:
      'Follow Gilberto on Instagram',

    website:
      'Official website',

    preferences:
      'Update your preferences',

    unsubscribe:
      'Unsubscribe',

    privacy:
      'Privacy Policy',

    terms:
      'Terms of Use',

    contact:
      'Contact',

    why:
      'You received this email because you registered on Gilberto de Souza’s official website or completed a purchase through one of our pages.',

    availability:
      'Offers, prices, formats, and availability may vary. Purchases made through Amazon or Barnes & Noble are subject to each retailer’s terms.',

    copyright:
      '© 2026 Gilberto de Souza. All rights reserved.',

    advertisement:
      'This message may contain promotional information about books and content by Gilberto de Souza.'
  },

  es: {
    explore:
      'Encuentra los libros de Gilberto de Souza',

    amazon:
      'Amazon',

    barnes:
      'Barnes & Noble',

    follow:
      'Sigue a Gilberto en Instagram',

    website:
      'Sitio oficial',

    preferences:
      'Actualizar preferencias',

    unsubscribe:
      'Cancelar suscripción',

    privacy:
      'Política de Privacidad',

    terms:
      'Términos de Uso',

    contact:
      'Contacto',

    why:
      'Recibiste este correo porque te registraste en el sitio oficial de Gilberto de Souza o realizaste una compra en una de nuestras páginas.',

    availability:
      'Las ofertas, los precios, los formatos y la disponibilidad pueden variar. Las compras realizadas en Amazon o Barnes & Noble están sujetas a las condiciones de cada plataforma.',

    copyright:
      '© 2026 Gilberto de Souza. Todos los derechos reservados.',

    advertisement:
      'Este mensaje puede contener información promocional sobre libros y contenidos de Gilberto de Souza.'
  }
}

function normalizeLanguage(language) {
  return ['pt', 'en', 'es'].includes(language)
    ? language
    : 'pt'
}

function localizedPath(language, type) {
  const lang =
    normalizeLanguage(language)

  const paths = {
    pt: {
      privacy:
        '/privacidade',

      terms:
        '/termos',

      contact:
        '/contato'
    },

    en: {
      privacy:
        '/en/privacy',

      terms:
        '/en/terms',

      contact:
        '/en#contact'
    },

    es: {
      privacy:
        '/es/privacy',

      terms:
        '/es/terms',

      contact:
        '/es#contacto'
    }
  }

  return (
    paths[lang]?.[type] ||
    paths.pt[type]
  )
}

function preferencesUrl(language) {
  const lang =
    normalizeLanguage(language)

  const subject = {
    pt:
      'Atualização de preferências de email',

    en:
      'Email preference update',

    es:
      'Actualización de preferencias de correo'
  }[lang]

  return (
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}`
  )
}

function footerLink({
  href,
  label
}) {
  if (!href) {
    return ''
  }

  return `
    <a
      class="email-footer-link"
      href="${href}"
      style="
        display:inline-block;
        margin:5px 7px;
        color:#4F5358;
        font-family:Arial,Helvetica,sans-serif;
        font-size:11px;
        line-height:1.5;
        text-decoration:underline;
      "
    >
      ${label}
    </a>
  `
}

function retailerCell({
  href,
  label,
  mark
}) {
  return `
    <td
      width="50%"
      align="center"
      style="
        padding:17px 8px;
        border-right:1px solid #D5D5D2;
      "
    >
      <a
        href="${href}"
        style="
          display:block;
          color:#666A6E;
          text-decoration:none;
        "
      >
        <div style="
          font-family:Georgia,'Times New Roman',serif;
          font-size:24px;
          line-height:1;
          color:#777A7D;
          margin-bottom:8px;
        ">
          ${mark}
        </div>

        <div style="
          font-family:Arial,Helvetica,sans-serif;
          font-size:12px;
          line-height:1.35;
          color:#65696D;
          font-weight:700;
        ">
          ${label}
        </div>
      </a>
    </td>
  `
}

export function emailInstagramUrl(
  language = 'pt'
) {
  const lang =
    normalizeLanguage(language)

  return INSTAGRAM[lang]
}

export function renderEmailFooter({
  language = 'pt',
  unsubscribeHref = '',
  showRetailers = true
} = {}) {
  const lang =
    normalizeLanguage(language)

  const copy =
    COPY[lang]

  const retailers =
    RETAILERS[lang]

  const instagram =
    INSTAGRAM[lang]

  const privacy =
    `${SITE_URL}${localizedPath(lang, 'privacy')}`

  const terms =
    `${SITE_URL}${localizedPath(lang, 'terms')}`

  const contact =
    `${SITE_URL}${localizedPath(lang, 'contact')}`

  const preferences =
    preferencesUrl(lang)

  return `
    <tr>
      <td
        style="
          padding:0;
          background:#E9E9E7;
          border-top:1px solid #D6D6D3;
        "
      >
        ${
          showRetailers
            ? `
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                style="
                  width:100%;
                  background:#E9E9E7;
                  border-collapse:collapse;
                "
              >
                <tr>
                  <td
                    colspan="2"
                    align="center"
                    style="
                      padding:21px 20px 7px;
                    "
                  >
                    <div style="
                      font-family:Georgia,'Times New Roman',serif;
                      font-size:21px;
                      line-height:1.3;
                      color:#686B6E;
                      font-weight:700;
                    ">
                      ${copy.explore}
                    </div>
                  </td>
                </tr>

                <tr>
                  ${retailerCell({
                    href:
                      retailers.amazon,

                    label:
                      copy.amazon,

                    mark:
                      'A'
                  })}

                  ${retailerCell({
                    href:
                      retailers.barnes,

                    label:
                      copy.barnes,

                    mark:
                      'B&amp;N'
                  })}
                </tr>
              </table>
            `
            : ''
        }

        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="
            width:100%;
            background:#E9E9E7;
            border-collapse:collapse;
          "
        >
          <tr>
            <td
              align="center"
              style="
                padding:22px 24px 8px;
              "
            >
              <a
                href="${instagram}"
                style="
                  display:inline-block;
                  color:#686B6E;
                  text-decoration:none;
                "
              >
                <span style="
                  display:inline-block;
                  width:35px;
                  height:35px;
                  line-height:35px;
                  border-radius:50%;
                  background:#777A7D;
                  color:#FFFFFF;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:16px;
                  font-weight:700;
                  text-align:center;
                  vertical-align:middle;
                ">
                  ◎
                </span>

                <span style="
                  display:inline-block;
                  margin-left:9px;
                  color:#686B6E;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:12px;
                  line-height:35px;
                  vertical-align:middle;
                  font-weight:700;
                ">
                  ${copy.follow}
                </span>
              </a>
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:9px 25px 0;
              "
            >
              ${footerLink({
                href:
                  lang === 'pt'
                    ? SITE_URL
                    : `${SITE_URL}/${lang}`,

                label:
                  copy.website
              })}

              ${footerLink({
                href:
                  preferences,

                label:
                  copy.preferences
              })}

              ${
                unsubscribeHref
                  ? footerLink({
                      href:
                        unsubscribeHref,

                      label:
                        copy.unsubscribe
                    })
                  : ''
              }

              ${footerLink({
                href:
                  privacy,

                label:
                  copy.privacy
              })}

              ${footerLink({
                href:
                  terms,

                label:
                  copy.terms
              })}

              ${footerLink({
                href:
                  contact,

                label:
                  copy.contact
              })}
            </td>
          </tr>

          <tr>
            <td
              align="center"
              style="
                padding:18px 28px 28px;
              "
            >
              <p style="
                margin:0 0 9px;
                color:#74777A;
                font-family:Arial,Helvetica,sans-serif;
                font-size:10.5px;
                line-height:1.6;
              ">
                ${copy.why}
              </p>

              <p style="
                margin:0 0 9px;
                color:#74777A;
                font-family:Arial,Helvetica,sans-serif;
                font-size:10.5px;
                line-height:1.6;
              ">
                ${copy.availability}
              </p>

              <p style="
                margin:0 0 9px;
                color:#74777A;
                font-family:Arial,Helvetica,sans-serif;
                font-size:10.5px;
                line-height:1.6;
              ">
                ${copy.advertisement}
              </p>

              <p style="
                margin:0 0 7px;
                color:#686B6E;
                font-family:Arial,Helvetica,sans-serif;
                font-size:10.5px;
                line-height:1.6;
              ">
                ${copy.copyright}
              </p>

              <p style="
                margin:0;
                color:#74777A;
                font-family:Arial,Helvetica,sans-serif;
                font-size:10.5px;
                line-height:1.6;
              ">
                Gilberto de Souza<br>
                ${CONTACT_EMAIL}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
}
