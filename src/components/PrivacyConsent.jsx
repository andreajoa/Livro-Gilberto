"use client"

import { useEffect, useState } from 'react'
import { getPrivacyConsent, setPrivacyConsent } from '@/src/lib/website/websiteTracker'

const KEY = 'gs_privacy_consent_v1'

export default function PrivacyConsent() {
  const [open, setOpen] = useState(false)
  const [decided, setDecided] = useState(true)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const hasDecision = localStorage.getItem(KEY) !== null
    const consent = getPrivacyConsent()
    setAnalytics(consent.analytics === true)
    setDecided(hasDecision)
    setOpen(!hasDecision)
  }, [])

  function save(value) {
    setPrivacyConsent({ analytics: value })
    setAnalytics(value)
    setDecided(true)
    setOpen(false)
    window.location.reload()
  }

  return <>
    {open && <div role="dialog" aria-label="Preferências de privacidade" style={{ position: 'fixed', inset: 0, zIndex: 20000, background: 'rgba(0,0,0,.58)', display: 'grid', placeItems: 'end center', padding: 16 }}>
      <div style={{ width: 'min(720px,100%)', background: '#0D1B3E', color: '#fff', border: '1px solid rgba(0,196,212,.35)', borderRadius: 16, padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,.45)' }}>
        <h2 style={{ font: '700 23px Georgia,serif', margin: '0 0 10px' }}>Sua privacidade importa</h2>
        <p style={{ color: '#B8C8E0', fontSize: 14, lineHeight: 1.6, margin: '0 0 18px' }}>Os recursos essenciais mantêm o carrinho e o pagamento funcionando. Com sua autorização, também medimos origem da visita, cidade aproximada, cliques, rolagem e tempo engajado para melhorar o site. Não registramos o conteúdo digitado nos formulários como evento de navegação.</p>
        {decided && <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#DCE8F5', fontSize: 13, marginBottom: 18 }}><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} />Permitir análise de comportamento</label>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={() => save(false)} style={{ border: '1px solid rgba(255,255,255,.2)', background: 'transparent', color: '#fff', borderRadius: 8, padding: '11px 16px', cursor: 'pointer' }}>Somente essenciais</button>
          <button onClick={() => save(decided ? analytics : true)} style={{ border: 0, background: '#00C4D4', color: '#07101e', borderRadius: 8, padding: '11px 16px', fontWeight: 800, cursor: 'pointer' }}>{decided ? 'Salvar preferências' : 'Aceitar análise'}</button>
        </div>
      </div>
    </div>}
    {decided && !open && <button data-analytics-ignore onClick={() => setOpen(true)} style={{ position: 'fixed', left: 12, bottom: 12, zIndex: 8000, border: '1px solid rgba(255,255,255,.18)', background: '#0D1B3E', color: '#B8C8E0', borderRadius: 999, padding: '8px 12px', fontSize: 10, cursor: 'pointer' }}>Privacidade</button>}
  </>
}
