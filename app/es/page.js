'use client'
import dynamic from 'next/dynamic'
import ClientWrapper from '@/app/ClientWrapper'

const HomeES = dynamic(() => import('@/src/views/HomeES'), { ssr: false })

export default function PageES() {
  return <ClientWrapper><HomeES /></ClientWrapper>
}
