import DashboardClient from './DashboardClient'
import './dashboard.css'

export const metadata = {
  title: 'Painel de vendas — Gilberto de Souza',
  robots: { index: false, follow: false }
}

export default function DashboardPage() {
  return <DashboardClient />
}
