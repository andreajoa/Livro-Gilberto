import { jsonLdSobre } from '@/src/lib/seoData'

export const metadata = {
  title: 'Sobre Gilberto de Souza — autor de Como Vencer a Dor de Ser Trocado Por Outro',
  description: 'Gilberto de Souza nasceu no Brasil, vive há 23 anos nos Estados Unidos e escreveu este livro depois de passar pela traição. Conheça a história do autor.',
  alternates: { canonical: '/sobre' },
  openGraph: { title: 'Sobre Gilberto de Souza — autor de Como Vencer a Dor de Ser Trocado Por Outro', description: 'Gilberto de Souza nasceu no Brasil, vive há 23 anos nos Estados Unidos e escreveu este livro depois de passar pela traição. Conheça a história do autor.', url: '/sobre', locale: 'pt_BR', images: [{ url: '/books/pt/book-front.jpg' }] },
}

export default function Layout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSobre) }} />
      {children}
    </>
  )
}
