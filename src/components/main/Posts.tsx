import { MotionSection, MotionArticle } from "@/lib/motionDev";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import PostItem from "./PostItem";

export default function Posts() {

  return (
    <MotionSection id="jobs" variants={fadeIn("up", 0.5)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.7 }}
      className='container flex flex-col items-start justify-center my-10'>
      <h1 className='my-10 font-bold text-7xl'>الوظائف</h1>
      <div className="grid gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-center">
        <PostItem id={1} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-01.jpg" />
        <PostItem id={2} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-02.jpg" />
        <PostItem id={3} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-03.jpg" />
        <PostItem id={4} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-04.jpg" />
        <PostItem id={5} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-05.jpg" />
        <PostItem id={6} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-06.jpg" />
        <PostItem id={7} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-07.jpg" />
        <PostItem id={8} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-08.jpg" />
      </div>
    </MotionSection>
  )
}
