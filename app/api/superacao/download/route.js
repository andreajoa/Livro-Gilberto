import crypto from "node:crypto"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const HEADER = Buffer.from("SUPERACAO_EBOOK_AES_GCM_V1\n", "utf8")

function getKey() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET ausente")

  return crypto
    .createHash("sha256")
    .update(`${secret}|superacao-ebook-v1`, "utf8")
    .digest()
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ""), "utf8")
  const right = Buffer.from(String(b || ""), "utf8")

  if (!left.length || left.length !== right.length) return false
  return crypto.timingSafeEqual(left, right)
}

async function decryptEbook(request) {
  const url = new URL("/secure/superacao-ebook-v1.bin", request.url)
  const response = await fetch(url, { cache: "no-store" })

  if (!response.ok) {
    throw new Error(`Arquivo protegido HTTP ${response.status}`)
  }

  const data = Buffer.from(await response.arrayBuffer())

  if (!data.subarray(0, HEADER.length).equals(HEADER)) {
    throw new Error("Cabeçalho criptográfico inválido")
  }

  const offset = HEADER.length
  const iv = data.subarray(offset, offset + 12)
  const tag = data.subarray(offset + 12, offset + 28)
  const encrypted = data.subarray(offset + 28)

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    getKey(),
    iv
  )

  decipher.setAuthTag(tag)

  const pdf = Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ])

  if (pdf.subarray(0, 5).toString("ascii") !== "%PDF-") {
    throw new Error("Conteúdo descriptografado inválido")
  }

  return pdf
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)



  const token = searchParams.get("token") || ""
  const paymentIntentId =
    searchParams.get("payment_intent") ||
    searchParams.get("pi") ||
    ""

  if (!token || !paymentIntentId) {
    return NextResponse.json(
      { success: false, error: "Dados de acesso ausentes." },
      { status: 400 }
    )
  }

  try {
    const paymentIntent =
      await stripe.paymentIntents.retrieve(paymentIntentId)

    const metadata = paymentIntent.metadata || {}

    const authorized =
      paymentIntent.status === "succeeded" &&
      metadata.product_id === "superacao_digital_pt" &&
      metadata.product === "Superacao Digital eBook" &&
      safeEqual(metadata.access_token, token)

    if (!authorized) {
      return NextResponse.json(
        { success: false, error: "Acesso não autorizado." },
        { status: 403 }
      )
    }

    const pdf = await decryptEbook(request)

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="superacao-gilberto-de-souza.pdf"',
        "Content-Length": String(pdf.length),
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "no-referrer"
      }
    })
  } catch (error) {
    console.error("Download Superação:", error)

    return NextResponse.json(
      { success: false, error: "Não foi possível liberar o eBook." },
      { status: 500 }
    )
  }
}
