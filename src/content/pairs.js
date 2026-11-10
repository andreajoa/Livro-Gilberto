// Pares de tradução entre os guias em inglês e os artigos em português (para hreflang).
export const pairs = [
  ['how-to-get-over-being-cheated-on', 'como-superar-uma-traicao'],
  ['wife-left-me-for-another-man', 'fui-trocado-por-outro'],
  ['how-to-stop-thinking-about-the-affair', 'como-parar-de-pensar-na-traicao'],
  ['anger-after-betrayal', 'raiva-depois-da-traicao'],
  ['bible-verses-for-betrayal', 'versiculos-para-quem-foi-traido'],
]
export const ptOf = Object.fromEntries(pairs)
export const enOf = Object.fromEntries(pairs.map(([e, p]) => [p, e]))
