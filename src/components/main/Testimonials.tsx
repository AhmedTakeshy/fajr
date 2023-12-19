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
            className='bg-[url("/imgs/pic1-big.jpg")] relative z-[3] h-4/6 mt-24 bg-center'>
            <div className="absolute w-full h-full z-[5] bg-black/60" />
            <div className="relative z-10 grid grid-rows-none gap-2 py-4 mx-auto max-w-[1240px] md:grid-cols-5 md:gap-4 place-content-center place-items-center">
                <Image
                    className="object-cover w-full h-[70%] col-span-2 row-span-2 bg-transparent rounded-md md:col-span-3"
                    src={testPic4}
                    width={725.5}
                    height={479.5}
                    alt="testimonials image"
                />
                <Image
                    className="object-cover w-full h-5/6 rounded-tl-md"
                    src={testPic1}
                    width={228.8}
                    height={239.067}
                    alt="testimonials image"
                />
                <Image
                    className="object-cover w-full h-5/6 rounded-tr-md"
                    src={testPic3}
                    width={228.8}
                    height={239.067}
                    alt="testimonials image"
                />
                <Image
                    className="object-cover w-full h-5/6 rounded-bl-md"
                    src={testPic6}
                    width={228.8}
                    height={239.067}
                    alt="testimonials image"
                />
                <Image
                    className="object-cover w-full h-5/6 rounded-br-md"
                    src={testPic5}
                    width={228.8}
                    height={239.067}
                    alt="testimonials image"
                />
            </div>
        </MotionSection>
    )
}
