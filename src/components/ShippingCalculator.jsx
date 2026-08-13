"use client"
import { useState } from 'react'
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
      const response = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cep: clean })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível calcular o frete')
      setAddress(data.destination)
      setOptions(data.quotes)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (method) => {
    setSelected(method)
    const option = options.find(item => item.method === method)
    setShipping({
      type: option.method,
      name: option.name,
      price: option.amount,
      days: option.days,
      cep: address.cep,
      destination: address
    })
  }

  return (
    <div className="shipping-calc">
      <p className="shipping-title">📦 Calcular Frete</p>

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
          📍 {address.city} — {address.state}
        </p>
      )}

      {options && (
        <div className="shipping-options">
          {options.map(opt => (
            <div
              key={opt.method}
              className={`shipping-option ${selected === opt.method ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.method)}
            >
              <div>
                <span className="opt-name">{opt.name}</span>
                <span className="opt-days">🏱 {opt.days} dias úteis</span>
              </div>
              <span className="opt-price">R$ {opt.amount.toFixed(2)}</span>
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
