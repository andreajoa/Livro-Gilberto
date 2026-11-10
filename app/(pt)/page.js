import ClientWrapper from '@/app/ClientWrapper'
import Home from '@/src/views/Home'
import { jsonLdPt } from '@/src/lib/seoData'

// canonical e hreflang ficam aqui, não no layout raiz, para não serem herdados pelas outras páginas
export const metadata = {
  alternates: {
    canonical: '/',
    languages: { 'pt-BR': '/', en: '/en', es: '/es', 'x-default': '/en' },
  },
}

export default function PagePT() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPt) }} />
      <ClientWrapper>
        <Home />
      </ClientWrapper>
    </>
  )
}
