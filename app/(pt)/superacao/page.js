import HomeSuperacao from "@/src/views/HomeSuperacao"
import { CartProvider } from "@/src/context/CartContext"

export const metadata = {
  title: "Superação | Uma história real de dor, fé, luta e vitória",
  description:
    "Conheça Superação, de Gilberto de Souza. Livro físico e eBook sobre fé, escolhas, trabalho, quedas e reconstrução.",
  alternates: {
    canonical: "/superacao",
  },
  openGraph: {
    title: "Superação — Gilberto de Souza",
    description:
      "A dor pode explicar o passado. Ela não precisa decidir o futuro.",
    type: "website",
    images: [
      {
        url: "/books/superacao/book-front.png",
        width: 1200,
        height: 1600,
        alt: "Capa do livro Superação",
      },
    ],
  },
}

export default function SuperacaoPage() {
  return (
    <CartProvider>
      <HomeSuperacao />
    </CartProvider>
  )
}
