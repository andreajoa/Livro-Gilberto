import { jsonLdEn, chaptersEn, faqEn } from '@/src/lib/seoData'

const AMAZON = 'https://www.amazon.com/dp/B0H2LXHCH4'
const BARNES = 'https://www.barnesandnoble.com/w/how-to-overcome-the-pain-of-being-replaced-by-someone-else-gilberto-de-souza/1150279536?ean=9798256373504'

export const metadata = {
  title: 'How to Overcome the Pain of Being Replaced by Someone Else — a faith-based book for betrayed men',
  description: 'A faith-based book for men healing from betrayal, infidelity and being replaced. Eleven chapters with Scripture, prayer and reflection exercises. Paperback on Amazon and Barnes & Noble, or eBook + audiobook with instant access.',
  keywords: ['how to get over being cheated on', 'book for men after infidelity', 'betrayal recovery for men', 'Christian book for divorced men', 'wife left me for another man', 'healing after betrayal', 'Gilberto de Souza'],
  alternates: {
    canonical: '/en',
    languages: { 'pt-BR': '/', en: '/en', es: '/es', 'x-default': '/en' },
  },
  openGraph: {
    type: 'book',
    siteName: 'Gilberto de Souza',
    title: 'How to Overcome the Pain of Being Replaced by Someone Else',
    description: 'A faith-based book for men rebuilding after betrayal, written by a man who lived it.',
    url: '/en',
    locale: 'en_US',
    images: [{ url: '/books/en/book-front.png', alt: 'Book cover: How to Overcome the Pain of Being Replaced by Someone Else' }],
  },
  twitter: { card: 'summary_large_image', title: 'How to Overcome the Pain of Being Replaced by Someone Else', description: 'A faith-based book for men rebuilding after betrayal.', images: ['/books/en/book-front.png'] },
}

// A página em inglês é montada no navegador. Este bloco entrega o mesmo conteúdo em HTML puro
// para leitores sem JavaScript (buscadores de IA, prévias de link, leitores de tela simples).
export default function EnLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEn) }} />
      <noscript>
        <article lang="en" style={{ maxWidth: 760, margin: '0 auto', padding: '96px 20px 40px', lineHeight: 1.7 }}>
          <h1>How to Overcome the Pain of Being Replaced by Someone Else</h1>
          <p>By Gilberto de Souza. A faith-based book for men healing from betrayal, infidelity and being replaced.</p>
          <p>Eleven chapters written from lived experience and Christian faith, with Scripture, prayer and “Let’s Reflect” exercises to help a man stop the spiral, rebuild his identity and find hope again.</p>
          <h2>Chapters</h2>
          <ol>{chaptersEn.map((c) => <li key={c}>{c}</li>)}</ol>
          <h2>About the author</h2>
          <p>Gilberto de Souza was born in Brazil and has lived in the United States for 23 years, where he built his own construction company. He wrote this book after going through betrayal himself.</p>
          <h2>Where to get it</h2>
          <ul>
            <li><a href={AMAZON}>Paperback on Amazon</a></li>
            <li><a href={BARNES}>Paperback at Barnes &amp; Noble</a></li>
            <li><a href="/checkout-digital?lang=en">eBook + audiobook, $24.99, instant access, 30-day money-back guarantee</a></li>
          </ul>
          <h2>Questions</h2>
          {faqEn.map((f) => (<div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>))}
        </article>
      </noscript>
      {children}
    </>
  )
}
