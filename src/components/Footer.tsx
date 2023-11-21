import { NextFont } from 'next/dist/compiled/@next/font'
import Link from 'next/link'
import React from 'react'
import { FaTiktok, FaTelegram, FaFacebookF, FaInstagram } from "react-icons/fa";
import SubscribeForm from './SubscribeForm';

type FooterProps = {
  font: NextFont
}

export default function Footer({ font }: FooterProps) {

  return (
    <footer className='flex flex-col items-center justify-center w-full mt-auto bg-gray-300 pt-9 dark:bg-sky-950'>
      <div className="container grid grid-cols-2 my-2 place-content-between">
        <SubscribeForm />
        <h2 className='text-2xl font-bold text-left'>شـــــــركة فجـــــــر بغــــــداد</h2>
        <div className='flex items-center justify-center col-span-2 gap-2 mb-2 -mt-6 place-self-end'>
          <Link href="https://www.tiktok.com/@fajer_bg?_t=8hStlZjRw18&_r=1" target="_blank">
            <FaTiktok size={25} />
          </Link>
          <Link href="https://t.me/gghhtyruiopew" target="_blank">
            <FaTelegram size={25} />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=100077916062174&mibextid=ZbWKwL" target="_blank">
            <FaFacebookF size={25} />
          </Link>
          <Link href="https://instagram.com/fjer_b?igshid=OGQ5ZDc2ODk2ZA==" target="_blank">
            <FaInstagram size={25} />
          </Link>
        </div>
      </div>
      <div className='container flex flex-col items-center justify-center pt-6 border-t border-blue-500'>
        <p className=' text-slate-800 dark:text-slate-100'>جميع الحقوق محفوظة Fajr © 2023</p>
        <p className={`mb-4  ${font.className} `}>Developed by {" "}
          <Link href='https://www.takeshy.works/' target='_blank' className="font-bold transition-all duration-500 text-rose-600 hover:tracking-widest hover:will-change-transform">Takeshy</Link>
        </p>
      </div>
    </footer>
  )
}
