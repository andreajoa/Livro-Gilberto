'use client'
export const dynamic = 'force-dynamic'
import noSSR from 'next/dynamic'
import ClientWrapper from '@/app/ClientWrapper'
const Home = noSSR(() => import('@/src/views/Home'), { ssr: false })
const AIChatbot = noSSR(() => import('@/src/components/AIChatbot'), { ssr: false })
const CartDrawer = noSSR(() => import('@/src/components/CartDrawer'), { ssr: false })
export default function PagePT() {
  return <ClientWrapper><Home /><AIChatbot /><CartDrawer /></ClientWrapper>
}
