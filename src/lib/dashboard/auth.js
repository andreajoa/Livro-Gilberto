import { createHmac, timingSafeEqual } from 'node:crypto'

export const DASHBOARD_COOKIE = 'gs_dashboard_session'
const SESSION_TTL_SECONDS = 8 * 60 * 60

function secret() {
  const value = process.env.DASHBOARD_SESSION_SECRET || ''
  if (process.env.NODE_ENV === 'production' && value.length < 32) {
    throw new Error('DASHBOARD_SESSION_SECRET must have at least 32 characters')
  }
  return value || 'development-only-dashboard-secret-change-me'
}

function sign(value) {
  return createHmac('sha256', secret()).update(value).digest('base64url')
}

function equal(left, right) {
  const a = Buffer.from(String(left || ''))
  const b = Buffer.from(String(right || ''))
  return a.length === b.length && timingSafeEqual(a, b)
}

export function validDashboardPassword(value) {
  const expected = process.env.DASHBOARD_PASSWORD || ''
  if (!expected) return process.env.NODE_ENV !== 'production' && equal(value, 'admin')
  return equal(value, expected)
}

export function createDashboardSession() {
  const payload = Buffer.from(JSON.stringify({
    role: 'owner',
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000
  })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifyDashboardSession(token) {
  try {
    const [payload, signature] = String(token || '').split('.')
    if (!payload || !signature || !equal(signature, sign(payload))) return false
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return session.role === 'owner' && Number(session.expiresAt) > Date.now()
  } catch {
    return false
  }
}

export function dashboardAuthorized(request) {
  return verifyDashboardSession(request.cookies.get(DASHBOARD_COOKIE)?.value)
}

export const dashboardCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
  maxAge: SESSION_TTL_SECONDS
}
