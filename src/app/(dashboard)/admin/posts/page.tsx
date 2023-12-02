import PostItem from '@/components/PostItem'
import PostForm from '@/components/dashboard/PostForm'
import { Button } from '@/components/ui/button'
import { getPosts } from '@/lib/actions'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'


export default async function Posts() {
    const posts:Post[] = await getPosts()
    return (
    <div className="container grid gap-8 my-20 text-3xl font-extrabold place-items-start ">
            <PostForm type='new' />
        <div className="grid gap-10 mt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-center">
            {posts.map((post) => (
                <PostItem updatedAt={post.updatedAt} key={post.id} publicId={post.publicId} id={post.id} title={post.title} description={post.content!} />
            ))}
        </div>
    </div>
    )
}
