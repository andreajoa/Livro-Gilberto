import { createHmac, timingSafeEqual } from 'node:crypto'

function secret() {
  const value = process.env.EMAIL_UNSUBSCRIBE_SECRET || process.env.INTERNAL_API_SECRET || ''
  if (process.env.NODE_ENV === 'production' && value.length < 32) {
    throw new Error('EMAIL_UNSUBSCRIBE_SECRET must have at least 32 characters')
  }
  return value || 'development-only-unsubscribe-secret-change-me'
}

function signature(payload) {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

export function createUnsubscribeToken(email, language = 'pt') {
  const payload = Buffer.from(JSON.stringify({
    email: String(email || '').trim().toLowerCase(),
    language: ['pt', 'en', 'es'].includes(language) ? language : 'pt'
  })).toString('base64url')
  return `${payload}.${signature(payload)}`
}

export function verifyUnsubscribeToken(token) {
  try {
    const [payload, sentSignature] = String(token || '').split('.')
    const expected = signature(payload)
    const a = Buffer.from(sentSignature || '')
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (!data.email || !data.email.includes('@')) return null
    return data
  } catch {
    return null
  }
}

export function createUnsubscribeUrl(email, language = 'pt', base = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.gilberto-souza.com') {
  return `${String(base).replace(/\/$/, '')}/api/unsubscribe?token=${encodeURIComponent(createUnsubscribeToken(email, language))}`
}
