import { NextFont } from 'next/dist/compiled/@next/font'
import Link from 'next/link'
import React from 'react'

type FooterProps = {
    font: NextFont
}

export default function Footer({ font }: FooterProps) {
    
  return (
    <footer className='flex flex-col items-center justify-center w-full mt-auto bg-gray-300 pt-9 dark:bg-sky-950'>
        <p className=' text-slate-800 dark:text-slate-100'>جميع الحقوق محفوظة Fajr © 2023</p>
          <p className={`my-4 ${font.className} `}>Developer by {" "}
              <Link href='https://www.takeshy.works/' target='_blank' className="font-bold transition-all duration-500 text-rose-600 hover:tracking-widest hover:will-change-transform">Takeshy</Link>
        </p>
    </footer>
  )
}
