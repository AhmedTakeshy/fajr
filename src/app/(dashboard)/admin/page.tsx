import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { getPosts } from '@/lib/actions'


export default async function Admin() {
  const posts = await getPosts()
  return (
    <div className="!container grid sm:grid-cols-2 place-items-center gap-8 mt-12 text-3xl font-extrabold ">
      <Button size="lg" className='w-2/4 h-12 p-1 animate-animateBorder rounded-xl bg-gradient-to-tr from-[#00FFA3] to-[#DC1FFF] bg-[length:_400%_400%]'>
        <Link href="/posts" className={`bg-slate-900 w-full h-full rounded-lg text-gray-200 inline-flex items-center justify-center `}>منشورات</Link>
        
      </Button>
      <Button size="lg" className='w-2/4 h-12 p-1 rounded-xl bg-gradient-to-r to-[#00FFA3] from-[#DC1FFF] bg-[length:_400%_400%]'>
        <Link href="/accounts" className={`bg-slate-900 w-full h-full rounded-lg text-gray-200 inline-flex items-center justify-center`}>حسابات</Link>
      </Button>
    </div>
  )
}
