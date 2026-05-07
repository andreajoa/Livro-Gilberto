'use client'
export const dynamic = 'force-dynamic'
import noSSR from 'next/dynamic'
import ClientWrapper from '@/app/ClientWrapper'
const HomeES = noSSR(() => import('@/src/views/HomeES'), { ssr: false })
export default function Page() { return <ClientWrapper><HomeES /></ClientWrapper> }
