import { NextResponse } from 'next/server'
import { DASHBOARD_COOKIE, dashboardCookieOptions } from '@/src/lib/dashboard/auth'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(DASHBOARD_COOKIE, '', { ...dashboardCookieOptions, maxAge: 0 })
  return response
}
