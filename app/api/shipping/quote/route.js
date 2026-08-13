import { NextResponse } from 'next/server'
import { assertPrivateShippingConfiguration, lookupDestinationCep, shippingQuotes } from '@/src/lib/commerce/shippingServer'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    assertPrivateShippingConfiguration()
    const { cep } = await request.json()
    const address = await lookupDestinationCep(cep)

    return NextResponse.json({
      success: true,
      destination: address,
      quotes: shippingQuotes(address)
    }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Não foi possível calcular o frete' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
