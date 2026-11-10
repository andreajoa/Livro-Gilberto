import ClientWrapper from '@/app/ClientWrapper'
import { ArticleIndex } from '@/src/components/ArticleView'
import { guidesEn } from '@/src/content/guidesEn'

export const metadata = {
  title: 'Guides for Men After Betrayal and Infidelity — Gilberto de Souza',
  description: 'Practical, faith-based guides for men who were cheated on or left for another man: first steps, intrusive thoughts, anger, and Bible verses for betrayal.',
  alternates: { canonical: '/en/guides', languages: { en: '/en/guides', 'pt-BR': '/artigos', 'x-default': '/en/guides' } },
  openGraph: { title: 'Guides for men after betrayal', url: '/en/guides', locale: 'en_US', type: 'website', images: [{ url: '/books/en/book-front.png' }] },
}

export default function GuidesIndex() {
  return (
    <ClientWrapper>
      <ArticleIndex items={guidesEn} lang="en" hrefOf={(s) => `/en/guides/${s}`}
        title="Guides for men after betrayal"
        intro="Practical, faith-based help for men who were cheated on, left or replaced. Written by our editorial team, based on the themes of Gilberto de Souza’s book." />
    </ClientWrapper>
  )
}
