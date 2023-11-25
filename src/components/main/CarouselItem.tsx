"use client";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import Image from "next/image";
import { Button } from "../ui/button";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import { fadeIn } from "@/lib/variants";
import { MotionDiv } from "@/lib/motionDev";


const big2 = "/imgs/pic2-big.jpg";
const small2 = "/imgs/pic2-small.jpg";
const big3 = "/imgs/pic3-big.jpg";
const small3 = "/imgs/pic3-small.jpg";
const big4 = "/imgs/pic4-big.jpg";
const small4 = "/imgs/pic4-small.jpg";
const big5 = "/imgs/pic5-big.jpg";
const big6 = "/imgs/pic6-big.jpg";

const images = [
    { big: big5, small: big5 },
    { big: big2, small: small2 },
    { big: big6, small: big6 },
    { big: big4, small: small4 },
    { big: big3, small: small3 },
];

const texts: TextState[] = [
    {
        title: "الثقة الرقمية",
        description: ` إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة
                    عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد
                    النص العربى مفيد لمصممي المواقع على وجه الخصوص كما يمكن استخدامه
                    لتصاميم الجرافيكس. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
                    لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
                    النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها`,
    },
    {
        title: ".أبجد هوز  حطى",
        description:
            ".أبجد هوز حطى كلمن هوى ، حسومات محسنة. امتنع عن سعادتها الحكيمة ، من خارجها ، وتملقها ، ألا تعرف كيف تتحرر من بعض المستكشف المولود للعقل أنه كذلك؟ بالنسبة لبعض الآلام ، ولكن هذا ليس من الحكمة إدارة الأيدي الكبيرة ، يتبع ممارسة المتعة هنا. إعاقة آلام طبيعة الهروب بحيث يتم إبرام جميع المحاضرين الرئيسيين بشكل فاسد.",
    },
];

type TextState = {
    title?: string;
    description?: string;
    button?: string;
};

export default function CarouselItem() {
    const [text, setText] = useState<TextState>({
        title: "الرقمية",
        description: ` إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة`,
    });
    const [showText, setShowText] = useState<boolean>(false);

    const changeText = (i: number): void => {
        setText(texts.at(i)!);
    };

    const properties = {
        prevArrow: (
            <Button
                size="icon"
                className="ml-4 rounded-full backdrop-blur-sm bg-white/30"
            >
                <SlArrowLeft size={24} />
            </Button>
        ),
        nextArrow: (
            <Button
                size="icon"
                className="mr-4 rounded-full backdrop-blur-sm bg-white/30"
            >
                <SlArrowRight size={24} />
            </Button>
        ),
    };

    return (
        <>
            <Slide
                easing="ease"
                duration={2000}
                canSwipe={false}
                infinite={false}
                {...properties}
                onChange={(i) => setShowText(i === 0 ? false : true)}
                onStartChange={(i) => changeText(i)}
            >
                {images.map((image, index) => {
                    return (
                        <Image
                            loading="eager"
                            placeholder="blur"
                            key={index}
                            src={image.big}
                            blurDataURL={`${image.small}`}
                            width={1920}
                            height={1280}
                            alt="image"
                            className="object-cover w-full h-screen "
                        />
                    );
                })}
            </Slide>
            {!!text&&<MotionDiv
                variants={fadeIn("down", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.7 }}
                dir="rtl"
                className="flex flex-col gap-2.5 items-start justify-between absolute top-80 right-96 text-black"
            >
                <h1
                    className="hidden text-5xl font-bold md:inline-flex"
                >
                    {text?.title}
                </h1>
                <p className="hidden max-w-md text-2xl md:inline-flex">{text?.description}
                </p>
                <Button variant="secondary" className="w-full mt-4">
                    تواصل معنا الان
                </Button>
            </MotionDiv>}
            <Link
                href="#services"
                className="flex flex-col items-center gap-1 absolute left-[50%] translate-x-[-50%] top-[49rem] scroll-smooth font-bold text-black"
            >
                <MdKeyboardDoubleArrowDown size={30} className="animate-bounce" />
                تعرف علينا
            </Link>
        </>
    );
}
