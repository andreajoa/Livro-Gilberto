import { NextResponse } from 'next/server'
import { d1Query, nowIso, cleanText, normalizeLanguage } from '@/src/lib/d1'
import { ensureCrmSchema } from '@/src/lib/crm/crmSchema'
import { isInternalRequest, internalHeaders } from '@/src/lib/server/internalAuth'

export const dynamic = 'force-dynamic'

const SUBJECTS = {
  pt: [
    'Seu acesso está pronto — comece por aqui',
    'Como aproveitar melhor o livro e o audiobook',
    'Continue acompanhando o Gilberto'
  ],
  en: [
    'Your access is ready — start here',
    'How to get the most from the book and audiobook',
    'Keep following Gilberto'
  ],
  es: [
    'Tu acceso está listo — empieza aquí',
    'Cómo aprovechar mejor el libro y el audiolibro',
    'Sigue acompañando a Gilberto'
  ]
}

function addDays(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

export async function POST(request) {
  try {
    if (!isInternalRequest(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await request.json()
    await ensureCrmSchema(d1Query)

    const visitorId = cleanText(body.visitorId || body.visitor_id || '', 120)
    const email = cleanText(body.email || '', 255).toLowerCase()
    const name = cleanText(body.name || '', 180)
    const language = normalizeLanguage(body.language || body.lang)
    const now = nowIso()

    const product = cleanText(
      body.product || "",
      180
    )

    const project = cleanText(
      body.project || "",
      80
    ).toLowerCase()

    const productType = cleanText(
      body.productType ||
        body.product_type ||
        "digital",
      30
    ).toLowerCase()

    const normalizedProduct = product
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()

    const isSuperacao =
      project === "superacao" ||
      normalizedProduct.includes("superacao")

    if (isSuperacao) {
      const baseUrl = (
        process.env.NEXT_PUBLIC_BASE_URL ||
        "https://www.gilberto-souza.com"
      ).replace(/\/$/, "")

      const response = await fetch(
        `${baseUrl}/api/crm/enqueue-superacao-sequence`,
        {
          method: "POST",
          headers: internalHeaders(),
          body: JSON.stringify({
            visitorId,
            name,
            email,
            type: "customer",
            productType:
              productType === "physical"
                ? "physical"
                : "digital",
            project: "superacao",
          }),
        }
      )

      const data = await response
        .json()
        .catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to enqueue Superacao customer sequence"
        )
      }

      return NextResponse.json({
        success: true,
        project: "superacao",
        ...data,
      })
    }

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    const sequenceCode = `${language}_customer_postpurchase`
    const subjects = SUBJECTS[language] || SUBJECTS.pt

    await d1Query(
      `UPDATE email_queue
       SET status='stopped'
       WHERE email=?
         AND status='pending'
         AND sequence_code NOT LIKE '%customer%'`,
      [email]
    )

    await d1Query(
      `INSERT INTO contact_status (email, language, customer, updated_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(email) DO UPDATE SET
         language = excluded.language,
         customer = 1,
         updated_at = excluded.updated_at`,
      [email, language, now]
    )

    const existing = await d1Query(
      `SELECT id FROM email_queue
       WHERE email=? AND sequence_code=?
       LIMIT 1`,
      [email, sequenceCode]
    )

    if (existing?.[0]?.results?.length) {
      return NextResponse.json({ success: true, existing: true })
    }

    const scheduleDays = [0, 7, 14]

    for (let i = 0; i < subjects.length; i++) {
      await d1Query(
        `INSERT INTO email_queue
         (visitor_id, email, name, language, sequence_code, email_number, subject, status, scheduled_at, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
        [
          visitorId,
          email,
          name,
          language,
          sequenceCode,
          i + 1,
          subjects[i],
          addDays(scheduleDays[i]),
          now
        ]
      )
    }

    await d1Query(
      `INSERT INTO events (visitor_id, email, language, event_type, page, metadata, created_at)
       VALUES (?, ?, ?, 'customer_sequence_queued', ?, ?, ?)`,
      [
        visitorId,
        email,
        language,
        cleanText(body.page || '', 300),
        JSON.stringify({ sequence_code: sequenceCode, emails: subjects.length }),
        now
      ]
    )

    return NextResponse.json({ success: true, sequence: sequenceCode, emails: subjects.length })
  } catch (error) {
    console.error('CRM enqueue customer sequence error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
