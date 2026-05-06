"use client"
import Component from '@/src/pages/Devolucao'
import Navbar from '@/src/components/Navbar'
import Footer from '@/src/components/Footer'
export default function Page() {
  return (<div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}><Navbar/><div style={{flex:'1'}}><Component/></div><Footer/></div>)
}
