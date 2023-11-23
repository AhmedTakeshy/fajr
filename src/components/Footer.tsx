import { NextFont } from 'next/dist/compiled/@next/font'
import Link from 'next/link'
import React from 'react'
import { FaTiktok, FaTelegram, FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import SubscribeForm from './SubscribeForm';
import { inter } from '@/lib/fonts';
import Image from 'next/image';



export default function Footer() {

  return (
    <footer className='flex flex-col items-center justify-center w-full mt-auto bg-gray-300 pt-9 dark:bg-sky-950'>
      <div className="flex flex-col items-center gap-4 mx-auto my-2">
        <h2 className='text-2xl font-bold text-left'>شـــــــركة فجـــــــر بغــــــداد</h2>
        <SubscribeForm />
          <Link href="tel:07509952084">
            Tel: 07509952084
          </Link>
        <div className='flex items-center justify-center gap-3 my-8'>
          <Link href="https://www.tiktok.com/@fajer_bg?_t=8hStlZjRw18&_r=1" target="_blank" className='group'>
            <Image src='/imgs/tiktok.svg' width={25} height={25} className='transition duration-500 opacity-0 group-hover:opacity-100' alt='TikTok logo'/>
            <FaTiktok className="transition duration-500 opacity-100 group-hover:opacity-0" size={20} />
          </Link>
          <Link href="https://t.me/gghhtyruiopew" target="_blank" className='group'>
            <FaTelegram size={20} className="group-hover:text-[#2AABEE] duration-500 transition" />
          </Link>
          <Link href="mailto:Fajer.baghdad89@gmail.com" className='group'>
            <HiMail size={25} className="transition-all duration-500 group-hover:text-rose-400" />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=100077916062174&mibextid=ZbWKwL" target="_blank" className=' group'>
            <FaFacebookF size={20} className="group-hover:text-[#1877f2] duration-500 transition"/>
          </Link>
          <Link href="https://instagram.com/fjer_b?igshid=OGQ5ZDc2ODk2ZA==" target="_blank" className='relative before:hover:bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] before:rounded-[6px] before:w-full before:h-full before:opacity-0 before:hover:opacity-100 before:duration-1000 before:transition-all before:absolute before:z-0 '>
            <FaInstagram size={20} className="relative z-[1]" />
          </Link>
        </div>
      </div>
      <hr className='w-32 border-t-4 rounded-md border-sky-800 dark:border-slate-950'/>
      <div className='flex flex-col items-center justify-center pt-6 mb-4 '>
        <p className=' text-slate-800 dark:text-slate-100'>جميع الحقوق محفوظة شـــــــركة فجـــــــر بغــــــداد © 2023</p>
        <p className={`${inter.className} `}>Developed by 
          <Link href='https://www.takeshy.works/' target='_blank' className="font-bold transition-all duration-500 text-rose-600 hover:tracking-widest hover:will-change-transform"> Takeshy</Link>
        </p>
      </div>
    </footer>
  )
}
