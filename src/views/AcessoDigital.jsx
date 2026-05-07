'use client'

import { useEffect, useMemo, useState } from 'react'

const COPY = {
  pt: {
    htmlLang: 'pt-BR',
    tagline: 'Livros que curam. Palavras que libertam.',
    help: 'Precisa de ajuda?',
    support: 'suporte@gilbertodesouza.com.br',
    title: 'Obrigado pela sua compra!',
    subtitle: 'Seu acesso ao conteúdo digital foi liberado com sucesso.',
    description: 'Esta é a sua página exclusiva de acesso. Aqui você pode ouvir o audiobook e baixar o eBook no idioma escolhido na compra.',
    privateTitle: 'Página exclusiva',
    privateText: 'do comprador',
    payment: 'Pagamento confirmado',
    access: 'Acesso liberado',
    selectedLanguage: 'Idioma selecionado:',
    language: 'Português',
    ebookTitle: 'Seu eBook',
    ebookDesc: 'Baixe o arquivo em PDF para ler quando quiser.',
    downloadEbook: 'Baixar eBook',
    readNow: 'Ler agora',
    format: 'Formato: PDF',
    audioTitle: 'Seu Audiobook',
    audioDesc: 'Ouça os capítulos abaixo ou faça o download dos áudios.',
    download: 'Download',
    allChapters: 'Ver todos os capítulos',
    emailNoteTitle: 'Você também receberá por e-mail',
    emailNoteText: 'o acesso no idioma da sua compra.',
    importantTitle: 'Importante:',
    importantText: 'este acesso foi liberado somente para o idioma da sua compra.',
    footerScript: 'Sua jornada de cura começa agora.',
    footerText: 'Agradeço por confiar no meu trabalho.',
    loading: 'Carregando seu acesso...',
    notFoundTitle: 'Acesso não encontrado',
    notFoundText: 'Verifique o link recebido por e-mail ou fale com o suporte.',
    emptyAudio: 'Os áudios deste idioma ainda serão conectados. Assim que os links forem configurados, eles aparecerão aqui.',
    chapters: [
      'Introdução',
      'Entendendo a dor',
      'O processo de cura',
      'Reconstruindo sua autoestima',
      'Cicatrizando a rejeição',
      'Quando o amor não escolheu ficar',
      'Recuperando sua identidade',
      'A força de seguir em frente',
      'O silêncio que cura',
      'Recomeçando com dignidade',
      'Libertando-se da comparação',
      'Construindo amor-próprio',
      'Uma nova versão de você',
      'Conclusão'
    ],
    cover: '/books/pt/book-front.jpg'
  },
  en: {
    htmlLang: 'en',
    tagline: 'Books that heal. Words that set you free.',
    help: 'Need help?',
    support: 'support@gilbertodesouza.com.br',
    title: 'Thank you for your purchase!',
    subtitle: 'Your digital content access has been successfully unlocked.',
    description: 'This is your exclusive access page. Here you can listen to the audiobook and download the eBook in the language selected at checkout.',
    privateTitle: 'Private buyer',
    privateText: 'access page',
    payment: 'Payment confirmed',
    access: 'Access unlocked',
    selectedLanguage: 'Selected language:',
    language: 'English',
    ebookTitle: 'Your eBook',
    ebookDesc: 'Download your eBook in PDF format or read it online whenever you want.',
    downloadEbook: 'Download eBook',
    readNow: 'Read now',
    format: 'Format: PDF',
    audioTitle: 'Your Audiobook',
    audioDesc: 'Listen to the chapters below or download the audio files.',
    download: 'Download',
    allChapters: 'View all chapters',
    emailNoteTitle: 'You will also receive this access by email',
    emailNoteText: 'in your selected language.',
    importantTitle: 'Important:',
    importantText: 'this access was enabled only for the language of your purchase.',
    footerScript: 'Your healing journey begins now.',
    footerText: 'Thank you for allowing my words to be part of your transformation.',
    loading: 'Loading your access...',
    notFoundTitle: 'Access not found',
    notFoundText: 'Check the link received by email or contact support.',
    emptyAudio: 'The audio files for this language will be connected soon. Once the links are configured, they will appear here.',
    chapters: [
      'Introduction',
      'Understanding the Pain',
      'The Healing Process',
      'Rebuilding Your Self-Esteem',
      'Healing Rejection',
      'When Love Did Not Choose to Stay',
      'Recovering Your Identity',
      'The Strength to Move Forward',
      'The Silence That Heals',
      'Starting Again with Dignity',
      'Freeing Yourself from Comparison',
      'Building Self-Love',
      'A New Version of You',
      'Conclusion'
    ],
    cover: '/books/en/book-front.png'
  },
  es: {
    htmlLang: 'es',
    tagline: 'Libros que sanan. Palabras que liberan.',
    help: '¿Necesitas ayuda?',
    support: 'soporte@gilbertodesouza.com.br',
    title: '¡Gracias por tu compra!',
    subtitle: 'Tu acceso al contenido digital ha sido liberado con éxito.',
    description: 'Esta es tu página exclusiva de acceso. Aquí puedes escuchar el audiolibro y descargar el eBook en el idioma elegido en la compra.',
    privateTitle: 'Página exclusiva',
    privateText: 'del comprador',
    payment: 'Pago confirmado',
    access: 'Acceso liberado',
    selectedLanguage: 'Idioma seleccionado:',
    language: 'Español',
    ebookTitle: 'Tu eBook',
    ebookDesc: 'Descarga el archivo en PDF para leer cuando quieras.',
    downloadEbook: 'Descargar eBook',
    readNow: 'Leer ahora',
    format: 'Formato: PDF',
    audioTitle: 'Tu Audiolibro',
    audioDesc: 'Escucha los capítulos abajo o descarga los audios.',
    download: 'Descargar',
    allChapters: 'Ver todos los capítulos',
    emailNoteTitle: 'También recibirás este acceso por correo',
    emailNoteText: 'en el idioma de tu compra.',
    importantTitle: 'Importante:',
    importantText: 'este acceso fue liberado solo para el idioma de tu compra.',
    footerScript: 'Tu camino de sanación comienza ahora.',
    footerText: 'Gracias por confiar en mi trabajo.',
    loading: 'Cargando tu acceso...',
    notFoundTitle: 'Acceso no encontrado',
    notFoundText: 'Verifica el enlace recibido por correo o contacta al soporte.',
    emptyAudio: 'Los audios de este idioma serán conectados pronto. Cuando los enlaces estén configurados, aparecerán aquí.',
    chapters: [
      'Introducción',
      'Entendiendo el dolor',
      'El proceso de sanación',
      'Reconstruyendo tu autoestima',
      'Sanando el rechazo',
      'Cuando el amor no eligió quedarse',
      'Recuperando tu identidad',
      'La fuerza de seguir adelante',
      'El silencio que sana',
      'Empezando de nuevo con dignidad',
      'Liberándote de la comparación',
      'Construyendo amor propio',
      'Una nueva versión de ti',
      'Conclusión'
    ],
    cover: '/books/es/book-front.jpg'
  }
}

function normalizeLang(value) {
  const lang = String(value || 'pt').toLowerCase()
  if (lang.startsWith('en')) return 'en'
  if (lang.startsWith('es')) return 'es'
  return 'pt'
}

function Icon({ children, size = 42, bg = '#e8f5e9', color = '#0f4d24' }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 999,
      background: bg,
      color,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontWeight: 900
    }}>
      {children}
    </div>
  )
}

function StatusItem({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
      <Icon size={30}>{icon}</Icon>
      <span style={{ color: '#1d3326', fontWeight: 800, whiteSpace: 'nowrap' }}>{text}</span>
    </div>
  )
}

function AudioRow({ chapter, index, t }) {
  const hasUrl = Boolean(chapter?.url)
  const title = chapter?.title || `${index + 1}`
  const duration = chapter?.duration || '00:00'

  return (
    <div style={{
      border: '1px solid #eadfce',
      borderRadius: 14,
      padding: 12,
      display: 'grid',
      gridTemplateColumns: '42px 1fr auto',
      gap: 14,
      alignItems: 'center',
      background: 'rgba(255,255,255,.82)'
    }}>
      <Icon size={42} bg="#0f4d24" color="#fff">▶</Icon>

      <div style={{ minWidth: 0 }}>
        <div style={{ color: '#211811', fontWeight: 850, fontSize: 15, marginBottom: 8 }}>
          {title}
        </div>

        {hasUrl ? (
          <audio controls preload="none" src={chapter.url} style={{ width: '100%', height: 36 }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 999, background: '#e2dfda', overflow: 'hidden' }}>
              <div style={{ width: '3%', height: '100%', background: '#0f4d24' }} />
            </div>
            <span style={{ color: '#766f66', fontSize: 12 }}>00:00 / {duration}</span>
          </div>
        )}
      </div>

      {hasUrl ? (
        <a href={chapter.url} download target="_blank" rel="noreferrer" style={{
          color: '#17251b',
          fontSize: 13,
          fontWeight: 900,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          whiteSpace: 'nowrap'
        }}>
          ⬇ {t.download}
        </a>
      ) : (
        <span style={{ color: '#9a9287', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
          Em breve
        </span>
      )}
    </div>
  )
}

export default function AcessoDigital() {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const pathToken = typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).pop() : ''
  const token = params?.get('token') || pathToken || ''
  const fallbackLang = normalizeLang(params?.get('lang'))

  useEffect(() => {
    let active = true

    async function loadAccess() {
      try {
        if (!token) {
          setError('missing-token')
          setLoading(false)
          return
        }

        const res = await fetch(`/api/digital-access?token=${encodeURIComponent(token)}`, {
          cache: 'no-store'
        })
        const data = await res.json()

        if (!active) return

        if (data?.success && data?.order) {
          setOrder(data.order)
        } else {
          setError('not-found')
        }
      } catch (err) {
        if (active) setError('not-found')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadAccess()
    return () => { active = false }
  }, [token])

  const lang = normalizeLang(order?.lang || order?.language || fallbackLang)
  const t = COPY[lang]
  const files = order?.files || {}
  const ebookUrl = files?.ebook?.url || ''
  const rawAudio = Array.isArray(files?.audiobook) ? files.audiobook : []

  const audiobook = useMemo(() => {
    const filled = rawAudio
      .filter((item) => item && (item.url || item.title))
      .map((item, index) => ({
        ...item,
        title: item.title || `${lang === 'en' ? 'Chapter' : lang === 'es' ? 'Capítulo' : 'Capítulo'} ${index + 1} — ${t.chapters[index] || ''}`,
        duration: item.duration || ['07:12', '10:48', '12:36', '11:05'][index] || '00:00'
      }))

    if (filled.length > 0) return filled

    return t.chapters.slice(0, 4).map((title, index) => ({
      title: `${lang === 'en' ? 'Chapter' : lang === 'es' ? 'Capítulo' : 'Capítulo'} ${index + 1} — ${title}`,
      url: '',
      duration: ['07:12', '10:48', '12:36', '11:05'][index] || '00:00'
    }))
  }, [rawAudio, lang, t])

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.loadingCard}>
          <div style={styles.spinner}>✓</div>
          <h1 style={styles.loadingTitle}>{COPY[fallbackLang].loading}</h1>
        </div>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main style={styles.page}>
        <div style={styles.loadingCard}>
          <div style={{ ...styles.spinner, background: '#fff3f0', color: '#8a2419' }}>!</div>
          <h1 style={styles.loadingTitle}>{COPY[fallbackLang].notFoundTitle}</h1>
          <p style={styles.muted}>{COPY[fallbackLang].notFoundText}</p>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>G</div>
          <div>
            <div style={styles.brandName}>Gilberto de Souza</div>
            <div style={styles.tagline}>{t.tagline}</div>
          </div>
        </div>

        <a href={`mailto:${t.support}`} style={styles.support}>
          <span style={{ color: '#c98b19', fontSize: 25 }}>🎧</span>
          <span>
            <strong>{t.help}</strong>
            <small>{t.support}</small>
          </span>
        </a>
      </header>

      <section style={styles.hero}>
        <div style={styles.checkWrap}>
          <Icon size={118} bg="#e4f4df" color="#0f4d24">
            <span style={{ fontSize: 58, lineHeight: 1 }}>✓</span>
          </Icon>
          <span style={styles.spark1}>✦</span>
          <span style={styles.spark2}>✧</span>
          <span style={styles.spark3}>•</span>
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={styles.heroTitle}>{t.title}</h1>
          <div style={styles.goldLine} />
          <h2 style={styles.heroSubtitle}>{t.subtitle}</h2>
          <p style={styles.heroText}>{t.description}</p>

          <div style={styles.status}>
            <StatusItem icon="✓" text={t.payment} />
            <div style={styles.divider} />
            <StatusItem icon="🔓" text={t.access} />
            <div style={styles.divider} />
            <StatusItem icon="🌐" text={`${t.selectedLanguage} ${t.language}`} />
          </div>
        </div>

        <div style={styles.privateBox}>
          <Icon size={42} bg="#f4f0e7" color="#0f4d24">🛡</Icon>
          <div>
            <strong>{t.privateTitle}</strong>
            <span>{t.privateText}</span>
          </div>
        </div>
      </section>

      <section style={styles.grid}>
        <article style={styles.ebookCard}>
          <div style={styles.coverWrap}>
            <img src={t.cover} alt={t.ebookTitle} style={styles.cover} />
          </div>

          <div style={styles.ebookContent}>
            <div style={styles.sectionTitle}>
              <span style={styles.goldIcon}>📖</span>
              <h2>{t.ebookTitle}</h2>
            </div>
            <p style={styles.cardText}>{t.ebookDesc}</p>

            {ebookUrl ? (
              <>
                <a href={ebookUrl} download target="_blank" rel="noreferrer" style={styles.primaryBtn}>
                  ⬇ {t.downloadEbook}
                </a>
                <a href={ebookUrl} target="_blank" rel="noreferrer" style={styles.secondaryBtn}>
                  📖 {t.readNow}
                </a>
              </>
            ) : (
              <div style={styles.warning}>
                Link do eBook ainda não configurado para este idioma.
              </div>
            )}

            <div style={styles.format}>📄 {t.format}</div>
          </div>
        </article>

        <article style={styles.audioCard}>
          <div style={styles.sectionTitle}>
            <span style={styles.goldIcon}>🎧</span>
            <div>
              <h2>{t.audioTitle}</h2>
              <p style={{ ...styles.cardText, margin: 0 }}>{t.audioDesc}</p>
            </div>
          </div>

          <div style={styles.audioList}>
            {audiobook.map((chapter, index) => (
              <AudioRow key={`${chapter.url || chapter.title}-${index}`} chapter={chapter} index={index} t={t} />
            ))}
          </div>

          {rawAudio.filter((item) => item?.url).length === 0 && (
            <p style={styles.audioEmpty}>{t.emptyAudio}</p>
          )}

          <button type="button" style={styles.allBtn}>
            ☰ {t.allChapters} ({Math.max(rawAudio.length, t.chapters.length)})
          </button>
        </article>
      </section>

      <section style={styles.infoStrip}>
        <div style={styles.infoItem}>
          <Icon size={58} bg="#fffaf0" color="#c98b19">✉</Icon>
          <div>
            <strong>{t.emailNoteTitle}</strong>
            <p>{t.emailNoteText}</p>
          </div>
        </div>

        <div style={styles.verticalInfoDivider} />

        <div style={styles.infoItem}>
          <Icon size={58} bg="#fffaf0" color="#c98b19">🛡</Icon>
          <div>
            <strong>{t.importantTitle}</strong>
            <p>{t.importantText}</p>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.script}>{t.footerScript}</div>
        <div style={styles.heart}>♡</div>
        <p>{t.footerText}</p>
        <strong>— Gilberto de Souza</strong>
      </footer>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at 0% 100%, rgba(201,139,25,.16), transparent 28%), linear-gradient(180deg,#fffaf2 0%,#fbf3e7 100%)',
    color: '#221813',
    padding: '24px clamp(16px,4vw,56px) 44px',
    fontFamily: 'Inter, Jost, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  header: {
    maxWidth: 1320,
    margin: '0 auto 24px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
    alignItems: 'center'
  },
  brand: { display: 'flex', alignItems: 'center', gap: 14 },
  logo: {
    color: '#c98b19',
    fontFamily: 'Georgia, serif',
    fontSize: 52,
    lineHeight: 1,
    fontStyle: 'italic'
  },
  brandName: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: 28,
    fontWeight: 800,
    color: '#1c1713'
  },
  tagline: { color: '#786f64', fontSize: 14 },
  support: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    color: '#241b14'
  },
  hero: {
    maxWidth: 1320,
    margin: '0 auto 18px',
    background: 'rgba(255,255,255,.84)',
    border: '1px solid #eadfce',
    borderRadius: 24,
    boxShadow: '0 18px 50px rgba(83,54,20,.10)',
    padding: '34px clamp(22px,4vw,62px)',
    display: 'flex',
    gap: 34,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  checkWrap: { position: 'relative', flexShrink: 0 },
  spark1: { position: 'absolute', top: -10, left: 14, color: '#c98b19' },
  spark2: { position: 'absolute', top: 6, right: -12, color: '#0f4d24' },
  spark3: { position: 'absolute', bottom: 2, left: -18, color: '#c98b19', fontSize: 28 },
  heroTitle: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: 'clamp(34px,5vw,56px)',
    lineHeight: 1.02,
    margin: 0,
    color: '#103b22',
    letterSpacing: '-.04em'
  },
  goldLine: { width: 50, height: 4, borderRadius: 999, background: '#d19a2a', margin: '14px 0 14px' },
  heroSubtitle: { color: '#c28216', fontSize: 20, margin: '0 0 10px', fontWeight: 900 },
  heroText: { color: '#504942', fontSize: 17, lineHeight: 1.65, margin: 0, maxWidth: 760 },
  privateBox: {
    background: '#fffdf8',
    border: '1px solid #eadfce',
    borderRadius: 18,
    padding: '18px 22px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    minWidth: 220,
    boxShadow: '0 12px 30px rgba(83,54,20,.06)'
  },
  status: {
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    padding: '14px 22px',
    borderRadius: 14,
    border: '1px solid #eadfce',
    background: 'rgba(255,250,240,.82)',
    width: 'fit-content',
    maxWidth: '100%',
    flexWrap: 'wrap'
  },
  divider: { width: 1, height: 26, background: '#ded2c1' },
  grid: {
    maxWidth: 1320,
    margin: '0 auto 18px',
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 1fr) minmax(360px, 1.35fr)',
    gap: 18
  },
  ebookCard: {
    background: 'rgba(255,255,255,.86)',
    border: '1px solid #eadfce',
    borderRadius: 24,
    padding: 28,
    display: 'grid',
    gridTemplateColumns: 'minmax(150px, 240px) 1fr',
    gap: 30,
    alignItems: 'center',
    boxShadow: '0 18px 50px rgba(83,54,20,.08)'
  },
  coverWrap: { perspective: 1000 },
  cover: {
    width: '100%',
    maxHeight: 360,
    objectFit: 'cover',
    borderRadius: 8,
    boxShadow: '18px 24px 40px rgba(40,23,10,.25)'
  },
  ebookContent: { display: 'flex', flexDirection: 'column', gap: 16 },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  },
  goldIcon: { fontSize: 34, color: '#c98b19' },
  cardText: { color: '#554d44', lineHeight: 1.6, fontSize: 16 },
  primaryBtn: {
    background: 'linear-gradient(180deg,#0f5528,#0b3d1e)',
    color: '#fff',
    borderRadius: 12,
    padding: '15px 18px',
    textDecoration: 'none',
    fontWeight: 950,
    fontSize: 18,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    boxShadow: '0 12px 25px rgba(15,77,36,.22)'
  },
  secondaryBtn: {
    background: '#fffdf8',
    color: '#0f4d24',
    borderRadius: 12,
    padding: '14px 18px',
    textDecoration: 'none',
    fontWeight: 900,
    fontSize: 17,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    border: '1px solid #0f4d24'
  },
  format: { color: '#6c645b', fontWeight: 700, marginTop: 4 },
  warning: {
    background: '#fff8e7',
    border: '1px solid #eadfce',
    color: '#7a5517',
    borderRadius: 12,
    padding: 14,
    fontWeight: 800
  },
  audioCard: {
    background: 'rgba(255,255,255,.86)',
    border: '1px solid #eadfce',
    borderRadius: 24,
    padding: 28,
    boxShadow: '0 18px 50px rgba(83,54,20,.08)'
  },
  audioList: { display: 'grid', gap: 12, marginTop: 18 },
  audioEmpty: {
    color: '#8a6f48',
    background: '#fff8e7',
    border: '1px solid #eadfce',
    padding: 12,
    borderRadius: 12,
    marginTop: 14,
    fontSize: 13,
    fontWeight: 700
  },
  allBtn: {
    margin: '18px auto 0',
    background: '#fffdf8',
    color: '#17251b',
    border: '1px solid #0f4d24',
    borderRadius: 12,
    padding: '12px 26px',
    fontWeight: 850,
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  infoStrip: {
    maxWidth: 1320,
    margin: '0 auto',
    background: 'rgba(255,255,255,.72)',
    border: '1px solid #eadfce',
    borderRadius: 20,
    padding: '18px clamp(18px,4vw,70px)',
    display: 'grid',
    gridTemplateColumns: '1fr 1px 1fr',
    gap: 34,
    alignItems: 'center',
    boxShadow: '0 12px 35px rgba(83,54,20,.06)'
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 18
  },
  verticalInfoDivider: { width: 1, height: 55, background: '#ded2c1' },
  footer: {
    textAlign: 'center',
    marginTop: 22,
    color: '#372820'
  },
  script: {
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    color: '#c98b19',
    fontSize: 'clamp(28px,4vw,42px)'
  },
  heart: { color: '#c98b19', fontSize: 28, lineHeight: 1 },
  loadingCard: {
    maxWidth: 540,
    margin: '18vh auto',
    textAlign: 'center',
    background: 'rgba(255,255,255,.88)',
    border: '1px solid #eadfce',
    borderRadius: 24,
    padding: 40,
    boxShadow: '0 18px 50px rgba(83,54,20,.10)'
  },
  spinner: {
    width: 86,
    height: 86,
    borderRadius: 999,
    margin: '0 auto 20px',
    background: '#e4f4df',
    color: '#0f4d24',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 42,
    fontWeight: 900
  },
  loadingTitle: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: 30,
    color: '#103b22'
  },
  muted: { color: '#6f675e', lineHeight: 1.6 }
}
