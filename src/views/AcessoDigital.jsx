'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const INITIAL_CHAPTERS_VISIBLE = 8

const COPY = {
  pt: {
    tagline: 'Livros que curam. Palavras que libertam.',
    help: 'Precisa de ajuda?',
    support: 'suporte@gilberto-souza.com.br',
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
    showAll: 'Ver todos os capítulos',
    showLess: 'Mostrar menos',
    emailNoteTitle: 'Você também receberá por e-mail',
    emailNoteText: 'o acesso no idioma da sua compra.',
    importantTitle: 'Importante:',
    importantText: 'este acesso foi liberado somente para o idioma da sua compra.',
    footerScript: 'Sua jornada de cura começa agora.',
    footerText: 'Agradeço por confiar no meu trabalho.',
    loading: 'Carregando seu acesso...',
    notFoundTitle: 'Acesso não encontrado',
    notFoundText: 'Verifique o link recebido por e-mail ou fale com o suporte.',
    noEbook: 'Link do eBook ainda não configurado para este idioma.',
    noAudio: 'Os áudios deste idioma ainda não foram conectados.',
    play: 'Tocar',
    pause: 'Pausar',
    cover: '/books/pt/book-front.jpg'
  },
  en: {
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
    showAll: 'View all chapters',
    showLess: 'Show less',
    emailNoteTitle: 'You will also receive this access by email',
    emailNoteText: 'in your selected language.',
    importantTitle: 'Important:',
    importantText: 'this access was enabled only for the language of your purchase.',
    footerScript: 'Your healing journey begins now.',
    footerText: 'Thank you for allowing my words to be part of your transformation.',
    loading: 'Loading your access...',
    notFoundTitle: 'Access not found',
    notFoundText: 'Check the link received by email or contact support.',
    noEbook: 'The eBook link is not configured for this language yet.',
    noAudio: 'The audio files for this language have not been connected yet.',
    play: 'Play',
    pause: 'Pause',
    cover: '/books/en/book-front.png'
  },
  es: {
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
    showAll: 'Ver todos los capítulos',
    showLess: 'Mostrar menos',
    emailNoteTitle: 'También recibirás este acceso por correo',
    emailNoteText: 'en el idioma de tu compra.',
    importantTitle: 'Importante:',
    importantText: 'este acceso fue liberado solo para el idioma de tu compra.',
    footerScript: 'Tu camino de sanación comienza ahora.',
    footerText: 'Gracias por confiar en mi trabajo.',
    loading: 'Cargando tu acceso...',
    notFoundTitle: 'Acceso no encontrado',
    notFoundText: 'Verifica el enlace recibido por correo o contacta al soporte.',
    noEbook: 'El enlace del eBook aún no está configurado para este idioma.',
    noAudio: 'Los audios de este idioma aún no han sido conectados.',
    play: 'Reproducir',
    pause: 'Pausar',
    cover: '/books/es/book-front.jpg'
  }
}

function normalizeLang(value) {
  const lang = String(value || 'pt').toLowerCase()
  if (lang.startsWith('en')) return 'en'
  if (lang.startsWith('es')) return 'es'
  return 'pt'
}

function getChapterLabel(lang, index) {
  if (lang === 'en') return `Chapter ${index + 1}`
  return `Capítulo ${index + 1}`
}

function getTokenFromBrowser() {
  if (typeof window === 'undefined') return { token: '', lang: 'pt' }

  const searchParams = new URLSearchParams(window.location.search)
  const lang = normalizeLang(searchParams.get('lang'))

  const parts = window.location.pathname.split('/').filter(Boolean)
  const token = searchParams.get('token') || parts[parts.length - 1] || ''
  const paymentIntent = searchParams.get('payment_intent') || searchParams.get('pi') || ''

  return { token, lang, paymentIntent }
}

function AudioRow({ chapter, index, lang, t }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const title = chapter?.title || getChapterLabel(lang, index)
  const url = chapter?.url || ''
  const filename = chapter?.filename || `audio-${lang}-${String(index + 1).padStart(2, '0')}.wav`

  async function toggleAudio() {
    const audio = audioRef.current
    if (!audio || !url) return

    try {
      if (audio.paused) {
        await audio.play()
        setIsPlaying(true)
      } else {
        audio.pause()
        setIsPlaying(false)
      }
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <div className="access-audio-row">
      <button
        type="button"
        className="access-play-button"
        onClick={toggleAudio}
        disabled={!url}
        aria-label={isPlaying ? t.pause : t.play}
        title={isPlaying ? t.pause : t.play}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>

      <div className="access-audio-main">
        <div className="access-audio-title">{title}</div>

        {url ? (
          <audio
            ref={audioRef}
            controls
            preload="none"
            src={url}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="access-audio-native"
          />
        ) : (
          <div className="access-fake-progress">
            <span />
          </div>
        )}
      </div>

      {url ? (
        <a
          href={url}
          download={filename}
          target="_blank"
          rel="noreferrer"
          className="access-audio-download"
        >
          ⬇ <span>{t.download}</span>
        </a>
      ) : (
        <span className="access-audio-unavailable">—</span>
      )}
    </div>
  )
}

export default function AcessoDigital() {
  const [{ token, initialLang, paymentIntent }, setTokenInfo] = useState({ token: '', initialLang: 'pt', paymentIntent: '' })
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAllChapters, setShowAllChapters] = useState(false)

  useEffect(() => {
    const info = getTokenFromBrowser()
    setTokenInfo({ token: info.token, initialLang: info.lang, paymentIntent: info.paymentIntent })
  }, [])

  useEffect(() => {
    if (!token) return

    let active = true

    async function loadAccess() {
      try {
        setLoading(true)
        setError('')

        const query = new URLSearchParams({ token })
        if (paymentIntent) query.set('payment_intent', paymentIntent)

        const response = await fetch(`/api/digital-access?${query.toString()}`, {
          cache: 'no-store'
        })

        const data = await response.json()

        if (!active) return

        if (data?.success && data?.order) {
          setOrder(data.order)
        } else {
          setError('not-found')
        }
      } catch {
        if (active) setError('not-found')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadAccess()

    return () => {
      active = false
    }
  }, [token, paymentIntent])

  const lang = normalizeLang(order?.lang || order?.language || initialLang)

  const isSuperacao =
    order?.productId ===
      'superacao_digital_pt'

  const t =
    isSuperacao
      ? {
          ...COPY.pt,
          tagline:
            'Uma história real de dor, fé, luta e vitória.',
          subtitle:
            'Seu eBook Superação está disponível.',
          description:
            'Baixe o eBook completo em PDF.',
          ebookTitle:
            'Superação — eBook',
          ebookDesc:
            'Baixe o livro para ler no celular, tablet ou computador.',
          footerScript:
            'O seu futuro é você quem faz.'
        }
      : COPY[lang]

  const files = order?.files || {}
  const ebookUrl = files?.ebook?.url || ''
  const allChapters = Array.isArray(files?.audiobook) ? files.audiobook.filter((item) => item?.url) : []

  const visibleChapters = useMemo(() => {
    if (showAllChapters) return allChapters
    return allChapters.slice(0, INITIAL_CHAPTERS_VISIBLE)
  }, [allChapters, showAllChapters])

  if (!token || loading) {
    return (
      <main className="access-page">
        <div className="access-state-card">
          <div className="access-state-icon">✓</div>
          <h1>{t.loading}</h1>
        </div>
        <AccessStyles />
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="access-page">
        <div className="access-state-card">
          <div className="access-state-icon access-state-error">!</div>
          <h1>{t.notFoundTitle}</h1>
          <p>{t.notFoundText}</p>
        </div>
        <AccessStyles />
      </main>
    )
  }

  return (
    <main className="access-page">
      <header className="access-header">
        <div className="access-brand">
          <div className="access-logo">G</div>
          <div>
            <div className="access-brand-name">Gilberto de Souza</div>
            <div className="access-tagline">{t.tagline}</div>
          </div>
        </div>

        <a href={`mailto:${t.support}`} className="access-support">
          <span>🎧</span>
          <div>
            <strong>{t.help}</strong>
            <small>{t.support}</small>
          </div>
        </a>
      </header>

      <section className="access-hero">
        <div className="access-check">✓</div>

        <div className="access-hero-content">
          <h1>{t.title}</h1>
          <div className="access-gold-line" />
          <h2>{t.subtitle}</h2>
          <p>{t.description}</p>

          <div className="access-status">
            <span>✓ {t.payment}</span>
            <i />
            <span>🔓 {t.access}</span>
            <i />
            <span>🌐 {t.selectedLanguage} <strong>{t.language}</strong></span>
          </div>
        </div>

        <div className="access-private">
          <span>🛡</span>
          <div>
            <strong>{t.privateTitle}</strong>
            <small>{t.privateText}</small>
          </div>
        </div>
      </section>

      <section className="access-content-grid">
        <article className="access-card access-ebook-card">
          <div className="access-cover-shell">
            <img src={t.cover} alt={t.ebookTitle} className="access-cover" />
          </div>

          <div className="access-ebook-info">
            <div className="access-section-heading">
              <span>📖</span>
              <h2>{t.ebookTitle}</h2>
            </div>

            <p>{t.ebookDesc}</p>

            {ebookUrl ? (
              <div className="access-button-stack">
                <a
                  href={ebookUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="access-primary-button"
                >
                  ⬇ {t.downloadEbook}
                </a>

                <a
                  href={ebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="access-secondary-button"
                >
                  📖 {t.readNow}
                </a>
              </div>
            ) : (
              <div className="access-warning">{t.noEbook}</div>
            )}

            <div className="access-format">📄 {t.format}</div>
          </div>
        </article>

        {!isSuperacao && (
        <article className="access-card access-audio-card">
          <div className="access-audio-heading">
            <div className="access-section-heading">
              <span>🎧</span>
              <div>
                <h2>{t.audioTitle}</h2>
                <p>{t.audioDesc}</p>
              </div>
            </div>
          </div>

          {allChapters.length > 0 ? (
            <>
              <div className="access-audio-list">
                {visibleChapters.map((chapter, index) => (
                  <AudioRow
                    key={`${chapter.url}-${index}`}
                    chapter={chapter}
                    index={index}
                    lang={lang}
                    t={t}
                  />
                ))}
              </div>

              {allChapters.length > INITIAL_CHAPTERS_VISIBLE && (
                <button
                  type="button"
                  className="access-show-all"
                  onClick={() => setShowAllChapters((value) => !value)}
                >
                  {showAllChapters
                    ? `↑ ${t.showLess}`
                    : `☰ ${t.showAll} (${allChapters.length})`}
                </button>
              )}
            </>
          ) : (
            <div className="access-warning">{t.noAudio}</div>
          )}
        </article>
        )}
      </section>

      <section className="access-info-strip">
        <div>
          <span>✉</span>
          <div>
            <strong>{t.emailNoteTitle}</strong>
            <p>{t.emailNoteText}</p>
          </div>
        </div>

        <i />

        <div>
          <span>🛡</span>
          <div>
            <strong>{t.importantTitle}</strong>
            <p>{t.importantText}</p>
          </div>
        </div>
      </section>

      <footer className="access-footer">
        <div>{t.footerScript}</div>
        <span>♡</span>
        <p>{t.footerText}</p>
        <strong>— Gilberto de Souza</strong>
      </footer>

      <AccessStyles />
    </main>
  )
}

function AccessStyles() {
  return (
    <style jsx global>{`
      .access-page {
        min-height: 100vh;
        background:
          radial-gradient(circle at 0% 100%, rgba(201, 139, 25, 0.18), transparent 28%),
          linear-gradient(180deg, #fffaf2 0%, #fbf0dd 100%);
        color: #221813;
        padding: 24px clamp(16px, 4vw, 56px) 44px;
        font-family: Inter, Jost, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .access-header,
      .access-hero,
      .access-content-grid,
      .access-info-strip,
      .access-footer {
        width: min(1320px, 100%);
        margin-left: auto;
        margin-right: auto;
      }

      .access-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        margin-bottom: 24px;
      }

      .access-brand {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .access-logo {
        color: #c98b19;
        font-family: Georgia, serif;
        font-size: 52px;
        line-height: 1;
        font-style: italic;
      }

      .access-brand-name {
        font-family: Georgia, "Times New Roman", serif;
        font-size: 28px;
        font-weight: 800;
        color: #1c1713;
      }

      .access-tagline {
        color: #766d62;
        font-size: 14px;
      }

      .access-support {
        display: flex;
        gap: 10px;
        align-items: center;
        color: #241b14;
        text-decoration: none;
      }

      .access-support > span {
        color: #c98b19;
        font-size: 25px;
      }

      .access-support small {
        display: block;
        color: #6b6258;
      }

      .access-hero {
        background: rgba(255, 255, 255, 0.86);
        border: 1px solid #eadfce;
        border-radius: 24px;
        box-shadow: 0 18px 50px rgba(83, 54, 20, 0.1);
        padding: clamp(24px, 4vw, 50px);
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: clamp(20px, 4vw, 38px);
        align-items: center;
        margin-bottom: 18px;
      }

      .access-check {
        width: clamp(78px, 11vw, 118px);
        height: clamp(78px, 11vw, 118px);
        border-radius: 999px;
        background: #e4f4df;
        color: #0f4d24;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(42px, 6vw, 62px);
        font-weight: 900;
        box-shadow: 0 12px 35px rgba(15, 77, 36, 0.12);
      }

      .access-hero h1 {
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(36px, 5vw, 58px);
        line-height: 1.02;
        margin: 0;
        color: #103b22;
        letter-spacing: -0.04em;
      }

      .access-gold-line {
        width: 50px;
        height: 4px;
        border-radius: 999px;
        background: #d19a2a;
        margin: 14px 0;
      }

      .access-hero h2 {
        color: #c28216;
        font-size: clamp(17px, 2vw, 20px);
        margin: 0 0 10px;
        font-weight: 900;
      }

      .access-hero p {
        color: #504942;
        font-size: 17px;
        line-height: 1.65;
        margin: 0;
        max-width: 780px;
      }

      .access-private {
        background: #fffdf8;
        border: 1px solid #eadfce;
        border-radius: 18px;
        padding: 18px 22px;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 210px;
      }

      .access-private > span {
        width: 42px;
        height: 42px;
        border-radius: 999px;
        background: #f4f0e7;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .access-private small {
        display: block;
        color: #655d55;
      }

      .access-status {
        margin-top: 24px;
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 14px 22px;
        border-radius: 14px;
        border: 1px solid #eadfce;
        background: rgba(255, 250, 240, 0.86);
        width: fit-content;
        max-width: 100%;
        flex-wrap: wrap;
      }

      .access-status span {
        color: #1d3326;
        font-weight: 850;
        white-space: nowrap;
      }

      .access-status strong {
        color: #0f4d24;
      }

      .access-status i {
        width: 1px;
        height: 24px;
        background: #ded2c1;
      }

      .access-content-grid {
        display: grid;
        grid-template-columns: minmax(300px, 0.9fr) minmax(360px, 1.25fr);
        gap: 18px;
        align-items: start;
        margin-bottom: 18px;
      }

      .access-card {
        background: rgba(255, 255, 255, 0.88);
        border: 1px solid #eadfce;
        border-radius: 24px;
        box-shadow: 0 18px 50px rgba(83, 54, 20, 0.08);
      }

      .access-ebook-card {
        padding: clamp(22px, 3vw, 30px);
        display: grid;
        grid-template-columns: minmax(130px, 220px) minmax(0, 1fr);
        gap: clamp(20px, 3vw, 30px);
        align-items: center;
        align-self: start;
      }

      .access-cover {
        width: 100%;
        max-height: 360px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 18px 24px 40px rgba(40, 23, 10, 0.25);
      }

      .access-ebook-info {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .access-section-heading {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .access-section-heading > span {
        font-size: 34px;
        color: #c98b19;
        flex-shrink: 0;
      }

      .access-section-heading h2 {
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(24px, 3vw, 34px);
        color: #2a1b13;
        margin: 0;
      }

      .access-section-heading p,
      .access-ebook-info p {
        color: #554d44;
        line-height: 1.6;
        font-size: 16px;
        margin: 0;
      }

      .access-button-stack {
        display: grid;
        gap: 12px;
      }

      .access-primary-button,
      .access-secondary-button {
        border-radius: 12px;
        padding: 15px 18px;
        text-decoration: none;
        font-weight: 950;
        font-size: 17px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        text-align: center;
      }

      .access-primary-button {
        background: linear-gradient(180deg, #0f5528, #0b3d1e);
        color: #fff;
        box-shadow: 0 12px 25px rgba(15, 77, 36, 0.22);
      }

      .access-secondary-button {
        background: #fffdf8;
        color: #0f4d24;
        border: 1px solid #0f4d24;
      }

      .access-format {
        color: #6c645b;
        font-weight: 750;
      }

      .access-audio-card {
        padding: clamp(22px, 3vw, 30px);
        align-self: start;
      }

      .access-audio-heading {
        margin-bottom: 18px;
      }

      .access-audio-list {
        display: grid;
        gap: 12px;
      }

      .access-audio-row {
        border: 1px solid #eadfce;
        border-radius: 14px;
        padding: 12px;
        display: grid;
        grid-template-columns: 44px minmax(0, 1fr) auto;
        gap: 14px;
        align-items: center;
        background: rgba(255, 255, 255, 0.84);
      }

      .access-play-button {
        width: 42px;
        height: 42px;
        border-radius: 999px;
        border: 0;
        background: #0f4d24;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        cursor: pointer;
        transition: transform 0.18s ease, background 0.18s ease;
      }

      .access-play-button:hover:not(:disabled) {
        background: #0a3919;
        transform: scale(1.04);
      }

      .access-play-button:disabled {
        background: #b8b2aa;
        cursor: not-allowed;
      }

      .access-audio-title {
        color: #211811;
        font-weight: 850;
        font-size: 14px;
        margin-bottom: 7px;
      }

      .access-audio-native {
        width: 100%;
        height: 36px;
      }

      .access-audio-download {
        color: #17251b;
        font-size: 12px;
        font-weight: 900;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
      }

      .access-audio-download:hover {
        text-decoration: underline;
      }

      .access-show-all {
        margin: 18px auto 0;
        background: #fffdf8;
        color: #17251b;
        border: 1px solid #0f4d24;
        border-radius: 12px;
        padding: 12px 26px;
        font-weight: 850;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .access-warning {
        background: #fff8e7;
        border: 1px solid #eadfce;
        color: #7a5517;
        border-radius: 12px;
        padding: 14px;
        font-weight: 800;
      }

      .access-info-strip {
        background: rgba(255, 255, 255, 0.74);
        border: 1px solid #eadfce;
        border-radius: 20px;
        padding: 18px clamp(18px, 4vw, 70px);
        display: grid;
        grid-template-columns: 1fr 1px 1fr;
        gap: 34px;
        align-items: center;
        box-shadow: 0 12px 35px rgba(83, 54, 20, 0.06);
      }

      .access-info-strip > div {
        display: flex;
        align-items: center;
        gap: 18px;
      }

      .access-info-strip > div > span {
        width: 58px;
        height: 58px;
        border-radius: 999px;
        background: #fffaf0;
        color: #c98b19;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        font-size: 25px;
      }

      .access-info-strip i {
        width: 1px;
        height: 55px;
        background: #ded2c1;
      }

      .access-info-strip p {
        margin: 4px 0 0;
        color: #504942;
      }

      .access-footer {
        text-align: center;
        margin-top: 22px;
        color: #372820;
      }

      .access-footer > div {
        font-family: Georgia, serif;
        font-style: italic;
        color: #c98b19;
        font-size: clamp(28px, 4vw, 42px);
      }

      .access-footer > span {
        color: #c98b19;
        font-size: 28px;
        line-height: 1;
      }

      .access-footer p {
        margin: 0 0 4px;
      }

      .access-state-card {
        max-width: 540px;
        margin: 18vh auto;
        text-align: center;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #eadfce;
        border-radius: 24px;
        padding: 40px;
        box-shadow: 0 18px 50px rgba(83, 54, 20, 0.1);
      }

      .access-state-icon {
        width: 86px;
        height: 86px;
        border-radius: 999px;
        margin: 0 auto 20px;
        background: #e4f4df;
        color: #0f4d24;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 42px;
        font-weight: 900;
      }

      .access-state-error {
        background: #fff3f0;
        color: #8a2419;
      }

      .access-state-card h1 {
        font-family: Georgia, "Times New Roman", serif;
        font-size: 30px;
        color: #103b22;
      }

      @media (max-width: 1024px) {
        .access-hero {
          grid-template-columns: auto 1fr;
        }

        .access-private {
          grid-column: 1 / -1;
          width: fit-content;
        }

        .access-content-grid {
          grid-template-columns: 1fr;
        }

        .access-ebook-card {
          grid-template-columns: minmax(140px, 220px) minmax(0, 1fr);
        }
      }

      @media (max-width: 720px) {
        .access-page {
          padding: 16px 12px 34px;
        }

        .access-header {
          align-items: flex-start;
          flex-direction: column;
          gap: 12px;
        }

        .access-logo {
          font-size: 42px;
        }

        .access-brand-name {
          font-size: 22px;
        }

        .access-support {
          font-size: 13px;
        }

        .access-hero {
          grid-template-columns: 1fr;
          text-align: left;
          border-radius: 18px;
          padding: 22px;
        }

        .access-check {
          width: 84px;
          height: 84px;
          font-size: 44px;
        }

        .access-status {
          width: 100%;
          align-items: flex-start;
          flex-direction: column;
          gap: 10px;
        }

        .access-status i {
          display: none;
        }

        .access-private {
          width: 100%;
        }

        .access-ebook-card {
          grid-template-columns: 1fr;
          text-align: center;
          border-radius: 18px;
        }

        .access-cover-shell {
          display: flex;
          justify-content: center;
        }

        .access-cover {
          width: min(250px, 82vw);
          max-height: none;
        }

        .access-section-heading {
          justify-content: center;
        }

        .access-audio-card {
          border-radius: 18px;
        }

        .access-audio-heading .access-section-heading {
          justify-content: flex-start;
        }

        .access-audio-row {
          grid-template-columns: 42px minmax(0, 1fr);
          gap: 10px;
        }

        .access-audio-download {
          grid-column: 2;
          width: fit-content;
          padding: 8px 0 0;
        }

        .access-info-strip {
          grid-template-columns: 1fr;
          gap: 18px;
          padding: 18px;
        }

        .access-info-strip i {
          width: 100%;
          height: 1px;
        }

        .access-info-strip > div {
          align-items: flex-start;
        }
      }

      @media (max-width: 420px) {
        .access-audio-native {
          height: 34px;
        }

        .access-audio-title {
          font-size: 13px;
        }

        .access-primary-button,
        .access-secondary-button {
          width: 100%;
          font-size: 15px;
        }
      }
    `}</style>
  )
}
