import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { dashboardAuthorized } from '@/src/lib/dashboard/auth'
import { d1Query, nowIso, cleanText } from '@/src/lib/d1'
import { ensureCommerceSchema } from '@/src/lib/commerce/commerceSchema'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)
const STATUSES = new Set(['paid', 'preparing', 'shipped', 'delivered'])

function rows(result) {
  return result?.[0]?.results || []
}

function esc(value) {
  return String(value || '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

async function trackingEmail(order) {
  if (!order.tracking_code) throw new Error('Código de rastreio obrigatório')
  const support = process.env.SUPPORT_EMAIL || 'contato@gilberto-souza.com'
  const from = process.env.EMAIL_FROM || 'Gilberto de Souza <noreply@gilberto-souza.com>'
  const result = await resend.emails.send({
    from,
    to: order.customer_email,
    subject: '📦 Seu livro foi enviado — acompanhe a entrega',
    html: `<div style="background:#f7efe1;padding:32px 12px;font-family:Arial,sans-serif"><div style="max-width:640px;margin:auto;background:#fffaf2;border-radius:18px;padding:32px;color:#211811"><h1 style="font-family:Georgia,serif;color:#103b22">Seu pedido está a caminho</h1><p>Olá, <strong>${esc(order.customer_name.split(/\s+/)[0])}</strong>.</p><p>Seu livro foi preparado e entregue à transportadora.</p><div style="background:#f4efe5;border-radius:12px;padding:18px;margin:22px 0"><strong>Código de rastreio</strong><div style="font-size:22px;letter-spacing:1px;margin-top:8px">${esc(order.tracking_code)}</div><div style="color:#6d6258;margin-top:6px">${esc(order.tracking_carrier || 'Transportadora')}</div></div><p>Guarde este e-mail para acompanhar o envio. Em caso de dúvida, responda esta mensagem ou escreva para <a href="mailto:${esc(support)}">${esc(support)}</a>.</p></div></div>`
  }, { idempotencyKey: `tracking_${order.order_id}_${order.tracking_code}`.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 256) })
  if (result?.error) throw new Error(result.error.message || 'Falha ao enviar rastreamento')
  return result
}

export async function POST(request, context) {
  if (!dashboardAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await ensureCommerceSchema(d1Query)
    const { id } = await context.params
    const orderId = cleanText(id, 120)
    const body = await request.json()
    const current = rows(await d1Query(`SELECT * FROM commerce_orders WHERE order_id=? LIMIT 1`, [orderId]))[0]
    if (!current) return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 })

    if (body.action === 'resend_tracking') {
      try {
        await trackingEmail(current)
        await d1Query(`UPDATE commerce_orders SET tracking_email_status='sent', notification_error='', updated_at=? WHERE order_id=?`, [nowIso(), orderId])
        return NextResponse.json({ success: true, trackingEmail: 'sent' })
      } catch (error) {
        await d1Query(`UPDATE commerce_orders SET tracking_email_status='failed', notification_error=?, updated_at=? WHERE order_id=?`, [cleanText(error.message, 1000), nowIso(), orderId])
        return NextResponse.json({ error: error.message }, { status: 502 })
      }
    }

    const status = cleanText(body.status, 30)
    if (!STATUSES.has(status)) return NextResponse.json({ error: 'Status inválido' }, { status: 400 })
    const trackingCode = cleanText(body.trackingCode || current.tracking_code, 120).toUpperCase()
    const carrier = cleanText(body.carrier || current.tracking_carrier || 'Correios', 120)
    if (status === 'shipped' && !trackingCode) return NextResponse.json({ error: 'Informe o código de rastreio' }, { status: 400 })

    const now = nowIso()
    await d1Query(
      `UPDATE commerce_orders SET fulfillment_status=?, tracking_code=?, tracking_carrier=?,
       prepared_at=CASE WHEN ?='preparing' AND prepared_at IS NULL THEN ? ELSE prepared_at END,
       shipped_at=CASE WHEN ?='shipped' AND shipped_at IS NULL THEN ? ELSE shipped_at END,
       delivered_at=CASE WHEN ?='delivered' AND delivered_at IS NULL THEN ? ELSE delivered_at END,
       updated_at=? WHERE order_id=?`,
      [status, trackingCode, carrier, status, now, status, now, status, now, now, orderId]
    )

    let trackingStatus = current.tracking_email_status
    if (status === 'shipped') {
      const updated = { ...current, fulfillment_status: status, tracking_code: trackingCode, tracking_carrier: carrier }
      try {
        await trackingEmail(updated)
        trackingStatus = 'sent'
        await d1Query(`UPDATE commerce_orders SET tracking_email_status='sent', notification_error='', updated_at=? WHERE order_id=?`, [nowIso(), orderId])
      } catch (error) {
        trackingStatus = 'failed'
        await d1Query(`UPDATE commerce_orders SET tracking_email_status='failed', notification_error=?, updated_at=? WHERE order_id=?`, [cleanText(error.message, 1000), nowIso(), orderId])
      }
    }

    return NextResponse.json({ success: true, status, trackingEmail: trackingStatus })
  } catch (error) {
    console.error('Order update error:', error)
    return NextResponse.json({ error: 'Não foi possível atualizar o pedido' }, { status: 500 })
  }
}
