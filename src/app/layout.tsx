import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeProvider'
import NavMenu from '@/components/NavMenu'
import Footer from '@/components/Footer'
import ScrollButton from '@/components/ScrollButton'
import { elMessiri } from '@/lib/fonts'



export const metadata: Metadata = {
  title: 'شـــــــركة فجـــــــر بغــــــداد',
  description: `استحداث فرص العمل من مواقع العمل المختلفة في جميع القطاعات وتشغيل كل الاختصاصات ولكلا الجنسين
مبدأنا الثقه
شعارنا الامان
غايتنا خدمتكم`,


}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html dir='rtl' lang="ar" className={`${elMessiri.className} `}>
      <body dir='rtl' className={` antialiased flex flex-col min-h-screen`} >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavMenu />
          {children}
          <ScrollButton />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
