import { notFound } from 'next/navigation'
import ClientWrapper from '@/app/ClientWrapper'
import ArticleView from '@/src/components/ArticleView'
import { guidesEn, guideBySlugEn } from '@/src/content/guidesEn'
import { ptOf } from '@/src/content/pairs'

const SITE = 'https://www.gilberto-souza.com'
export const dynamicParams = false
export function generateStaticParams() { return guidesEn.map((g) => ({ slug: g.slug })) }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const g = guideBySlugEn[slug]
  if (!g) return {}
  const path = `/en/guides/${slug}`
  const languages = { en: path, 'x-default': path }
  if (ptOf[slug]) languages['pt-BR'] = `/artigos/${ptOf[slug]}`
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: path, languages },
    openGraph: { type: 'article', title: g.title, description: g.description, url: path, locale: 'en_US', images: [{ url: '/books/en/book-front.png' }], modifiedTime: g.updated },
    twitter: { card: 'summary_large_image', title: g.title, description: g.description, images: ['/books/en/book-front.png'] },
  }
}

export default async function GuidePage({ params }) {
  const { slug } = await params
  const g = guideBySlugEn[slug]
  if (!g) notFound()
  return (
    <ClientWrapper>
      <ArticleView article={g} lang="en" url={`${SITE}/en/guides/${slug}`}
        others={guidesEn.filter((o) => o.slug !== slug)} hrefOf={(s) => `/en/guides/${s}`} />
    </ClientWrapper>
  )
}
