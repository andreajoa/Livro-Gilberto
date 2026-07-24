import {
  cleanText,
  d1Query,
  normalizeLanguage,
  nowIso
} from '@/src/lib/d1'

const ALLOWED_EVENT_TYPES = new Set([
  'page_view',
  'session_started',
  'session_ended',
  'engagement',
  'scroll_depth',
  'cta_viewed',
  'cta_clicked',
  'banner_viewed',
  'banner_slide_viewed',
  'banner_clicked',
  'book_viewed',
  'product_viewed',
  'amazon_clicked',
  'barnes_clicked',
  'site_checkout_clicked',
  'cart_opened',
  'cart_updated',
  'checkout_open',
  'checkout_started',
  'checkout_payment_ready',
  'checkout_abandoned',
  'lead_popup_viewed',
  'lead_popup_closed',
  'lead_captured',
  'language_changed',
  'video_started',
  'video_completed',
  'purchase'
])

function text(value, max = 500) {
  return cleanText(value, max).trim()
}

function integer(value, minimum = 0, maximum = 100000) {
  const parsed = Number.parseInt(value, 10)

  if (!Number.isFinite(parsed)) {
    return 0
  }

  return Math.min(
    maximum,
    Math.max(minimum, parsed)
  )
}

function safeJson(value) {
  try {
    return JSON.stringify(
      value &&
      typeof value === 'object' &&
      !Array.isArray(value)
        ? value
        : {}
    )
  } catch {
    return '{}'
  }
}

const SENSITIVE_QUERY_KEYS = new Set([
  'token',
  'access_token',
  'client_secret',
  'secret',
  'password',
  'pass',
  'authorization',
  'auth',
  'code',
  'email',
  'payment_intent',
  'payment_intent_client_secret'
])

function sanitizeUrl(
  value,
  {
    relative = false
  } = {}
) {
  const raw = text(
    value,
    1500
  )

  if (!raw) {
    return ''
  }

  try {
    const url = new URL(
      raw,
      'https://gilbertosouza.com'
    )

    for (
      const key
      of [...url.searchParams.keys()]
    ) {
      if (
        SENSITIVE_QUERY_KEYS.has(
          key.toLowerCase()
        )
      ) {
        url.searchParams.delete(key)
      }
    }

    url.hash = ''

    if (relative) {
      const query =
        url.searchParams.toString()

      return text(
        url.pathname +
        (
          query
            ? `?${query}`
            : ''
        ),
        500
      )
    }

    return text(
      url.toString(),
      1500
    )
  } catch {
    return ''
  }
}

function sanitizeMetadataValue(
  value,
  key = '',
  depth = 0
) {
  if (depth > 5) {
    return null
  }

  const normalizedKey =
    String(key).toLowerCase()

  if (
    SENSITIVE_QUERY_KEYS.has(
      normalizedKey
    ) ||
    normalizedKey.includes(
      'password'
    ) ||
    normalizedKey.includes(
      'client_secret'
    ) ||
    normalizedKey ===
      'access_token'
  ) {
    return '[redacted]'
  }

  if (Array.isArray(value)) {
    return value
      .slice(0, 50)
      .map(item =>
        sanitizeMetadataValue(
          item,
          '',
          depth + 1
        )
      )
  }

  if (
    value &&
    typeof value === 'object'
  ) {
    const output = {}

    for (
      const [childKey, childValue]
      of Object.entries(value)
        .slice(0, 100)
    ) {
      output[
        text(childKey, 120)
      ] =
        sanitizeMetadataValue(
          childValue,
          childKey,
          depth + 1
        )
    }

    return output
  }

  if (typeof value === 'string') {
    return text(value, 1500)
  }

  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null
  ) {
    return value
  }

  return text(value, 500)
}

function safeMetadata(value) {
  try {
    const normalized =
      value &&
      typeof value === 'object' &&
      !Array.isArray(value)
        ? sanitizeMetadataValue(
            value
          )
        : {}

    return JSON.stringify(
      normalized
    )
  } catch {
    return '{}'
  }
}

function firstHeader(request, names) {
  for (const name of names) {
    const value = request.headers.get(name)

    if (value) {
      return text(value, 180)
    }
  }

  return ''
}

export function getRequestGeography(request) {
  return {
    country: firstHeader(request, [
      'x-vercel-ip-country',
      'cf-ipcountry'
    ]),

    region: firstHeader(request, [
      'x-vercel-ip-country-region',
      'cf-region',
      'cf-region-code'
    ]),

    city: firstHeader(request, [
      'x-vercel-ip-city',
      'cf-ipcity'
    ])
  }
}

function detectDevice(userAgent) {
  const ua = userAgent.toLowerCase()

  if (
    /ipad|tablet|kindle|silk/.test(ua)
  ) {
    return 'tablet'
  }

  if (
    /mobile|iphone|ipod|android/.test(ua)
  ) {
    return 'mobile'
  }

  return 'desktop'
}

function detectBrowser(userAgent) {
  const ua = userAgent.toLowerCase()

  if (/edg\//.test(ua)) return 'edge'
  if (/opr\//.test(ua)) return 'opera'
  if (/firefox\//.test(ua)) return 'firefox'

  if (
    /chrome\//.test(ua) &&
    !/edg\//.test(ua)
  ) {
    return 'chrome'
  }

  if (
    /safari\//.test(ua) &&
    !/chrome\//.test(ua)
  ) {
    return 'safari'
  }

  return 'other'
}

function detectOs(userAgent) {
  const ua = userAgent.toLowerCase()

  if (/iphone|ipad|ipod/.test(ua)) return 'ios'
  if (/android/.test(ua)) return 'android'
  if (/windows/.test(ua)) return 'windows'
  if (/mac os|macintosh/.test(ua)) return 'macos'
  if (/linux/.test(ua)) return 'linux'

  return 'other'
}

export function getRequestDevice(request) {
  const userAgent = text(
    request.headers.get('user-agent') || '',
    600
  )

  return {
    deviceType: detectDevice(userAgent),
    browser: detectBrowser(userAgent),
    os: detectOs(userAgent)
  }
}

function getD1Changes(result) {
  if (!Array.isArray(result)) {
    return 0
  }

  return Number(
    result[0]?.meta?.changes ||
    result[0]?.changes ||
    0
  )
}

function normalizeEventType(value) {
  const eventType = text(value, 80)
    .toLowerCase()
    .replace(/[^a-z0-9_.-]/g, '_')

  if (!eventType) {
    return ''
  }

  if (
    ALLOWED_EVENT_TYPES.has(
      eventType
    )
  ) {
    return eventType
  }

  return ''
}

function inferCategory(eventType) {
  if (eventType === 'page_view') return 'navigation'
  if (eventType.includes('banner')) return 'banner'
  if (eventType.includes('checkout')) return 'checkout'
  if (eventType.includes('purchase')) return 'conversion'
  if (eventType.includes('lead')) return 'lead'

  if (
    eventType.includes('amazon') ||
    eventType.includes('barnes')
  ) {
    return 'retailer'
  }

  if (
    eventType.includes('cta') ||
    eventType.includes('clicked')
  ) {
    return 'engagement'
  }

  return 'behavior'
}

function normalizePayload(body, request) {
  const geography = getRequestGeography(request)
  const device = getRequestDevice(request)

  const visitorId = text(
    body.visitorId || body.visitor_id,
    120
  )

  const sessionId = text(
    body.sessionId || body.session_id,
    120
  )

  const eventId = text(
    body.eventId || body.event_id,
    120
  )

  const attributionId = text(
    body.attributionId || body.attribution_id,
    120
  )

  const eventType = normalizeEventType(
    body.eventType || body.event_type
  )

  const occurredAtValue = text(
    body.occurredAt || body.occurred_at,
    60
  )

  const occurredAt = Number.isNaN(
    Date.parse(occurredAtValue)
  )
    ? nowIso()
    : new Date(occurredAtValue).toISOString()

  return {
    visitorId,
    sessionId,
    eventId,
    attributionId,
    eventType,

    eventCategory: text(
      body.eventCategory ||
      body.event_category ||
      inferCategory(eventType),
      80
    ),

    language: normalizeLanguage(
      body.language || body.lang
    ),

    pagePath: sanitizeUrl(
      body.pagePath ||
      body.page_path ||
      body.page,
      {
        relative: true
      }
    ),

    pageUrl: sanitizeUrl(
      body.pageUrl ||
      body.page_url
    ),

    pageTitle: text(
      body.pageTitle || body.page_title,
      500
    ),

    referrer: sanitizeUrl(
      body.referrer
    ),

    source: text(
      body.source || 'direct',
      180
    ),

    utmSource: text(
      body.utmSource || body.utm_source,
      180
    ),

    utmMedium: text(
      body.utmMedium || body.utm_medium,
      180
    ),

    utmCampaign: text(
      body.utmCampaign || body.utm_campaign,
      250
    ),

    utmContent: text(
      body.utmContent || body.utm_content,
      250
    ),

    utmTerm: text(
      body.utmTerm || body.utm_term,
      250
    ),

    bookId: text(
      body.bookId || body.book_id,
      120
    ),

    productId: text(
      body.productId || body.product_id,
      120
    ),

    elementId: text(
      body.elementId || body.element_id,
      180
    ),

    elementType: text(
      body.elementType || body.element_type,
      100
    ),

    elementText: text(
      body.elementText || body.element_text,
      500
    ),

    destinationUrl: sanitizeUrl(
      body.destinationUrl ||
      body.destination_url
    ),

    channel: text(body.channel, 120),

    creativeId: text(
      body.creativeId || body.creative_id,
      120
    ),

    slideId: text(
      body.slideId || body.slide_id,
      120
    ),

    experimentId: text(
      body.experimentId ||
      body.experiment_id,
      120
    ),

    variantId: text(
      body.variantId || body.variant_id,
      120
    ),

    country: geography.country,
    region: geography.region,
    city: geography.city,

    deviceType: device.deviceType,
    browser: device.browser,
    os: device.os,

    viewportWidth: integer(
      body.viewportWidth ||
      body.viewport_width,
      0,
      20000
    ),

    viewportHeight: integer(
      body.viewportHeight ||
      body.viewport_height,
      0,
      20000
    ),

    screenWidth: integer(
      body.screenWidth ||
      body.screen_width,
      0,
      20000
    ),

    screenHeight: integer(
      body.screenHeight ||
      body.screen_height,
      0,
      20000
    ),

    scrollDepth: integer(
      body.scrollDepth ||
      body.scroll_depth,
      0,
      100
    ),

    engagedSeconds: integer(
      body.engagedSeconds ||
      body.engaged_seconds,
      0,
      86400
    ),

    metadata: safeMetadata(
      body.metadata
    ),

    occurredAt,
    receivedAt: nowIso()
  }
}

async function upsertAttribution(event) {
  if (!event.attributionId) {
    return
  }

  await d1Query(
    `INSERT INTO website_attributions (
      attribution_id,
      visitor_id,
      session_id,
      attribution_type,
      channel,
      source,
      medium,
      campaign,
      content,
      term,
      referrer,
      landing_page,
      book_id,
      product_id,
      creative_id,
      experiment_id,
      first_touch,
      created_at,
      updated_at
    )
    VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT(attribution_id) DO UPDATE SET
      session_id = excluded.session_id,
      channel = COALESCE(
        NULLIF(excluded.channel, ''),
        website_attributions.channel
      ),
      source = COALESCE(
        NULLIF(excluded.source, ''),
        website_attributions.source
      ),
      medium = COALESCE(
        NULLIF(excluded.medium, ''),
        website_attributions.medium
      ),
      campaign = COALESCE(
        NULLIF(excluded.campaign, ''),
        website_attributions.campaign
      ),
      content = COALESCE(
        NULLIF(excluded.content, ''),
        website_attributions.content
      ),
      term = COALESCE(
        NULLIF(excluded.term, ''),
        website_attributions.term
      ),
      book_id = COALESCE(
        NULLIF(excluded.book_id, ''),
        website_attributions.book_id
      ),
      product_id = COALESCE(
        NULLIF(excluded.product_id, ''),
        website_attributions.product_id
      ),
      creative_id = COALESCE(
        NULLIF(excluded.creative_id, ''),
        website_attributions.creative_id
      ),
      experiment_id = COALESCE(
        NULLIF(excluded.experiment_id, ''),
        website_attributions.experiment_id
      ),
      updated_at = excluded.updated_at`,
    [
      event.attributionId,
      event.visitorId,
      event.sessionId,
      event.utmCampaign
        ? 'campaign'
        : event.referrer
          ? 'referral'
          : 'direct',
      event.channel,
      event.source,
      event.utmMedium,
      event.utmCampaign,
      event.utmContent,
      event.utmTerm,
      event.referrer,
      event.pagePath,
      event.bookId,
      event.productId,
      event.creativeId,
      event.experimentId,
      0,
      event.receivedAt,
      event.receivedAt
    ]
  )
}

async function insertEvent(event) {
  const result = await d1Query(
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
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?
    )`,
    [
      event.eventId,
      event.visitorId,
      event.sessionId,
      event.attributionId || null,
      event.eventType,
      event.eventCategory,
      event.language,
      event.pagePath,
      event.pageUrl,
      event.pageTitle,
      event.referrer,
      event.source,
      event.utmSource,
      event.utmMedium,
      event.utmCampaign,
      event.utmContent,
      event.utmTerm,
      event.bookId,
      event.productId,
      event.elementId,
      event.elementType,
      event.elementText,
      event.destinationUrl,
      event.channel,
      event.creativeId,
      event.slideId,
      event.experimentId,
      event.variantId,
      event.country,
      event.region,
      event.city,
      event.deviceType,
      event.browser,
      event.os,
      event.viewportWidth,
      event.viewportHeight,
      event.screenWidth,
      event.screenHeight,
      event.scrollDepth,
      event.engagedSeconds,
      event.metadata,
      event.occurredAt,
      event.receivedAt
    ]
  )

  return getD1Changes(result) > 0
}

async function upsertVisitor(event) {
  const pageViewIncrement =
    event.eventType === 'page_view' ? 1 : 0

  await d1Query(
    `INSERT INTO website_visitors (
      visitor_id,
      first_seen_at,
      last_seen_at,
      first_language,
      last_language,
      first_page,
      last_page,
      first_referrer,
      last_referrer,
      first_source,
      last_source,
      first_utm_source,
      first_utm_medium,
      first_utm_campaign,
      first_utm_content,
      first_utm_term,
      last_utm_source,
      last_utm_medium,
      last_utm_campaign,
      last_utm_content,
      last_utm_term,
      first_country,
      first_region,
      first_city,
      last_country,
      last_region,
      last_city,
      first_device_type,
      last_device_type,
      first_browser,
      last_browser,
      first_os,
      last_os,
      sessions_count,
      events_count,
      page_views_count,
      created_at,
      updated_at
    )
    VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT(visitor_id) DO UPDATE SET
      last_seen_at = excluded.last_seen_at,
      last_language = excluded.last_language,
      last_page = excluded.last_page,
      last_referrer = excluded.last_referrer,
      last_source = excluded.last_source,
      last_utm_source = excluded.last_utm_source,
      last_utm_medium = excluded.last_utm_medium,
      last_utm_campaign = excluded.last_utm_campaign,
      last_utm_content = excluded.last_utm_content,
      last_utm_term = excluded.last_utm_term,
      last_country = excluded.last_country,
      last_region = excluded.last_region,
      last_city = excluded.last_city,
      last_device_type = excluded.last_device_type,
      last_browser = excluded.last_browser,
      last_os = excluded.last_os,
      sessions_count =
        website_visitors.sessions_count + ?,
      events_count =
        website_visitors.events_count + 1,
      page_views_count =
        website_visitors.page_views_count + ?,
      updated_at = excluded.updated_at`,
    [
      event.visitorId,
      event.receivedAt,
      event.receivedAt,
      event.language,
      event.language,
      event.pagePath,
      event.pagePath,
      event.referrer,
      event.referrer,
      event.source,
      event.source,
      event.utmSource,
      event.utmMedium,
      event.utmCampaign,
      event.utmContent,
      event.utmTerm,
      event.utmSource,
      event.utmMedium,
      event.utmCampaign,
      event.utmContent,
      event.utmTerm,
      event.country,
      event.region,
      event.city,
      event.country,
      event.region,
      event.city,
      event.deviceType,
      event.deviceType,
      event.browser,
      event.browser,
      event.os,
      event.os,
      event.eventType === 'session_started'
        ? 1
        : 0,
      1,
      pageViewIncrement,
      event.receivedAt,
      event.receivedAt,
      event.eventType === 'session_started'
        ? 1
        : 0,
      pageViewIncrement
    ]
  )
}

async function upsertSession(event) {
  const pageViewIncrement =
    event.eventType === 'page_view' ? 1 : 0

  const converted =
    event.eventType === 'purchase' ? 1 : 0

  await d1Query(
    `INSERT INTO website_sessions (
      session_id,
      visitor_id,
      attribution_id,
      started_at,
      last_activity_at,
      language,
      landing_page,
      exit_page,
      referrer,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      country,
      region,
      city,
      device_type,
      browser,
      os,
      page_views_count,
      events_count,
      engaged_seconds,
      converted,
      created_at,
      updated_at
    )
    VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT(session_id) DO UPDATE SET
      last_activity_at = excluded.last_activity_at,
      exit_page = excluded.exit_page,
      language = excluded.language,
      attribution_id = COALESCE(
        NULLIF(excluded.attribution_id, ''),
        website_sessions.attribution_id
      ),
      page_views_count =
        website_sessions.page_views_count + ?,
      events_count =
        website_sessions.events_count + 1,
      engaged_seconds =
        MAX(
          website_sessions.engaged_seconds,
          excluded.engaged_seconds
        ),
      converted =
        MAX(
          website_sessions.converted,
          excluded.converted
        ),
      updated_at = excluded.updated_at`,
    [
      event.sessionId,
      event.visitorId,
      event.attributionId,
      event.occurredAt,
      event.occurredAt,
      event.language,
      event.pagePath,
      event.pagePath,
      event.referrer,
      event.source,
      event.utmSource,
      event.utmMedium,
      event.utmCampaign,
      event.utmContent,
      event.utmTerm,
      event.country,
      event.region,
      event.city,
      event.deviceType,
      event.browser,
      event.os,
      pageViewIncrement,
      1,
      event.engagedSeconds,
      converted,
      event.receivedAt,
      event.receivedAt,
      pageViewIncrement
    ]
  )
}

export async function ingestWebsiteEvent(
  body,
  request
) {
  const event = normalizePayload(body, request)

  const missing = []

  if (!event.visitorId) missing.push('visitorId')
  if (!event.sessionId) missing.push('sessionId')
  if (!event.eventId) missing.push('eventId')
  if (!event.eventType) missing.push('eventType')

  if (missing.length) {
    return {
      success: false,
      status: 400,
      error: `Missing required fields: ${missing.join(', ')}`
    }
  }

  await upsertAttribution(event)

  const inserted = await insertEvent(event)

  if (!inserted) {
    return {
      success: true,
      status: 200,
      duplicate: true,
      event_id: event.eventId
    }
  }

  await upsertVisitor(event)
  await upsertSession(event)

  return {
    success: true,
    status: 201,
    duplicate: false,
    event_id: event.eventId,
    visitor_id: event.visitorId,
    session_id: event.sessionId,
    attribution_id:
      event.attributionId || null,
    geography: {
      country: event.country || null,
      region: event.region || null,
      city: event.city || null
    }
  }
}
