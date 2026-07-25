"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  BookOpen,
  Check,
  LoaderCircle,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react"

const STORAGE_KEY =
  "superacao_lead_popup_state"

const LEGACY_STORAGE_KEY =
  "superacao_lead_popup_closed_at"

const SEVEN_DAYS =
  7 * 24 * 60 * 60 * 1000

const MAX_DAILY_APPEARANCES = 3

function getLocalDateKey() {
  const now = new Date()

  const year =
    now.getFullYear()

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0")

  const day =
    String(
      now.getDate()
    ).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function createDefaultPopupState() {
  return {
    date: getLocalDateKey(),
    appearances: 0,
    registeredAt: null,
  }
}

function readPopupState() {
  try {
    const storedValue =
      window.localStorage.getItem(
        STORAGE_KEY
      )

    if (!storedValue) {
      return createDefaultPopupState()
    }

    const parsed =
      JSON.parse(storedValue)

    const appearances =
      Number(
        parsed?.appearances
      )

    const registeredAt =
      Number(
        parsed?.registeredAt
      )

    return {
      date:
        typeof parsed?.date === "string"
          ? parsed.date
          : getLocalDateKey(),

      appearances:
        Number.isFinite(appearances)
          ? Math.max(
              0,
              appearances
            )
          : 0,

      registeredAt:
        Number.isFinite(registeredAt)
          ? registeredAt
          : null,
    }
  } catch {
    return createDefaultPopupState()
  }
}

function writePopupState(state) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    )

    window.localStorage.removeItem(
      LEGACY_STORAGE_KEY
    )
  } catch {}
}

function normalizePopupState() {
  const today =
    getLocalDateKey()

  const storedState =
    readPopupState()

  const registrationIsActive =
    storedState.registeredAt !== null &&
    Date.now() - storedState.registeredAt <
      SEVEN_DAYS

  return {
    date: today,

    appearances:
      storedState.date === today
        ? storedState.appearances
        : 0,

    registeredAt:
      registrationIsActive
        ? storedState.registeredAt
        : null,
  }
}

function shouldDisplayPopup() {
  const state =
    normalizePopupState()

  writePopupState(state)

  if (state.registeredAt !== null) {
    return false
  }

  return (
    state.appearances <
    MAX_DAILY_APPEARANCES
  )
}

function registerPopupAppearance() {
  const state =
    normalizePopupState()

  writePopupState({
    ...state,

    appearances:
      Math.min(
        MAX_DAILY_APPEARANCES,
        state.appearances + 1
      ),
  })
}

function registerSuccessfulSignup() {
  const state =
    normalizePopupState()

  writePopupState({
    ...state,
    registeredAt: Date.now(),
  })
}


export default function SuperacaoLeadPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    )

    const forcePopup =
      params.get("popup") === "1" ||
      params.get("popupTeste") === "1"

    if (forcePopup) {
      setIsOpen(true)
      return
    }

    if (!shouldDisplayPopup()) {
      return
    }

    const timer = window.setTimeout(() => {
      registerPopupAppearance()
      setIsOpen(true)
    }, 6000)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePopup()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const closePopup = () => {
    setIsOpen(false)
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closePopup()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()

    if (cleanName.length < 2) {
      setStatus("error")
      setMessage("Digite seu nome.")
      return
    }

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setStatus("error")
      setMessage("Digite um e-mail válido.")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const visitorId =
        window.localStorage.getItem("visitor_id") || ""

      const leadResponse = await fetch(
        "/api/crm/lead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId,
            name: cleanName,
            email: cleanEmail,
            language: "pt",
            source: "superacao_popup",
            project: "superacao",
            interest: "livro_superacao",
            consent: true,
          }),
        }
      )

      const leadData = await leadResponse
        .json()
        .catch(() => ({}))

      if (!leadResponse.ok) {
        throw new Error(
          leadData?.error ||
            "Não foi possível registrar seu cadastro."
        )
      }

      const sequenceResponse = await fetch(
        "/api/crm/enqueue-superacao-sequence",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId,
            name: cleanName,
            email: cleanEmail,
            type: "lead",
            productType: "general",
            project: "superacao",
          }),
        }
      )

      const sequenceData = await sequenceResponse
        .json()
        .catch(() => ({}))

      if (!sequenceResponse.ok) {
        throw new Error(
          sequenceData?.error ||
            "Não foi possível iniciar a sequência de e-mails."
        )
      }

      setStatus("success")
      setMessage(
        "Cadastro realizado. Você receberá as novidades de Superação por e-mail."
      )

      registerSuccessfulSignup()
    } catch (error) {
      setStatus("error")
      setMessage(
        error instanceof Error
          ? error.message
          : "Erro de conexão. Tente novamente."
      )
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="sup-lead-overlay"
      onMouseDown={handleOverlayClick}
      role="presentation"
    >
      <section
        className="sup-lead-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sup-lead-title"
      >
        <button
          type="button"
          className="sup-lead-close"
          onClick={closePopup}
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div className="sup-lead-visual">
          <picture>
            <source
              srcSet="/images/superacao/popup-superacao.webp"
              type="image/webp"
            />

            <img
              className="sup-lead-main-image"
              src="/images/superacao/popup-superacao.png"
              alt="Conheça o livro Superação, de Gilberto de Souza"
            />
          </picture>
        </div>

        <div className="sup-lead-content">
          {status === "success" ? (
            <div className="sup-lead-success">
              <div className="sup-lead-success-icon">
                <Check size={30} />
              </div>

              <span className="sup-lead-eyebrow">
                Cadastro concluído
              </span>

              <h2 id="sup-lead-title">
                Você agora faz parte desta jornada.
              </h2>

              <p>{message}</p>

              <button
                className="sup-button sup-button-primary sup-button-block"
                type="button"
                onClick={closePopup}
              >
                Continuar no website
                <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <>
              <span className="sup-lead-eyebrow">
                Faça parte da comunidade
              </span>

              <h2 id="sup-lead-title">
                Receba mensagens que ajudem você a continuar.
              </h2>

              <p className="sup-lead-intro">
                Cadastre-se para receber conteúdos sobre fé,
                escolhas, recomeços e as novidades do livro
                Superação.
              </p>

              <div className="sup-lead-benefits">
                <div>
                  <BookOpen size={17} />
                  Reflexões e trechos do livro
                </div>

                <div>
                  <Mail size={17} />
                  Novidades e conteúdos exclusivos
                </div>

                <div>
                  <ShieldCheck size={17} />
                  Cadastro seguro e cancelamento simples
                </div>
              </div>

              <form
                className="sup-lead-form"
                onSubmit={handleSubmit}
              >
                <label>
                  <span>Seu nome</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Como podemos chamar você?"
                    disabled={status === "loading"}
                    required
                  />
                </label>

                <label>
                  <span>Seu melhor e-mail</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="voce@exemplo.com"
                    disabled={status === "loading"}
                    required
                  />
                </label>

                {message ? (
                  <p
                    className={`sup-lead-message ${
                      status === "error" ? "is-error" : ""
                    }`}
                    role="alert"
                  >
                    {message}
                  </p>
                ) : null}

                <button
                  className="sup-button sup-button-primary sup-button-block"
                  type="submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <LoaderCircle
                        className="sup-lead-spinner"
                        size={18}
                      />
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      Quero fazer parte
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              <small className="sup-lead-privacy">
                Ao cadastrar-se, você autoriza o envio de
                comunicações relacionadas ao livro. Seus dados não
                serão vendidos ou compartilhados para publicidade
                de terceiros.
              </small>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
