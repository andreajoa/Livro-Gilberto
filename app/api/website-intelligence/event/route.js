import { NextResponse } from 'next/server'

import {
  d1Query
} from '@/src/lib/d1'

import {
  ensureWebsiteIntelligenceSchema
} from '@/src/lib/website/websiteIntelligenceSchema'

import {
  ingestWebsiteEvent
} from '@/src/lib/website/websiteEventServer'

export const dynamic = 'force-dynamic'

let schemaInitializationPromise = null

async function ensureSchemaReady() {
  if (!schemaInitializationPromise) {
    schemaInitializationPromise =
      ensureWebsiteIntelligenceSchema(
        d1Query
      ).catch((error) => {
        /*
         * Permite nova tentativa em uma requisição posterior
         * caso a Cloudflare esteja temporariamente indisponível.
         */
        schemaInitializationPromise = null
        throw error
      })
  }

  return schemaInitializationPromise
}

const MAX_BODY_BYTES = 32 * 1024

export async function POST(request) {
  try {
    const contentLength = Number(
      request.headers.get('content-length') || 0
    )

    if (
      contentLength &&
      contentLength > MAX_BODY_BYTES
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payload too large'
        },
        {
          status: 413
        }
      )
    }

    const body = await request.json()

    /*
     * Garante que a primeira visita já possa ser registrada,
     * mesmo que ainda não tenha ocorrido nenhuma compra.
     */
    await ensureSchemaReady()

    const result = await ingestWebsiteEvent(
      body,
      request
    )

    return NextResponse.json(
      result,
      {
        status: result.status || 200,
        headers: {
          'Cache-Control':
            'no-store, max-age=0'
        }
      }
    )
  } catch (error) {
    console.error(
      'Website event ingestion error:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to ingest event'
      },
      {
        status: 500,
        headers: {
          'Cache-Control':
            'no-store, max-age=0'
        }
      }
    )
  }
}
