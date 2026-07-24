export const SUPERACAO_CONFIG = Object.freeze({
  physical: {
    id: "superacao_physical_pt",
    bookId: "superacao",
    name: "Superação — Livro físico",
    unitPrice: 141.74,
    currency: "BRL",
  },

  digital: {
    id: "superacao_digital_pt",
    bookId: "superacao",
    name: "Superação — eBook",
    unitPrice: 65.99,
    currency: "BRL",
  },
})

export function formatSuperacaoMoney(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value) || 0)
}
