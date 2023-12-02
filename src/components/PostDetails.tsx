import { formattedDate } from "@/lib/helpers";
import Image from "next/image"
import React from "react";
import TakeAction from "./dashboard/TakeAction";


type Props = {
    id: number
    publicId?: string
    img?: string
    title: string
    topic?: string
    description: string
    authorName?: string
    updatedAt?: string
}

export default function PostDetails({ img, title, description, authorName, updatedAt, id, topic,publicId }: Props) {
    const newDate = formattedDate(updatedAt!)

    return (
        <React.Fragment key={id}>
            <div className="p-4 dark:bg-slate-700 bg-slate-300 md:p-8 rounded-xl">
                {!!img && (<Image
                    width={551}
                    height={320}
                    alt={`post image`}
                    className="object-cover object-center mx-auto rounded-lg h-80"
                    src={img}
                />)}
                <p className="mt-2 text-base font-semibold text-indigo-500">{topic}</p>
                <h1
                    className="mt-1 text-xl font-semibold text-gray-900 capitalize truncate dark:text-gray-400"
                >
                    {title}
                </h1>
                <div className="max-w-full">
                    <p className="mt-1 text-base font-medium tracking-wide dark:text-gray-100 text-slate-800">
                        {description}
                    </p>
                </div>
                <div className="flex flex-col items-start justify-start gap-2 mt-20">
                    <TakeAction id={id} publicId={publicId}/>
                    <div className="flex flex-col justify-start">
                        {!!authorName && <p className="text-sm font-semibold text-gray-900 dark:text-gray-400">{authorName}</p>}
                        {!!updatedAt && <p className="text-xs font-semibold text-gray-500">
                            اخر تحديث: {newDate}
                        </p>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}