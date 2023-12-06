import type { Metadata } from 'next'
import NavMenu from '@/components/main/NavMenu'
import Footer from '@/components/main/Footer'
import ScrollButton from '@/components/ScrollButton'

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'شـــــــركة فجـــــــر بغــــــداد',
  description: `استحداث فرص العمل من مواقع العمل المختلفة في جميع القطاعات وتشغيل كل الاختصاصات ولكلا الجنسين
مبدأنا الثقه
شعارنا الامان
غايتنا خدمتكم`,


}
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
