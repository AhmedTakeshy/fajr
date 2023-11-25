import type { Metadata } from 'next'
import '@/app/globals.css'
import { ThemeProvider } from '@/context/ThemeProvider'
import NavMenu from '@/components/main/NavMenu'
import Footer from '@/components/main/Footer'
import ScrollButton from '@/components/ScrollButton'
import { elMessiri } from '@/lib/fonts'
import Navbar from '@/components/dashboard/Navbar'



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
        <>
            <Navbar />
            {children}
        </>
    )
}
