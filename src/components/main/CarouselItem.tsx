"use client";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import Image from "next/image";
import { Button } from "../ui/button";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import Link from "next/link";


const big3 = "/imgs/pic3-big.jpg";
const big5 = "/imgs/pic5-big.jpg";
const big6 = "/imgs/pic6-big.jpg";

const images = [
    big5,
    big6,
    big3,
];


export default function CarouselItem() {
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
                infinite={true}
                {...properties}
            >
                {images.map((image, index) => {
                    return (
                        <Image
                            loading="lazy"
                            placeholder="empty"
                            key={index}
                            src={image}
                            width={1920}
                            height={1280}
                            alt="carousel images"
                            className="object-cover w-full h-screen "
                        />
                    );
                })}
            </Slide>
            <Link
                href="#services"
                className="flex flex-col items-center gap-1 absolute left-[50%] translate-x-[-50%] top-[45rem]  2xl:top-[49rem] scroll-smooth font-bold text-black"
            >
                <MdKeyboardDoubleArrowDown size={30} className="animate-bounce" />
                تعرف علي خدماتنا
            </Link>
        </>
    );
}
