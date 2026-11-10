const base = 'https://www.gilberto-souza.com'
const languages = { 'pt-BR': base, en: `${base}/en`, es: `${base}/es`, 'x-default': `${base}/en` }

export default function sitemap() {
  const d = new Date()
  return [
    { url: base, lastModified: d, changeFrequency: 'weekly', priority: 1.0, alternates: { languages } },
    { url: `${base}/en`, lastModified: d, changeFrequency: 'weekly', priority: 1.0, alternates: { languages } },
    { url: `${base}/es`, lastModified: d, changeFrequency: 'weekly', priority: 0.9, alternates: { languages } },
    { url: `${base}/o-livro`, lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/sobre`, lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/links`, lastModified: d, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contato`, lastModified: d, changeFrequency: 'yearly', priority: 0.5 },
  ]
}
