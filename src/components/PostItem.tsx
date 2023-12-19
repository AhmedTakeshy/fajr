import { MotionArticle } from '@/lib/motionDev'
import Image from 'next/image'
import { formattedDate } from '@/lib/helpers';
import RoutingLink from './RoutingLink';

type JobProps = {
    id:number;
    title: string;
    topic?: string;
    description: string;
    img?:string;
    updatedAt?: Date;
    publicId:string;
};

export default function PostItem({ title, description, img, updatedAt, publicId,topic,id }: JobProps) {
    const newDate = formattedDate(updatedAt?.toISOString()!)    
    return (
        <MotionArticle
            whileHover={{
                y: -12,
                transition: { stiffness: 200, type: "spring", ease: "backInOut" },
            }}
            className="flex flex-col items-start justify-between rounded-lg shadow-md dark:bg-sky-950 bg-slate-300">
            {!!img&&<Image src={img} alt={`blog image`} width={255} height={163.2} className="w-full rounded-t-lg" />}
            <div className="h-full min-h-[13.5rem] px-4 py-8 border-b  border-slate-700">
                <h3 className="mb-2 text-2xl font-medium text-black dark:text-white">{title}</h3>
                <p className="mt-2 text-base font-semibold text-indigo-500">{topic}</p>
                <p className="text-xl line-clamp-3 dark:text-slate-200 text-slate-700">{description}</p>
            </div>
            <RoutingLink publicId={publicId} id={id} />
            {!!updatedAt && (<span className='px-5 pb-1 text-sm text-slate-500'>اخر تحديث: {newDate} </span>)}
        </MotionArticle>
    )
}
