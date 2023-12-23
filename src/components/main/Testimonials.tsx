import { MotionSection } from "@/lib/motionDev";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";

const testPic1 = "/imgs/testimonial_1.jpg"
const testPic3 = "/imgs/testimonial_3.jpg"
const testPic4 = "/imgs/testimonial_4.jpg"
const testPic5 = "/imgs/testimonial_5.jpg"
const testPic6 = "/imgs/testimonial_6.jpg"

export default function Testimonials() {
    return (
        <MotionSection
        dir="ltr"
            id="testimonials"
            variants={fadeIn("left", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className='bg-[url("/imgs/pic1-big.jpg")] relative z-[3] mt-24 bg-fixed bg-center'>
            <div className="absolute w-full h-full z-[5] bg-black/80" />
            <h1 className="py-8 xl:text-6xl lg:text-5xl text-3xl font-bold relative text-center z-10 text-white">اراء عملائنا</h1>
            <div className="relative z-10 grid gap-4 mx-auto max-w-[60rem] md:grid-cols-5 place-items-center p-8">
                <Image
                    className="border border-white w-full h-full col-span-2 row-span-2 bg-transparent rounded-md md:col-span-3"
                    src={testPic4}
                    width={725}
                    height={479}
                    placeholder="blur"
                    blurDataURL={testPic4}
                    alt="testimonials image"
                />
                <Image
                    className="object-cover border-2 border-white w-full h-full rounded-tl-md"
                    src={testPic1}
                    width={228}
                    height={239}
                    placeholder="blur"
                    blurDataURL={testPic1}
                    alt="testimonials image"
                />
                <Image
                    className="object-cover border-2 border-white w-full h-full rounded-tr-md"
                    src={testPic3}
                    width={228}
                    height={239}
                    placeholder="blur"
                    blurDataURL={testPic3}
                    alt="testimonials image"
                />
                <Image
                    className="object-cover border-2 border-white w-full h-full rounded-bl-md"
                    src={testPic6}
                    width={228}
                    height={239}
                    placeholder="blur"
                    blurDataURL={testPic6}
                    alt="testimonials image"
                />
                <Image
                    className="object-cover border-2 border-white w-full h-full rounded-br-md"
                    src={testPic5}
                    width={228}
                    height={239}
                    placeholder="blur"
                    blurDataURL={testPic5}
                    alt="testimonials image"
                />
            </div>
        </MotionSection>
    )
}
