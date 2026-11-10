import { Suspense } from "react"
import CheckoutClient from "./CheckoutClient"

export const metadata = {
  title: "Finalizar compra | Superação",
  robots: {
    index: false,
    follow: false,
  },
}

function CheckoutLoading() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#0a0a0a",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          aria-hidden="true"
          style={{
            width: 34,
            height: 34,
            margin: "0 auto 16px",
            border: "3px solid rgba(212,165,116,0.2)",
            borderTopColor: "#D4A574",
            borderRadius: "50%",
            animation: "supCheckoutSpin 0.8s linear infinite",
          }}
        />
        <p style={{ margin: 0, color: "#D4A574", fontWeight: 700 }}>
          Preparando seu checkout...
        </p>

        <style>{`
          @keyframes supCheckoutSpin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </main>
  )
}

export default function SuperacaoCheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutClient />
    </Suspense>
  )
}
