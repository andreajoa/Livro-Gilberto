export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/acesso/', '/api/', '/dashboard'] }],
    sitemap: 'https://www.gilberto-souza.com/sitemap.xml',
  }
}
