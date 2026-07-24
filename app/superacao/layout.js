import "../../src/styles/superacao-theme.css"

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ||
      "https://www.gilberto-souza.com"
  ),

  title: {
    default:
      "Superação — O seu futuro é você quem faz",
    template:
      "%s | Superação — Gilberto de Souza",
  },

  description:
    "Uma história real de dor, fé, luta e vitória. Conheça o livro Superação, de Gilberto de Souza.",
}

export default function SuperacaoLayout({
  children,
}) {
  return children
}
