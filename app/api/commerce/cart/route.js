import { NextResponse } from 'next/server'
import { d1Query, nowIso, cleanText } from '@/src/lib/d1'
import { ensureCommerceSchema } from '@/src/lib/commerce/commerceSchema'

export const dynamic = 'force-dynamic'

function validId(value) {
  const id = cleanText(value, 120)
  return /^[a-z0-9_-]{16,120}$/i.test(id) ? id : ''
}

export async function POST(request) {
  try {
    const body = await request.json()
    const cartId = validId(body.cartId)
    if (!cartId) return NextResponse.json({ error: 'cartId inválido' }, { status: 400 })

    const quantity = Math.min(20, Math.max(1, Math.floor(Number(body.quantity) || 1)))
    const status = ['active', 'checkout', 'purchased', 'removed'].includes(body.status) ? body.status : 'active'
    const now = nowIso()

    await ensureCommerceSchema(d1Query, now)
    await d1Query(
      `INSERT INTO commerce_carts
       (cart_id, visitor_id, session_id, status, product_id, quantity, destination_cep,
        shipping_method, subtotal, shipping_amount, total, currency, last_activity_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'gilberto_physical_pt', ?, ?, ?, ?, ?, ?, 'BRL', ?, ?, ?)
       ON CONFLICT(cart_id) DO UPDATE SET
         visitor_id=COALESCE(NULLIF(excluded.visitor_id,''), commerce_carts.visitor_id),
         session_id=COALESCE(NULLIF(excluded.session_id,''), commerce_carts.session_id),
         status=excluded.status,
         quantity=excluded.quantity,
         destination_cep=excluded.destination_cep,
         shipping_method=excluded.shipping_method,
         subtotal=excluded.subtotal,
         shipping_amount=excluded.shipping_amount,
         total=excluded.total,
         last_activity_at=excluded.last_activity_at,
         updated_at=excluded.updated_at`,
      [
        cartId,
        cleanText(body.visitorId, 120),
        cleanText(body.sessionId, 120),
        status,
        quantity,
        cleanText(body.cep, 8).replace(/\D/g, ''),
        cleanText(body.shippingMethod, 20).toUpperCase(),
        Number(body.subtotal) || 0,
        Number(body.shippingAmount) || 0,
        Number(body.total) || 0,
        now,
        now,
        now
      ]
    )

    return NextResponse.json({ success: true, cartId })
  } catch (error) {
    console.error('Commerce cart error:', error)
    return NextResponse.json({ error: 'Não foi possível salvar o carrinho' }, { status: 500 })
  }
}
