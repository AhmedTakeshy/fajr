import { MotionSection } from "@/lib/motionDev"
import { fadeIn } from "@/lib/variants"
import { HiOutlineSpeakerphone } from "react-icons/hi"
import ServiceItem from "./ServiceItem"

export default function Services() {

  return (
    <MotionSection 
      variants={fadeIn("right", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.7 }}
      className='container flex flex-col items-start justify-center my-10' id='services'>
      <h1 className='my-6 font-bold text-7xl'>خدماتنا</h1>
      <section id="services" className='grid gap-8 my-4 lg:grid-cols-3 md:grid-cols-2 place-content-center'>
        <ServiceItem
          description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع."
          title='وسائل التواصل الاجتماعي'
          icon={<HiOutlineSpeakerphone size={40} className="text-cyan-400" />}
        />
        <ServiceItem
          description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع."
          title='وسائل التواصل الاجتماعي'
          icon={<HiOutlineSpeakerphone size={40} className="text-cyan-400" />}
        />
        <ServiceItem
          description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع."
          title='وسائل التواصل الاجتماعي'
          icon={<HiOutlineSpeakerphone size={40} className="text-cyan-400" />}
        />
        <ServiceItem
          description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع."
          title='وسائل التواصل الاجتماعي'
          icon={<HiOutlineSpeakerphone size={40} className="text-cyan-400" />}
        />
        <ServiceItem
          description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع."
          title='وسائل التواصل الاجتماعي'
          icon={<HiOutlineSpeakerphone size={40} className="text-cyan-400" />}
        />
        <ServiceItem
          description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع."
          title='وسائل التواصل الاجتماعي'
          icon={<HiOutlineSpeakerphone size={40} className="text-cyan-400" />}
        />
      </section>
    </MotionSection>
  )
}
