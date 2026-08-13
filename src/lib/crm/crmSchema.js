export const CRM_SCHEMA = [
  `CREATE TABLE IF NOT EXISTS visitors (
    id TEXT PRIMARY KEY,
    language TEXT,
    first_visit TEXT,
    last_visit TEXT,
    visits INTEGER NOT NULL DEFAULT 0,
    source TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id TEXT,
    email TEXT,
    language TEXT,
    event_type TEXT NOT NULL,
    page TEXT,
    metadata TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id TEXT,
    name TEXT,
    email TEXT NOT NULL,
    whatsapp TEXT,
    language TEXT NOT NULL DEFAULT 'pt',
    source TEXT,
    consent INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'lead',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(email, language)
  )`,

  `CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id TEXT,
    name TEXT,
    email TEXT NOT NULL,
    whatsapp TEXT,
    language TEXT NOT NULL DEFAULT 'pt',
    product TEXT,
    product_type TEXT,
    amount REAL,
    currency TEXT,
    stripe_payment_intent TEXT UNIQUE,
    access_token TEXT,
    created_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS contact_status (
    email TEXT PRIMARY KEY,
    language TEXT NOT NULL DEFAULT 'pt',
    lead_started INTEGER NOT NULL DEFAULT 0,
    lead_completed INTEGER NOT NULL DEFAULT 0,
    checkout_started INTEGER NOT NULL DEFAULT 0,
    checkout_completed INTEGER NOT NULL DEFAULT 0,
    manual_started INTEGER NOT NULL DEFAULT 0,
    manual_completed INTEGER NOT NULL DEFAULT 0,
    completed_all_sequences INTEGER NOT NULL DEFAULT 0,
    customer INTEGER NOT NULL DEFAULT 0,
    unsubscribed INTEGER NOT NULL DEFAULT 0,
    bounced INTEGER NOT NULL DEFAULT 0,
    complained INTEGER NOT NULL DEFAULT 0,
    suppressed_reason TEXT,
    updated_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS email_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id TEXT,
    email TEXT NOT NULL,
    name TEXT,
    language TEXT NOT NULL DEFAULT 'pt',
    sequence_code TEXT NOT NULL,
    email_number INTEGER NOT NULL,
    subject TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    scheduled_at TEXT NOT NULL,
    claimed_at TEXT,
    sent_at TEXT,
    retry_count INTEGER NOT NULL DEFAULT 0,
    last_error TEXT,
    created_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS email_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    queue_id INTEGER,
    email TEXT NOT NULL,
    language TEXT,
    sequence_code TEXT,
    email_number INTEGER,
    subject TEXT,
    status TEXT NOT NULL,
    resend_id TEXT,
    error TEXT,
    created_at TEXT NOT NULL
  )`,

  `CREATE INDEX IF NOT EXISTS idx_events_visitor ON events(visitor_id)`,
  `CREATE INDEX IF NOT EXISTS idx_events_email ON events(email)`,
  `CREATE INDEX IF NOT EXISTS idx_email_queue_due ON email_queue(status, scheduled_at)`,
  `CREATE INDEX IF NOT EXISTS idx_email_queue_email ON email_queue(email)`,
  `CREATE INDEX IF NOT EXISTS idx_email_logs_resend ON email_logs(resend_id)`
]

export async function ensureCrmSchema(d1Query) {
  for (const sql of CRM_SCHEMA) {
    await d1Query(sql)
  }

  const additiveMigrations = [
    `ALTER TABLE email_queue ADD COLUMN claimed_at TEXT`,
    `ALTER TABLE email_queue ADD COLUMN retry_count INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE email_queue ADD COLUMN last_error TEXT`,
    `ALTER TABLE contact_status ADD COLUMN bounced INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE contact_status ADD COLUMN complained INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE contact_status ADD COLUMN suppressed_reason TEXT`
  ]

  for (const sql of additiveMigrations) {
    try {
      await d1Query(sql)
    } catch (error) {
      if (!String(error?.message || error).toLowerCase().includes('duplicate column')) throw error
    }
  }
}
