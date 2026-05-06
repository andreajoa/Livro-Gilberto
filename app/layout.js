import './globals.css'
import { CartProvider } from '@/src/context/CartContext'
import { LeadProvider } from '@/src/context/LeadContext'

export const metadata = {
  title: 'Como Vencer a Dor de Ser Trocado Por Outro — Gilberto de Souza',
  description: 'O livro que vai te ajudar a superar a traição e reconstruir sua vida.',
  openGraph: {
    title: 'Como Vencer a Dor de Ser Trocado Por Outro',
    description: 'Uma história real de traição, reconstrução e liberdade emocional.',
    url: 'https://gilbertosouza.com',
    locale: 'pt_BR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://gilbertosouza.com',
    languages: {
      'pt-BR': 'https://gilbertosouza.com',
      'en-US': 'https://gilbertosouza.com/en',
      'es-ES': 'https://gilbertosouza.com/es',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          "name": "Como Vencer a Dor de Ser Trocado Por Outro",
          "author": { "@type": "Person", "name": "Gilberto de Souza" },
          "offers": { "@type": "Offer", "price": "119.00", "priceCurrency": "BRL", "availability": "https://schema.org/InStock" }
        })}} />
      </head>
      <body>
        <LeadProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LeadProvider>
      </body>
    </html>
  )
}
