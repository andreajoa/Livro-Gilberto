import ClientWrapper from '@/app/ClientWrapper'
import { ArticleIndex } from '@/src/components/ArticleView'
import { artigosPt } from '@/src/content/artigosPt'

export const metadata = {
  title: 'Artigos para o Homem Traído — Como Superar a Traição | Gilberto de Souza',
  description: 'Artigos práticos e cristãos para o homem que foi traído ou trocado por outro: primeiros passos, pensamentos que não param, raiva e versículos para quem foi traído.',
  alternates: { canonical: '/artigos', languages: { 'pt-BR': '/artigos', en: '/en/guides', 'x-default': '/en/guides' } },
  openGraph: { title: 'Artigos para o homem traído', url: '/artigos', locale: 'pt_BR', type: 'website', images: [{ url: '/books/pt/book-front.jpg' }] },
}

export default function ArtigosIndex() {
  return (
    <ClientWrapper>
      <ArticleIndex items={artigosPt} lang="pt" hrefOf={(s) => `/artigos/${s}`}
        title="Artigos para o homem que foi traído"
        intro="Ajuda prática e cristã para o homem que foi traído, abandonado ou trocado por outro. Escritos pela nossa equipe editorial, com base nos temas do livro de Gilberto de Souza." />
    </ClientWrapper>
  )
}
