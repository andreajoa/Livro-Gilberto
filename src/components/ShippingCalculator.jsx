import { useState } from 'react'
import { fetchAddressByCEP, calculateShipping } from '../services/shipping'
import { useCart } from '../context/CartContext'

export default function ShippingCalculator() {
  const { setShipping } = useCart()
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState(null)
  const [options, setOptions] = useState(null)
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const formatCEP = (val) =>
    val.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9)

  const handleCalculate = async () => {
    const clean = cep.replace(/\D/g, '')
    if (clean.length !== 8) return setError('Digite um CEP válido com 8 dígitos.')
    setLoading(true)
    setError('')
    setOptions(null)
    setSelected(null)
    setShipping(null)
    try {
      const addr = await fetchAddressByCEP(clean)
      setAddress(addr)
      const opts = calculateShipping(addr.uf, clean)
      setOptions(opts)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (type) => {
    setSelected(type)
    setShipping(options[type])
  }

  return (
    <div className="shipping-calc">
      <p className="shipping-title">📦 Calcular Frete</p>
      <p className="shipping-origin">Enviado de Santana de Parnaíba — SP</p>

      <div className="cep-row">
        <input
          type="text"
          placeholder="00000-000"
          value={cep}
          onChange={e => setCep(formatCEP(e.target.value))}
          onKeyDown={e => e.key === 'Enter' && handleCalculate()}
          maxLength={9}
          className="cep-input"
        />
        <button
          onClick={handleCalculate}
          disabled={loading}
          className="cep-btn"
        >
          {loading ? '...' : 'Calcular'}
        </button>
      </div>

      {error && <p className="cep-error">⚠️ {error}</p>}

      {address && (
        <p className="cep-address">
          📍 {address.localidade} — {address.uf}
        </p>
      )}

      {options && (
        <div className="shipping-options">
          {Object.values(options).map(opt => (
            <div
              key={opt.type}
              className={`shipping-option ${selected === opt.type ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.type)}
            >
              <div>
                <span className="opt-name">{opt.name}</span>
                <span className="opt-days">🏱 {opt.days} dias úteis</span>
              </div>
              <span className="opt-price">R$ {opt.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}

      {!options && !loading && (
        <p className="cep-hint">
          <a href="https://buscacepinter.correios.com.br" target="_blank" rel="noreferrer">
            Não sei meu CEP
          </a>
        </p>
      )}
    </div>
  )
}
