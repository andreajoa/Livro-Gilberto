"use client"

import { useState } from "react"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import {
  ArrowLeft,
  BookOpen,
  LoaderCircle,
  Lock,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react"

import {
  SUPERACAO_CONFIG,
  formatSuperacaoMoney,
} from "@/src/lib/superacao-config"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
)

function DigitalPaymentForm({
  email,
  paymentIntentId,
  accessToken,
}) {
  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements || loading) {
      return
    }

    setLoading(true)
    setError("")

    const accessUrl =
      `${window.location.origin}/acesso/` +
      `${encodeURIComponent(accessToken)}` +
      `?lang=pt&payment_intent=` +
      `${encodeURIComponent(paymentIntentId)}`

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: accessUrl,
        receipt_email: email,
      },
    })

    if (result.error) {
      setError(
        result.error.message ||
          "Não foi possível concluir o pagamento."
      )
      setLoading(false)
    }
  }

  return (
    <form
      className="sup-embedded-payment-form"
      onSubmit={submit}
    >
      <div className="sup-payment-total">
        <span>Total do eBook</span>
        <strong>
          {formatSuperacaoMoney(
            SUPERACAO_CONFIG.digital.unitPrice
          )}
        </strong>
        <small>Entrega digital, sem frete</small>
      </div>

      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      {error ? (
        <p className="sup-payment-error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        className="sup-button sup-button-primary sup-button-block"
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? (
          <>
            <LoaderCircle
              className="sup-lead-spinner"
              size={18}
            />
            Processando...
          </>
        ) : (
          <>
            <Lock size={17} />
            Comprar eBook
          </>
        )}
      </button>

      <div className="sup-payment-security">
        <ShieldCheck size={16} />
        Pagamento seguro com Stripe
      </div>
    </form>
  )
}

export default function SuperacaoDigitalPaymentModal({
  isOpen,
  onClose,
}) {
  const [step, setStep] = useState("details")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const [paymentIntentId, setPaymentIntentId] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) {
    return null
  }

  const prepare = async (event) => {
    event.preventDefault()

    if (name.trim().length < 2) {
      setError("Informe seu nome.")
      return
    }

    if (!email.includes("@")) {
      setError("Informe um e-mail válido.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        "/api/stripe/payment-intent-digital",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            lang: "pt",
            bookId:
              SUPERACAO_CONFIG.digital.bookId,
            productId:
              SUPERACAO_CONFIG.digital.id,
            source: "superacao_website",
            landingPage: window.location.href,
          }),
        }
      )

      const data = await response
        .json()
        .catch(() => ({}))

      if (
        !response.ok ||
        !data.clientSecret ||
        !data.accessToken
      ) {
        throw new Error(
          data.error ||
            "Não foi possível preparar o pagamento."
        )
      }

      setClientSecret(data.clientSecret)
      setPaymentIntentId(data.paymentIntentId)
      setAccessToken(data.accessToken)
      setStep("payment")
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erro de conexão. Tente novamente."
      )
    } finally {
      setLoading(false)
    }
  }

  const resetAndClose = () => {
    setStep("details")
    setName("")
    setEmail("")
    setClientSecret("")
    setPaymentIntentId("")
    setAccessToken("")
    setError("")
    onClose()
  }

  return (
    <div className="sup-checkout-overlay">
      <section
        className="sup-checkout-modal sup-digital-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sup-digital-title"
      >
        <button
          className="sup-checkout-close"
          type="button"
          onClick={resetAndClose}
          aria-label="Fechar checkout"
        >
          <X size={20} />
        </button>

        <aside className="sup-checkout-summary">
          <img
            src="/books/superacao/book-front.png"
            alt="eBook Superação"
          />

          <span>Formato digital</span>
          <h2>Superação</h2>

          <div className="is-total">
            <small>Total</small>
            <strong>
              {formatSuperacaoMoney(
                SUPERACAO_CONFIG.digital.unitPrice
              )}
            </strong>
          </div>

          <p>
            <Mail size={15} />
            Acesso enviado por e-mail após a confirmação
          </p>

          <p>
            <BookOpen size={15} />
            Link individual e rastreável
          </p>
        </aside>

        <div className="sup-checkout-content">
          {step === "details" ? (
            <>
              <span className="sup-lead-eyebrow">
                Compra digital
              </span>

              <h2 id="sup-digital-title">
                Para onde devemos enviar seu acesso?
              </h2>

              <form
                className="sup-checkout-fields"
                onSubmit={prepare}
              >
                <label className="is-full">
                  <span>Seu nome</span>
                  <input
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="is-full">
                  <span>Seu melhor e-mail</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    autoComplete="email"
                    required
                  />
                </label>

                {error ? (
                  <p
                    className="sup-payment-error is-full"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}

                <button
                  className="sup-button sup-button-primary is-full"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoaderCircle
                        className="sup-lead-spinner"
                        size={18}
                      />
                      Preparando pagamento...
                    </>
                  ) : (
                    <>
                      Continuar para o pagamento
                      <Lock size={17} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <button
                className="sup-checkout-back"
                type="button"
                onClick={() => setStep("details")}
              >
                <ArrowLeft size={16} />
                Alterar e-mail
              </button>

              <span className="sup-lead-eyebrow">
                Pagamento
              </span>

              <h2 id="sup-digital-title">
                Conclua sua compra
              </h2>

              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  locale: "pt-BR",
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#d6a34e",
                      colorBackground: "#17140f",
                      colorText: "#fff8ed",
                      colorDanger: "#ff8e82",
                      borderRadius: "10px",
                    },
                  },
                }}
              >
                <DigitalPaymentForm
                  email={email}
                  paymentIntentId={paymentIntentId}
                  accessToken={accessToken}
                />
              </Elements>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
