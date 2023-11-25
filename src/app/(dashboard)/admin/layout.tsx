import type { Metadata } from 'next'
import '@/app/globals.css'
import { ThemeProvider } from '@/context/ThemeProvider'
import NavMenu from '@/components/main/NavMenu'
import Footer from '@/components/main/Footer'
import ScrollButton from '@/components/ScrollButton'
import { elMessiri } from '@/lib/fonts'



export const metadata: Metadata = {
    title: 'شـــــــركة فجـــــــر بغــــــداد',
    description: `استحداث فرص العمل من مواقع العمل المختلفة في جميع القطاعات وتشغيل كل الاختصاصات ولكلا الجنسين
مبدأنا الثقه
شعارنا الامان
غايتنا خدمتكم`,


}
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // <html dir='rtl' lang="ar" className={`${elMessiri.className} `}>
        <>
            {children}
        </>
        // <section className="flex flex-col items-center justify-center min-h-screen text-gray-700 bg-gray-100 dark:bg-slate-900 dark:text-slate-100">
        //     <ThemeProvider
        //         attribute="class"
        //         defaultTheme="system"
        //         enableSystem
        //         disableTransitionOnChange
        //     >
        //         {children}
        //         <ScrollButton />
        //     </ThemeProvider>
        // </section>
    )
}
