"use client"

export async function fetchAddressByCEP(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  if (!response.ok) throw new Error('CEP não encontrado')
  const data = await response.json()
  if (data.erro) throw new Error('CEP não encontrado')
  return data
}

export function calculateShipping(uf, cep) {
  const price = uf === 'SP' ? 15.9 : 25.9
  return {
    pac: { type: 'pac', name: 'PAC Correios', days: '7-15', price },
    sedex: { type: 'sedex', name: 'SEDEX Correios', days: '2-5', price: price + 10 },
  }
}
