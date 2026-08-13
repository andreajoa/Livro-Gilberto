import { NextResponse } from 'next/server'
import { isSameOriginOrInternal } from '@/src/lib/server/internalAuth'
import { queueCheckoutSequence } from '@/src/lib/crm/checkoutSequence'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    if (!isSameOriginOrInternal(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await request.json()
    return NextResponse.json({ success: true, ...(await queueCheckoutSequence(body)) })

  } catch (error) {
    return NextResponse.json({ error:error.message }, { status:500 })
  }
}
