import { MotionArticle } from '@/lib/motionDev'
import Link from 'next/link'
import Image from 'next/image'
import { MdArrowRightAlt } from 'react-icons/md'
import { formattedDate } from '@/lib/helpers';

type JobProps = {
    title: string;
    topic?: string;
    description: string;
    img?:string;
    updatedAt?: Date;
    publicId:string;
};

export default function PostItem({ title, description, img, updatedAt, publicId,topic }: JobProps) {
    console.log("🚀 ~ file: PostItem.tsx:16 ~ PostItem ~ publicId:", publicId)
    const newDate = formattedDate(updatedAt?.toDateString()!)
    return (
        <MotionArticle
            whileHover={{
                y: -12,
                transition: { stiffness: 200, type: "spring", ease: "backInOut" },
            }}
            className="flex flex-col items-start justify-between rounded-lg shadow-md dark:bg-sky-950 bg-slate-300">
            {!!img&&<Image src={img} alt={`blog image`} width={255} height={163.2} className="w-full rounded-t-lg" />}
            <div className="px-4 py-8 border-b border-slate-700">
                <h3 className="mb-2 text-2xl dark:text-slate-200 text-slate-400">{title}</h3>
                <p className="mt-2 text-base font-semibold text-indigo-500">{topic}</p>
                <p className="text-xl line-clamp-6 dark:text-slate-500 text-slate-700">{description}</p>
            </div>
            <Link href={{href:"/post",query:`${publicId}`}} className="flex items-center justify-between w-full px-5 py-3 text-xl text-right text-white rounded-b-lg dark:hover:text-cyan-400 group hover:text-sky-800">
                المزيد
                <MdArrowRightAlt size={30} className="transition-transform duration-500 rotate-180 group-hover:-translate-x-4" />
            </Link>
            {!!updatedAt &&(<span>{newDate}</span>)}
        </MotionArticle>
    )
}
