'use client'
import dynamic from 'next/dynamic'
import ClientWrapper from '@/app/ClientWrapper'

import HomeEN from '@/src/views/HomeEN'
const AIChatbotEN = dynamic(() => import('@/src/components/AIChatbotEN'), { ssr: false })

export default function PageEN() {
  return <ClientWrapper><HomeEN /><AIChatbotEN /></ClientWrapper>
}
