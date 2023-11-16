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
        <div dir='ltr' className='before:h-full before:absolute relative before:w-[calc(100%-4.5rem)] before:rounded-xl before:bg-gray-300 before:dark:bg-sky-800 grid grid-cols-[auto,minmax(18.75rem,1fr)] pt-16'>
            <div  className="flex flex-col items-center justify-center gap-6 p-4 text-right">
                <LiaFacebookF size={25} />
                <LiaTwitter size={25} />
                <LiaLinkedinIn size={25} />
            </div>
            <Image src={img} alt={`blog image`} width={300} height={300} className=" max-w-[300px] max-h-[300px] -translate-x-40 rounded-lg" />
            <article  className="flex flex-col items-end justify-between p-4">
                <h3 className="text-2xl dark:text-slate-200 text-slate-400">{title}</h3>
                <p className="text-xl dark:text-slate-500 text-slate-700">{description}</p>
            </article>
        </div>
    )
}