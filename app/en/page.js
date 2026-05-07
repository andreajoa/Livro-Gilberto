'use client'
export const dynamic = 'force-dynamic'
import noSSR from 'next/dynamic'
import ClientWrapper from '@/app/ClientWrapper'
const HomeEN = noSSR(() => import('@/src/views/HomeEN'), { ssr: false })
export default function Page() { return <ClientWrapper><HomeEN /></ClientWrapper> }
