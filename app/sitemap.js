import { guidesEn } from '@/src/content/guidesEn'
import { artigosPt } from '@/src/content/artigosPt'
import { ptOf, enOf } from '@/src/content/pairs'

const base = 'https://www.gilberto-souza.com'
const languages = { 'pt-BR': base, en: `${base}/en`, es: `${base}/es`, 'x-default': `${base}/en` }

export default function sitemap() {
  const d = new Date()
  const guides = guidesEn.map((g) => ({
    url: `${base}/en/guides/${g.slug}`, lastModified: new Date(g.updated), changeFrequency: 'monthly', priority: 0.8,
    alternates: { languages: { en: `${base}/en/guides/${g.slug}`, ...(ptOf[g.slug] ? { 'pt-BR': `${base}/artigos/${ptOf[g.slug]}` } : {}) } },
  }))
  const artigos = artigosPt.map((a) => ({
    url: `${base}/artigos/${a.slug}`, lastModified: new Date(a.updated), changeFrequency: 'monthly', priority: 0.8,
    alternates: { languages: { 'pt-BR': `${base}/artigos/${a.slug}`, ...(enOf[a.slug] ? { en: `${base}/en/guides/${enOf[a.slug]}` } : {}) } },
  }))
  return [
    { url: base, lastModified: d, changeFrequency: 'weekly', priority: 1.0, alternates: { languages } },
    { url: `${base}/en`, lastModified: d, changeFrequency: 'weekly', priority: 1.0, alternates: { languages } },
    { url: `${base}/es`, lastModified: d, changeFrequency: 'weekly', priority: 0.9, alternates: { languages } },
    { url: `${base}/en/guides`, lastModified: d, changeFrequency: 'weekly', priority: 0.9, alternates: { languages: { en: `${base}/en/guides`, 'pt-BR': `${base}/artigos` } } },
    { url: `${base}/artigos`, lastModified: d, changeFrequency: 'weekly', priority: 0.9, alternates: { languages: { 'pt-BR': `${base}/artigos`, en: `${base}/en/guides` } } },
    ...guides,
    ...artigos,
    { url: `${base}/o-livro`, lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/sobre`, lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/superacao`, lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/links`, lastModified: d, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contato`, lastModified: d, changeFrequency: 'yearly', priority: 0.5 },
  ]
}
