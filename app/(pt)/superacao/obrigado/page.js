import Link from "next/link"
import {
  CheckCircle,
  Mail,
  PackageCheck,
  ShieldCheck,
} from "lucide-react"

export const metadata = {
  title: "Pagamento confirmado | Superação",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SuperacaoObrigadoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        display: "grid",
        placeItems: "center",
        color: "#fff8ed",
        background:
          "radial-gradient(circle at 50% 0%, rgba(214,163,78,.15), transparent 32%), #090806",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "min(680px, 100%)",
          padding: "48px 34px",
          border: "1px solid rgba(214,163,78,.25)",
          borderRadius: 22,
          background: "#17140f",
          textAlign: "center",
          boxShadow: "0 35px 90px rgba(0,0,0,.45)",
        }}
      >
        <CheckCircle
          size={66}
          color="#d6a34e"
          strokeWidth={1.5}
        />

        <p
          style={{
            margin: "20px 0 9px",
            color: "#d6a34e",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Pagamento recebido
        </p>

        <h1
          style={{
            margin: 0,
            fontFamily: "Georgia, serif",
            fontSize: "clamp(36px, 7vw, 56px)",
          }}
        >
          Obrigado por comprar Superação.
        </h1>

        <p
          style={{
            margin: "22px auto 0",
            maxWidth: 530,
            color: "rgba(255,255,255,.66)",
            lineHeight: 1.75,
          }}
        >
          A confirmação foi registrada. Você receberá os
          detalhes do pedido no e-mail informado durante a
          compra.
        </p>

        <div
          style={{
            margin: "30px 0",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 12,
          }}
        >
          {[
            [ShieldCheck, "Pagamento protegido"],
            [Mail, "Confirmação por e-mail"],
            [PackageCheck, "Pedido em processamento"],
          ].map(([Icon, text]) => (
            <div
              key={text}
              style={{
                padding: 18,
                borderRadius: 12,
                background: "rgba(255,255,255,.035)",
                color: "rgba(255,255,255,.72)",
                fontSize: 12,
              }}
            >
              <Icon
                size={22}
                color="#d6a34e"
                style={{ marginBottom: 8 }}
              />
              <div>{text}</div>
            </div>
          ))}
        </div>

        <Link
          href="/superacao"
          style={{
            minHeight: 50,
            padding: "0 25px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            color: "#1a1007",
            background:
              "linear-gradient(135deg, #efc778, #d6a34e)",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Voltar para o website
        </Link>
      </section>
    </main>
  )
}
