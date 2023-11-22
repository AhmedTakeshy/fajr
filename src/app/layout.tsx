import type { Metadata } from 'next'
import { El_Messiri } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeProvider'
import NavMenu from '@/components/NavMenu'
import Footer from '@/components/Footer'
import { Inter } from 'next/font/google'
import ScrollButton from '@/components/ScrollButton'

const elMessiri = El_Messiri({ subsets: ["arabic"], weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: 'فجر',
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
    <html dir='rtl' lang="ar">
      <body dir='rtl' className={`${elMessiri.className} antialiased`} >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavMenu />
          {children}
          <ScrollButton/>
          <Footer font={inter}/>
        </ThemeProvider>
      </body>
    </html>
  )
}
