const SHIPPING_TABLE = {
  PAC: { SP_CAPITAL: 12, SP_INTERIOR: 15, RJ_ES: 18, MG: 17, SUL: 19, CENTRO_OESTE: 22, NORDESTE: 26, NORTE: 31 },
  SEDEX: { SP_CAPITAL: 22, SP_INTERIOR: 25, RJ_ES: 30, MG: 28, SUL: 32, CENTRO_OESTE: 35, NORDESTE: 40, NORTE: 48 }
}

const DELIVERY_DAYS = {
  PAC: { SP_CAPITAL: '3–5', SP_INTERIOR: '4–6', RJ_ES: '5–7', MG: '5–7', SUL: '6–9', CENTRO_OESTE: '7–10', NORDESTE: '9–13', NORTE: '12–17' },
  SEDEX: { SP_CAPITAL: '1–2', SP_INTERIOR: '2–3', RJ_ES: '2–3', MG: '2–3', SUL: '2–3', CENTRO_OESTE: '2–3', NORDESTE: '3–4', NORTE: '4–5' }
}

const LABELS = {
  PAC: 'Entrega econômica',
  SEDEX: 'Entrega expressa'
}

export function cleanCep(value) {
  return String(value || '').replace(/\D/g, '').slice(0, 8)
}

export function getShippingRegion(uf, cep) {
  const state = String(uf || '').toUpperCase()
  const prefix = cleanCep(cep).slice(0, 2)
  if (state === 'SP') return ['01', '02', '03', '04', '05', '06', '07', '08'].includes(prefix) ? 'SP_CAPITAL' : 'SP_INTERIOR'
  if (['RJ', 'ES'].includes(state)) return 'RJ_ES'
  if (state === 'MG') return 'MG'
  if (['RS', 'SC', 'PR'].includes(state)) return 'SUL'
  if (['GO', 'MT', 'MS', 'DF'].includes(state)) return 'CENTRO_OESTE'
  if (['AC', 'AM', 'RR', 'RO', 'PA', 'AP', 'TO'].includes(state)) return 'NORTE'
  if (['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'].includes(state)) return 'NORDESTE'
  throw new Error('Estado de destino não atendido')
}

export async function lookupDestinationCep(value) {
  const cep = cleanCep(value)
  if (cep.length !== 8) throw new Error('CEP inválido')

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(8000)
  })
  if (!response.ok) throw new Error('Não foi possível consultar o CEP')
  const address = await response.json()
  if (address.erro || !address.uf || !address.localidade) throw new Error('CEP não encontrado')

  return {
    cep,
    street: String(address.logradouro || '').slice(0, 250),
    neighborhood: String(address.bairro || '').slice(0, 180),
    city: String(address.localidade || '').slice(0, 180),
    state: String(address.uf || '').slice(0, 2).toUpperCase()
  }
}

export function shippingQuotes(address) {
  const region = getShippingRegion(address.state, address.cep)
  return ['PAC', 'SEDEX'].map(method => ({
    method,
    name: LABELS[method],
    amount: SHIPPING_TABLE[method][region],
    days: DELIVERY_DAYS[method][region],
    currency: 'BRL'
  }))
}

export async function getShippingQuote(cep, method) {
  const address = await lookupDestinationCep(cep)
  const normalizedMethod = String(method || '').toUpperCase()
  const quote = shippingQuotes(address).find(item => item.method === normalizedMethod)
  if (!quote) throw new Error('Modalidade de entrega inválida')
  return { address, quote }
}

export function assertPrivateShippingConfiguration() {
  if (process.env.NODE_ENV === 'production' && !process.env.SHIPPING_ORIGIN_CEP) {
    throw new Error('SHIPPING_ORIGIN_CEP is required in production')
  }
}
