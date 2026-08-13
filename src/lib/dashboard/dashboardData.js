import { d1Query } from '@/src/lib/d1'
import { ensureCommerceSchema } from '@/src/lib/commerce/commerceSchema'
import { ensureCrmSchema } from '@/src/lib/crm/crmSchema'
import { ensureWebsiteIntelligenceSchema } from '@/src/lib/website/websiteIntelligenceSchema'
import { ensureEmailIntelligenceSchema } from '@/src/lib/email/emailIntelligenceSchema'

function rows(result) {
  return result?.[0]?.results || []
}

function first(result) {
  return rows(result)[0] || {}
}

function recommendations({ overview, funnel, email, subjects }) {
  const notes = []
  const visits = Number(overview.visitors || 0)
  const carts = Number(funnel.carts || 0)
  const checkouts = Number(funnel.checkouts || 0)
  const orders = Number(funnel.orders || 0)

  if (visits >= 20 && carts / visits < 0.03) {
    notes.push({ priority: 'alta', area: 'Página', title: 'Poucos visitantes adicionam o livro', detail: 'Teste um CTA mais visível, prova social próxima do preço e uma promessa mais objetiva antes da primeira rolagem.' })
  }
  if (carts >= 5 && checkouts / carts < 0.45) {
    notes.push({ priority: 'alta', area: 'Carrinho', title: 'O carrinho está perdendo interessados', detail: 'Revise clareza do frete, prazo e total. A queda acontece antes do formulário de entrega.' })
  }
  if (checkouts >= 5 && orders / checkouts < 0.35) {
    notes.push({ priority: 'alta', area: 'Checkout', title: 'Há abandono no pagamento', detail: 'Verifique erros da Stripe, meios de pagamento disponíveis e possíveis dúvidas de confiança no resumo do pedido.' })
  }

  const sent = Number(email.sent || 0)
  const opened = Number(email.opened || 0)
  const clicked = Number(email.clicked || 0)
  const bounced = Number(email.bounced || 0)
  if (sent >= 20 && opened / sent < 0.25) {
    notes.push({ priority: 'média', area: 'E-mail', title: 'Assuntos com baixa abertura', detail: 'Diminua o tamanho, antecipe o benefício e evite linguagem genérica. Compare os assuntos na aba de desempenho.' })
  }
  if (opened >= 10 && clicked / opened < 0.08) {
    notes.push({ priority: 'média', area: 'E-mail', title: 'O conteúdo abre, mas não gera clique', detail: 'O assunto funciona melhor que o texto. Encurte o corpo e use um único CTA ligado à intenção do leitor.' })
  }
  if (sent >= 10 && bounced / sent > 0.03) {
    notes.push({ priority: 'alta', area: 'Entregabilidade', title: 'Bounce acima do saudável', detail: 'Suspenda novos disparos para contatos inválidos e revise a origem dos endereços capturados.' })
  }

  const weakSubject = subjects.find(item => Number(item.sent) >= 10 && Number(item.open_rate) < 20)
  if (weakSubject) {
    notes.push({ priority: 'média', area: 'Assunto', title: `Reescreva: “${weakSubject.subject}”`, detail: `Abertura de ${Number(weakSubject.open_rate).toFixed(1)}%. Troque o ângulo antes do próximo envio.` })
  }
  if (!notes.length) {
    notes.push({ priority: 'informativa', area: 'Dados', title: 'Colete mais comportamento antes de alterar a página', detail: 'Ainda não há volume suficiente para atribuir uma queda com segurança. Acompanhe o funil por alguns dias.' })
  }
  return notes
}

export async function loadDashboardData() {
  await ensureCommerceSchema(d1Query)
  await ensureCrmSchema(d1Query)
  await ensureWebsiteIntelligenceSchema(d1Query)
  await ensureEmailIntelligenceSchema(d1Query)

  const [overviewResult, funnelResult, sourcesResult, geographyResult, clicksResult, pagesResult,
    visitorsResult, cartsResult, checkoutsResult, ordersResult, contactsResult, emailResult,
    subjectsResult, recipientsResult] = await Promise.all([
    d1Query(`SELECT
      (SELECT COUNT(*) FROM website_visitors) AS visitors,
      (SELECT COUNT(*) FROM website_sessions) AS sessions,
      (SELECT COALESCE(SUM(engaged_seconds),0) FROM website_sessions) AS engaged_seconds,
      (SELECT COUNT(*) FROM commerce_orders) AS orders,
      (SELECT COALESCE(SUM(total),0) FROM commerce_orders WHERE payment_status='paid') AS revenue`),
    d1Query(`SELECT
      (SELECT COUNT(DISTINCT visitor_id) FROM website_events WHERE event_type='page_view') AS page_viewers,
      (SELECT COUNT(*) FROM commerce_carts WHERE status IN ('active','checkout','purchased')) AS carts,
      (SELECT COUNT(*) FROM commerce_checkout_sessions) AS checkouts,
      (SELECT COUNT(*) FROM commerce_orders WHERE payment_status='paid') AS orders`),
    d1Query(`SELECT COALESCE(NULLIF(source,''),'direto') AS source, COUNT(*) AS sessions,
      SUM(CASE WHEN converted=1 THEN 1 ELSE 0 END) AS conversions
      FROM website_sessions GROUP BY COALESCE(NULLIF(source,''),'direto') ORDER BY sessions DESC LIMIT 20`),
    d1Query(`SELECT COALESCE(NULLIF(country,''),'Desconhecido') AS country,
      COALESCE(NULLIF(region,''),'-') AS region, COALESCE(NULLIF(city,''),'-') AS city,
      COUNT(*) AS sessions FROM website_sessions GROUP BY country, region, city ORDER BY sessions DESC LIMIT 30`),
    d1Query(`SELECT COALESCE(NULLIF(element_text,''),NULLIF(element_id,''),event_type) AS label,
      event_type, COUNT(*) AS clicks FROM website_events
      WHERE event_type LIKE '%clicked' OR event_type='cta_clicked'
      GROUP BY label, event_type ORDER BY clicks DESC LIMIT 30`),
    d1Query(`SELECT page_path, COUNT(*) AS views, COALESCE(SUM(engaged_seconds),0) AS engaged_seconds,
      MAX(scroll_depth) AS max_scroll FROM website_events WHERE event_type IN ('page_view','engagement','scroll_depth')
      GROUP BY page_path ORDER BY views DESC LIMIT 30`),
    d1Query(`SELECT visitor_id, last_seen_at, last_source, last_country, last_region, last_city,
      last_device_type, sessions_count, events_count FROM website_visitors ORDER BY last_seen_at DESC LIMIT 100`),
    d1Query(`SELECT * FROM commerce_carts WHERE status IN ('active','checkout') ORDER BY last_activity_at DESC LIMIT 100`),
    d1Query(`SELECT checkout_id, cart_id, status, customer_name, customer_email, customer_whatsapp,
      address_city, address_state, total, marketing_consent, created_at, updated_at
      FROM commerce_checkout_sessions WHERE status!='paid' ORDER BY created_at DESC LIMIT 100`),
    d1Query(`SELECT * FROM commerce_orders ORDER BY paid_at DESC LIMIT 200`),
    d1Query(`SELECT l.name, l.email, l.whatsapp, l.language, l.source, l.consent, l.status,
      l.updated_at, COALESCE(c.customer,0) AS customer, COALESCE(c.unsubscribed,0) AS unsubscribed,
      COALESCE(c.bounced,0) AS bounced, COALESCE(c.complained,0) AS complained
      FROM leads l LEFT JOIN contact_status c ON c.email=l.email ORDER BY l.updated_at DESC LIMIT 200`),
    d1Query(`SELECT
      SUM(CASE WHEN event_type='email.sent' THEN 1 ELSE 0 END) AS sent,
      SUM(CASE WHEN event_type='email.delivered' THEN 1 ELSE 0 END) AS delivered,
      SUM(CASE WHEN event_type='email.opened' THEN 1 ELSE 0 END) AS opened,
      SUM(CASE WHEN event_type='email.clicked' THEN 1 ELSE 0 END) AS clicked,
      SUM(CASE WHEN event_type='email.bounced' THEN 1 ELSE 0 END) AS bounced,
      SUM(CASE WHEN event_type='email.failed' THEN 1 ELSE 0 END) AS failed,
      SUM(CASE WHEN event_type='email.complained' THEN 1 ELSE 0 END) AS complained
      FROM email_webhook_events`),
    d1Query(`SELECT subject,
      COUNT(DISTINCT CASE WHEN event_type='email.sent' THEN resend_id END) AS sent,
      COUNT(DISTINCT CASE WHEN event_type='email.opened' THEN resend_id END) AS opened,
      COUNT(DISTINCT CASE WHEN event_type='email.clicked' THEN resend_id END) AS clicked,
      ROUND(100.0 * COUNT(DISTINCT CASE WHEN event_type='email.opened' THEN resend_id END) /
        NULLIF(COUNT(DISTINCT CASE WHEN event_type='email.sent' THEN resend_id END),0), 1) AS open_rate,
      ROUND(100.0 * COUNT(DISTINCT CASE WHEN event_type='email.clicked' THEN resend_id END) /
        NULLIF(COUNT(DISTINCT CASE WHEN event_type='email.opened' THEN resend_id END),0), 1) AS click_to_open_rate
      FROM email_webhook_events WHERE subject!='' GROUP BY subject ORDER BY sent DESC LIMIT 100`),
    d1Query(`SELECT email,
      MAX(event_created_at) AS last_event_at,
      MAX(subject) AS last_subject,
      SUM(CASE WHEN event_type='email.sent' THEN 1 ELSE 0 END) AS sent,
      SUM(CASE WHEN event_type='email.opened' THEN 1 ELSE 0 END) AS opened,
      SUM(CASE WHEN event_type='email.clicked' THEN 1 ELSE 0 END) AS clicked,
      SUM(CASE WHEN event_type='email.bounced' THEN 1 ELSE 0 END) AS bounced,
      SUM(CASE WHEN event_type='email.complained' THEN 1 ELSE 0 END) AS complained
      FROM email_webhook_events WHERE email!='' GROUP BY email ORDER BY last_event_at DESC LIMIT 200`)
  ])

  const overview = first(overviewResult)
  const funnel = first(funnelResult)
  const email = first(emailResult)
  const subjects = rows(subjectsResult)

  return {
    generatedAt: new Date().toISOString(),
    overview,
    funnel,
    sources: rows(sourcesResult),
    geography: rows(geographyResult),
    clicks: rows(clicksResult),
    pages: rows(pagesResult),
    visitors: rows(visitorsResult),
    abandonedCarts: rows(cartsResult),
    abandonedCheckouts: rows(checkoutsResult),
    orders: rows(ordersResult),
    contacts: rows(contactsResult),
    email,
    subjects,
    recipients: rows(recipientsResult),
    recommendations: recommendations({ overview, funnel, email, subjects })
  }
}
