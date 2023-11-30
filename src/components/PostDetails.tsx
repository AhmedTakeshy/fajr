import { formattedDate } from "@/lib/helpers";
import Image from "next/image"
import React from "react";

type Props = {
    publicId: string
    img?: string
    title: string
    topic?: string
    description: string
    author?: {
        name: string
    }
    updatedAt?: string
}

export default function PostDetails({ img, title, description, author, updatedAt, publicId, topic }: Props) {
    const newDate  = formattedDate(updatedAt!)
    return (
        <React.Fragment key={publicId}>
            <div className="p-4 dark:bg-slate-700 bg-slate-300 md:p-8 rounded-xl">
                <Image
                width={551}
                height={320}
                alt={`post image`}
                    className="object-cover object-center w-full rounded-lg h-80"
                    src="https://images.unsplash.com/photo-1603349206295-dde20617cb6a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                />
                <p className="mt-2 text-base font-semibold text-indigo-500">{topic}</p>
                <h1
                    className="mt-1 text-xl font-semibold leading-none text-gray-900 capitalize truncate dark:text-gray-400"
                >
                    {title}
                </h1>
                <div className="max-w-full">
                    <p className="mt-1 text-base font-medium tracking-wide dark:text-gray-100 text-slate-800">
                        {description}
                    </p>
                </div>
                <div className="flex items-center mt-20 space-x-2">
                    <div>
                        {!!author&&<p className="font-semibold text-gray-900 dark:text-gray-400">{author?.name}</p>}
                        {!!updatedAt&&<p className="text-sm font-semibold text-gray-500">
                            {newDate} &middot; 6 min read
                        </p>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}