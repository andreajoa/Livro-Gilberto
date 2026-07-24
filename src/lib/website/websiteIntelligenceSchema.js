export const WEBSITE_INTELLIGENCE_SCHEMA_VERSION = 3

export const WEBSITE_INTELLIGENCE_SCHEMA = [
  `CREATE TABLE IF NOT EXISTS website_visitors (
    visitor_id TEXT PRIMARY KEY,
    first_seen_at TEXT NOT NULL,
    last_seen_at TEXT NOT NULL,
    first_language TEXT,
    last_language TEXT,
    first_page TEXT,
    last_page TEXT,
    first_referrer TEXT,
    last_referrer TEXT,
    first_source TEXT,
    last_source TEXT,
    first_utm_source TEXT,
    first_utm_medium TEXT,
    first_utm_campaign TEXT,
    first_utm_content TEXT,
    first_utm_term TEXT,
    last_utm_source TEXT,
    last_utm_medium TEXT,
    last_utm_campaign TEXT,
    last_utm_content TEXT,
    last_utm_term TEXT,
    first_country TEXT,
    first_region TEXT,
    first_city TEXT,
    last_country TEXT,
    last_region TEXT,
    last_city TEXT,
    first_device_type TEXT,
    last_device_type TEXT,
    first_browser TEXT,
    last_browser TEXT,
    first_os TEXT,
    last_os TEXT,
    sessions_count INTEGER NOT NULL DEFAULT 0,
    events_count INTEGER NOT NULL DEFAULT 0,
    page_views_count INTEGER NOT NULL DEFAULT 0,
    lead_email_hash TEXT,
    customer INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS website_sessions (
    session_id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    attribution_id TEXT,
    started_at TEXT NOT NULL,
    last_activity_at TEXT NOT NULL,
    ended_at TEXT,
    language TEXT,
    landing_page TEXT,
    exit_page TEXT,
    referrer TEXT,
    source TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    page_views_count INTEGER NOT NULL DEFAULT 0,
    events_count INTEGER NOT NULL DEFAULT 0,
    engaged_seconds INTEGER NOT NULL DEFAULT 0,
    converted INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS website_attributions (
    attribution_id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    session_id TEXT,
    attribution_type TEXT NOT NULL,
    channel TEXT,
    source TEXT,
    medium TEXT,
    campaign TEXT,
    content TEXT,
    term TEXT,
    referrer TEXT,
    landing_page TEXT,
    email_resend_id TEXT,
    email_sequence_code TEXT,
    email_number INTEGER,
    book_id TEXT,
    product_id TEXT,
    creative_id TEXT,
    experiment_id TEXT,
    first_touch INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS website_events (
    event_id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    session_id TEXT NOT NULL,
    attribution_id TEXT,
    event_type TEXT NOT NULL,
    event_category TEXT,
    language TEXT,
    page_path TEXT,
    page_url TEXT,
    page_title TEXT,
    referrer TEXT,
    source TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    book_id TEXT,
    product_id TEXT,
    element_id TEXT,
    element_type TEXT,
    element_text TEXT,
    destination_url TEXT,
    channel TEXT,
    creative_id TEXT,
    slide_id TEXT,
    experiment_id TEXT,
    variant_id TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    viewport_width INTEGER,
    viewport_height INTEGER,
    screen_width INTEGER,
    screen_height INTEGER,
    scroll_depth INTEGER,
    engaged_seconds INTEGER,
    metadata TEXT NOT NULL DEFAULT '{}',
    occurred_at TEXT NOT NULL,
    received_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS website_conversions (
    conversion_id TEXT PRIMARY KEY,
    event_id TEXT,
    visitor_id TEXT NOT NULL,
    session_id TEXT,
    attribution_id TEXT,
    conversion_type TEXT NOT NULL,
    book_id TEXT,
    product_id TEXT,
    language TEXT,
    channel TEXT,
    currency TEXT,
    amount REAL,
    stripe_payment_intent TEXT,
    external_retailer TEXT,
    external_click_id TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    metadata TEXT NOT NULL DEFAULT '{}',
    converted_at TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS website_stripe_webhook_events (
    stripe_event_id TEXT PRIMARY KEY,
    stripe_event_type TEXT NOT NULL,
    stripe_payment_intent TEXT,
    status TEXT NOT NULL DEFAULT 'received',
    attempts INTEGER NOT NULL DEFAULT 1,
    last_error TEXT,
    received_at TEXT NOT NULL,
    processing_started_at TEXT,
    completed_at TEXT,
    updated_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS website_stripe_webhook_steps (
    stripe_event_id TEXT NOT NULL,
    step_code TEXT NOT NULL,
    completed_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (
      stripe_event_id,
      step_code
    )
  )`,

  `CREATE TABLE IF NOT EXISTS website_schema_versions (
    version INTEGER PRIMARY KEY,
    description TEXT NOT NULL,
    applied_at TEXT NOT NULL
  )`,

  `CREATE INDEX IF NOT EXISTS idx_website_events_visitor
   ON website_events(visitor_id)`,

  `CREATE INDEX IF NOT EXISTS idx_website_events_session
   ON website_events(session_id)`,

  `CREATE INDEX IF NOT EXISTS idx_website_events_attribution
   ON website_events(attribution_id)`,

  `CREATE INDEX IF NOT EXISTS idx_website_events_type
   ON website_events(event_type)`,

  `CREATE INDEX IF NOT EXISTS idx_website_events_occurred
   ON website_events(occurred_at)`,

  `CREATE INDEX IF NOT EXISTS idx_website_events_language
   ON website_events(language)`,

  `CREATE INDEX IF NOT EXISTS idx_website_events_country
   ON website_events(country)`,

  `CREATE INDEX IF NOT EXISTS idx_website_events_book
   ON website_events(book_id)`,

  `CREATE INDEX IF NOT EXISTS idx_website_events_product
   ON website_events(product_id)`,

  `CREATE INDEX IF NOT EXISTS idx_website_events_channel
   ON website_events(channel)`,

  `CREATE INDEX IF NOT EXISTS idx_website_sessions_visitor
   ON website_sessions(visitor_id)`,

  `CREATE INDEX IF NOT EXISTS idx_website_sessions_started
   ON website_sessions(started_at)`,

  `CREATE INDEX IF NOT EXISTS idx_website_attributions_visitor
   ON website_attributions(visitor_id)`,

  `CREATE INDEX IF NOT EXISTS idx_website_attributions_campaign
   ON website_attributions(campaign)`,

  `CREATE INDEX IF NOT EXISTS idx_website_conversions_visitor
   ON website_conversions(visitor_id)`,

  `CREATE INDEX IF NOT EXISTS idx_website_conversions_book
   ON website_conversions(book_id)`,

  `CREATE INDEX IF NOT EXISTS idx_website_conversions_date
   ON website_conversions(converted_at)`,

  `CREATE UNIQUE INDEX IF NOT EXISTS idx_website_conversions_stripe
   ON website_conversions(stripe_payment_intent)`,

  `CREATE INDEX IF NOT EXISTS idx_website_stripe_status
   ON website_stripe_webhook_events(status)`,

  `CREATE INDEX IF NOT EXISTS idx_website_stripe_payment
   ON website_stripe_webhook_events(stripe_payment_intent)`,

  `CREATE INDEX IF NOT EXISTS idx_website_stripe_steps_event
   ON website_stripe_webhook_steps(stripe_event_id)`
]

export async function ensureWebsiteIntelligenceSchema(
  d1Query,
  now = new Date().toISOString()
) {
  for (const sql of WEBSITE_INTELLIGENCE_SCHEMA) {
    await d1Query(sql)
  }

  await d1Query(
    `INSERT INTO website_schema_versions
     (version, description, applied_at)
     VALUES (?, ?, ?)
     ON CONFLICT(version) DO NOTHING`,
    [
      WEBSITE_INTELLIGENCE_SCHEMA_VERSION,
      'Website identity, sessions, attribution, events, conversions and persistent Stripe webhook steps',
      now
    ]
  )
}
