"use client"

import { useEffect, useMemo, useState } from "react"

const COPY = {
  pt: {
    title: "Acesso digital imediato",
    subtitle: "Receba o eBook + Audiobook após o pagamento",
    product: "eBook + Audiobook — Português",
    price: "R$ 97,00",
    nameLabel: "Nome completo *",
    emailLabel: "Email *",
    namePlaceholder: "Seu nome completo",
    emailPlaceholder: "seu@email.com",
    cta: "Continuar para pagamento seguro",
    processing: "Preparando checkout...",
    requiredName: "Informe seu nome.",
    requiredEmail: "Informe um email válido.",
    guarantee: "Acesso liberado automaticamente após o pagamento."
  },
  en: {
    title: "Instant digital access",
    subtitle: "Get the eBook + Audiobook after payment",
    product: "eBook + Audiobook — English",
    price: "$24.99 USD",
    nameLabel: "Full name *",
    emailLabel: "Email *",
    namePlaceholder: "Your full name",
    emailPlaceholder: "you@email.com",
    cta: "Continue to secure payment",
    processing: "Preparing checkout...",
    requiredName: "Enter your name.",
    requiredEmail: "Enter a valid email.",
    guarantee: "Access is unlocked automatically after payment."
  },
  es: {
    title: "Acceso digital inmediato",
    subtitle: "Recibe el eBook + Audiolibro después del pago",
    product: "eBook + Audiolibro — Español",
    price: "$24.99 USD",
    nameLabel: "Nombre completo *",
    emailLabel: "Email *",
    namePlaceholder: "Tu nombre completo",
    emailPlaceholder: "tu@email.com",
    cta: "Continuar al pago seguro",
    processing: "Preparando checkout...",
    requiredName: "Ingresa tu nombre.",
    requiredEmail: "Ingresa un email válido.",
    guarantee: "El acceso se libera automáticamente después del pago."
  }
}

function normalizeLang(value) {
  const lang = String(value || "pt").toLowerCase()
  if (lang.startsWith("en")) return "en"
  if (lang.startsWith("es")) return "es"
  return "pt"
}

export default function CheckoutDigital({ lang = "pt" }) {
  const activeLang = normalizeLang(lang)
  const content = COPY[activeLang]
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })

  const priceNumber = useMemo(() => {
    return activeLang === "pt" ? 97 : 24.99
  }, [activeLang])

  useEffect(() => {
    function handleForceOpen() {
      setOpen(true)
    }

    window.addEventListener(`force-checkout-${activeLang}`, handleForceOpen)
    return () => window.removeEventListener(`force-checkout-${activeLang}`, handleForceOpen)
  }, [activeLang])

  function validate() {
    const nextErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = content.requiredName
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      nextErrors.email = content.requiredEmail
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!validate()) return

    setLoading(true)

    const order = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      lang: activeLang,
      product: "Digital eBook Audiobook",
      total: priceNumber
    }

    const orderParam = encodeURIComponent(JSON.stringify(order))
    window.location.href = `/checkout-digital?lang=${activeLang}&order=${orderParam}`
  }

  if (!open) return null

  return (
    <div style={styles.overlay} onClick={() => !loading && setOpen(false)}>
      <div style={styles.modal} onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={() => !loading && setOpen(false)}
          style={styles.close}
          aria-label="Close"
        >
          ×
        </button>

        <div style={styles.iconRow}>
          <div style={styles.icon}>📘</div>
          <div style={styles.icon}>🎧</div>
        </div>

        <h2 style={styles.title}>{content.title}</h2>
        <p style={styles.subtitle}>{content.subtitle}</p>

        <div style={styles.productBox}>
          <div>
            <strong style={styles.productTitle}>{content.product}</strong>
            <p style={styles.guarantee}>{content.guarantee}</p>
          </div>
          <strong style={styles.price}>{content.price}</strong>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            {content.nameLabel}
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={content.namePlaceholder}
              style={styles.input}
              autoComplete="name"
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </label>

          <label style={styles.label}>
            {content.emailLabel}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={content.emailPlaceholder}
              style={styles.input}
              autoComplete="email"
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </label>

          <button type="submit" disabled={loading} style={styles.button}>
            🔒 {loading ? content.processing : content.cta}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
    background: "rgba(6,12,24,.78)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 18
  },
  modal: {
    width: "min(520px, 100%)",
    background: "linear-gradient(180deg,#101d35,#07101f)",
    border: "1px solid rgba(0,196,212,.25)",
    borderRadius: 18,
    padding: "34px 28px 28px",
    color: "#fff",
    position: "relative",
    boxShadow: "0 24px 80px rgba(0,0,0,.42)",
    fontFamily: "Inter, Jost, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  },
  close: {
    position: "absolute",
    top: 12,
    right: 14,
    width: 34,
    height: 34,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.06)",
    color: "#fff",
    fontSize: 24,
    lineHeight: "30px",
    cursor: "pointer"
  },
  iconRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    marginBottom: 16
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: "rgba(0,196,212,.13)",
    border: "1px solid rgba(0,196,212,.22)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25
  },
  title: {
    margin: "0 0 8px",
    textAlign: "center",
    fontFamily: "Georgia, serif",
    fontSize: 30,
    color: "#fff"
  },
  subtitle: {
    margin: "0 0 22px",
    textAlign: "center",
    color: "#aebbd1",
    fontSize: 14
  },
  productBox: {
    background: "rgba(0,196,212,.08)",
    border: "1px solid rgba(0,196,212,.22)",
    borderRadius: 14,
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    gap: 14,
    alignItems: "center",
    marginBottom: 22
  },
  productTitle: {
    color: "#fff",
    display: "block",
    marginBottom: 4
  },
  guarantee: {
    margin: 0,
    color: "#91a2bc",
    fontSize: 12,
    lineHeight: 1.45
  },
  price: {
    color: "#00C4D4",
    fontSize: 21,
    whiteSpace: "nowrap"
  },
  form: {
    display: "grid",
    gap: 14
  },
  label: {
    color: "#dce6f4",
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: ".04em"
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    marginTop: 7,
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 10,
    color: "#fff",
    padding: "13px 14px",
    fontSize: 15,
    outline: "none"
  },
  error: {
    display: "block",
    color: "#f87171",
    marginTop: 6,
    fontSize: 12,
    textTransform: "none",
    letterSpacing: 0
  },
  button: {
    marginTop: 8,
    width: "100%",
    border: 0,
    borderRadius: 12,
    padding: "15px 18px",
    background: "linear-gradient(135deg,#00C4D4,#0099A8)",
    color: "#06101f",
    fontSize: 16,
    fontWeight: 950,
    cursor: "pointer"
  }
}
