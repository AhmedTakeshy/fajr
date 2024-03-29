"use client"
import Link from 'next/link'
import { MdArrowRightAlt } from 'react-icons/md'
import { usePathname } from 'next/navigation'

type Props = {
    publicId: string
    id:number
}

export default function RoutingLink({ publicId, id }: Props) {
    const url = usePathname()
  return (
    <>
      <Link href={{ pathname: `${url.includes("admin/posts") ? "" : url.includes("admin") ? "admin/":""}posts/${publicId.slice(0, 10) + id + publicId.slice(-11)}` }} className="flex items-center justify-between w-full px-5 py-3 text-xl text-right text-white rounded-b-lg dark:hover:text-cyan-400 group hover:text-sky-800">
              المزيد
              <MdArrowRightAlt size={30} className="transition-transform duration-500 rotate-180 group-hover:-translate-x-4" />
          </Link>
    </>
  )
}
