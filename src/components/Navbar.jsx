"use client"
import Link from 'next/link'

export default function Navbar() {
  return (
    <div style={{ padding: '20px', background: '#0D1B3E', color: '#fff' }}>
      <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
        Gilberto de Souza
      </Link>
    </div>
  )
}
