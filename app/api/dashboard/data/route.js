import { NextResponse } from 'next/server'
import { dashboardAuthorized } from '@/src/lib/dashboard/auth'
import { loadDashboardData } from '@/src/lib/dashboard/dashboardData'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  if (!dashboardAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    return NextResponse.json(await loadDashboardData(), { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Dashboard data error:', error)
    return NextResponse.json({ error: 'Não foi possível carregar os dados do painel.' }, { status: 500 })
  }
}
