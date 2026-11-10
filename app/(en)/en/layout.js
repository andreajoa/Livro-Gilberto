import { jsonLdEn } from '@/src/lib/seoData'

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

export default function EnLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEn) }} />
      {children}
    </>
  )
}
