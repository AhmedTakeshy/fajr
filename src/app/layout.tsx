import type { Metadata } from 'next'
import { El_Messiri} from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeProvider'
import NavMenu from '@/components/NavMenu'

const elMessiri = El_Messiri({ subsets: ["arabic"],weight: ["400","500","600","700"]})

export const metadata: Metadata = {
  title: 'Fajr App',
  description: 'App to help you find your dream job in the Middle East',
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
        <main className="">
          {children}
        </main>
        </ThemeProvider>
        </body>
    </html>
  )
}
