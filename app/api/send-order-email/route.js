import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'contato@gilbertosouza.com'
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'contato@gilbertosouza.com'
const EMAIL_FROM = process.env.EMAIL_FROM || 'Gilberto de Souza <noreply@gilbertosouza.com>'

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function idempotencyKey(
  kind,
  paymentIntentId
) {
  const intent =
    String(
      paymentIntentId || ''
    )
      .trim()
      .replace(
        /[^a-zA-Z0-9_-]/g,
        '_'
      )
      .slice(0, 180)

  if (!intent) {
    return ''
  }

  return [
    'order',
    kind,
    intent
  ].join('_').slice(0, 256)
}

async function sendEmailOnce(
  payload,
  key
) {
  const result =
    key
      ? await resend.emails.send(
          payload,
          {
            idempotencyKey:
              key
          }
        )
      : await resend.emails.send(
          payload
        )

  /*
   * O SDK pode devolver erro no objeto sem lançar exceção.
   */
  if (result?.error) {
    throw new Error(
      result.error.message ||
      'Unable to send order email'
    )
  }

  return result
}

function firstName(name) {
  return esc(String(name || 'Cliente').trim().split(/\s+/)[0] || 'Cliente')
}

function langLabel(lang) {
  if (lang === 'en') return 'English'
  if (lang === 'es') return 'Español'
  return 'Português'
}

function digitalCopy(lang) {
  if (lang === 'en') {
    return {
      subject: '✅ Your eBook + Audiobook access is ready',
      title: 'Your access is ready',
      greeting: 'Thank you',
      intro: 'Your eBook + Audiobook access has been successfully released.',
      button: 'Access eBook + Audiobook',
      includesTitle: 'On your private access page, you can:',
      item1: 'Download your eBook',
      item2: 'Listen to the audiobook online',
      item3: 'Download the audio files',
      keep: 'Keep this email. This access link is exclusive to your purchase.',
      support: 'Need help? Reply to this email or contact support.',
      footer: 'Your healing journey begins now.'
    }
  }

  if (lang === 'es') {
    return {
      subject: '✅ Tu acceso al eBook + Audiolibro está listo',
      title: 'Tu acceso está listo',
      greeting: 'Gracias',
      intro: 'Tu acceso al eBook + Audiolibro ha sido liberado con éxito.',
      button: 'Acceder al eBook + Audiolibro',
      includesTitle: 'En tu página privada de acceso, puedes:',
      item1: 'Descargar tu eBook',
      item2: 'Escuchar el audiolibro en línea',
      item3: 'Descargar los archivos de audio',
      keep: 'Guarda este correo. Este enlace de acceso es exclusivo de tu compra.',
      support: '¿Necesitas ayuda? Responde este correo o contacta al soporte.',
      footer: 'Tu camino de sanación comienza ahora.'
    }
  }

  return {
    subject: '✅ Seu acesso ao eBook + Audiobook está pronto',
    title: 'Seu acesso está pronto',
    greeting: 'Obrigado',
    intro: 'Seu acesso ao eBook + Audiobook foi liberado com sucesso.',
    button: 'Acessar eBook + Audiobook',
    includesTitle: 'Na sua página privada de acesso, você pode:',
    item1: 'Baixar seu eBook',
    item2: 'Ouvir o audiobook online',
    item3: 'Baixar os arquivos de áudio',
    keep: 'Guarde este e-mail. Este link de acesso é exclusivo da sua compra.',
    support: 'Precisa de ajuda? Responda este e-mail ou fale com o suporte.',
    footer: 'Sua jornada de cura começa agora.'
  }
}

function shell({ preheader = '', title = '', content = '' }) {
  return `
  <div style="margin:0;padding:0;background:#f7efe1">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7efe1;margin:0;padding:32px 12px;font-family:Arial,Helvetica,sans-serif">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#fffaf2;border:1px solid #eadfce;border-radius:22px;overflow:hidden;box-shadow:0 18px 45px rgba(83,54,20,.10)">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid #eadfce;background:#fffdf8">
                <div style="font-family:Georgia,serif;font-size:27px;font-weight:700;color:#1f1711">Gilberto de Souza</div>
                <div style="font-size:13px;color:#7a7064;margin-top:4px">Livros que curam. Palavras que libertam.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 32px">
                <h1 style="font-family:Georgia,serif;font-size:32px;line-height:1.1;margin:0 0 12px;color:#103b22">${title}</h1>
                ${content}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px;background:#0b1728;color:#d8e3ee;text-align:center;font-size:12px">
                <div style="font-family:Georgia,serif;font-size:18px;color:#d19a2a;margin-bottom:6px">Gilberto de Souza</div>
                <div>Dúvidas: <a href="mailto:${esc(SUPPORT_EMAIL)}" style="color:#d19a2a;text-decoration:none">${esc(SUPPORT_EMAIL)}</a></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eadfce;color:#73695f;width:170px;font-size:14px">${esc(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eadfce;color:#211811;font-weight:700;font-size:14px">${esc(value || '-')}</td>
    </tr>`
}

function digitalBuyerEmail(order) {
  const lang = order.lang || 'pt'
  const c = digitalCopy(lang)
  const name = firstName(order.name)

  const content = `
    <p style="font-size:17px;line-height:1.6;color:#504942;margin:0 0 18px">${c.greeting}, <strong>${name}</strong>!</p>
    <p style="font-size:17px;line-height:1.6;color:#504942;margin:0 0 22px">${c.intro}</p>

    <div style="background:#f4efe5;border:1px solid #eadfce;border-radius:18px;padding:22px;margin:22px 0">
      <p style="margin:0 0 8px;color:#211811;font-weight:800">eBook + Audiobook — ${esc(langLabel(lang))}</p>
      <p style="margin:0;color:#6d6258;font-size:14px">${esc(c.includesTitle)}</p>
      <ul style="margin:12px 0 0;padding-left:20px;color:#504942;line-height:1.7">
        <li>${esc(c.item1)}</li>
        <li>${esc(c.item2)}</li>
        <li>${esc(c.item3)}</li>
      </ul>
    </div>

    <div style="text-align:center;margin:28px 0">
      <a href="${esc(order.accessUrl)}" style="display:inline-block;background:#0f4d24;color:#ffffff;text-decoration:none;border-radius:12px;padding:16px 28px;font-weight:900;font-size:16px">
        ${esc(c.button)} →
      </a>
    </div>

    <p style="font-size:14px;line-height:1.6;color:#6d6258;margin:0 0 12px">${esc(c.keep)}</p>
    <p style="font-size:14px;line-height:1.6;color:#6d6258;margin:0">${esc(c.support)}</p>

    <div style="text-align:center;margin-top:30px;color:#c98b19;font-family:Georgia,serif;font-size:24px;font-style:italic">
      ${esc(c.footer)}
    </div>
  `

  return {
    subject: c.subject,
    html: shell({ preheader: c.intro, title: c.title, content })
  }
}

function digitalAdminEmail(order) {
  const content = `
    <p style="font-size:16px;color:#504942;line-height:1.6;margin:0 0 20px">Uma nova venda digital foi confirmada.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
      ${row('Nome', order.name)}
      ${row('Email', order.email)}
      ${row('Idioma', langLabel(order.lang))}
      ${row('Valor', order.lang === 'pt' ? 'R$ 97,00' : '$24.99 USD')}
      ${row('Payment Intent', order.paymentIntentId)}
      ${row('Link de acesso', order.accessUrl)}
    </table>
  `

  return shell({
    preheader: `Nova venda digital — ${order.name}`,
    title: '💻 Nova venda digital',
    content
  })
}

function physicalAdminEmail(order) {
  const content = `
    <p style="font-size:16px;color:#504942;line-height:1.6;margin:0 0 20px">
      Uma nova venda do livro físico foi confirmada. Use os dados abaixo para preparar o envio.
    </p>

    <h2 style="font-family:Georgia,serif;color:#103b22;font-size:22px;margin:22px 0 10px">Cliente</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
      ${row('Nome completo', order.name)}
      ${row('Email', order.email)}
      ${row('WhatsApp', order.whatsapp)}
    </table>

    <h2 style="font-family:Georgia,serif;color:#103b22;font-size:22px;margin:26px 0 10px">Entrega</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
      ${row('CEP', order.cep)}
      ${row('Endereço', order.address)}
      ${row('Complemento', order.complement)}
      ${row('Bairro', order.neighborhood)}
      ${row('Cidade', order.city)}
      ${row('Estado', order.state)}
    </table>

    <h2 style="font-family:Georgia,serif;color:#103b22;font-size:22px;margin:26px 0 10px">Pedido</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
      ${row('Produto', 'Livro físico — Como Vencer a Dor de Ser Trocado Por Outro')}
      ${row('Quantidade', `${order.quantity}x`)}
      ${row('Frete', `${order.shippingName || '-'} — R$ ${order.shippingPrice || '-'}`)}
      ${row('Total pago', `R$ ${order.total}`)}
      ${row('Payment Intent', order.paymentIntentId)}
    </table>
  `

  return shell({
    preheader: `Nova venda física — ${order.name}`,
    title: '📦 Nova venda física',
    content
  })
}

function physicalBuyerEmail(order) {
  const name = firstName(order.name)

  const content = `
    <p style="font-size:17px;line-height:1.6;color:#504942;margin:0 0 18px">Obrigado, <strong>${name}</strong>!</p>
    <p style="font-size:17px;line-height:1.6;color:#504942;margin:0 0 22px">
      Seu pedido foi confirmado e o pagamento foi processado com sucesso.
    </p>

    <div style="background:#f4efe5;border:1px solid #eadfce;border-radius:18px;padding:22px;margin:22px 0">
      <p style="margin:0 0 10px;color:#211811;font-weight:800">Detalhes do pedido</p>
      <p style="margin:4px 0;color:#504942">Livro físico: <strong>Como Vencer a Dor de Ser Trocado Por Outro</strong></p>
      <p style="margin:4px 0;color:#504942">Quantidade: <strong>${esc(order.quantity)}x</strong></p>
      <p style="margin:4px 0;color:#504942">Total pago: <strong>R$ ${esc(order.total)}</strong></p>
    </div>

    <div style="background:#fff8e7;border-left:4px solid #c98b19;padding:18px;border-radius:10px;margin:22px 0">
      <p style="margin:0;color:#504942;line-height:1.7">
        📬 <strong>Postagem em até 2 dias úteis.</strong> Assim que o livro for postado, você receberá as informações de envio.
      </p>
    </div>

    <p style="font-size:14px;line-height:1.6;color:#6d6258;margin:0">Dúvidas? Responda este e-mail ou fale com o suporte.</p>
  `

  return {
    subject: '✅ Pedido confirmado — Livro físico Gilberto de Souza',
    html: shell({
      preheader: 'Seu pedido foi confirmado.',
      title: 'Pedido confirmado',
      content
    })
  }
}

export async function POST(request) {
  try {
    const { order, type } = await request.json()

    if (type === 'physical') {
      await sendEmailOnce(
        {
          from:
            EMAIL_FROM,

          to:
            OWNER_EMAIL,

          subject:
            `📦 NOVA VENDA FÍSICA — ${order.name} — R$ ${order.total}`,

          html:
            physicalAdminEmail(
              order
            )
        },

        idempotencyKey(
          'physical_admin',
          order.paymentIntentId
        )
      )

      const buyer = physicalBuyerEmail(order)
      await sendEmailOnce(
        {
          from:
            EMAIL_FROM,

          to:
            order.email,

          subject:
            buyer.subject,

          html:
            buyer.html
        },

        idempotencyKey(
          'physical_buyer',
          order.paymentIntentId
        )
      )
    }

    if (type === 'digital') {
      await sendEmailOnce(
        {
          from:
            EMAIL_FROM,

          to:
            OWNER_EMAIL,

          subject:
            `💻 NOVA VENDA DIGITAL — ${order.name} — ${String(order.lang || 'pt').toUpperCase()}`,

          html:
            digitalAdminEmail(
              order
            )
        },

        idempotencyKey(
          'digital_admin',
          order.paymentIntentId
        )
      )

      const buyer = digitalBuyerEmail(order)
      await sendEmailOnce(
        {
          from:
            EMAIL_FROM,

          to:
            order.email,

          subject:
            buyer.subject,

          html:
            buyer.html
        },

        idempotencyKey(
          'digital_buyer',
          order.paymentIntentId
        )
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
