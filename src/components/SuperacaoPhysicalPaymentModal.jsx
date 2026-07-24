"use client"

import { useMemo, useState } from "react"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import {
  ArrowLeft,
  Check,
  LoaderCircle,
  Lock,
  MapPin,
  Package,
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

const INITIAL_FORM = {
  name: "",
  email: "",
  whatsapp: "",
  cep: "",
  address: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
}

function cleanText(value) {
  return String(value || "").trim()
}

function PhysicalPaymentForm({
  paymentIntentId,
  total,
  customerEmail,
}) {
  const stripe = useStripe()
  const elements = useElements()

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handlePayment = async (event) => {
    event.preventDefault()

    if (!stripe || !elements || submitting) {
      return
    }

    setSubmitting(true)
    setError("")

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          `${window.location.origin}/superacao/obrigado` +
          `?tipo=fisico&payment_intent=${encodeURIComponent(
            paymentIntentId
          )}`,
        receipt_email: customerEmail,
      },
    })

    if (result.error) {
      setError(
        result.error.message ||
          "Não foi possível concluir o pagamento."
      )
      setSubmitting(false)
    }
  }

  return (
    <form
      className="sup-embedded-payment-form"
      onSubmit={handlePayment}
    >
      <div className="sup-payment-total">
        <span>Total da compra</span>
        <strong>{formatSuperacaoMoney(total)}</strong>
        <small>Livro físico + frete escolhido</small>
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
        disabled={!stripe || submitting}
      >
        {submitting ? (
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
            Pagar {formatSuperacaoMoney(total)}
          </>
        )}
      </button>

      <div className="sup-payment-security">
        <ShieldCheck size={16} />
        Pagamento protegido e processado pela Stripe
      </div>
    </form>
  )
}

export default function SuperacaoPhysicalPaymentModal({
  isOpen,
  shipping,
  onClose,
}) {
  const [step, setStep] = useState("details")
  const [form, setForm] = useState(INITIAL_FORM)
  const [clientSecret, setClientSecret] = useState("")
  const [paymentIntentId, setPaymentIntentId] = useState("")
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const shippingPrice = useMemo(
    () => Number(shipping?.price || 0),
    [shipping]
  )

  if (!isOpen || !shipping) {
    return null
  }

  const update = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const validate = () => {
    if (cleanText(form.name).split(/\s+/).length < 2) {
      return "Informe seu nome completo."
    }

    if (!form.email.includes("@")) {
      return "Informe um e-mail válido."
    }

    if (form.whatsapp.replace(/\D/g, "").length < 10) {
      return "Informe um WhatsApp válido."
    }

    if (form.cep.replace(/\D/g, "").length !== 8) {
      return "Informe um CEP válido."
    }

    if (
      !cleanText(form.address) ||
      !cleanText(form.number) ||
      !cleanText(form.neighborhood) ||
      !cleanText(form.city) ||
      !cleanText(form.state)
    ) {
      return "Preencha o endereço completo."
    }

    return ""
  }

  const preparePayment = async (event) => {
    event.preventDefault()

    const validationError = validate()

    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError("")

    try {
      const addressLine = [
        cleanText(form.address),
        cleanText(form.number),
      ]
        .filter(Boolean)
        .join(", ")

      const response = await fetch(
        "/api/stripe/payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: 1,
            productId:
              SUPERACAO_CONFIG.physical.id,
            bookId:
              SUPERACAO_CONFIG.physical.bookId,
            source: "superacao_website",
            landingPage: window.location.href,
            name: cleanText(form.name),
            email: cleanText(form.email).toLowerCase(),
            shipping: {
              type:
                shipping.type ||
                shipping.id ||
                shipping.name ||
                "frete",
              name:
                shipping.name ||
                shipping.label ||
                shipping.type ||
                "Entrega",
              price: shippingPrice,
              deadline:
                shipping.deadline ||
                shipping.deliveryTime ||
                shipping.prazo ||
                "",
            },
            address: {
              whatsapp:
                cleanText(form.whatsapp),
              cep:
                form.cep.replace(/\D/g, ""),
              address: addressLine,
              complement:
                cleanText(form.complement),
              neighborhood:
                cleanText(form.neighborhood),
              city:
                cleanText(form.city),
              state:
                cleanText(form.state).toUpperCase(),
            },
          }),
        }
      )

      const data = await response
        .json()
        .catch(() => ({}))

      if (!response.ok || !data.clientSecret) {
        throw new Error(
          data.error ||
            "Não foi possível preparar o pagamento."
        )
      }

      setClientSecret(data.clientSecret)
      setPaymentIntentId(data.paymentIntentId)
      setTotal(
        Number(
          data.total ||
            SUPERACAO_CONFIG.physical.unitPrice +
              shippingPrice
        )
      )

      fetch(
        "/api/crm/enqueue-superacao-sequence",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId:
              window.localStorage.getItem(
                "visitor_id"
              ) || "",
            name: cleanText(form.name),
            email:
              cleanText(form.email).toLowerCase(),
            type: "checkout",
            productType: "physical",
            project: "superacao",
          }),
        }
      ).catch(() => null)

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
    setClientSecret("")
    setPaymentIntentId("")
    setTotal(0)
    setError("")
    onClose()
  }

  return (
    <div
      className="sup-checkout-overlay"
      role="presentation"
    >
      <section
        className="sup-checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sup-physical-title"
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
            alt="Livro Superação"
          />

          <span>Livro físico</span>
          <h2>Superação</h2>

          <div>
            <small>Livro</small>
            <strong>
              {formatSuperacaoMoney(
                SUPERACAO_CONFIG.physical.unitPrice
              )}
            </strong>
          </div>

          <div>
            <small>Frete</small>
            <strong>
              {formatSuperacaoMoney(shippingPrice)}
            </strong>
          </div>

          <div className="is-total">
            <small>Total</small>
            <strong>
              {formatSuperacaoMoney(
                SUPERACAO_CONFIG.physical.unitPrice +
                  shippingPrice
              )}
            </strong>
          </div>

          <p>
            <Package size={15} />
            {shipping.name ||
              shipping.label ||
              shipping.type ||
              "Entrega selecionada"}
          </p>
        </aside>

        <div className="sup-checkout-content">
          {step === "details" ? (
            <>
              <span className="sup-lead-eyebrow">
                Dados de entrega
              </span>

              <h2 id="sup-physical-title">
                Finalize sua compra com segurança
              </h2>

              <form
                className="sup-checkout-fields"
                onSubmit={preparePayment}
              >
                <label className="is-full">
                  <span>Nome completo</span>
                  <input
                    value={form.name}
                    onChange={update("name")}
                    autoComplete="name"
                    required
                  />
                </label>

                <label>
                  <span>E-mail</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    autoComplete="email"
                    required
                  />
                </label>

                <label>
                  <span>WhatsApp</span>
                  <input
                    value={form.whatsapp}
                    onChange={update("whatsapp")}
                    autoComplete="tel"
                    required
                  />
                </label>

                <label>
                  <span>CEP</span>
                  <input
                    value={form.cep}
                    onChange={update("cep")}
                    inputMode="numeric"
                    autoComplete="postal-code"
                    required
                  />
                </label>

                <label className="is-wide">
                  <span>Endereço</span>
                  <input
                    value={form.address}
                    onChange={update("address")}
                    autoComplete="street-address"
                    required
                  />
                </label>

                <label>
                  <span>Número</span>
                  <input
                    value={form.number}
                    onChange={update("number")}
                    required
                  />
                </label>

                <label>
                  <span>Complemento</span>
                  <input
                    value={form.complement}
                    onChange={update("complement")}
                  />
                </label>

                <label>
                  <span>Bairro</span>
                  <input
                    value={form.neighborhood}
                    onChange={update("neighborhood")}
                    required
                  />
                </label>

                <label>
                  <span>Cidade</span>
                  <input
                    value={form.city}
                    onChange={update("city")}
                    required
                  />
                </label>

                <label>
                  <span>UF</span>
                  <input
                    value={form.state}
                    onChange={update("state")}
                    maxLength={2}
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
                      <Check size={17} />
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
                Revisar dados
              </button>

              <span className="sup-lead-eyebrow">
                Pagamento
              </span>

              <h2 id="sup-physical-title">
                Escolha como deseja pagar
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
                <PhysicalPaymentForm
                  paymentIntentId={paymentIntentId}
                  total={total}
                  customerEmail={form.email}
                />
              </Elements>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
