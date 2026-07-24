function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

const WRAP_START = `
<div style="background:#0a0a0a;padding:40px 20px;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" style="max-width:560px;margin:0 auto;background:#141210;border:1px solid rgba(212,165,116,0.2);border-radius:14px;overflow:hidden;">
    <tr><td style="background:linear-gradient(135deg,#D4A574,#C9A962);padding:20px 28px;">
      <span style="font-size:11px;letter-spacing:2px;color:#0a0a0a;font-weight:800;text-transform:uppercase;">SUPERAÇÃO · Gilberto de Souza</span>
    </td></tr>
    <tr><td style="padding:32px 28px;color:#eee;">
`

const WRAP_END = `
    </td></tr>
    <tr><td style="padding:20px 28px;border-top:1px solid rgba(212,165,116,0.12);text-align:center;">
      <span style="font-size:11px;color:#666;">Editora Suprema · Hortolândia – SP – Brasil</span>
    </td></tr>
  </table>
</div>
`

function row(label, value) {
  if (!value) return ''
  return `<tr>
    <td style="padding:6px 0;color:#D4A574;font-size:12px;font-weight:700;width:130px;vertical-align:top;">${esc(label)}</td>
    <td style="padding:6px 0;color:#eee;font-size:13px;">${esc(value)}</td>
  </tr>`
}

export function ownerNewOrderEmail(order) {
  const subject = `📋 Novo pedido Superação — ${order.name} — aguardando pagamento`
  const html = `${WRAP_START}
    <h2 style="margin:0 0 16px;color:#fff;font-size:20px;">Novo pedido recebido</h2>
    <p style="color:#aaa;font-size:13px;margin:0 0 20px;">Cliente preencheu os dados de entrega. Pagamento ainda não confirmado.</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row('Pedido ID', order.orderId)}
      ${row('Nome', order.name)}
      ${row('Email', order.email)}
      ${row('WhatsApp', order.whatsapp)}
      ${row('Endereço', `${order.address}, ${order.number}${order.complement ? ' - ' + order.complement : ''}`)}
      ${row('Bairro', order.neighborhood)}
      ${row('Cidade/UF', `${order.city} - ${order.state}`)}
      ${row('CEP', order.cep)}
      ${row('Referência', order.reference)}
      ${row('Frete', `${order.shipping?.name} — R$ ${Number(order.shipping?.price || 0).toFixed(2)} (${order.shipping?.days} dias úteis)`)}
    </table>
  ${WRAP_END}`
  return { subject, html }
}

export function ownerPaymentConfirmedEmail(order) {
  const subject = `💰 VENDA CONFIRMADA Superação — ${order.name} — R$ ${Number(order.total || 0).toFixed(2)}`
  const html = `${WRAP_START}
    <h2 style="margin:0 0 16px;color:#4ade80;font-size:20px;">✅ Pagamento confirmado</h2>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row('Pedido ID', order.orderId)}
      ${row('Nome', order.name)}
      ${row('Email', order.email)}
      ${row('WhatsApp', order.whatsapp)}
      ${row('Total pago', `R$ ${Number(order.total || 0).toFixed(2)}`)}
      ${row('Endereço', `${order.address}, ${order.number}${order.complement ? ' - ' + order.complement : ''}`)}
      ${row('Cidade/UF', `${order.city} - ${order.state}`)}
      ${row('CEP', order.cep)}
      ${row('Referência', order.reference)}
      ${row('Frete', `${order.shipping?.name} — ${order.shipping?.days} dias úteis`)}
    </table>
    <p style="color:#aaa;font-size:12px;margin-top:20px;">Providenciar postagem do livro físico.</p>
  ${WRAP_END}`
  return { subject, html }
}

export function buyerConfirmationEmail(order) {
  const first = esc(String(order.name || 'você').trim().split(/\s+/)[0] || 'você')
  const subject = `Recebemos seu pedido, ${first}! 📦`
  const html = `${WRAP_START}
    <h2 style="margin:0 0 16px;color:#fff;font-size:20px;">Obrigado, ${first}!</h2>
    <p style="color:#ccc;font-size:14px;line-height:1.7;margin:0 0 20px;">
      Recebemos os dados da sua entrega para o livro <strong style="color:#D4A574;">Superação</strong>.
      Assim que o pagamento for confirmado, seu pedido entra na fila de envio.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row('Endereço de entrega', `${order.address}, ${order.number} - ${order.city}/${order.state}`)}
      ${row('Frete escolhido', `${order.shipping?.name} (${order.shipping?.days} dias úteis)`)}
    </table>
    <p style="color:#888;font-size:12px;margin-top:24px;">Qualquer dúvida, responda este email.</p>
  ${WRAP_END}`
  return { subject, html }
}
