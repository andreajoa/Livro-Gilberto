'use client'
import dynamic from 'next/dynamic'
import ClientWrapper from '@/app/ClientWrapper'

const HomeEN = dynamic(() => import('@/src/views/HomeEN'), { ssr: false })
const AIChatbotEN = dynamic(() => import('@/src/components/AIChatbotEN'), { ssr: false })

export default function PageEN() {
  return <ClientWrapper><HomeEN /><AIChatbotEN /></ClientWrapper>
}
