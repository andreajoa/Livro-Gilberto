export default function sitemap() {
  const base = 'https://gilbertosouza.com'
  const d = new Date()
  return [
    { url: base, lastModified: d, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/en`, lastModified: d, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/es`, lastModified: d, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/sobre`, lastModified: d, priority: 0.7 },
    { url: `${base}/o-livro`, lastModified: d, priority: 0.8 },
    { url: `${base}/contato`, lastModified: d, priority: 0.5 },
  ]
}
