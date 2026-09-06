import { NextResponse } from 'next/server'
import { DASHBOARD_COOKIE_NAME } from '@/src/lib/dashboard-auth'

export async function POST(request) {
  const response = NextResponse.redirect(new URL('/dashboard', request.url), 303)
  response.cookies.set(DASHBOARD_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0
  })
  return response
}
