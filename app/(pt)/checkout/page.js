"use client"
import { Suspense } from 'react'
import CheckoutPage from '@/src/views/CheckoutPage'
import ClientWrapper from '@/app/ClientWrapper'

export default function Page() {
  return (
    <ClientWrapper>
      <Suspense fallback={null}>
        <CheckoutPage />
      </Suspense>
    </ClientWrapper>
  )
}
