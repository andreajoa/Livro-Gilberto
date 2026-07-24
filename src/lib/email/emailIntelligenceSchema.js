export const EMAIL_INTELLIGENCE_SCHEMA = [
  `CREATE TABLE IF NOT EXISTS email_webhook_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    svix_id TEXT NOT NULL UNIQUE,
    event_type TEXT NOT NULL,
    resend_id TEXT,
    email TEXT,
    subject TEXT,
    language TEXT,
    sequence_code TEXT,
    email_number INTEGER,
    template_version TEXT,
    project TEXT,
    link TEXT,
    link_type TEXT,
    ip_address TEXT,
    user_agent TEXT,
    event_created_at TEXT,
    received_at TEXT NOT NULL,
    raw_json TEXT NOT NULL
  )`,

  `CREATE INDEX IF NOT EXISTS idx_email_webhook_resend
   ON email_webhook_events(resend_id)`,

  `CREATE INDEX IF NOT EXISTS idx_email_webhook_email
   ON email_webhook_events(email)`,

  `CREATE INDEX IF NOT EXISTS idx_email_webhook_type
   ON email_webhook_events(event_type)`,

  `CREATE INDEX IF NOT EXISTS idx_email_webhook_language
   ON email_webhook_events(language)`,

  `CREATE INDEX IF NOT EXISTS idx_email_webhook_sequence
   ON email_webhook_events(sequence_code)`,

  `CREATE INDEX IF NOT EXISTS idx_email_webhook_created
   ON email_webhook_events(event_created_at)`
]

export async function ensureEmailIntelligenceSchema(d1Query) {
  for (const sql of EMAIL_INTELLIGENCE_SCHEMA) {
    await d1Query(sql)
  }
}
