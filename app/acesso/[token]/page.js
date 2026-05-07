"use client"
import ClientWrapper from '@/app/ClientWrapper'
import AcessoDigital from '@/src/views/AcessoDigital'

export default function Page({ params }) {
  return (
    <ClientWrapper>
      <AcessoDigital token={params.token} />
    </ClientWrapper>
  )
}
