export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/acesso/', '/api/'] }],
    sitemap: 'https://www.gilberto-souza.com/sitemap.xml',
  }
}
