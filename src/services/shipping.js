// Origem: Santana de Parnaíba - SP (CEP 06500-000)
// Peso estimado do livro: ~400g | Dimensões: 21x14x2cm

const SHIPPING_TABLE = {
  PAC: {
    SP_CAPITAL:   12.00,
    SP_INTERIOR:  15.00,
    RJ_ES:        18.00,
    MG:           17.00,
    SUL:          19.00,
    CENTRO_OESTE: 22.00,
    NORDESTE:     26.00,
    NORTE:        31.00,
  },
  SEDEX: {
    SP_CAPITAL:   22.00,
    SP_INTERIOR:  25.00,
    RJ_ES:        30.00,
    MG:           28.00,
    SUL:          32.00,
    CENTRO_OESTE: 35.00,
    NORDESTE:     40.00,
    NORTE:        48.00,
  },
}

// CEPs que iniciam com estes prefixos = São Paulo Capital
const SP_CAPITAL_PREFIXES = ['01','02','03','04','05','06','07','08']

const PAC_DAYS = {
  SP_CAPITAL: '3–5', SP_INTERIOR: '4–6',
  RJ_ES: '5–7',     MG: '5–7',
  SUL: '6–9',        CENTRO_OESTE: '7–10',
  NORDESTE: '9–13', NORTE: '12–17'
}

const SEDEX_DAYS = {
  SP_CAPITAL: '1–2', SP_INTERIOR: '2–3',
  RJ_ES: '2–3',      MG: '2–3',
  SUL: '2–3',         CENTRO_OESTE: '2–3',
  NORDESTE: '3–4',  NORTE: '4–5'
}

export const getRegion = (uf, cep) => {
  const clean = cep.replace(/\D/g, '')
  if (uf === 'SP') {
    const prefix = clean.substring(0, 2)
    return SP_CAPITAL_PREFIXES.includes(prefix) ? 'SP_CAPITAL' : 'SP_INTERIOR'
  }
  if (['RJ','ES'].includes(uf)) return 'RJ_ES'
  if (uf === 'MG') return 'MG'
  if (['RS','SC','PR'].includes(uf)) return 'SUL'
  if (['GO','MT','MS','DF'].includes(uf)) return 'CENTRO_OESTE'
  if (['TO','BA'].includes(uf)) return 'NORDESTE'
  if (['AM','PA','RO','RR','AC','AP','RN','AL','SE','PI','MA','PE','PB','CE'].includes(uf)) return 'NORDESTE'
  if (['AC','AM','RR','RO','PA','AP'].includes(uf)) return 'NORTE'
  return 'NORDESTE' // fallback
}

export const calculateShipping = (uf, cep) => {
  const region = getRegion(uf, cep)
  return {
    PAC: {
      type: 'PAC',
      name: 'PAC — Entrega Econômica',
      price: SHIPPING_TABLE.PAC[region],
      days: PAC_DAYS[region],
      region
    },
    SEDEX: {
      type: 'SEDEX',
      name: 'SEDEX — Entrega Expressa',
      price: SHIPPING_TABLE.SEDEX[region],
      days: SEDEX_DAYS[region],
      region
    }
  }
}

// Consulta CEP via ViaCEP (gratuito, sem cadastro)
export const fetchAddressByCEP = async (cep) => {
  const clean = cep.replace(/\D/g, '')
  if (clean.length !== 8) throw new Error('CEP inválido')
  const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
  const data = await res.json()
  if (data.erro) throw new Error('CEP não encontrado')
  return data // { uf, localidade, logradouro, bairro, ... }
}
