export const COMMERCE_SCHEMA_VERSION = 1

export const COMMERCE_SCHEMA = [
  `CREATE TABLE IF NOT EXISTS commerce_carts (
    cart_id TEXT PRIMARY KEY,
    visitor_id TEXT,
    session_id TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    destination_cep TEXT,
    shipping_method TEXT,
    subtotal REAL NOT NULL DEFAULT 0,
    shipping_amount REAL NOT NULL DEFAULT 0,
    total REAL NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'BRL',
    customer_name TEXT,
    customer_email TEXT,
    customer_whatsapp TEXT,
    marketing_consent INTEGER NOT NULL DEFAULT 0,
    last_activity_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS commerce_checkout_sessions (
    checkout_id TEXT PRIMARY KEY,
    cart_id TEXT NOT NULL,
    visitor_id TEXT,
    session_id TEXT,
    attribution_id TEXT,
    status TEXT NOT NULL DEFAULT 'created',
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_whatsapp TEXT NOT NULL,
    destination_cep TEXT NOT NULL,
    address_street TEXT NOT NULL,
    address_number TEXT NOT NULL,
    address_complement TEXT,
    address_neighborhood TEXT NOT NULL,
    address_city TEXT NOT NULL,
    address_state TEXT NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    shipping_method TEXT NOT NULL,
    shipping_name TEXT NOT NULL,
    shipping_amount REAL NOT NULL,
    shipping_days TEXT,
    subtotal REAL NOT NULL,
    total REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'BRL',
    marketing_consent INTEGER NOT NULL DEFAULT 0,
    stripe_payment_intent TEXT,
    source TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    creative_id TEXT,
    campaign_id TEXT,
    landing_page TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS commerce_orders (
    order_id TEXT PRIMARY KEY,
    checkout_id TEXT NOT NULL UNIQUE,
    cart_id TEXT NOT NULL,
    visitor_id TEXT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_whatsapp TEXT NOT NULL,
    destination_cep TEXT NOT NULL,
    address_street TEXT NOT NULL,
    address_number TEXT NOT NULL,
    address_complement TEXT,
    address_neighborhood TEXT NOT NULL,
    address_city TEXT NOT NULL,
    address_state TEXT NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    shipping_method TEXT NOT NULL,
    shipping_name TEXT NOT NULL,
    shipping_amount REAL NOT NULL,
    subtotal REAL NOT NULL,
    total REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'BRL',
    stripe_payment_intent TEXT NOT NULL UNIQUE,
    payment_status TEXT NOT NULL DEFAULT 'paid',
    fulfillment_status TEXT NOT NULL DEFAULT 'paid',
    tracking_code TEXT,
    tracking_carrier TEXT,
    marketing_consent INTEGER NOT NULL DEFAULT 0,
    owner_email_status TEXT NOT NULL DEFAULT 'pending',
    customer_email_status TEXT NOT NULL DEFAULT 'pending',
    tracking_email_status TEXT,
    notification_error TEXT,
    paid_at TEXT NOT NULL,
    prepared_at TEXT,
    shipped_at TEXT,
    delivered_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS commerce_schema_versions (
    version INTEGER PRIMARY KEY,
    description TEXT NOT NULL,
    applied_at TEXT NOT NULL
  )`,

  `CREATE INDEX IF NOT EXISTS idx_commerce_carts_status_activity
   ON commerce_carts(status, last_activity_at)`,

  `CREATE INDEX IF NOT EXISTS idx_commerce_checkout_status_created
   ON commerce_checkout_sessions(status, created_at)`,

  `CREATE INDEX IF NOT EXISTS idx_commerce_checkout_email
   ON commerce_checkout_sessions(customer_email)`,

  `CREATE UNIQUE INDEX IF NOT EXISTS idx_commerce_checkout_payment
   ON commerce_checkout_sessions(stripe_payment_intent)`,

  `CREATE INDEX IF NOT EXISTS idx_commerce_orders_fulfillment
   ON commerce_orders(fulfillment_status, paid_at)`,

  `CREATE INDEX IF NOT EXISTS idx_commerce_orders_email
   ON commerce_orders(customer_email)`
]

export async function ensureCommerceSchema(d1Query, now = new Date().toISOString()) {
  for (const sql of COMMERCE_SCHEMA) {
    await d1Query(sql)
  }

  await d1Query(
    `INSERT INTO commerce_schema_versions (version, description, applied_at)
     VALUES (?, ?, ?)
     ON CONFLICT(version) DO NOTHING`,
    [COMMERCE_SCHEMA_VERSION, 'Physical checkout, carts, shipping and fulfillment', now]
  )
}
