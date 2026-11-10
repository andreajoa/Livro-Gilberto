import './globals.css'

const SITE = 'https://www.gilberto-souza.com'

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'Como Vencer a Dor de Ser Trocado Por Outro — Livro de Gilberto de Souza',
  description: 'Livro para o homem que foi traído ou trocado por outro. Uma história real de traição, reconstrução e fé, com passagens bíblicas, orações e exercícios de reflexão. Livro físico, eBook e audiobook.',
  keywords: ['como superar traição', 'fui trocado por outro', 'livro sobre traição', 'superar o fim do casamento', 'homem traído', 'livro cristão para homens', 'Gilberto de Souza'],
  authors: [{ name: 'Gilberto de Souza' }],
  openGraph: {
    type: 'book',
    siteName: 'Gilberto de Souza',
    title: 'Como Vencer a Dor de Ser Trocado Por Outro',
    description: 'Livro para o homem que foi traído ou trocado por outro: uma história real de traição, reconstrução e fé.',
    locale: 'pt_BR',
    images: [{ url: '/books/pt/book-front.jpg', alt: 'Capa do livro Como Vencer a Dor de Ser Trocado Por Outro' }],
  },
  twitter: { card: 'summary_large_image', title: 'Como Vencer a Dor de Ser Trocado Por Outro', description: 'Livro para o homem que foi traído ou trocado por outro.', images: ['/books/pt/book-front.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
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
