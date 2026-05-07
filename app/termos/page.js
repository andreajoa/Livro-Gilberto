'use client'
import dynamic from 'next/dynamic'
import ClientWrapper from '@/app/ClientWrapper'

const Component = dynamic(() => import('@/src/views/Termos'), { ssr: false })

export default function Page() {
  return <ClientWrapper><Component /></ClientWrapper>
}
