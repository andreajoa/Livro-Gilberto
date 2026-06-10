const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const CLOUDFLARE_D1_DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID
const CLOUDFLARE_D1_API_TOKEN = process.env.CLOUDFLARE_D1_API_TOKEN

function assertD1Env() {
  const missing = []
  if (!CLOUDFLARE_ACCOUNT_ID) missing.push('CLOUDFLARE_ACCOUNT_ID')
  if (!CLOUDFLARE_D1_DATABASE_ID) missing.push('CLOUDFLARE_D1_DATABASE_ID')
  if (!CLOUDFLARE_D1_API_TOKEN) missing.push('CLOUDFLARE_D1_API_TOKEN')
  if (missing.length) {
    throw new Error(`Missing D1 env vars: ${missing.join(', ')}`)
  }
}

export async function d1Query(sql, params = []) {
  assertD1Env()

  const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${CLOUDFLARE_D1_DATABASE_ID}/query`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_D1_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sql, params })
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(JSON.stringify(data))
  }

  return data.result
}

export function nowIso() {
  return new Date().toISOString()
}

export function cleanText(value, max = 500) {
  if (value === null || value === undefined) return ''
  return String(value).slice(0, max)
}

export function normalizeLanguage(lang) {
  if (lang === 'en') return 'en'
  if (lang === 'es') return 'es'
  return 'pt'
}
