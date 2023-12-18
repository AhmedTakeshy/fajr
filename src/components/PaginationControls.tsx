"use client"

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

type Props = {
    pageNumber: string
    metadata: {
        hasNext: boolean,
        totalPages: number,
    }
}

export default function PaginationControls({ metadata,pageNumber }: Props) {

    const currentPage = parseInt(pageNumber)
    console.log(metadata.hasNext)


    return (
        <div className='flex items-center justify-center gap-2 my-8'>
            <Button asChild={currentPage > 1} variant="outline" className={`rounded-md ${currentPage === 1 ? "bg-accent text-accent-foreground":""}`} disabled={currentPage <= 1}>
                <Link href={{pathname:"/posts",query:{page:currentPage > 1?currentPage- 1:null}}}>
                    السابق
                </Link>
            </Button>
            {Array.from({ length: metadata.totalPages }, (_, i) => i + 1).map(page => (
                <Button asChild variant="outline" className={`rounded-md ${currentPage === page ? "bg-accent text-accent-foreground":""}`} key={page}>
                    <Link href={{pathname:"/posts",query:{page:page}}}>
                        {page}
                    </Link>
                </Button>
            ))}
            <Button asChild={metadata.hasNext} variant="outline" className={`rounded-md ${currentPage === metadata.totalPages? "bg-accent text-accent-foreground":""}`} disabled={!metadata.hasNext}>
                <Link href={{ pathname: "/posts", query: { page: currentPage < metadata.totalPages ? currentPage + 1 : null } }}>
                    التالي
                </Link>
            </Button>
        </div>
    )
}