import { NextResponse } from 'next/server'
import {
  DASHBOARD_COOKIE_NAME,
  dashboardCookieOptions,
  getDashboardSessionToken,
  isDashboardConfigured,
  validateDashboardPassword
} from '@/src/lib/dashboard-auth'

export async function POST(request) {
  const target = new URL('/dashboard', request.url)

  if (!isDashboardConfigured()) {
    target.searchParams.set('error', 'config')
    return NextResponse.redirect(target, 303)
  }

  let password = ''

  try {
    const form = await request.formData()
    password = String(form.get('password') || '')
  } catch {
    target.searchParams.set('error', 'invalid')
    return NextResponse.redirect(target, 303)
  }

  if (!validateDashboardPassword(password)) {
    target.searchParams.set('error', 'invalid')
    return NextResponse.redirect(target, 303)
  }

  const response = NextResponse.redirect(target, 303)
  response.cookies.set(
    DASHBOARD_COOKIE_NAME,
    getDashboardSessionToken(),
    dashboardCookieOptions()
  )
  return response
}
