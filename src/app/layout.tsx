import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeProvider'
import { elMessiri } from '@/lib/fonts'
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from '@/context/AuthProvider'



export const metadata: Metadata = {
  title: 'شـــــــركة فجـــــــر بغــــــداد',
  description: "شركة فجر بغداد لتشغيل الأيدي العاملة العراقية أهداف الشركة تهدف شركة فجر بغداد الى تقليل نسبة البطالة والحد منها ومساعدة الشباب على ايجاد فرص العمل المناسبة لهم بدون عناء وبدون اي صعوبات وتسهيل العقبات أمامهم للحصول على قوت يومهم .نبذة عن الشركة:شركة فجر بغداد شركة خدميه أسست على مبدأ التعامل مع طالب العمل وصاحب العمل أسست على روح التعاون والأخوة والاحساس بمعاناة طالب العمل من كافة طبقات المجتمع. اغلب اعمالها اعمال خيريه لتشغيل الشباب.فهي ليست شركة ربحية وانما شركة خدميه وفق مبادئ سامية ورفيعة.كيف ومتى تأسست:تأسست عام 2022-11-01 في ضل كثرة البطالة عند الشباب العاطل عن العمل وقلة توفير الوظائف الحكومية لما يمر به البلد من ازمات اقتصادية فهي تعتبر حلقة وصل بين طالب العمل وصاحب العمل تهدف لمساعدة الشباب من اجل توفير فرصة عمل مناسبة لهم لكلا الجنسين ولمختلف التخصصات الخريج وغير الخريج.",
  applicationName: "شركة فجر بغداد",
  generator: "شركة فجر بغداد",
  referrer: 'origin-when-cross-origin',
  authors: [
    {
      name: 'شركة فجر بغداد',
      url: 'https://fajer-baghdad.vercel.app/',
    },
    {
      name: "Ahmed Takeshy",
      url: "https:takeshy.works"
    }
  ],
  keywords: [
    "شركة فجر بغداد", "فرص عمل", "عمل بغداد", "عمل للشباب وللبنات", "فجر للعمل", "فجر بغداد", "فجر", "بحث عن عمل", "وظائف فجر", "شركة فجر", "عمل", "فجر بغداد للعمل", "شغل في بغداد", "اعمال في العراق", "وظائف",
  ],
  creator: "Ahmed Takeshy",
  publisher: "شركة فجر بغداد",
  robots: "index, follow",
  metadataBase: new URL('https://fajer-baghdad.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  icons: [
    {
      url: '/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png',
    },
    {
      url: '/icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      url: '/icons/icon-128x128.png',
      sizes: '128x128',
      type: 'image/png',
    },
    {
      url: '/icons/icon-144x144.png',
      sizes: '144x144',
      type: 'image/png',
    },
    {
      url: '/icons/icon-152x152.png',
      sizes: '152x152',
      type: 'image/png',
    },
    {
      url: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      url: '/icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png',
    },
    {
      url: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
  manifest: "https://fajer-baghdad.vercel.app/manifest.json",
  abstract: "شركة فجر بغداد لتشغيل الأيدي العاملة العراقية أهداف الشركة تهدف شركة فجر بغداد الى تقليل نسبة البطالة والحد منها ومساعدة الشباب على ايجاد فرص العمل المناسبة لهم بدون عناء وبدون اي صعوبات وتسهيل العقبات أمامهم للحصول على قوت يومهم .نبذة عن الشركة:شركة فجر بغداد شركة خدميه أسست على مبدأ التعامل مع طالب العمل وصاحب العمل أسست على روح التعاون والأخوة والاحساس بمعاناة طالب العمل من كافة طبقات المجتمع. اغلب اعمالها اعمال خيريه لتشغيل الشباب.فهي ليست شركة ربحية وانما شركة خدميه وفق مبادئ سامية ورفيعة.كيف ومتى تأسست:تأسست عام 2022-11-01 في ضل كثرة البطالة عند الشباب العاطل عن العمل وقلة توفير الوظائف الحكومية لما يمر به البلد من ازمات اقتصادية فهي تعتبر حلقة وصل بين طالب العمل وصاحب العمل تهدف لمساعدة الشباب من اجل توفير فرصة عمل مناسبة لهم لكلا الجنسين ولمختلف التخصصات الخريج وغير الخريج.",
  appLinks:
  {
    web: { url: "https://fajer-baghdad.vercel.app/" },
  },
  category: "business",
  classification: "شركة فجر بغداد لتشغيل الأيدي العاملة العراقية أهداف الشركة تهدف شركة فجر بغداد الى تقليل نسبة البطالة والحد منها ومساعدة الشباب على ايجاد فرص العمل المناسبة لهم بدون عناء وبدون اي صعوبات وتسهيل العقبات أمامهم للحصول على قوت يومهم .نبذة عن الشركة:شركة فجر بغداد شركة خدميه أسست على مبدأ التعامل مع طالب العمل وصاحب العمل أسست على روح التعاون والأخوة والاحساس بمعاناة طالب العمل من كافة طبقات المجتمع. اغلب اعمالها اعمال خيريه لتشغيل الشباب.فهي ليست شركة ربحية وانما شركة خدميه وفق مبادئ سامية ورفيعة.كيف ومتى تأسست:تأسست عام 2022-11-01 في ضل كثرة البطالة عند الشباب العاطل عن العمل وقلة توفير الوظائف الحكومية لما يمر به البلد من ازمات اقتصادية فهي تعتبر حلقة وصل بين طالب العمل وصاحب العمل تهدف لمساعدة الشباب من ا"
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
          <AuthProvider>
            <Toaster />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
