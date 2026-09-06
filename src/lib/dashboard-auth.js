import crypto from 'crypto'

export const DASHBOARD_COOKIE_NAME = 'gilberto_dashboard_auth'
const SESSION_CONTEXT = 'gilberto-dashboard-session-v1'
const MAX_AGE = 60 * 60 * 12

function dashboardPassword() {
  return process.env.DASHBOARD_PASSWORD || ''
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a))
  const right = Buffer.from(String(b))
  if (left.length !== right.length) return false
  return crypto.timingSafeEqual(left, right)
}

export function isDashboardConfigured() {
  return dashboardPassword().length >= 8
}

export function validateDashboardPassword(candidate) {
  const expected = dashboardPassword()
  if (!expected) return false
  return safeEqual(candidate || '', expected)
}

export function getDashboardSessionToken() {
  const password = dashboardPassword()
  if (!password) return ''
  return crypto
    .createHmac('sha256', password)
    .update(SESSION_CONTEXT)
    .digest('hex')
}

export function isDashboardCookieValid(value) {
  const expected = getDashboardSessionToken()
  if (!expected || !value) return false
  return safeEqual(value, expected)
}

export function dashboardCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: MAX_AGE
  }
}
