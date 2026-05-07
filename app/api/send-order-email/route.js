import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { order, type } = await request.json()

    if (type === 'physical') {
      // Email para o VENDEDOR
      await resend.emails.send({
        from: 'Loja Gilberto <noreply@gilbertosouza.com>',
        to: process.env.OWNER_EMAIL || 'contato@gilbertosouza.com',
        subject: `🚨 NOVA VENDA — ${order.name} — R$ ${order.total}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1B3E;color:#fff;padding:32px;border-radius:8px">
            <h1 style="color:#00C4D4;font-size:24px;margin-bottom:24px">📦 Nova Venda — Livro Físico</h1>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#8A9BBF;width:140px">Nome</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-weight:bold">${order.name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#8A9BBF">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1)">${order.email}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#8A9BBF">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#00C4D4;font-weight:bold">${order.whatsapp}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#8A9BBF">CEP</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1)">${order.cep}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#8A9BBF">Endereço</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1)">${order.address}, ${order.complement || ''}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#8A9BBF">Bairro</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1)">${order.neighborhood}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#8A9BBF">Cidade/Estado</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1)">${order.city} — ${order.state}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#8A9BBF">Frete</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1)">${order.shippingName} — R$ ${order.shippingPrice}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);color:#8A9BBF">Qtd</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1)">${order.quantity}x livro</td></tr>
              <tr><td style="padding:10px 0;color:#8A9BBF">TOTAL PAGO</td><td style="padding:10px 0;color:#00C4D4;font-size:20px;font-weight:bold">R$ ${order.total}</td></tr>
            </table>
            <p style="margin-top:24px;font-size:13px;color:#8A9BBF">Stripe Payment Intent: ${order.paymentIntentId}</p>
          </div>
        `
      })

      // Email para o COMPRADOR
      await resend.emails.send({
        from: 'Gilberto de Souza <noreply@gilbertosouza.com>',
        to: order.email,
        subject: '✅ Pedido confirmado — Como Vencer a Dor de Ser Trocado Por Outro',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1B3E;color:#fff;padding:32px;border-radius:8px">
            <h1 style="color:#00C4D4;font-size:24px;margin-bottom:8px">Obrigado, ${order.name.split(' ')[0]}!</h1>
            <p style="color:#B8C8E0;font-size:16px;margin-bottom:32px">Seu pedido foi confirmado e o pagamento foi processado com sucesso.</p>
            <div style="background:rgba(0,196,212,0.1);border:1px solid rgba(0,196,212,0.3);border-radius:8px;padding:24px;margin-bottom:24px">
              <h2 style="color:#fff;font-size:18px;margin:0 0 16px">📦 Detalhes do Pedido</h2>
              <p style="margin:4px 0;color:#B8C8E0">Livro: <strong style="color:#fff">Como Vencer a Dor de Ser Trocado Por Outro</strong></p>
              <p style="margin:4px 0;color:#B8C8E0">Quantidade: <strong style="color:#fff">${order.quantity}x</strong></p>
              <p style="margin:4px 0;color:#B8C8E0">Frete: <strong style="color:#fff">${order.shippingName}</strong></p>
              <p style="margin:8px 0 0;color:#B8C8E0">Total pago: <strong style="color:#00C4D4;font-size:20px">R$ ${order.total}</strong></p>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:24px;margin-bottom:24px">
              <h2 style="color:#fff;font-size:18px;margin:0 0 16px">🏠 Endereço de Entrega</h2>
              <p style="margin:4px 0;color:#B8C8E0">${order.address}${order.complement ? ', ' + order.complement : ''}</p>
              <p style="margin:4px 0;color:#B8C8E0">${order.neighborhood} — ${order.city}/${order.state}</p>
              <p style="margin:4px 0;color:#B8C8E0">CEP: ${order.cep}</p>
            </div>
            <div style="background:rgba(0,196,212,0.08);border-left:4px solid #00C4D4;padding:20px;border-radius:4px;margin-bottom:24px">
              <p style="margin:0;color:#fff;font-size:15px;line-height:1.7">📬 <strong>Postagem em até 2 dias úteis.</strong> Assim que postarmos, você receberá o código de rastreamento neste email e no seu WhatsApp <strong>${order.whatsapp}</strong>.</p>
            </div>
            <p style="color:#8A9BBF;font-size:13px;text-align:center">Dúvidas? contato@gilbertosouza.com</p>
          </div>
        `
      })
    }

    if (type === 'digital') {
      // Email para o VENDEDOR
      await resend.emails.send({
        from: 'Loja Gilberto <noreply@gilbertosouza.com>',
        to: process.env.OWNER_EMAIL || 'contato@gilbertosouza.com',
        subject: `💻 NOVA VENDA DIGITAL — ${order.name} — ${order.lang?.toUpperCase()}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1B3E;color:#fff;padding:32px;border-radius:8px">
            <h1 style="color:#00C4D4">💻 Nova Venda — eBook + Audiobook</h1>
            <p><strong>Nome:</strong> ${order.name}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Idioma:</strong> ${order.lang}</p>
            <p><strong>Valor:</strong> ${order.lang === 'pt' ? 'R$ 47,00' : '$17.00 USD'}</p>
            <p><strong>Payment Intent:</strong> ${order.paymentIntentId}</p>
          </div>
        `
      })

      // Email para o COMPRADOR com links de download
      const langLabel = order.lang === 'pt' ? 'Português' : order.lang === 'en' ? 'English' : 'Español'
      await resend.emails.send({
        from: 'Gilberto de Souza <noreply@gilbertosouza.com>',
        to: order.email,
        subject: '✅ Seu eBook + Audiobook — Acesso Imediato',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0D1B3E;color:#fff;padding:32px;border-radius:8px">
            <h1 style="color:#00C4D4">Obrigado, ${order.name.split(' ')[0]}!</h1>
            <p style="color:#B8C8E0">Seu acesso ao eBook + Audiobook (${langLabel}) foi liberado.</p>
            <div style="background:rgba(0,196,212,0.1);border:1px solid rgba(0,196,212,0.3);border-radius:8px;padding:24px;margin:24px 0">
              <h2 style="color:#fff;margin:0 0 16px">📥 Seus Downloads</h2>
              <a href="${order.accessUrl}" style="display:inline-block;background:linear-gradient(135deg,#00C4D4,#0099A8);color:#0D1B3E;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px">Acessar eBook + Audiobook →</a>
            </div>
            <p style="color:#8A9BBF;font-size:13px">Guarde este email. O link é exclusivo para você.</p>
          </div>
        `
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
