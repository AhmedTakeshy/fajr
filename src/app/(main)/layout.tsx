import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Footer from '@/components/main/Footer'
import ScrollButton from '@/components/ScrollButton'


export const metadata: Metadata = {
  title: 'شـــــــركة فجـــــــر بغــــــداد',
  description: "استحداث فرص العمل من مواقع العمل المختلفة في جميع القطاعات وتشغيل كل الاختصاصات ولكلا الجنسين مبدأنا الثقة شعارنا الامان غايتنا خدمتكم",
}
const NavMenu = dynamic(() => import('@/components/main/NavMenu'),{ssr: true})
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavMenu />
      {children}
      <ScrollButton />
      <Footer />
    </>
  )
}
