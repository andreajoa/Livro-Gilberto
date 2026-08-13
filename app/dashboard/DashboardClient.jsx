"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import { BarChart3, BookOpen, Box, ChevronRight, Clipboard, LogOut, Mail, MapPin, RefreshCw, ShoppingCart, Sparkles, Users } from 'lucide-react'

const TABS = [
  ['overview', 'Visão geral', BarChart3],
  ['behavior', 'Comportamento', MapPin],
  ['funnel', 'Funil e abandonos', ShoppingCart],
  ['visitors', 'Visitantes', Users],
  ['orders', 'Pedidos', Box],
  ['crm', 'CRM', BookOpen],
  ['email', 'E-mails', Mail],
  ['recommendations', 'Recomendações', Sparkles]
]

function money(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0)
}

function date(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value))
}

function rate(part, total) {
  const denominator = Number(total) || 0
  return denominator ? `${((Number(part) || 0) * 100 / denominator).toFixed(1)}%` : '0%'
}

function Table({ columns, rows, empty = 'Nenhum dado ainda.' }) {
  if (!rows?.length) return <div className="dash-empty">{empty}</div>
  return (
    <div className="dash-table-wrap">
      <table className="dash-table">
        <thead><tr>{columns.map(column => <th key={column.key}>{column.label}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => (
          <tr key={row.id || row.order_id || row.checkout_id || row.visitor_id || row.email || index}>
            {columns.map(column => <td key={column.key}>{column.render ? column.render(row) : String(row[column.key] ?? '—')}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}

function Stat({ label, value, help }) {
  return <div className="dash-stat"><span>{label}</span><strong>{value}</strong>{help && <small>{help}</small>}</div>
}

function Funnel({ data }) {
  const steps = [
    ['Visualizaram', data.page_viewers], ['Carrinhos', data.carts], ['Checkouts', data.checkouts], ['Compras', data.orders]
  ]
  const max = Math.max(1, ...steps.map(([, value]) => Number(value) || 0))
  return <div className="dash-funnel">{steps.map(([label, value], index) => (
    <div className="dash-funnel-step" key={label}>
      <div><span>{label}</span><strong>{Number(value) || 0}</strong></div>
      <div className="dash-bar"><i style={{ width: `${Math.max(3, (Number(value) || 0) * 100 / max)}%` }} /></div>
      {index > 0 && <small>Conversão da etapa anterior: {rate(value, steps[index - 1][1])}</small>}
    </div>
  ))}</div>
}

function Login({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const response = await fetch('/api/dashboard/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password })
    })
    const body = await response.json()
    setLoading(false)
    if (!response.ok) return setError(body.error || 'Não foi possível entrar.')
    onSuccess()
  }

  return <main className="dash-login-page"><form className="dash-login" onSubmit={submit}>
    <div className="dash-brand"><BookOpen size={30} /><div><strong>Gilberto de Souza</strong><span>Painel privado</span></div></div>
    <h1>Acesse seus pedidos e resultados</h1>
    <p>Use a senha administrativa configurada na hospedagem.</p>
    <label>Senha</label>
    <input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required />
    {error && <div className="dash-error">{error}</div>}
    <button disabled={loading}>{loading ? 'Entrando...' : 'Entrar no painel'}<ChevronRight size={18} /></button>
  </form></main>
}

function OrderCard({ order, onUpdated }) {
  const [status, setStatus] = useState(order.fulfillment_status)
  const [trackingCode, setTrackingCode] = useState(order.tracking_code || '')
  const [carrier, setCarrier] = useState(order.tracking_carrier || 'Correios')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const address = `${order.address_street}, ${order.address_number}${order.address_complement ? ` — ${order.address_complement}` : ''}\n${order.address_neighborhood}\n${order.address_city}/${order.address_state} — CEP ${order.destination_cep}`
  const phone = String(order.customer_whatsapp || '').replace(/\D/g, '')
  const whatsapp = `https://wa.me/55${phone}?text=${encodeURIComponent(`Olá, ${order.customer_name.split(/\s+/)[0]}. Estou entrando em contato sobre o seu pedido ${order.order_id}.`)}`

  async function update(action) {
    setLoading(true)
    setMessage('')
    const response = await fetch(`/api/dashboard/orders/${encodeURIComponent(order.order_id)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action ? { action } : { status, trackingCode, carrier })
    })
    const body = await response.json()
    setLoading(false)
    if (!response.ok) return setMessage(body.error || 'Falha ao atualizar.')
    setMessage(body.trackingEmail === 'failed' ? 'Status salvo, mas o e-mail de rastreio falhou.' : 'Pedido atualizado com sucesso.')
    onUpdated()
  }

  function copy() {
    navigator.clipboard.writeText(`PEDIDO ${order.order_id}\n${order.customer_name}\n${order.customer_email}\nWhatsApp: ${order.customer_whatsapp}\n${address}\n${order.product_name} — ${order.quantity}x\n${order.shipping_name}\nTotal: ${money(order.total)}`)
    setMessage('Dados copiados.')
  }

  return <article className="order-card">
    <header><div><small>{order.order_id}</small><h3>{order.customer_name}</h3><span>{date(order.paid_at)}</span></div><b className={`status status-${order.fulfillment_status}`}>{order.fulfillment_status}</b></header>
    <div className="order-grid">
      <section><h4>Contato</h4><p>{order.customer_email}<br />{order.customer_whatsapp}</p><a href={whatsapp} target="_blank" rel="noreferrer">Abrir WhatsApp</a></section>
      <section><h4>Entrega</h4><p className="preserve">{address}</p></section>
      <section><h4>Pedido</h4><p>{order.quantity}x {order.product_name}<br />{order.shipping_name}<br /><strong>{money(order.total)}</strong></p></section>
    </div>
    <div className="order-actions">
      <select value={status} onChange={event => setStatus(event.target.value)}><option value="paid">Pago</option><option value="preparing">Preparando</option><option value="shipped">Enviado</option><option value="delivered">Entregue</option></select>
      <input value={trackingCode} onChange={event => setTrackingCode(event.target.value)} placeholder="Código de rastreio" />
      <input value={carrier} onChange={event => setCarrier(event.target.value)} placeholder="Transportadora" />
      <button onClick={() => update()} disabled={loading}>Salvar</button>
      <button className="ghost" onClick={copy}><Clipboard size={15} />Copiar dados</button>
      {order.tracking_email_status === 'failed' && <button className="ghost warning" onClick={() => update('resend_tracking')} disabled={loading}>Reenviar rastreio</button>}
    </div>
    {message && <p className="order-message">{message}</p>}
  </article>
}

export default function DashboardClient() {
  const [authenticated, setAuthenticated] = useState(null)
  const [tab, setTab] = useState('overview')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    const response = await fetch('/api/dashboard/data', { cache: 'no-store' })
    const body = await response.json()
    setLoading(false)
    if (response.status === 401) { setAuthenticated(false); return }
    if (!response.ok) return setError(body.error || 'Não foi possível carregar o painel.')
    setAuthenticated(true)
    setData(body)
  }, [])

  useEffect(() => {
    fetch('/api/dashboard/session', { cache: 'no-store' }).then(response => response.json()).then(body => {
      setAuthenticated(Boolean(body.authenticated))
      if (body.authenticated) load()
    }).catch(() => setAuthenticated(false))
  }, [load])

  const email = data?.email || {}
  const content = useMemo(() => {
    if (!data) return null

    if (tab === 'overview') return <>
      <div className="dash-stats"><Stat label="Visitantes" value={data.overview.visitors || 0} /><Stat label="Sessões" value={data.overview.sessions || 0} /><Stat label="Tempo engajado" value={`${Math.round(Number(data.overview.engaged_seconds || 0) / 60)} min`} /><Stat label="Pedidos pagos" value={data.overview.orders || 0} /><Stat label="Faturamento" value={money(data.overview.revenue)} /></div>
      <div className="dash-columns"><section className="dash-panel"><h2>Funil de vendas</h2><Funnel data={data.funnel} /></section><section className="dash-panel"><h2>Principais origens</h2><Table columns={[{ key: 'source', label: 'Origem' }, { key: 'sessions', label: 'Sessões' }, { key: 'conversions', label: 'Compras' }]} rows={data.sources.slice(0, 10)} /></section></div>
    </>

    if (tab === 'behavior') return <div className="dash-stack"><section className="dash-panel"><h2>Cidade, estado e país</h2><Table columns={[{ key: 'country', label: 'País' }, { key: 'region', label: 'Estado/região' }, { key: 'city', label: 'Cidade' }, { key: 'sessions', label: 'Sessões' }]} rows={data.geography} /></section><section className="dash-panel"><h2>Onde as pessoas clicaram</h2><Table columns={[{ key: 'label', label: 'Elemento' }, { key: 'event_type', label: 'Evento' }, { key: 'clicks', label: 'Cliques' }]} rows={data.clicks} /></section><section className="dash-panel"><h2>Páginas e permanência</h2><Table columns={[{ key: 'page_path', label: 'Página' }, { key: 'views', label: 'Visualizações' }, { key: 'engaged_seconds', label: 'Segundos engajados' }, { key: 'max_scroll', label: 'Maior rolagem', render: row => `${row.max_scroll || 0}%` }]} rows={data.pages} /></section></div>

    if (tab === 'funnel') return <div className="dash-stack"><section className="dash-panel"><h2>Funil completo</h2><Funnel data={data.funnel} /></section><section className="dash-panel"><h2>Carrinhos em aberto</h2><Table columns={[{ key: 'cart_id', label: 'Carrinho' }, { key: 'status', label: 'Etapa' }, { key: 'quantity', label: 'Qtd.' }, { key: 'customer_email', label: 'E-mail' }, { key: 'customer_whatsapp', label: 'WhatsApp' }, { key: 'total', label: 'Total', render: row => money(row.total) }, { key: 'last_activity_at', label: 'Última atividade', render: row => date(row.last_activity_at) }]} rows={data.abandonedCarts} /></section><section className="dash-panel"><h2>Checkouts sem compra</h2><Table columns={[{ key: 'customer_name', label: 'Nome' }, { key: 'customer_email', label: 'E-mail' }, { key: 'customer_whatsapp', label: 'WhatsApp' }, { key: 'address_city', label: 'Cidade' }, { key: 'address_state', label: 'UF' }, { key: 'total', label: 'Total', render: row => money(row.total) }, { key: 'marketing_consent', label: 'Marketing', render: row => Number(row.marketing_consent) ? 'Autorizado' : 'Não autorizado' }, { key: 'created_at', label: 'Iniciado', render: row => date(row.created_at) }]} rows={data.abandonedCheckouts} /></section></div>

    if (tab === 'visitors') return <section className="dash-panel"><h2>Visitantes recentes</h2><Table columns={[{ key: 'visitor_id', label: 'Visitante' }, { key: 'last_source', label: 'Origem' }, { key: 'last_city', label: 'Cidade' }, { key: 'last_region', label: 'Estado' }, { key: 'last_country', label: 'País' }, { key: 'last_device_type', label: 'Dispositivo' }, { key: 'sessions_count', label: 'Sessões' }, { key: 'events_count', label: 'Ações' }, { key: 'last_seen_at', label: 'Última visita', render: row => date(row.last_seen_at) }]} rows={data.visitors} /></section>

    if (tab === 'orders') return <div className="dash-stack">{data.orders.length ? data.orders.map(order => <OrderCard order={order} key={order.order_id} onUpdated={load} />) : <div className="dash-empty">Nenhum pedido pago ainda.</div>}</div>

    if (tab === 'crm') return <section className="dash-panel"><h2>Contatos identificados</h2><Table columns={[{ key: 'name', label: 'Nome' }, { key: 'email', label: 'E-mail' }, { key: 'whatsapp', label: 'WhatsApp' }, { key: 'source', label: 'Origem' }, { key: 'status', label: 'Etapa' }, { key: 'consent', label: 'Consentimento', render: row => Number(row.consent) ? 'Sim' : 'Não' }, { key: 'customer', label: 'Cliente', render: row => Number(row.customer) ? 'Sim' : 'Não' }, { key: 'unsubscribed', label: 'Descadastro', render: row => Number(row.unsubscribed) ? 'Sim' : 'Não' }, { key: 'updated_at', label: 'Atualizado', render: row => date(row.updated_at) }]} rows={data.contacts} /></section>

    if (tab === 'email') return <div className="dash-stack"><div className="dash-stats"><Stat label="Enviados" value={email.sent || 0} /><Stat label="Entregues" value={email.delivered || 0} /><Stat label="Abertos" value={email.opened || 0} help={`Taxa: ${rate(email.opened, email.sent)}`} /><Stat label="Cliques" value={email.clicked || 0} help={`Após abrir: ${rate(email.clicked, email.opened)}`} /><Stat label="Bounce" value={email.bounced || 0} /><Stat label="Falhas" value={email.failed || 0} /><Stat label="Reclamações" value={email.complained || 0} /></div><section className="dash-panel"><h2>Assunto x conteúdo</h2><Table columns={[{ key: 'subject', label: 'Assunto' }, { key: 'sent', label: 'Enviados' }, { key: 'open_rate', label: 'Nota do assunto', render: row => `${Number(row.open_rate || 0).toFixed(1)}% abertura` }, { key: 'click_to_open_rate', label: 'Nota do texto/CTA', render: row => `${Number(row.click_to_open_rate || 0).toFixed(1)}% após abrir` }]} rows={data.subjects} /></section><section className="dash-panel"><h2>Resultado por destinatário</h2><Table columns={[{ key: 'email', label: 'Destinatário' }, { key: 'last_subject', label: 'Último assunto' }, { key: 'sent', label: 'Enviados' }, { key: 'opened', label: 'Abertos' }, { key: 'clicked', label: 'Cliques' }, { key: 'bounced', label: 'Bounce' }, { key: 'complained', label: 'Reclamação' }, { key: 'last_event_at', label: 'Último evento', render: row => date(row.last_event_at) }]} rows={data.recipients} /></section></div>

    return <div className="recommendations">{data.recommendations.map((item, index) => <article key={`${item.title}-${index}`}><span>{item.priority} · {item.area}</span><h2>{item.title}</h2><p>{item.detail}</p></article>)}</div>
  }, [data, email, load, tab])

  if (authenticated === null) return <div className="dash-loading">Verificando acesso...</div>
  if (!authenticated) return <Login onSuccess={() => { setAuthenticated(true); load() }} />

  async function logout() {
    await fetch('/api/dashboard/logout', { method: 'POST' })
    setAuthenticated(false)
    setData(null)
  }

  return <div className="dashboard-shell">
    <aside className="dash-sidebar"><div className="dash-brand"><BookOpen size={27} /><div><strong>Gilberto de Souza</strong><span>Inteligência comercial</span></div></div><nav>{TABS.map(([id, label, Icon]) => <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}><Icon size={17} />{label}</button>)}</nav><button className="dash-logout" onClick={logout}><LogOut size={17} />Sair</button></aside>
    <main className="dash-main"><header className="dash-header"><div><span>Painel privado</span><h1>{TABS.find(([id]) => id === tab)?.[1]}</h1>{data?.generatedAt && <small>Atualizado em {date(data.generatedAt)}</small>}</div><button onClick={load} disabled={loading}><RefreshCw size={16} className={loading ? 'spin' : ''} />Atualizar</button></header>{error && <div className="dash-error">{error}</div>}{loading && !data ? <div className="dash-loading">Carregando os dados...</div> : content}</main>
  </div>
}
