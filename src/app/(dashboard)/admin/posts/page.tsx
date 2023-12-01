import JobItem from '@/components/main/PostItem'
import { Button } from '@/components/ui/button'
import { getPosts } from '@/lib/actions'
import { PostFormSchema } from '@/lib/formSchemas'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'


export default async function Posts() {
    const posts = await getPosts()
    return (
        <div className="container grid gap-8 my-12 text-3xl font-extrabold place-items-start ">
            <Button size="lg" asChild variant="outline">
                <Link href="/admin/posts/write" className='inline-flex items-center'>
                    اكتب مقال <FiEdit size={20} className="mr-2" /></Link> 
            </Button>
        <div className="grid gap-10 mt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-center">
            {posts.map((post) => (
                <JobItem key={post.id} publicId={post.publicId} id={post.id} title={post.title} description={post.content!} />
            ))}
        </div>
        </div>
    )
}
