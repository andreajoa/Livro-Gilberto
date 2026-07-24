import {
  cleanText,
  d1Query,
  normalizeLanguage,
  nowIso
} from '@/src/lib/d1'

function text(value, max = 500) {
  return cleanText(value, max).trim()
}

function rows(result) {
  if (!Array.isArray(result)) {
    return []
  }

  return result[0]?.results || []
}

function changes(result) {
  if (!Array.isArray(result)) {
    return 0
  }

  return Number(
    result[0]?.meta?.changes ||
    result[0]?.changes ||
    0
  )
}

function safeJson(value) {
  try {
    return JSON.stringify(value || {})
  } catch {
    return '{}'
  }
}

export async function beginStripeWebhookEvent({
  stripeEventId,
  stripeEventType,
  paymentIntentId
}) {
  const now = nowIso()

  const insertResult = await d1Query(
    `INSERT OR IGNORE INTO website_stripe_webhook_events (
      stripe_event_id,
      stripe_event_type,
      stripe_payment_intent,
      status,
      attempts,
      received_at,
      processing_started_at,
      updated_at
    )
    VALUES (?, ?, ?, 'processing', 1, ?, ?, ?)`,
    [
      stripeEventId,
      stripeEventType,
      paymentIntentId,
      now,
      now,
      now
    ]
  )

  if (changes(insertResult) > 0) {
    return {
      shouldProcess: true,
      duplicate: false,
      retry: false
    }
  }

  const existingResult = await d1Query(
    `SELECT
       status,
       attempts,
       processing_started_at,
       completed_at
     FROM website_stripe_webhook_events
     WHERE stripe_event_id = ?
     LIMIT 1`,
    [stripeEventId]
  )

  const existing = rows(existingResult)[0]

  if (!existing) {
    throw new Error(
      'Stripe webhook event state could not be loaded'
    )
  }

  if (existing.status === 'completed') {
    return {
      shouldProcess: false,
      duplicate: true,
      retry: false
    }
  }

  const startedAt = Date.parse(
    existing.processing_started_at || ''
  )

  const stale =
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt > 5 * 60 * 1000

  if (
    existing.status === 'processing' &&
    !stale
  ) {
    return {
      shouldProcess: false,
      duplicate: true,
      retry: false
    }
  }

  const retryResult = await d1Query(
    `UPDATE website_stripe_webhook_events
     SET
       status = 'processing',
       attempts = attempts + 1,
       processing_started_at = ?,
       last_error = NULL,
       updated_at = ?
     WHERE stripe_event_id = ?
       AND status != 'completed'`,
    [
      now,
      now,
      stripeEventId
    ]
  )

  return {
    shouldProcess:
      changes(retryResult) > 0,

    duplicate: false,
    retry: true
  }
}

export async function hasStripeWebhookStep({
  stripeEventId,
  stepCode
}) {
  const result = await d1Query(
    `SELECT
       step_code,
       completed_at
     FROM website_stripe_webhook_steps
     WHERE stripe_event_id = ?
       AND step_code = ?
     LIMIT 1`,
    [
      text(stripeEventId, 180),
      text(stepCode, 120)
    ]
  )

  return Boolean(
    rows(result)[0]
  )
}

export async function completeStripeWebhookStep({
  stripeEventId,
  stepCode
}) {
  const now = nowIso()

  await d1Query(
    `INSERT INTO website_stripe_webhook_steps (
       stripe_event_id,
       step_code,
       completed_at,
       updated_at
     )
     VALUES (?, ?, ?, ?)
     ON CONFLICT(
       stripe_event_id,
       step_code
     ) DO UPDATE SET
       completed_at =
         excluded.completed_at,
       updated_at =
         excluded.updated_at`,
    [
      text(stripeEventId, 180),
      text(stepCode, 120),
      now,
      now
    ]
  )
}

export async function completeStripeWebhookEvent(
  stripeEventId
) {
  const now = nowIso()

  await d1Query(
    `UPDATE website_stripe_webhook_events
     SET
       status = 'completed',
       completed_at = ?,
       last_error = NULL,
       updated_at = ?
     WHERE stripe_event_id = ?`,
    [
      now,
      now,
      stripeEventId
    ]
  )
}

export async function failStripeWebhookEvent(
  stripeEventId,
  error
) {
  const now = nowIso()

  await d1Query(
    `UPDATE website_stripe_webhook_events
     SET
       status = 'failed',
       last_error = ?,
       updated_at = ?
     WHERE stripe_event_id = ?`,
    [
      text(
        error?.message || error,
        1000
      ),
      now,
      stripeEventId
    ]
  )
}

export async function recordStripeConversion({
  paymentIntent,
  metadata
}) {
  const now = nowIso()

  const visitorId = text(
    metadata.visitor_id,
    120
  )

  const sessionId = text(
    metadata.session_id,
    120
  )

  const attributionId = text(
    metadata.attribution_id,
    120
  )

  const productId = text(
    metadata.product_id ||
    (
      metadata.product === 'Livro Fisico PT'
        ? 'gilberto_physical_pt'
        : `gilberto_digital_${normalizeLanguage(
            metadata.lang
          )}`
    ),
    120
  )

  const bookId = text(
    metadata.book_id ||
    'gilberto_book_01',
    120
  )

  const language =
    metadata.product === 'Livro Fisico PT'
      ? 'pt'
      : normalizeLanguage(metadata.lang)

  const amount =
    Number(paymentIntent.amount_received) > 0
      ? Number(paymentIntent.amount_received) / 100
      : Number(paymentIntent.amount || 0) / 100

  const currency = String(
    paymentIntent.currency || ''
  ).toUpperCase()

  const conversionId =
    `stripe_${paymentIntent.id}`

  const metadataJson = safeJson({
    stripe_status:
      paymentIntent.status || '',

    stripe_customer:
      typeof paymentIntent.customer === 'string'
        ? paymentIntent.customer
        : '',

    source:
      metadata.source || '',

    utm_source:
      metadata.utm_source || '',

    utm_medium:
      metadata.utm_medium || '',

    utm_campaign:
      metadata.utm_campaign || '',

    utm_content:
      metadata.utm_content || '',

    utm_term:
      metadata.utm_term || '',

    campaign_id:
      metadata.campaign_id || '',

    creative_id:
      metadata.creative_id || '',

    landing_page:
      metadata.landing_page || '',

    product_name:
      metadata.product || '',

    quantity:
      metadata.quantity || '1',

    analytics_version:
      metadata.analytics_version || ''
  })

  const conversionResult = await d1Query(
    `INSERT OR IGNORE INTO website_conversions (
      conversion_id,
      event_id,
      visitor_id,
      session_id,
      attribution_id,
      conversion_type,
      book_id,
      product_id,
      language,
      channel,
      currency,
      amount,
      stripe_payment_intent,
      country,
      region,
      city,
      metadata,
      converted_at,
      created_at
    )
    VALUES (
      ?, ?, ?, ?, ?, 'purchase', ?, ?, ?, 'stripe',
      ?, ?, ?, '', '', '', ?, ?, ?
    )`,
    [
      conversionId,
      `purchase_${paymentIntent.id}`,
      visitorId,
      sessionId || null,
      attributionId || null,
      bookId,
      productId,
      language,
      currency,
      amount,
      paymentIntent.id,
      metadataJson,
      now,
      now
    ]
  )

  const inserted =
    changes(conversionResult) > 0

  if (!inserted) {
    return {
      inserted: false,
      duplicate: true,
      conversionId
    }
  }

  if (visitorId) {
    await d1Query(
      `UPDATE website_visitors
       SET
         customer = 1,
         last_seen_at = ?,
         updated_at = ?
       WHERE visitor_id = ?`,
      [
        now,
        now,
        visitorId
      ]
    )
  }

  if (sessionId) {
    await d1Query(
      `UPDATE website_sessions
       SET
         converted = 1,
         last_activity_at = ?,
         updated_at = ?
       WHERE session_id = ?`,
      [
        now,
        now,
        sessionId
      ]
    )
  }

  if (
    visitorId &&
    sessionId
  ) {
    await d1Query(
      `INSERT OR IGNORE INTO website_events (
        event_id,
        visitor_id,
        session_id,
        attribution_id,
        event_type,
        event_category,
        language,
        page_path,
        page_url,
        page_title,
        referrer,
        source,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        book_id,
        product_id,
        element_id,
        element_type,
        element_text,
        destination_url,
        channel,
        creative_id,
        slide_id,
        experiment_id,
        variant_id,
        country,
        region,
        city,
        device_type,
        browser,
        os,
        viewport_width,
        viewport_height,
        screen_width,
        screen_height,
        scroll_depth,
        engaged_seconds,
        metadata,
        occurred_at,
        received_at
      )
      VALUES (
        ?, ?, ?, ?, 'purchase', 'conversion', ?, '', '',
        '', '', ?, ?, ?, ?, ?, ?, ?, ?, 'stripe_payment',
        'payment', '', '', 'stripe', ?, '', '', '', '', '',
        '', '', '', '', 0, 0, 0, 0, 0, 0, ?, ?, ?
      )`,
      [
        `purchase_${paymentIntent.id}`,
        visitorId,
        sessionId,
        attributionId || null,
        language,
        text(metadata.source, 180),
        text(metadata.utm_source, 180),
        text(metadata.utm_medium, 180),
        text(metadata.utm_campaign, 250),
        text(metadata.utm_content, 250),
        text(metadata.utm_term, 250),
        bookId,
        productId,
        text(metadata.creative_id, 120),
        metadataJson,
        now,
        now
      ]
    )
  }

  return {
    inserted: true,
    duplicate: false,
    conversionId,
    visitorId,
    sessionId,
    attributionId,
    bookId,
    productId,
    language,
    amount,
    currency
  }
}
