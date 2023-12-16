import { NextFont } from 'next/dist/compiled/@next/font'
import Link from 'next/link'
import React from 'react'
import { FaTiktok, FaTelegram, FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import SubscribeForm from './SubscribeForm';
import { inter } from '@/lib/fonts';
import Image from 'next/image';
import { Suspense } from 'react';
import { Skeleton } from '../ui/skeleton';
import MapPage from './Map';



export default function Footer() {

  return (
    <footer id='about' className='w-full bg-gray-300 pt-9 dark:bg-sky-950'>
      <section className='grid my-4 containerX place-content-center xl:place-content-between xl:grid-cols-2'>
        <div className="flex flex-col items-center gap-2 mr-4 text-right">
          <h2 className='text-2xl font-bold text-left'>شـــــــركة فجـــــــر بغــــــداد</h2>
          <Link href="tel:07509952084" className='self-start mt-4 mr-5'>
            التلفون: {" "}
            <span className='transition-colors duration-300 hover:text-sky-600'>
              07509952084
            </span>
          </Link>
          <Link href="mailto:Fajer.baghdad89@gmail.com" className='self-start mr-5'>
            البريد الالكتروني: {" "}
            <span className='transition-colors duration-300 hover:text-sky-600'>
              Fajer.baghdad89@gmail.com
            </span>
          </Link>
          <article className='flex flex-col items-center justify-center pt-6 mb-4 space-y-5'>
            <p className='text-slate-800 dark:text-slate-100'>
              شركة فجر بغداد شركة خدميه أسست على مبدأ التعامل مع طالب العمل وصاحب العمل أسست على هدف مساعدة الباحثين عن عمل من كافة طبقات المجتمع. اغلب اعمالها اعمال خيريه لتشغيل
              الشباب.
              فهي ليست شركة ربحية وانما شركة خدميه وفق مبادئ سامية ورفيعة.
            </p>
            <p className='text-slate-800 dark:text-slate-100'>
              هدف شركة فجر بغداد الى تقليل نسبة البطالة والحد منها ومساعدة الشباب على ايجاد فرص العمل
              المناسبة لهم بدون عناء وبدون اي صعوبات وتسهيل العقبات أمامهم للحصول على قوت يومهم .
            </p>
            <p className=' text-slate-800 dark:text-slate-100'>
              تأسست الشركة عام ١\١١\٢٠٢٢ في ضل كثرة البطالة عند الشباب العاطل عن العمل وقلة توفير الوظائف
              الحكومية لما يمر به البلد من ازمات اقتصادية فهي تعتبر حلقة وصل بين طالب العمل وصاحب العمل تهدف
              لمساعدة الشباب من اجل توفير فرصة عمل مناسبة لهم لكلا الجنسين ولمختلف التخصصات الخريج وغير
              الخريج.
            </p>
            <p className='self-start text-slate-800 dark:text-slate-100'>
              الضمانات في العمل:
              الفرص المتوفرة في حال تم رفض العمل من قبل صاحب العمل يحق لطالب العمل ان يتخذ احد الاحتمالين
            </p>
            <ol className='self-start list-decimal !mt-0'>
              <li>
                اما استرجاع المبلغ المدفوع في الاستمارة.
              </li>
              <li>
                الاستبدال (لخمس مرات) لحين ايجاد فرصة عمل بديله ومناسبة.
              </li>
              <li>اما اذا لم يتم رفض العمل فلال يجوز استرجاع المبلغ وانما يتم الاستبدال لثلاث مرات مجانا.</li>
            </ol>
          </article>
        </div>
        <Suspense fallback={<Skeleton className="w-[600.5px] h-[400] rounded-lg" />}>
          <MapPage />
        </Suspense>
        <hr className='w-full my-8 text-center border-t-2 rounded-md xl:col-span-2 border-sky-800 dark:border-slate-950' />
        <section className='grid gap-3 text-center xl:grid-cols-2 xl:text-justify place-content-center xl:place-content-between xl:col-span-2'>
          <div className='order-2 xl:order-none'>
            <p className=' text-slate-800 dark:text-slate-100'>جميع الحقوق محفوظة شـــــــركة فجـــــــر بغــــــداد © 2023</p>
            <p className={`${inter.className} !mt-0`}>تم التصميم والتطوير بواسطة
              <Link href='https://www.takeshy.works/' target='_blank' className="font-bold transition-all duration-500 text-rose-600 hover:tracking-widest hover:will-change-transform"> Takeshy</Link>
            </p>
          </div>
          <div className='order-1 xl:order-none'>
            <div className='flex items-center justify-center gap-3 mb-2 xl:justify-end'>
              <Link href="https://www.tiktok.com/@fajer_bg?_t=8hStlZjRw18&_r=1" target="_blank" className='relative group'>
                <Image src='/imgs/tiktok.svg' width={20} height={20} className='transition duration-500 opacity-0 group-hover:opacity-100' alt='TikTok logo' />
                <FaTiktok className="absolute top-[50%] translate-y-[-50%] right-0 transition duration-500 opacity-100 group-hover:opacity-0" size={20} />
              </Link>
              <Link href="https://t.me/gghhtyruiopew" target="_blank" className='group'>
                <FaTelegram size={20} className="group-hover:text-[#2AABEE] duration-500 transition" />
              </Link>
              <Link href="mailto:Fajer.baghdad89@gmail.com" className='group'>
                <HiMail size={25} className="transition-all duration-500 group-hover:text-rose-400" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=100077916062174&mibextid=ZbWKwL" target="_blank" className=' group'>
                <FaFacebookF size={20} className="group-hover:text-[#1877f2] duration-500 transition" />
              </Link>
              <Link href="https://instagram.com/fjer_b?igshid=OGQ5ZDc2ODk2ZA==" target="_blank" className='relative before:hover:bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] before:rounded-[6px] before:w-full before:h-full before:opacity-0 before:hover:opacity-100 before:duration-1000 before:transition-all before:absolute before:z-0 '>
                <FaInstagram size={20} className="relative z-[1]" />
              </Link>
            </div>
            <SubscribeForm />
          </div>
        </section>
      </section>
    </footer >
  )
}
