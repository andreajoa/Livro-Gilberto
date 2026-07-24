import { NextResponse } from "next/server"

import {
  cleanText,
  d1Query,
  nowIso,
} from "@/src/lib/d1"

import {
  getSuperacaoEmailSubject,
} from "@/src/lib/email/superacaoMarketingTemplates"

export const dynamic = "force-dynamic"

const LEAD_DELAYS_HOURS = [
  0,
  48,
  120,
  192,
  288,
  384,
  504,
  648,
  816,
  1008,
  1224,
  1464,
  1728,
  2016,
  2328,
]

const CHECKOUT_DELAYS_HOURS = [
  1,
  24,
  72,
  144,
  240,
  360,
  504,
  720,
]

const CUSTOMER_DELAYS_HOURS = [
  0,
  72,
  240,
]

function scheduledAt(hours) {
  const date = new Date()

  date.setHours(
    date.getHours() + hours
  )

  return date.toISOString()
}

function sequenceConfig(
  type,
  productType
) {
  const safeProductType =
    productType === "physical"
      ? "physical"
      : productType === "digital"
        ? "digital"
        : "general"

  if (type === "checkout") {
    return {
      code:
        `superacao_checkout_${safeProductType}_pt`,
      delays: CHECKOUT_DELAYS_HOURS,
    }
  }

  if (type === "customer") {
    return {
      code:
        `superacao_customer_${safeProductType}_pt`,
      delays: CUSTOMER_DELAYS_HOURS,
    }
  }

  return {
    code: "superacao_lead_pt",
    delays: LEAD_DELAYS_HOURS,
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    const visitorId = cleanText(
      body.visitorId ||
        body.visitor_id ||
        "",
      120
    )

    const name = cleanText(
      body.name || "",
      180
    )

    const email = cleanText(
      body.email || "",
      255
    ).toLowerCase()

    const type = cleanText(
      body.type || "lead",
      30
    ).toLowerCase()

    const productType = cleanText(
      body.productType ||
        body.product_type ||
        "general",
      30
    ).toLowerCase()

    const dryRun =
      body.dryRun === true ||
      body.dry_run === true

    if (
      !email ||
      !email.includes("@")
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Valid email is required",
        },
        {
          status: 400,
        }
      )
    }

    if (
      ![
        "lead",
        "checkout",
        "customer",
      ].includes(type)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid sequence type",
        },
        {
          status: 400,
        }
      )
    }

    const config = sequenceConfig(
      type,
      productType
    )

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        project: "superacao",
        sequence: config.code,
        sequenceType: type,
        productType,
        emails: config.delays.length,
        schedule: config.delays.map(
          (
            delayHours,
            index
          ) => ({
            emailNumber:
              index + 1,
            delayHours,
            subject:
              getSuperacaoEmailSubject({
                sequenceCode:
                  config.code,
                emailNumber:
                  index + 1,
              }),
          })
        ),
      })
    }

    const unsubscribed =
      await d1Query(
        `SELECT email
         FROM contact_status
         WHERE email=?
           AND unsubscribed=1
         LIMIT 1`,
        [email]
      )

    if (
      unsubscribed?.[0]?.results
        ?.length
    ) {
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "unsubscribed",
      })
    }

    const existing =
      await d1Query(
        `SELECT id
         FROM email_queue
         WHERE email=?
           AND sequence_code=?
         LIMIT 1`,
        [
          email,
          config.code,
        ]
      )

    if (
      existing?.[0]?.results
        ?.length
    ) {
      return NextResponse.json({
        success: true,
        existing: true,
        sequence: config.code,
      })
    }

    if (type === "customer") {
      await d1Query(
        `UPDATE email_queue
         SET status='stopped'
         WHERE email=?
           AND status='pending'
           AND sequence_code LIKE 'superacao_%'
           AND sequence_code NOT LIKE 'superacao_customer_%'`,
        [email]
      )
    }

    if (type === "checkout") {
      const customer =
        await d1Query(
          `SELECT id
           FROM customers
           WHERE email=?
           LIMIT 1`,
          [email]
        )

      if (
        customer?.[0]?.results
          ?.length
      ) {
        return NextResponse.json({
          success: true,
          skipped: true,
          reason:
            "already_customer",
        })
      }
    }

    const createdAt = nowIso()

    for (
      let index = 0;
      index <
      config.delays.length;
      index += 1
    ) {
      const emailNumber =
        index + 1

      const subject =
        getSuperacaoEmailSubject({
          sequenceCode:
            config.code,
          emailNumber,
        })

      await d1Query(
        `INSERT INTO email_queue
         (
           visitor_id,
           email,
           name,
           language,
           sequence_code,
           email_number,
           subject,
           status,
           scheduled_at,
           created_at
         )
         VALUES (
           ?,
           ?,
           ?,
           'pt',
           ?,
           ?,
           ?,
           'pending',
           ?,
           ?
         )`,
        [
          visitorId,
          email,
          name,
          config.code,
          emailNumber,
          subject,
          scheduledAt(
            config.delays[
              index
            ]
          ),
          createdAt,
        ]
      )
    }

    await d1Query(
      `INSERT INTO events
       (
         visitor_id,
         email,
         language,
         event_type,
         page,
         metadata,
         created_at
       )
       VALUES (
         ?,
         ?,
         'pt',
         'email_sequence_queued',
         '/api/crm/enqueue-superacao-sequence',
         ?,
         ?
       )`,
      [
        visitorId,
        email,
        JSON.stringify({
          project:
            "superacao",
          sequence_code:
            config.code,
          sequence_type:
            type,
          product_type:
            productType,
          emails:
            config.delays.length,
        }),
        createdAt,
      ]
    )

    return NextResponse.json({
      success: true,
      project: "superacao",
      sequence: config.code,
      emails:
        config.delays.length,
    })
  } catch (error) {
    console.error(
      "Superacao sequence enqueue error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        error:
          error.message,
      },
      {
        status: 500,
      }
    )
  }
}
