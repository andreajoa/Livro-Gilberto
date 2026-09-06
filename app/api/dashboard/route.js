import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { d1Query } from '@/src/lib/d1'
import {
  DASHBOARD_COOKIE_NAME,
  isDashboardCookieValid
} from '@/src/lib/dashboard-auth'

export const dynamic = 'force-dynamic'

function rows(result) {
  return result?.[0]?.results || []
}

function count(result) {
  return Number(rows(result)?.[0]?.total || 0)
}

export async function GET() {
  const cookieStore = await cookies()

  if (
    !isDashboardCookieValid(
      cookieStore.get(DASHBOARD_COOKIE_NAME)?.value
    )
  ) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const [
      customerCount,
      leadCount,
      visitorCount,
      eventCount,
      customers,
      leads,
      events
    ] = await Promise.all([
      d1Query('SELECT COUNT(*) AS total FROM customers'),
      d1Query('SELECT COUNT(*) AS total FROM leads'),
      d1Query('SELECT COUNT(*) AS total FROM visitors'),
      d1Query('SELECT COUNT(*) AS total FROM events'),
      d1Query(
        `SELECT name, email, whatsapp, language, product, product_type, amount, currency, created_at
         FROM customers ORDER BY created_at DESC LIMIT 100`
      ),
      d1Query(
        `SELECT name, email, whatsapp, language, source, status, created_at
         FROM leads ORDER BY created_at DESC LIMIT 100`
      ),
      d1Query(
        `SELECT email, language, event_type, page, created_at
         FROM events ORDER BY created_at DESC LIMIT 100`
      )
    ])

    const customersTotal = count(customerCount)
    const leadsTotal = count(leadCount)

    return NextResponse.json({
      stats: {
        customers: customersTotal,
        leads: leadsTotal,
        visitors: count(visitorCount),
        events: count(eventCount),
        conversion:
          leadsTotal > 0
            ? Number(((customersTotal / leadsTotal) * 100).toFixed(1))
            : 0
      },
      customers: rows(customers),
      leads: rows(leads),
      events: rows(events)
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'dashboard_data_unavailable' },
      { status: 500 }
    )
  }
}
