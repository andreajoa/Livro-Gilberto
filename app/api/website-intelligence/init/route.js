import { NextResponse } from 'next/server'
import { d1Query } from '@/src/lib/d1'
import {
  WEBSITE_INTELLIGENCE_SCHEMA_VERSION,
  ensureWebsiteIntelligenceSchema
} from '@/src/lib/website/websiteIntelligenceSchema'

export const dynamic = 'force-dynamic'

function isAuthorized(request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  const authorization = request.headers.get('authorization')

  const cronAuthorized =
    process.env.CRON_SECRET &&
    authorization === `Bearer ${process.env.CRON_SECRET}`

  const tokenAuthorized =
    process.env.EMAIL_CRON_TOKEN &&
    token === process.env.EMAIL_CRON_TOKEN

  return Boolean(cronAuthorized || tokenAuthorized)
}

export async function GET(request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized'
        },
        {
          status: 401
        }
      )
    }

    const now = new Date().toISOString()

    await ensureWebsiteIntelligenceSchema(
      d1Query,
      now
    )

    return NextResponse.json({
      success: true,
      project: 'livro_gilberto',
      subsystem: 'website_intelligence',
      schema_version:
        WEBSITE_INTELLIGENCE_SCHEMA_VERSION,
      initialized: true,
      initialized_at: now
    })
  } catch (error) {
    console.error(
      'Website intelligence init error:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      {
        status: 500
      }
    )
  }
}
