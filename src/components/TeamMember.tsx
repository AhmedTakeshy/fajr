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
        <div className='w-full max-w-[19rem] h-full inset-0 rounded-xl bg-gray-300 dark:bg-sky-800 grid grid-cols-1 pt-16 before:h-full before:right-0 before:w-0 relative before:absolute hover:before:w-full before:bg-[#e4e4e4] before:z-[1] before:transition-all before:duration-500 before:rounded-xl group'>
            <div className='relative flex items-center justify-between w-full z-[2]'>
                <div className="flex flex-col items-center justify-center gap-6 p-4 text-left group-hover:text-[#777]">
                    <LiaFacebookF size={25} />
                    <LiaTwitter size={25} />
                    <LiaLinkedinIn size={25} />
                </div>
                <Image src={img} alt={`blog image`} width={300} height={300} className="group-hover:grayscale duration-500 transition-all rounded-lg relative -left-4 top-[50%] translate-y-[-50%] w-[18.75rem]" />
            </div>
            <article className="flex flex-col items-start justify-between p-4 relative z-[2] pt-8 group-hover:text-[#e4e4e4]">
                <h3 className="text-2xl group-hover:text-[#777] text-blue-400 dark:text-slate-200">{title}</h3>
                <p className="text-xl group-hover:text-[#777] dark:text-slate-400 text-slate-600">{description}</p>
            </article>
        </div>
    )
}