'use client'

export default function LinksPage() {
  const groups = [
    { section: 'READ THE BOOK + AUDIOBOOK', grid: false, items: [
      { icon: '📖', title: 'Read Book + Audiobook (English)', sub: 'EBOOK & AUDIOBOOK', href: '/checkout-digital?lang=en' },
      { icon: '📖', title: 'Leer Libro + Audiolibro (Español)', sub: 'EBOOK & AUDIOBOOK', href: '/checkout-digital?lang=es' },
      { icon: '📖', title: 'Ler Livro + Audiobook (Português)', sub: 'EBOOK & AUDIOBOOK', href: '/checkout-digital?lang=pt' },
    ]},
    { section: 'PAPERBACK - AMAZON', grid: true, items: [
      { icon: '🇺🇸', title: 'Amazon', sub: 'English', href: 'https://amazon.com' },
      { icon: '🇪🇸', title: 'Amazon', sub: 'Español', href: 'https://amazon.es' },
      { icon: '🇧🇷', title: 'Amazon', sub: 'Português', href: 'https://amazon.com.br' },
    ]},
    { section: 'PAPERBACK - BARNES & NOBLE', grid: true, items: [
      { icon: '🇺🇸', title: 'Barnes & Noble', sub: 'English', href: 'https://barnesandnoble.com' },
      { icon: '🇪🇸', title: 'Barnes & Noble', sub: 'Español', href: 'https://barnesandnoble.com' },
      { icon: '🇧🇷', title: 'Barnes & Noble', sub: 'Português', href: 'https://barnesandnoble.com' },
    ]},
  ]


  const S = {
    page: { minHeight: '100vh', background: 'linear-gradient(180deg,#BDD8EE 0%,#EEF5FB 50%,#E4EFF8 100%)', fontFamily: 'Inter,Helvetica Neue,sans-serif', overflowX: 'hidden' },
    hero: { background: 'linear-gradient(180deg,#AAD0EC 0%,#D8EEF9 100%)', position: 'relative', overflow: 'hidden' },
    heroInner: { maxWidth: 900, margin: '0 auto', padding: '40px 20px 36px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 24, alignItems: 'center' },
    photo: { width: 140, height: 200, borderRadius: 12, overflow: 'hidden', flexShrink: 0, boxShadow: '0 12px 40px rgba(0,80,140,0.22)', background: '#b8cfe0' },
    photoImg: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' },
    center: { textAlign: 'center', padding: '0 8px' },
    tag: { fontSize: 12, letterSpacing: 3, color: '#2E5870', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 4px' },
    tag2: { fontSize: 10, letterSpacing: 2.5, color: '#1A90B8', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 10px' },
    bar: { width: 36, height: 2, background: 'linear-gradient(90deg,#1A90B8,#5BC0D8)', margin: '0 auto 16px', borderRadius: 2 },
    h1: { fontSize: 'clamp(20px,4vw,32px)', fontWeight: 900, color: '#0D2235', lineHeight: 1.2, margin: '0 0 8px' },
    h2: { fontSize: 'clamp(16px,3vw,24px)', fontWeight: 700, color: '#1A90B8', lineHeight: 1.3, margin: '0 0 12px', fontStyle: 'italic' },
    desc: { fontSize: 13, color: '#4A6070', lineHeight: 1.6, margin: '0 0 16px' },
    formats: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 11, color: '#4A7090', fontWeight: 700, flexWrap: 'wrap' },
    sep: { color: '#A0BDD0' },
    bookWrap: { width: 110, flexShrink: 0, filter: 'drop-shadow(0 16px 32px rgba(0,60,120,0.25))' },
    bookImg: { width: '100%', display: 'block', borderRadius: 6 },
    linksWrap: { maxWidth: 680, margin: '0 auto', padding: '32px 20px 16px' },
    groupWrap: { marginBottom: 28 },
    divRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 },
    divLine: { flex: 1, height: 1 },
    divLabel: { fontSize: 9, letterSpacing: 2.5, color: '#3A6080', fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'nowrap' },
    quoteWrap: { maxWidth: 680, margin: '0 auto 36px', padding: '0 20px' },
    quoteBox: { background: 'linear-gradient(135deg,#B8D5EC 0%,#D5E9F5 100%)', border: '1px solid #A8CAEA', borderRadius: 18, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 120px', minHeight: 150 },
    quotePad: { padding: '28px 24px 24px' },
    quoteIcon: { fontSize: 34, color: '#1A90B8', lineHeight: 1, marginBottom: 10, fontFamily: 'Georgia,serif' },
    quoteText: { fontSize: 15, color: '#0D2235', lineHeight: 1.65, fontStyle: 'italic', fontWeight: 500, margin: '0 0 12px' },
    quoteAuthor: { fontSize: 10, letterSpacing: 2, color: '#1A90B8', fontWeight: 800, textTransform: 'uppercase', margin: 0 },
    quoteImgWrap: { position: 'relative', overflow: 'hidden' },
    quoteImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.45 },
    quoteOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#B8D5EC 0%,transparent 55%)' },
    footer: { borderTop: '1px solid #B8D4E8', padding: '22px 20px', textAlign: 'center', background: '#C8E0F0' },
    footerRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 14, fontSize: 10, color: '#4A6878', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' },
    footerName: { fontFamily: 'Georgia,serif', fontStyle: 'italic', fontSize: 20, color: '#0D2235', margin: '0 0 3px', fontWeight: 400 },
    footerRole: { fontSize: 9, letterSpacing: 3, color: '#7A9AB0', textTransform: 'uppercase', margin: 0 },
  }

  return (
    <main style={S.page}>

      <section style={S.hero}>
        <div style={S.heroInner}>
          <div style={S.photo}>
            <img src="/links-assets/author-en.png" alt="Gilberto Souza" style={S.photoImg} />
          </div>
          <div style={S.center}>
            <p style={S.tag}>GILBERTO SOUZA</p>
            <p style={S.tag2}>AUTHOR</p>
            <div style={S.bar} />
            <h1 style={S.h1}>She chose<br/>someone else.</h1>
            <h2 style={S.h2}>I wrote about<br/>what happened next.</h2>
            <p style={S.desc}>A book about betrayal, heartbreak<br/>and rebuilding your life.</p>
            <div style={S.formats}>
              <span>EBOOK</span>
              <span style={S.sep}>|</span>
              <span>AUDIOBOOK</span>
              <span style={S.sep}>|</span>
              <span>PAPERBACK</span>
            </div>
          </div>
          <div style={S.bookWrap}>
            <img src="/links-assets/book-en.png" alt="Book cover" style={S.bookImg} />
          </div>
        </div>
      </section>

      <section style={S.linksWrap}>
        {groups.map((group, gi) => (
          <div key={gi} style={S.groupWrap}>
            <div style={S.divRow}>
              <div style={{ ...S.divLine, background: 'linear-gradient(90deg,transparent,#A8C8E0)' }} />
              <span style={S.divLabel}>{group.section}</span>
              <div style={{ ...S.divLine, background: 'linear-gradient(90deg,#A8C8E0,transparent)' }} />
            </div>
            <div style={{ display: group.grid ? 'grid' : 'flex', gridTemplateColumns: group.grid ? 'repeat(3,1fr)' : undefined, flexDirection: group.grid ? undefined : 'column', gap: 10 }}>
              {group.items.map((item, ii) => (
                <a key={ii} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: group.grid ? 0 : 14, background: '#FFFFFF', border: '1px solid #C8E0F0', borderRadius: 14, padding: group.grid ? '16px 10px' : '15px 18px', textDecoration: 'none', boxShadow: '0 2px 14px rgba(0,80,140,0.08)', cursor: 'pointer', flexDirection: group.grid ? 'column' : 'row', textAlign: group.grid ? 'center' : 'left', justifyContent: group.grid ? 'center' : 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: group.grid ? 0 : 14, flexDirection: group.grid ? 'column' : 'row' }}>
                    <span style={{ fontSize: group.grid ? 26 : 24 }}>{item.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: group.grid ? 12 : 15, fontWeight: 800, color: '#0D2235', lineHeight: 1.3, marginTop: group.grid ? 6 : 0 }}>{item.title}</p>
                      <p style={{ margin: 0, fontSize: 9, fontWeight: 700, color: '#1A90B8', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 3 }}>{item.sub}</p>
                    </div>
                  </div>
                  {group.grid ? null : <span style={{ color: '#90B8D0', fontSize: 22, fontWeight: 200, flexShrink: 0 }}>›</span>}
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={S.quoteWrap}>
        <div style={S.quoteBox}>
          <div style={S.quotePad}>
            <div style={S.quoteIcon}>"</div>
            <p style={S.quoteText}>I did not write this book because I had answers. I wrote it because I was trying to survive the pain myself.</p>
            <p style={S.quoteAuthor}>— GILBERTO SOUZA</p>
          </div>
          <div style={S.quoteImgWrap}>
            <img src="/links-assets/author-en.png" alt="" style={S.quoteImg} />
            <div style={S.quoteOverlay} />
          </div>
        </div>
      </section>

      <footer style={S.footer}>
        <div style={S.footerRow}>
          <span>Available Worldwide</span>
          <span>Ebook · Audiobook · Paperback</span>
        </div>
        <p style={S.footerName}>Gilberto Souza</p>
        <p style={S.footerRole}>AUTHOR</p>
      </footer>

    </main>
  )
}
