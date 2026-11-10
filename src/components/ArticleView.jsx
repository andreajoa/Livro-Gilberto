// Renderiza um guia/artigo no servidor (HTML completo para buscadores e IAs).
import Link from 'next/link'

const SITE = 'https://www.gilberto-souza.com'

const COPY = {
  en: {
    home: 'Home', hub: 'Guides', hubHref: '/en/guides', bookHref: '/en',
    by: 'By the editorial team of gilberto-souza.com, based on the book by Gilberto de Souza',
    updated: 'Updated', faq: 'Questions men ask',
    ctaTitle: 'Go deeper: the book',
    ctaText: 'How to Overcome the Pain of Being Replaced by Someone Else is a faith-based book by Gilberto de Souza, written after he went through betrayal himself. Eleven chapters with Scripture, prayer and reflection exercises.',
    ctaBtn: 'See the book', more: 'More guides',
    bookName: 'How to Overcome the Pain of Being Replaced by Someone Else', locale: 'en',
  },
  pt: {
    home: 'Início', hub: 'Artigos', hubHref: '/artigos', bookHref: '/',
    by: 'Pela equipe editorial de gilberto-souza.com, com base no livro de Gilberto de Souza',
    updated: 'Atualizado em', faq: 'Perguntas frequentes',
    ctaTitle: 'Para ir mais fundo: o livro',
    ctaText: 'Como Vencer a Dor de Ser Trocado Por Outro é um livro cristão de Gilberto de Souza, escrito depois que ele mesmo passou pela traição. Uma história real de reconstrução e fé, com passagens bíblicas, orações e exercícios de reflexão.',
    ctaBtn: 'Conhecer o livro', more: 'Mais artigos',
    bookName: 'Como Vencer a Dor de Ser Trocado Por Outro', locale: 'pt-BR',
  },
}

export function articleJsonLd(a, lang, url) {
  const c = COPY[lang]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: a.title,
        description: a.description,
        inLanguage: c.locale,
        datePublished: a.updated,
        dateModified: a.updated,
        mainEntityOfPage: url,
        image: lang === 'en' ? `${SITE}/books/en/book-front.png` : `${SITE}/books/pt/book-front.jpg`,
        author: { '@type': 'Organization', name: 'gilberto-souza.com', url: SITE },
        publisher: { '@type': 'Organization', name: 'gilberto-souza.com', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/favicon-512.png` } },
        about: { '@id': lang === 'en' ? `${SITE}/en#book` : `${SITE}/#livro` },
        isPartOf: { '@id': `${SITE}/#site` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.home, item: SITE + c.bookHref.replace(/\/$/, '') },
          { '@type': 'ListItem', position: 2, name: c.hub, item: SITE + c.hubHref },
          { '@type': 'ListItem', position: 3, name: a.h1, item: url },
        ],
      },
      a.faq?.length ? {
        '@type': 'FAQPage',
        inLanguage: c.locale,
        mainEntity: a.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      } : null,
    ].filter(Boolean),
  }
}

const s = {
  wrap: { maxWidth: 760, margin: '0 auto', padding: '48px 20px 80px', color: '#E6ECF7', lineHeight: 1.75, fontSize: 18 },
  crumbs: { fontSize: 13, color: '#8A9BBF', marginBottom: 20 },
  a: { color: '#00C4D4' },
  h1: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(30px, 5vw, 44px)', lineHeight: 1.15, color: '#fff', margin: '0 0 12px', fontWeight: 900 },
  meta: { fontSize: 13, color: '#8A9BBF', marginBottom: 32 },
  h2: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: '#fff', margin: '40px 0 12px', fontWeight: 800 },
  li: { marginBottom: 8 },
  verse: { borderLeft: '3px solid #00C4D4', padding: '4px 0 4px 18px', margin: '16px 0' },
  ref: { fontWeight: 700, color: '#00C4D4', fontSize: 15 },
  note: { color: '#B8C4DA', fontSize: 16, marginTop: 6 },
  cta: { marginTop: 56, padding: 28, borderRadius: 12, background: 'rgba(0,196,212,0.08)', border: '1px solid rgba(0,196,212,0.35)' },
  btn: { display: 'inline-block', marginTop: 12, padding: '12px 22px', borderRadius: 8, background: '#00C4D4', color: '#06121F', fontWeight: 800, textDecoration: 'none' },
  card: { display: 'block', padding: '18px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', marginBottom: 14, textDecoration: 'none', color: '#E6ECF7' },
}

export default function ArticleView({ article: a, lang, url, others = [], hrefOf }) {
  const c = COPY[lang]
  return (
    <article lang={c.locale} style={s.wrap}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(a, lang, url)) }} />
      <nav style={s.crumbs} aria-label="breadcrumb">
        <Link href={c.bookHref} style={s.a}>{c.home}</Link> › <Link href={c.hubHref} style={s.a}>{c.hub}</Link>
      </nav>
      <h1 style={s.h1}>{a.h1}</h1>
      <p style={s.meta}>{c.by} · {c.updated} <time dateTime={a.updated}>{a.updated.split('-').reverse().join('/')}</time></p>
      {a.intro.map((p, i) => <p key={i}>{p}</p>)}
      {a.sections.map((sec) => (
        <section key={sec.h}>
          <h2 style={s.h2}>{sec.h}</h2>
          {sec.p?.map((p, i) => <p key={i}>{p}</p>)}
          {sec.list && <ul>{sec.list.map((li) => <li key={li} style={s.li}>{li}</li>)}</ul>}
          {sec.verses?.map((v) => (
            <blockquote key={v.ref} style={s.verse}>
              <div style={s.ref}>{v.ref}</div>
              <div>“{v.text}”</div>
              <div style={s.note}>{v.note}</div>
            </blockquote>
          ))}
        </section>
      ))}
      {a.faq?.length > 0 && (
        <section>
          <h2 style={s.h2}>{c.faq}</h2>
          {a.faq.map((f) => (
            <div key={f.q}>
              <h3 style={{ color: '#fff', fontSize: 19, margin: '20px 0 6px' }}>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>
      )}
      <aside style={s.cta}>
        <h2 style={{ ...s.h2, marginTop: 0 }}>{c.ctaTitle}</h2>
        <p style={{ margin: 0 }}>{c.ctaText}</p>
        <Link href={c.bookHref} style={s.btn}>{c.ctaBtn}</Link>
      </aside>
      {others.length > 0 && (
        <section>
          <h2 style={s.h2}>{c.more}</h2>
          {others.map((o) => (
            <Link key={o.slug} href={hrefOf(o.slug)} style={s.card}>
              <strong style={{ color: '#fff' }}>{o.h1}</strong>
              <div style={{ fontSize: 15, color: '#8A9BBF', marginTop: 4 }}>{o.description}</div>
            </Link>
          ))}
        </section>
      )}
    </article>
  )
}

export function ArticleIndex({ items, lang, hrefOf, title, intro }) {
  return (
    <div style={s.wrap} lang={COPY[lang].locale}>
      <h1 style={s.h1}>{title}</h1>
      <p style={{ color: '#B8C4DA' }}>{intro}</p>
      <div style={{ marginTop: 32 }}>
        {items.map((o) => (
          <Link key={o.slug} href={hrefOf(o.slug)} style={s.card}>
            <strong style={{ color: '#fff', fontSize: 20 }}>{o.h1}</strong>
            <div style={{ fontSize: 15, color: '#8A9BBF', marginTop: 6 }}>{o.description}</div>
          </Link>
        ))}
      </div>
      <aside style={s.cta}>
        <h2 style={{ ...s.h2, marginTop: 0 }}>{COPY[lang].ctaTitle}</h2>
        <p style={{ margin: 0 }}>{COPY[lang].ctaText}</p>
        <Link href={COPY[lang].bookHref} style={s.btn}>{COPY[lang].ctaBtn}</Link>
      </aside>
    </div>
  )
}
