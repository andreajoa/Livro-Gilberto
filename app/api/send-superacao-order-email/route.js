import { NextResponse } from "next/server"
import { Resend } from "resend"
import Stripe from "stripe"

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

                <tr>
                  <td
                    align="center"
                    style="
                      padding:24px;
                      background:#17120E;
                      color:#D5C2AA;
                      font-family:Arial,sans-serif;
                      font-size:12px;
                      line-height:1.7;
                    "
                  >
                    <strong
                      style="
                        color:#D3A365;
                        font-family:Georgia,serif;
                        font-size:18px;
                      "
                    >
                      Gilberto de Souza
                    </strong>

                    <br>

                    Superação — O seu futuro é você quem faz.
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
        "Seu eBook está disponível",
        `
          <p
            style="
              font-size:17px;
              line-height:1.7;
              color:#514438;
            "
          >
            Olá, <strong>${escapeHtml(order.name)}</strong>.
          </p>

          <p
            style="
              font-size:17px;
              line-height:1.7;
              color:#514438;
            "
          >
            Seu pagamento foi aprovado e o eBook
            <strong>Superação</strong> já está liberado.
          </p>

          <p>
            <strong>Valor pago:</strong>
            ${escapeHtml(money(paymentIntent))}
          </p>

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
                padding:16px 24px;
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
              color:#705F50;
              font-size:13px;
              line-height:1.7;
            "
          >
            Este link é individual e vinculado
            ao pagamento aprovado.
          </p>
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
        "Seu pedido foi confirmado",
        `
          <p
            style="
              font-size:17px;
              line-height:1.7;
              color:#514438;
            "
          >
            Olá, <strong>${escapeHtml(order.name)}</strong>.
          </p>

          <p
            style="
              font-size:17px;
              line-height:1.7;
              color:#514438;
            "
          >
            Seu pagamento foi aprovado e seu exemplar
            de <strong>Superação</strong> já está sendo
            preparado.
          </p>

          <p>
            <strong>Quantidade:</strong>
            ${escapeHtml(order.quantity || "1")}x
          </p>

          <p>
            <strong>Total pago:</strong>
            ${escapeHtml(money(paymentIntent))}
          </p>

          <p
            style="
              font-size:15px;
              line-height:1.7;
              color:#514438;
            "
          >
            Assim que a postagem for realizada,
            enviaremos o código de rastreamento.
          </p>
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
