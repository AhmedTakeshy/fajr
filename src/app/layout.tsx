import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeProvider'
import { elMessiri } from '@/lib/fonts'
import { Toaster } from "@/components/ui/toaster"



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
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
