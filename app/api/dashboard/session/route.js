import { NextResponse } from 'next/server'
import { dashboardAuthorized } from '@/src/lib/dashboard/auth'

export async function GET(request) {
  return NextResponse.json({ authenticated: dashboardAuthorized(request) }, { headers: { 'Cache-Control': 'no-store' } })
}
