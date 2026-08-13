import { timingSafeEqual } from 'node:crypto'

function constantTimeEqual(left, right) {
  const a = Buffer.from(String(left || ''))
  const b = Buffer.from(String(right || ''))
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function getInternalSecret() {
  return process.env.INTERNAL_API_SECRET || ''
}

export function isInternalRequest(request) {
  const expected = getInternalSecret()
  if (!expected) return process.env.NODE_ENV !== 'production'
  return constantTimeEqual(request.headers.get('x-internal-secret'), expected)
}

export function internalHeaders(extra = {}) {
  return {
    'Content-Type': 'application/json',
    'x-internal-secret': getInternalSecret(),
    ...extra
  }
}

export function isSameOriginOrInternal(request) {
  if (isInternalRequest(request)) return true
  try {
    const origin = request.headers.get('origin')
    const fetchSite = request.headers.get('sec-fetch-site')
    if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return false
    return Boolean(origin) && new URL(origin).origin === new URL(request.url).origin
  } catch {
    return false
  }
}
