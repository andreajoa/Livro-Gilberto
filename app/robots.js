export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/acesso/', '/api/'] }],
    sitemap: 'https://gilbertosouza.com/sitemap.xml',
  }
}
