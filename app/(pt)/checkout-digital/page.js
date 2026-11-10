"use client"
import { Suspense } from 'react'
import CheckoutDigitalPage from '@/src/views/CheckoutDigitalPage'
import ClientWrapper from '@/app/ClientWrapper'

export default function Page() {
  return (
    <ClientWrapper>
      <Suspense fallback={null}>
        <CheckoutDigitalPage />
      </Suspense>
    </ClientWrapper>
  )
}
