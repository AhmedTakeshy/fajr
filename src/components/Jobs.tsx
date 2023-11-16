import { MotionSection, MotionArticle } from "@/lib/motionDev";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import JobItem from "./JobItem";

export default function Jobs() {

  return (
    <MotionSection id="jobs" variants={fadeIn("down", 0.5)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.7 }}
      className='container flex flex-col items-start justify-center my-10'>
      <h1 className='my-10 font-bold text-7xl'>الوظائف</h1>
      <div className="grid grid-cols-4 gap-10 place-items-center">
        <JobItem id={1} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-01.jpg" />
        <JobItem id={2} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-02.jpg" />
        <JobItem id={3} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-03.jpg" />
        <JobItem id={4} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-04.jpg" />
        <JobItem id={5} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-05.jpg" />
        <JobItem id={6} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-06.jpg" />
        <JobItem id={7} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-07.jpg" />
        <JobItem id={8} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-08.jpg" />
      </div>
    </MotionSection>
  )
}
