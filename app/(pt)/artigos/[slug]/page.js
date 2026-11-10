import { notFound } from 'next/navigation'
import ClientWrapper from '@/app/ClientWrapper'
import ArticleView from '@/src/components/ArticleView'
import { artigosPt, artigoBySlugPt } from '@/src/content/artigosPt'
import { enOf } from '@/src/content/pairs'

const SITE = 'https://www.gilberto-souza.com'
export const dynamicParams = false
export function generateStaticParams() { return artigosPt.map((a) => ({ slug: a.slug })) }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const a = artigoBySlugPt[slug]
  if (!a) return {}
  const path = `/artigos/${slug}`
  const languages = { 'pt-BR': path }
  if (enOf[slug]) { languages.en = `/en/guides/${enOf[slug]}`; languages['x-default'] = languages.en }
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: path, languages },
    openGraph: { type: 'article', title: a.title, description: a.description, url: path, locale: 'pt_BR', images: [{ url: '/books/pt/book-front.jpg' }], modifiedTime: a.updated },
    twitter: { card: 'summary_large_image', title: a.title, description: a.description, images: ['/books/pt/book-front.jpg'] },
  }
}

export default async function ArtigoPage({ params }) {
  const { slug } = await params
  const a = artigoBySlugPt[slug]
  if (!a) notFound()
  return (
    <ClientWrapper>
      <ArticleView article={a} lang="pt" url={`${SITE}/artigos/${slug}`}
        others={artigosPt.filter((o) => o.slug !== slug)} hrefOf={(s) => `/artigos/${s}`} />
    </ClientWrapper>
  )
}
