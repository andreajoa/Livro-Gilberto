import './globals.css'

export const metadata = {
  title: 'Como Vencer a Dor de Ser Trocado Por Outro — Gilberto de Souza',
  description: 'O livro que vai te ajudar a superar a dor da traição e reconstruir sua vida.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ backgroundColor: '#0D1B3E', color: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </body>
    </html>
  )
}
