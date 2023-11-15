"use client"
import { fadeIn } from "@/lib/variants"
import { motion } from "framer-motion"
import { HiOutlineSpeakerphone } from "react-icons/hi"

export default function Services() {
  
  return (
    <motion.section variants={fadeIn("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.7 }} 
      className='container flex flex-col items-start justify-center my-8' id='services'>
      <h1 className='my-6 text-4xl font-bold'>خدماتنا</h1>
      <div className='grid grid-cols-3 gap-4 my-4 place-content-center'>
        <article className='grid grid-cols-[1fr,auto] '>
          <h3 className="mb-2 text-xl text-slate-200">وسائل التواصل الاجتماعي</h3>
          <HiOutlineSpeakerphone size={40} className="text-cyan-400"/>
          <p className="text-xl text-slate-500">الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع.</p>
        </article>
        <article className='grid grid-cols-[1fr,auto]'>
          <h3 className="mb-2 text-xl text-slate-200">وسائل التواصل الاجتماعي</h3>
          <HiOutlineSpeakerphone size={40} className="text-cyan-400"/>
          <p className="text-xl text-slate-500">الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع.</p>
        </article>
        <article className='grid grid-cols-[1fr,auto]'>
          <h3 className="mb-2 text-xl text-slate-200">وسائل التواصل الاجتماعي</h3>
          <HiOutlineSpeakerphone size={40} className="text-cyan-400"/>
          <p className="text-xl text-slate-500">الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع.</p>
        </article>
        <article className='grid grid-cols-[1fr,auto]'>
          <h3 className="mb-2 text-xl text-slate-200">وسائل التواصل الاجتماعي</h3>
          <HiOutlineSpeakerphone size={40} className="text-cyan-400"/>
          <p className="text-xl text-slate-500">الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع.</p>
        </article>
        <article className='grid grid-cols-[1fr,auto]'>
          <h3 className="mb-2 text-xl text-slate-200">وسائل التواصل الاجتماعي</h3>
          <HiOutlineSpeakerphone size={40} className="text-cyan-400"/>
          <p className="text-xl text-slate-500">الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع.</p>
        </article>
        <article className='grid grid-cols-[1fr,auto]'>
          <h3 className="mb-2 text-xl text-slate-200">وسائل التواصل الاجتماعي</h3>
          <HiOutlineSpeakerphone size={40} className="text-cyan-400"/>
          <p className="text-xl text-slate-500">الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع.</p>
        </article>
      </div>
    </motion.section>
  )
}
