'use client'
export const dynamic = 'force-dynamic'
import noSSR from 'next/dynamic'
import ClientWrapper from '@/app/ClientWrapper'
const OLivro = noSSR(() => import('@/src/views/OLivro'), { ssr: false })
export default function Page() { return <ClientWrapper><OLivro /></ClientWrapper> }
