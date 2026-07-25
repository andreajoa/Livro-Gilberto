import { NextResponse } from "next/server"
import { Resend } from "resend"
import Stripe from "stripe"
import { renderEmailFooter } from "../../../src/lib/email/emailFooter"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const resend = new Resend(
  process.env.RESEND_API_KEY
)

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
)

const OWNER_EMAIL =
  process.env.OWNER_EMAIL ||
  "contato@gilbertosouza.com"

const EMAIL_FROM =
  process.env.EMAIL_FROM ||
  "Gilberto de Souza <noreply@gilbertosouza.com>"

const SITE_URL =
  "https://www.gilberto-souza.com"

const SUPERACAO_COVER =
  `${SITE_URL}/books/superacao/book-front.png`

const FIRST_BOOK_BANNER =
  `${SITE_URL}/email-assets/book-pt.png`

const FIRST_BOOK_SITE_URL =
  `${SITE_URL}/checkout`

const FIRST_BOOK_AMAZON_URL =
  "https://www.amazon.com/dp/B0H2LM4TXH"

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function money(paymentIntent) {
  return new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency:
        String(
          paymentIntent.currency ||
          "BRL"
        ).toUpperCase()
    }
  ).format(
    Number(
      paymentIntent.amount_received ||
      paymentIntent.amount ||
      0
    ) / 100
  )
}

function row(label, value) {
  return `
    <tr>
      <td
        style="
          padding:10px 8px 10px 0;
          border-bottom:1px solid #DEC8A7;
          color:#745F4B;
          font-family:Arial,sans-serif;
          font-size:12px;
          vertical-align:top;
          width:145px;
        "
      >
        ${escapeHtml(label)}
      </td>

      <td
        style="
          padding:10px 0;
          border-bottom:1px solid #DEC8A7;
          color:#201710;
          font-family:Arial,sans-serif;
          font-size:13px;
          font-weight:700;
          vertical-align:top;
        "
      >
        ${escapeHtml(value || "-")}
      </td>
    </tr>
  `
}

function purchasedProductBlock(format) {
  const label =
    format === "digital"
      ? "eBook em PDF"
      : "Livro físico"

  return `
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="
        margin:26px 0;
        background:#F2E6D3;
        border:1px solid #DEC8A7;
        border-collapse:collapse;
      "
    >
      <tr>
        <td
          width="145"
          align="center"
          style="padding:22px 14px;"
        >
          <img
            src="${SUPERACAO_COVER}"
            width="118"
            alt="Capa do livro Superação"
            style="
              display:block;
              width:118px;
              max-width:100%;
              height:auto;
              border:0;
            "
          >
        </td>

        <td
          style="
            padding:22px 20px 22px 6px;
            font-family:Arial,sans-serif;
          "
        >
          <div
            style="
              color:#752520;
              font-family:Georgia,serif;
              font-size:23px;
              line-height:1.2;
            "
          >
            Superação
          </div>

          <div
            style="
              margin-top:7px;
              color:#5E4A3B;
              font-size:14px;
              line-height:1.6;
            "
          >
            ${label}<br>
            Gilberto de Souza
          </div>
        </td>
      </tr>
    </table>
  `
}

function firstBookOffer() {
  return `
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="
        margin-top:38px;
        border-top:1px solid #DEC8A7;
        border-collapse:collapse;
      "
    >
      <tr>
        <td
          style="
            padding:34px 0 15px;
            text-align:center;
          "
        >
          <div
            style="
              color:#752520;
              font-family:Georgia,serif;
              font-size:25px;
              line-height:1.3;
            "
          >
            Continue conhecendo esta trajetória
          </div>

          <p
            style="
              margin:13px 0 22px;
              color:#5E5146;
              font-family:Arial,sans-serif;
              font-size:15px;
              line-height:1.7;
            "
          >
            Depois de conhecer <strong>Superação</strong>,
            descubra também o primeiro livro de Gilberto de Souza:
            uma obra sobre reconstrução emocional, dignidade
            e recomeço após uma ruptura profunda.
          </p>

          <a
            href="${FIRST_BOOK_SITE_URL}"
            style="
              display:block;
              text-decoration:none;
            "
          >
            <img
              src="${FIRST_BOOK_BANNER}"
              width="520"
              alt="Conheça o primeiro livro de Gilberto de Souza"
              style="
                display:block;
                width:100%;
                max-width:520px;
                height:auto;
                margin:0 auto;
                border:0;
              "
            >
          </a>
        </td>
      </tr>

      <tr>
        <td
          align="center"
          style="padding:8px 0 4px;"
        >
          <a
            href="${FIRST_BOOK_SITE_URL}"
            style="
              display:inline-block;
              margin:6px;
              padding:14px 20px;
              background:#752520;
              color:#FFFFFF;
              text-decoration:none;
              font-family:Arial,sans-serif;
              font-size:12px;
              font-weight:700;
            "
          >
            CONHECER NO SITE OFICIAL
          </a>

          <a
            href="${FIRST_BOOK_AMAZON_URL}"
            style="
              display:inline-block;
              margin:6px;
              padding:14px 20px;
              background:#D39A3B;
              color:#201710;
              text-decoration:none;
              font-family:Arial,sans-serif;
              font-size:12px;
              font-weight:700;
            "
          >
            COMPRAR O LIVRO FÍSICO NA AMAZON
          </a>
        </td>
      </tr>
    </table>
  `
}

function layout(title, content) {
  return `
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        >
      </head>

      <body
        style="
          margin:0;
          padding:0;
          background:#E9E4DD;
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
            background:#E9E4DD;
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
                border="0"
                style="
                  max-width:640px;
                  background:#FFF7E9;
                  border-collapse:collapse;
                "
              >
                <tr>
                  <td
                    style="
                      padding:38px 40px 18px;
                      background:#17120E;
                      color:#D3A365;
                      font-family:Georgia,serif;
                      font-size:28px;
                      text-align:center;
                    "
                  >
                    SUPERAÇÃO
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:38px 40px 44px;
                      color:#261B14;
                      font-family:Arial,sans-serif;
                    "
                  >
                    <h1
                      style="
                        margin:0 0 24px;
                        color:#752520;
                        font-family:Georgia,serif;
                        font-size:32px;
                        font-weight:400;
                        line-height:1.2;
                      "
                    >
                      ${escapeHtml(title)}
                    </h1>

                    ${content}
                  </td>
                </tr>

                ${renderEmailFooter({
                  language: "pt",
                  showRetailers: false
                })}
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

async function sendEmail(
  payload,
  idempotencyKey
) {
  const result =
    await resend.emails.send(
      payload,
      {
        idempotencyKey:
          idempotencyKey.slice(
            0,
            256
          )
      }
    )

  if (result?.error) {
    throw new Error(
      result.error.message ||
      "Falha no Resend"
    )
  }
}

export async function POST(request) {
  try {
    const {
      type,
      order
    } = await request.json()

    if (
      !order?.paymentIntentId ||
      !order?.email
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Pedido incompleto."
        },
        {
          status: 400
        }
      )
    }

    const paymentIntent =
      await stripe.paymentIntents.retrieve(
        order.paymentIntentId
      )

    const metadata =
      paymentIntent.metadata || {}

    const isDigital =
      type === "digital" &&
      metadata.product_id ===
        "superacao_digital_pt" &&
      metadata.product ===
        "Superacao Digital eBook"

    const isPhysical =
      type === "physical" &&
      metadata.product_id ===
        "superacao_physical_pt" &&
      metadata.product ===
        "Superacao Livro Fisico PT"

    if (
      paymentIntent.status !== "succeeded" ||
      (!isDigital && !isPhysical)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Pagamento de Superação não confirmado."
        },
        {
          status: 403
        }
      )
    }

    if (isDigital) {
      const ownerHtml = layout(
        "Nova venda do eBook",
        `
          <p>
            O pagamento foi aprovado e o acesso
            foi enviado automaticamente ao comprador.
          </p>

          <table
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="border-collapse:collapse;"
          >
            ${row("Nome", order.name)}
            ${row("E-mail", order.email)}
            ${row("Produto", "Superação — eBook")}
            ${row("Valor", money(paymentIntent))}
            ${row("Pagamento", paymentIntent.id)}
            ${row("Acesso enviado", order.accessUrl)}
          </table>
        `
      )

      const buyerHtml = layout(
        "Obrigado por escolher Superação",
        `
          <p
            style="
              margin:0 0 18px;
              font-size:17px;
              line-height:1.75;
              color:#514438;
            "
          >
            Olá, <strong>${escapeHtml(order.name)}</strong>.
          </p>

          <p
            style="
              margin:0 0 18px;
              font-size:17px;
              line-height:1.75;
              color:#514438;
            "
          >
            Seu pagamento foi aprovado. É uma satisfação
            saber que <strong>Superação</strong> agora fará
            parte da sua jornada.
          </p>

          <p
            style="
              margin:0 0 18px;
              font-size:15px;
              line-height:1.75;
              color:#5E5146;
            "
          >
            Este livro reúne uma história real de dor,
            fé, luta e vitória. Que cada página possa
            transmitir força, esperança e a certeza de
            que sempre existe um caminho para recomeçar.
          </p>

          ${purchasedProductBlock("digital")}

          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              margin:24px 0;
              border-collapse:collapse;
            "
          >
            ${row("Produto", "Superação — eBook em PDF")}
            ${row("Valor pago", money(paymentIntent))}
            ${row("Status", "Pagamento aprovado")}
          </table>

          <p
            style="
              margin:30px 0;
              text-align:center;
            "
          >
            <a
              href="${escapeHtml(order.accessUrl)}"
              style="
                display:inline-block;
                padding:17px 27px;
                background:#752520;
                color:#FFFFFF;
                text-decoration:none;
                font-family:Arial,sans-serif;
                font-size:13px;
                font-weight:700;
              "
            >
              ACESSAR E BAIXAR O EBOOK
            </a>
          </p>

          <p
            style="
              margin:0;
              color:#705F50;
              font-size:13px;
              line-height:1.7;
              text-align:center;
            "
          >
            O link é individual e está vinculado ao
            pagamento aprovado. Guarde este e-mail para
            acessar novamente quando precisar.
          </p>

          ${firstBookOffer()}
        `
      )

      await sendEmail(
        {
          from: EMAIL_FROM,
          to: OWNER_EMAIL,
          subject:
            `NOVA VENDA — Superação eBook — ${order.name}`,
          html: ownerHtml
        },
        `superacao_digital_owner_${paymentIntent.id}`
      )

      await sendEmail(
        {
          from: EMAIL_FROM,
          to: order.email,
          subject:
            "Seu eBook Superação está disponível",
          html: buyerHtml
        },
        `superacao_digital_buyer_${paymentIntent.id}`
      )
    }

    if (isPhysical) {
      const ownerHtml = layout(
        "Nova venda do livro físico",
        `
          <p>
            Pagamento aprovado. Dados para embalagem
            e postagem:
          </p>

          <table
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="border-collapse:collapse;"
          >
            ${row("Nome", order.name)}
            ${row("E-mail", order.email)}
            ${row("WhatsApp", order.whatsapp)}
            ${row("CEP", order.cep)}
            ${row("Endereço", order.address)}
            ${row("Complemento", order.complement)}
            ${row("Bairro", order.neighborhood)}
            ${row("Cidade", order.city)}
            ${row("Estado", order.state)}
            ${row("Quantidade", `${order.quantity || 1}x`)}
            ${row(
              "Frete",
              `${order.shippingName || "-"} — R$ ${
                order.shippingPrice || "0,00"
              }`
            )}
            ${row("Total pago", money(paymentIntent))}
            ${row("Pagamento", paymentIntent.id)}
          </table>
        `
      )

      const buyerHtml = layout(
        "Obrigado pela sua compra",
        `
          <p
            style="
              margin:0 0 18px;
              font-size:17px;
              line-height:1.75;
              color:#514438;
            "
          >
            Olá, <strong>${escapeHtml(order.name)}</strong>.
          </p>

          <p
            style="
              margin:0 0 18px;
              font-size:17px;
              line-height:1.75;
              color:#514438;
            "
          >
            Recebemos a confirmação do seu pagamento.
            Seu exemplar de <strong>Superação</strong>
            já entrou em preparação para envio.
          </p>

          <p
            style="
              margin:0 0 18px;
              font-size:15px;
              line-height:1.75;
              color:#5E5146;
            "
          >
            Obrigado por escolher uma obra construída
            a partir de uma história verdadeira de
            resistência, fé e transformação. Esperamos
            que esta leitura seja significativa para você.
          </p>

          ${purchasedProductBlock("physical")}

          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              margin:24px 0;
              border-collapse:collapse;
            "
          >
            ${row("Produto", "Superação — livro físico")}
            ${row("Quantidade", `${order.quantity || 1}x`)}
            ${row("Total pago", money(paymentIntent))}
            ${row("Status", "Pagamento aprovado")}
          </table>

          <div
            style="
              margin:26px 0;
              padding:18px 20px;
              background:#F2E6D3;
              border-left:4px solid #752520;
              color:#514438;
              font-family:Arial,sans-serif;
              font-size:14px;
              line-height:1.75;
            "
          >
            Seu pedido será preparado com cuidado.
            Assim que a postagem for concluída,
            enviaremos as informações de rastreamento.
          </div>

          ${firstBookOffer()}
        `
      )

      await sendEmail(
        {
          from: EMAIL_FROM,
          to: OWNER_EMAIL,
          subject:
            `NOVA VENDA — Superação físico — ${order.name}`,
          html: ownerHtml
        },
        `superacao_physical_owner_${paymentIntent.id}`
      )

      await sendEmail(
        {
          from: EMAIL_FROM,
          to: order.email,
          subject:
            "Pedido confirmado — Livro Superação",
          html: buyerHtml
        },
        `superacao_physical_buyer_${paymentIntent.id}`
      )
    }

    return NextResponse.json({
      success: true,
      immediate: true,
      transactional: true
    })
  } catch (error) {
    console.error(
      "E-mail transacional Superação:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        error:
          "Falha no envio transacional."
      },
      {
        status: 500
      }
    )
  }
}
