import { NextResponse } from 'next/server'
import {
  DASHBOARD_COOKIE,
  createDashboardSession,
  dashboardCookieOptions,
  validDashboardPassword
} from '@/src/lib/dashboard/auth'

const attempts = new Map()

function clientKey(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

export async function POST(request) {
  const key = clientKey(request)
  const recent = (attempts.get(key) || []).filter(time => Date.now() - time < 15 * 60 * 1000)
  if (recent.length >= 8) {
    return NextResponse.json({ error: 'Muitas tentativas. Aguarde 15 minutos.' }, { status: 429 })
  }

  const { password } = await request.json().catch(() => ({}))
  if (!validDashboardPassword(password)) {
    attempts.set(key, [...recent, Date.now()])
    return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 })
  }

  attempts.delete(key)
  const response = NextResponse.json({ success: true })
  response.cookies.set(DASHBOARD_COOKIE, createDashboardSession(), dashboardCookieOptions)
  return response
}
