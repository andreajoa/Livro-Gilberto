import { randomUUID } from 'node:crypto'
import { d1Query, nowIso } from '@/src/lib/d1'
import { ensureCommerceSchema } from '@/src/lib/commerce/commerceSchema'
import { ensureCrmSchema } from '@/src/lib/crm/crmSchema'

function rows(result) {
  return result?.[0]?.results || []
}

export async function fulfillCheckoutPayment(paymentIntent, checkoutId) {
  const now = nowIso()
  await ensureCommerceSchema(d1Query, now)
  await ensureCrmSchema(d1Query)

  const checkout = rows(await d1Query(
    `SELECT * FROM commerce_checkout_sessions WHERE checkout_id=? LIMIT 1`,
    [checkoutId]
  ))[0]
  if (!checkout) throw new Error('Paid checkout was not found')

  const received = Number(paymentIntent.amount_received || paymentIntent.amount || 0)
  const expected = Math.round(Number(checkout.total) * 100)
  if (received !== expected) throw new Error(`Paid amount mismatch: expected ${expected}, received ${received}`)
  if (checkout.stripe_payment_intent && checkout.stripe_payment_intent !== paymentIntent.id) {
    throw new Error('Payment Intent does not belong to checkout')
  }

  const existing = rows(await d1Query(
    `SELECT * FROM commerce_orders WHERE checkout_id=? LIMIT 1`,
    [checkoutId]
  ))[0]
  if (existing) return existing

  const orderId = `ord_${randomUUID()}`
  await d1Query(
    `INSERT INTO commerce_orders
     (order_id, checkout_id, cart_id, visitor_id, customer_name, customer_email,
      customer_whatsapp, destination_cep, address_street, address_number,
      address_complement, address_neighborhood, address_city, address_state,
      product_id, product_name, quantity, unit_price, shipping_method, shipping_name,
      shipping_amount, subtotal, total, currency, stripe_payment_intent,
      payment_status, fulfillment_status, marketing_consent, paid_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      'paid', 'paid', ?, ?, ?, ?)`,
    [
      orderId, checkout.checkout_id, checkout.cart_id, checkout.visitor_id,
      checkout.customer_name, checkout.customer_email, checkout.customer_whatsapp,
      checkout.destination_cep, checkout.address_street, checkout.address_number,
      checkout.address_complement, checkout.address_neighborhood, checkout.address_city,
      checkout.address_state, checkout.product_id, checkout.product_name, checkout.quantity,
      checkout.unit_price, checkout.shipping_method, checkout.shipping_name,
      checkout.shipping_amount, checkout.subtotal, checkout.total, checkout.currency,
      paymentIntent.id, checkout.marketing_consent, now, now, now
    ]
  )

  await d1Query(
    `UPDATE commerce_checkout_sessions SET status='paid', stripe_payment_intent=?, updated_at=? WHERE checkout_id=?`,
    [paymentIntent.id, now, checkout.checkout_id]
  )
  await d1Query(
    `UPDATE commerce_carts SET status='purchased', updated_at=?, last_activity_at=? WHERE cart_id=?`,
    [now, now, checkout.cart_id]
  )

  await d1Query(
    `INSERT INTO customers
     (visitor_id, name, email, whatsapp, language, product, product_type, amount,
      currency, stripe_payment_intent, access_token, created_at)
     VALUES (?, ?, ?, ?, 'pt', ?, 'physical', ?, ?, ?, '', ?)
     ON CONFLICT(stripe_payment_intent) DO NOTHING`,
    [checkout.visitor_id, checkout.customer_name, checkout.customer_email, checkout.customer_whatsapp,
      checkout.product_name, checkout.total, checkout.currency, paymentIntent.id, now]
  )

  await d1Query(
    `UPDATE email_queue SET status='stopped'
     WHERE email=? AND status IN ('pending','processing') AND sequence_code LIKE '%checkout%'`,
    [checkout.customer_email]
  )
  await d1Query(
    `INSERT INTO contact_status (email, language, checkout_completed, customer, updated_at)
     VALUES (?, 'pt', 1, 1, ?)
     ON CONFLICT(email) DO UPDATE SET checkout_completed=1, customer=1, updated_at=excluded.updated_at`,
    [checkout.customer_email, now]
  )

  return rows(await d1Query(`SELECT * FROM commerce_orders WHERE order_id=? LIMIT 1`, [orderId]))[0]
}

export async function setOrderNotificationState(orderId, fields) {
  const allowed = ['owner_email_status', 'customer_email_status', 'tracking_email_status', 'notification_error']
  const entries = Object.entries(fields).filter(([key]) => allowed.includes(key))
  if (!entries.length) return
  const clauses = entries.map(([key]) => `${key}=?`)
  const values = entries.map(([, value]) => String(value || '').slice(0, 1000))
  await d1Query(
    `UPDATE commerce_orders SET ${clauses.join(', ')}, updated_at=? WHERE order_id=?`,
    [...values, nowIso(), orderId]
  )
}
