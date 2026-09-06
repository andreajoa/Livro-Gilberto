import { cookies } from 'next/headers'
import { d1Query } from '@/src/lib/d1'
import {
  DASHBOARD_COOKIE_NAME,
  isDashboardConfigured,
  isDashboardCookieValid
} from '@/src/lib/dashboard-auth'
import styles from './dashboard.module.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Dashboard | Gilberto de Souza',
  robots: {
    index: false,
    follow: false
  }
}

function rows(result) {
  return result?.[0]?.results || []
}

function count(result) {
  return Number(rows(result)?.[0]?.total || 0)
}

function fmtDate(value) {
  if (!value) return '—'
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Sao_Paulo'
    }).format(new Date(value))
  } catch {
    return String(value)
  }
}

function fmtMoney(value, currency = 'BRL') {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return '—'
  try {
    return new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'en-US', {
      style: 'currency',
      currency: currency || 'BRL'
    }).format(amount)
  } catch {
    return `${currency || ''} ${amount.toFixed(2)}`.trim()
  }
}

async function loadDashboard() {
  const [
    customerCount,
    leadCount,
    visitorCount,
    eventCount,
    customers,
    leads,
    events
  ] = await Promise.all([
    d1Query('SELECT COUNT(*) AS total FROM customers'),
    d1Query('SELECT COUNT(*) AS total FROM leads'),
    d1Query('SELECT COUNT(*) AS total FROM visitors'),
    d1Query('SELECT COUNT(*) AS total FROM events'),
    d1Query(
      `SELECT name, email, whatsapp, language, product, product_type, amount, currency, created_at
       FROM customers ORDER BY created_at DESC LIMIT 100`
    ),
    d1Query(
      `SELECT name, email, whatsapp, language, source, status, created_at
       FROM leads ORDER BY created_at DESC LIMIT 100`
    ),
    d1Query(
      `SELECT email, language, event_type, page, created_at
       FROM events ORDER BY created_at DESC LIMIT 100`
    )
  ])

  const totalCustomers = count(customerCount)
  const totalLeads = count(leadCount)

  return {
    stats: {
      customers: totalCustomers,
      leads: totalLeads,
      visitors: count(visitorCount),
      events: count(eventCount),
      conversion:
        totalLeads > 0 ? ((totalCustomers / totalLeads) * 100).toFixed(1) : '0.0'
    },
    customers: rows(customers),
    leads: rows(leads),
    events: rows(events)
  }
}

function Login({ error, configured }) {
  const message =
    !configured
      ? 'Defina DASHBOARD_PASSWORD no ambiente de produção para liberar o acesso.'
      : error === 'invalid'
        ? 'Senha incorreta.'
        : null

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <div className={styles.brandMark}>GS</div>
        <p className={styles.eyebrow}>ÁREA RESTRITA</p>
        <h1>Dashboard Gilberto de Souza</h1>
        <p className={styles.muted}>
          Acesso aos dados de vendas, leads e atividade do site.
        </p>

        {message && <div className={styles.alert}>{message}</div>}

        {configured ? (
          <form action="/api/dashboard/login" method="POST" className={styles.loginForm}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
            />
            <button type="submit">Entrar</button>
          </form>
        ) : (
          <div className={styles.configBox}>
            O dashboard já está instalado, mas permanece bloqueado até a senha ser
            configurada no servidor.
          </div>
        )}
      </section>
    </main>
  )
}

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams
  const configured = isDashboardConfigured()
  const cookieStore = await cookies()
  const authorized = isDashboardCookieValid(
    cookieStore.get(DASHBOARD_COOKIE_NAME)?.value
  )

  if (!configured || !authorized) {
    return <Login error={params?.error} configured={configured} />
  }

  let data
  let loadError = null

  try {
    data = await loadDashboard()
  } catch (error) {
    console.error('Dashboard load error:', error)
    loadError = error
  }

  if (loadError) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>DASHBOARD</p>
            <h1>Gilberto de Souza</h1>
          </div>
          <form action="/api/dashboard/logout" method="POST">
            <button className={styles.secondaryButton} type="submit">
              Sair
            </button>
          </form>
        </header>

        <section className={styles.errorCard}>
          <h2>Não foi possível carregar os dados.</h2>
          <p>
            Verifique as variáveis CLOUDFLARE_ACCOUNT_ID,
            CLOUDFLARE_D1_DATABASE_ID e CLOUDFLARE_D1_API_TOKEN no ambiente de
            produção.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>DASHBOARD</p>
          <h1>Gilberto de Souza</h1>
          <p className={styles.muted}>Dados do Cloudflare D1 em tempo real.</p>
        </div>
        <div className={styles.headerActions}>
          <a href="/dashboard" className={styles.secondaryButton}>
            Atualizar
          </a>
          <form action="/api/dashboard/logout" method="POST">
            <button className={styles.secondaryButton} type="submit">
              Sair
            </button>
          </form>
        </div>
      </header>

      <section className={styles.statsGrid}>
        <article className={styles.statCard}>
          <span>Clientes</span>
          <strong>{data.stats.customers}</strong>
          <small>compras registradas</small>
        </article>
        <article className={styles.statCard}>
          <span>Leads</span>
          <strong>{data.stats.leads}</strong>
          <small>contatos captados</small>
        </article>
        <article className={styles.statCard}>
          <span>Visitantes</span>
          <strong>{data.stats.visitors}</strong>
          <small>visitantes registrados</small>
        </article>
        <article className={styles.statCard}>
          <span>Conversão</span>
          <strong>{data.stats.conversion}%</strong>
          <small>clientes / leads</small>
        </article>
        <article className={styles.statCard}>
          <span>Eventos</span>
          <strong>{data.stats.events}</strong>
          <small>ações monitoradas</small>
        </article>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>VENDAS</p>
            <h2>Clientes recentes</h2>
          </div>
          <span>Últimos 100</span>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Valor</th>
                <th>Idioma</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {data.customers.length ? (
                data.customers.map((item, index) => (
                  <tr key={`${item.email}-${item.created_at}-${index}`}>
                    <td>
                      <strong>{item.name || 'Sem nome'}</strong>
                      <small>{item.email || '—'}</small>
                      {item.whatsapp && <small>{item.whatsapp}</small>}
                    </td>
                    <td>
                      {item.product || '—'}
                      {item.product_type && <small>{item.product_type}</small>}
                    </td>
                    <td>{fmtMoney(item.amount, item.currency)}</td>
                    <td>
                      <span className={styles.badge}>{item.language || 'pt'}</span>
                    </td>
                    <td>{fmtDate(item.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={styles.empty}>
                    Nenhuma compra registrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>CAPTAÇÃO</p>
            <h2>Leads recentes</h2>
          </div>
          <span>Últimos 100</span>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Contato</th>
                <th>Origem</th>
                <th>Status</th>
                <th>Idioma</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {data.leads.length ? (
                data.leads.map((item, index) => (
                  <tr key={`${item.email}-${item.created_at}-${index}`}>
                    <td>
                      <strong>{item.name || 'Sem nome'}</strong>
                      <small>{item.email || '—'}</small>
                      {item.whatsapp && <small>{item.whatsapp}</small>}
                    </td>
                    <td>{item.source || '—'}</td>
                    <td>{item.status || 'lead'}</td>
                    <td>
                      <span className={styles.badge}>{item.language || 'pt'}</span>
                    </td>
                    <td>{fmtDate(item.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={styles.empty}>
                    Nenhum lead registrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>ATIVIDADE</p>
            <h2>Eventos recentes</h2>
          </div>
          <span>Últimos 100</span>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Evento</th>
                <th>Email</th>
                <th>Página</th>
                <th>Idioma</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {data.events.length ? (
                data.events.map((item, index) => (
                  <tr key={`${item.event_type}-${item.created_at}-${index}`}>
                    <td>
                      <span className={styles.eventBadge}>
                        {item.event_type || 'event'}
                      </span>
                    </td>
                    <td>{item.email || '—'}</td>
                    <td className={styles.pageCell}>{item.page || '—'}</td>
                    <td>
                      <span className={styles.badge}>{item.language || 'pt'}</span>
                    </td>
                    <td>{fmtDate(item.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={styles.empty}>
                    Nenhum evento registrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
