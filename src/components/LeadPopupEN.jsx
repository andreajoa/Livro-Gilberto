"use client"


function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function popupKeys(lang) {
  return {
    views: `gs_lead_popup_views_${lang}_${todayKey()}`,
    subscribed: `gs_lead_popup_subscribed_${lang}`,
    dismissedSession: `gs_lead_popup_dismissed_session_${lang}_${todayKey()}`
  }
}

function shouldShowLeadPopup(lang) {
  if (typeof window === "undefined") return false
  const keys = popupKeys(lang)

  if (localStorage.getItem(keys.subscribed) === "true") return false
  if (sessionStorage.getItem(keys.dismissedSession) === "true") return false

  const views = Number(localStorage.getItem(keys.views) || "0")
  return views < 2
}

function registerLeadPopupView(lang) {
  if (typeof window === "undefined") return
  const keys = popupKeys(lang)
  const views = Number(localStorage.getItem(keys.views) || "0")
  localStorage.setItem(keys.views, String(views + 1))
}

function registerLeadPopupClose(lang) {
  if (typeof window === "undefined") return
  const keys = popupKeys(lang)
  sessionStorage.setItem(keys.dismissedSession, "true")
}

function registerLeadPopupSubscribed(lang) {
  if (typeof window === "undefined") return
  const keys = popupKeys(lang)
  localStorage.setItem(keys.subscribed, "true")
}

function getVisitorId() {
  if (typeof window === "undefined") return ""
  let id = localStorage.getItem("visitor_id")
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
    localStorage.setItem("visitor_id", id)
  }
  return id
}

async function saveLeadToCRM({ name, email, whatsapp, lang, source }) {
  try {
    await fetch("/api/crm/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        name,
        email,
        whatsapp,
        language: lang,
        source,
        page: typeof window !== "undefined" ? window.location.pathname : ""
      })
    })
  } catch (error) {
    console.warn("CRM lead save failed:", error)
  }
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Gift } from 'lucide-react';
import { useLead } from '../context/LeadContext';

export default function LeadPopupEN({ lang = 'en' }) {
  const { lead, saveLead } = useLead();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const t = {
    pt: {
      badge: '🎁 PRESENTE GRÁTIS — Por tempo limitado',
      title: 'Receba o Capítulo 1 Grátis',
      sub: 'Digite seus dados abaixo e receba o primeiro capítulo — além de dicas de reconstrução emocional.',
      namePlaceholder: 'Seu primeiro nome',
      emailPlaceholder: 'Seu melhor email',
      phonePlaceholder: '(11) 99999-9999',
      cta: 'Quero Receber o Capítulo 1 →',
      privacy: '🔒 Sem spam. Você pode cancelar quando quiser.',
      thanks: 'Confira seu email!',
      thanksDesc: 'O Capítulo 1 está a caminho. Bem-vindo.',
      skip: 'Não, obrigado. Vou ver depois',
    },
    en: {
      badge: '🎁 FREE GIFT — Limited Time',
      title: 'Get Chapter 1 FREE',
      sub: 'Enter your details below and we\'ll send you the first chapter instantly — plus exclusive recovery tips for men.',
      namePlaceholder: 'Your first name',
      emailPlaceholder: 'Your best email',
      phonePlaceholder: '+1 (555) 000-0000',
      cta: 'Send Me Chapter 1 Free →',
      privacy: '🔒 No spam. Unsubscribe anytime.',
      thanks: 'Check your inbox!',
      thanksDesc: 'Chapter 1 is on its way. Welcome, brother.',
      skip: 'No thanks, I\'ll pay full price later',
    },
    es: {
      badge: '🎁 REGALO GRATIS — Tiempo Limitado',
      title: 'Obtén el Capítulo 1 GRATIS',
      sub: 'Ingresa tus datos y te enviamos el primer capítulo al instante — más consejos exclusivos de recuperación.',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'Tu mejor email',
      phonePlaceholder: '+1 (555) 000-0000',
      cta: 'Envíame el Capítulo 1 Gratis →',
      privacy: '🔒 Sin spam. Cancela cuando quieras.',
      thanks: '¡Revisa tu bandeja de entrada!',
      thanksDesc: 'El Capítulo 1 está en camino. Bienvenido, hermano.',
      skip: 'No gracias, pagaré precio completo después',
    }
  }[lang];

  useEffect(() => {
    if (lead.captured) return;

    const timer = setTimeout(() => {
      if (shouldShowLeadPopup(lang)) {
        registerLeadPopupView(lang)
        setShow(true)
      }
    }, 2000)

    return () => clearTimeout(timer);
  }, [lead.captured, lang]);

  const handleSubmit = async () => {
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    setError('');
    saveLead({ email, phone, name });
    await saveLeadToCRM({ name, email, whatsapp: '', lang, source: 'lead_popup' })
    registerLeadPopupSubscribed(lang)

    try {
      await fetch("/api/crm/enqueue-lead-sequence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId: getVisitorId(),
          name,
          email,
          language: lang,
          page: typeof window !== "undefined" ? window.location.pathname : ""
        })
      })
    } catch (error) {
      console.warn("CRM lead sequence enqueue failed:", error)
    }

      setSubmitted(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, name, lang, source: 'popup' })
      });
    } catch {}
    setTimeout(() => setShow(false), 3000);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}
        >
          <motion.div
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              background: 'linear-gradient(145deg, #0D1B3E, #0a1525)',
              border: '1px solid rgba(0,196,212,0.4)',
              borderRadius: 16,
              padding: '40px 36px',
              maxWidth: 480,
              width: '100%',
              position: 'relative',
              boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 80px rgba(0,196,212,0.15)'
            }}
          >
            <button onClick={() => { registerLeadPopupClose(lang); setShow(false); }} style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.08)', border: 'none',
              borderRadius: 8, width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#8A9BBF'
            }}>
              <X size={16} />
            </button>

            {!submitted ? (
              <>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(0,196,212,0.15)', border: '1px solid rgba(0,196,212,0.3)',
                  borderRadius: 20, padding: '6px 14px', fontSize: 11,
                  color: '#00C4D4', fontWeight: 700, letterSpacing: 1,
                  marginBottom: 20
                }}>
                  {t.badge}
                </div>

                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28, fontWeight: 900, color: '#fff',
                  marginBottom: 12, lineHeight: 1.2
                }}>
                  {t.title}
                </h2>

                <p style={{ fontSize: 14, color: '#8A9BBF', lineHeight: 1.7, marginBottom: 28 }}>
                  {t.sub}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={name}
                      onChange={e => setName(e.target.value)}
                      style={{
                        width: '100%', padding: '14px 14px 14px 44px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 8, color: '#fff', fontSize: 14,
                        outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>👤</span>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#00C4D4' }} />
                    <input
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{
                        width: '100%', padding: '14px 14px 14px 44px',
                        background: 'rgba(255,255,255,0.06)',
                        border: `1px solid ${error ? '#ff4444' : 'rgba(255,255,255,0.12)'}`,
                        borderRadius: 8, color: '#fff', fontSize: 14,
                        outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#00C4D4' }} />
                    <input
                      type="tel"
                      placeholder={t.phonePlaceholder}
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      style={{
                        width: '100%', padding: '14px 14px 14px 44px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 8, color: '#fff', fontSize: 14,
                        outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {error && <p style={{ color: '#ff4444', fontSize: 12, margin: 0 }}>{error}</p>}
                </div>

                <button onClick={handleSubmit} style={{
                  width: '100%', padding: '16px',
                  background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
                  border: 'none', borderRadius: 8,
                  color: '#0D1B3E', fontSize: 15, fontWeight: 800,
                  cursor: 'pointer', letterSpacing: 0.5,
                  boxShadow: '0 8px 30px rgba(0,196,212,0.4)'
                }}>
                  {t.cta}
                </button>

                <p style={{ fontSize: 11, color: '#8A9BBF', textAlign: 'center', marginTop: 12 }}>
                  {t.privacy}
                </p>

                <button onClick={() => { registerLeadPopupClose(lang); setShow(false); }} style={{
                  background: 'none', border: 'none', color: '#4A5A7B',
                  fontSize: 12, cursor: 'pointer', display: 'block',
                  margin: '8px auto 0', textDecoration: 'underline'
                }}>
                  {t.skip}
                </button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', padding: '20px 0' }}
              >
                <div style={{ fontSize: 56, marginBottom: 16 }}>📬</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 24, color: '#fff', marginBottom: 8
                }}>{t.thanks}</h3>
                <p style={{ fontSize: 14, color: '#8A9BBF' }}>{t.thanksDesc}</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
