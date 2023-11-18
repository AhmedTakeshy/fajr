import Image from 'next/image'
import { LiaFacebookF, LiaLinkedinIn, LiaTwitter } from "react-icons/lia";



type TeamMemberProps = {
    title: string;
    description: string;
    img: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
}

export default function TeamMember({ title, description, img }: TeamMemberProps) {
    return (
        <div  className='w-full max-w-[19rem] h-full inset-0 rounded-xl bg-gray-300 dark:bg-sky-800 grid grid-cols-1 z-[-1] pt-16 '>
            <div className='relative flex items-center justify-between w-full '>
                <div className="flex flex-col items-center justify-center gap-6 p-4 text-left">
                    <LiaFacebookF size={25} />
                    <LiaTwitter size={25} />
                    <LiaLinkedinIn size={25} />
                </div>
                <Image src={img} alt={`blog image`} width={300} height={300} className="hover:grayscale duration-300 transition-all rounded-lg relative -left-4 top-[50%] translate-y-[-50%] w-[18.75rem]" />
            </div>
            <article className="flex flex-col items-start justify-between p-4 pt-8">
                <h3 className="text-2xl dark:text-slate-200 text-slate-400">{title}</h3>
                <p className="text-xl dark:text-slate-500 text-slate-700">{description}</p>
            </article>
        </div>
    )
}