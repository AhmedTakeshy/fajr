import { MotionSection } from "@/lib/motionDev"
import { fadeIn } from "@/lib/variants"
import { HiOutlineSpeakerphone } from "react-icons/hi"
import { CgWorkAlt } from "react-icons/cg"
import { BiDonateHeart } from "react-icons/bi"
import ServiceItem from "./ServiceItem"

export default function Services() {

  const services1 = {
    title: "فرص عمل شاغره يوميا مؤكده ومضمونه ومطلوبة",
    description: [
      "خدمة المطاعم (عامل صالة - كابتن صاله - عامل مطبخ - عامل خدمة)",
      "انواع المندبة ( مندوب مبيعات - مندوب ميداني - مندوب توصيل ( لكلا الجنسين )",
      "خدمة السكرتارية (للأطباء وكذلك للشركات والمكاتب والمدارس الاهلية)",

    ]
  }
  const services2 = {
    title: "تجهيزات الشباب و الشابات للاعمال الفنية والمكتبية",
    description: [
      "تجهيز كوادر عمل متكاملة للمطاعم واعمال البناء وكذلك محطات غسل السيارات",
      "تجهيز كوادر فنية للمدارس الأهلية من معلمين ومدرسين وعمال خدمة لكلا الجنسين",
      "توفير موظفي استعلامات لكلا الجنسين للمكاتب والشركات والمدارس والمستشفيات وغيرها من المؤسسات الاهلية",
      "توفير الحراسات الأمنية للقطاع الخاص"
    ],
  }
  const services3 = {
    title: "اعمال خيريه",
    description: [
      "شركة فجر بغداد تتميز عن باقي الشركات توفير فرصة عمل وفتح استماره مجانية لعوائل شهداء الحشد الشعبي.",
      " تخفيض سعر الاستمارة بين كل فترة مراعاة لظروف الشباب لما يمر به البلد من ازمات.",
      "استلام الرسوم بعد المباشرة بالعمل لمدة يومين او ثلاث ايام بين كل فترة تسهيلا لامر طالب العمل."
    ],
  }

  return (
    <MotionSection 
      variants={fadeIn("right", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.7 }}
      className='flex flex-col items-start justify-center my-10 containerX' id='services'>
      <h1 className='my-6 font-bold text-7xl'>خدماتنا</h1>
      <section id="services" className='grid gap-20 my-4 lg:grid-cols-3 md:grid-cols-2 place-content-center'>
        <ServiceItem
          description={services1.description}
          title={services1.title}
          icon={<HiOutlineSpeakerphone size={40} className=" text-cyan-400" />}
        />
        <ServiceItem
          description={services2.description}
          title={services2.title}
          icon={<CgWorkAlt size={40} className=" text-cyan-400" />}
        />
        <ServiceItem
          description={services3.description}
          title={services3.title}
          icon={<BiDonateHeart size={40} className=" text-cyan-400" />}
        />
        <p className="lg:col-span-3 md:col-span-2 font-bold text-center text-red-400"><b>**</b>كل فرص العمل المذكورة اعلاه هي فرص عمل في القطاع الخاص وليست حكومية ولا
          في القطاع العام وتعتبر فرص عمل خدمية لتحسين الواقع المعيشي لدى شريحة الشباب.<b>**</b>
        </p>
      </section>
    </MotionSection>
  )
}
