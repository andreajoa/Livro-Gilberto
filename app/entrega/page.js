'use client'
export const dynamic = 'force-dynamic'
import noSSR from 'next/dynamic'
import ClientWrapper from '@/app/ClientWrapper'
const Component = noSSR(() => import('@/src/views/Entrega'), { ssr: false })
export default function Page() { return <ClientWrapper><Component /></ClientWrapper> }
