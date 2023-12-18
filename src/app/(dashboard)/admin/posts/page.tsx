import PostItem from '@/components/PostItem'
import PostForm from '@/components/dashboard/PostForm'
import { getPosts } from '@/_actions/postActions'
import PaginationControls from '@/components/PaginationControls'

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Posts({ searchParams }: Props) {
    console.log("🚀 ~ file: page.tsx:11 ~ Posts ~ searchParams:", searchParams)
    const { posts } = await getPosts({ pageNumber: 1 })
    
    return (
    <div className="container grid gap-8 my-20 text-3xl font-extrabold place-items-start ">
            <PostForm type='new' />
        <div className="grid gap-10 mt-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-start">
            {posts.map((post) => (
                <PostItem updatedAt={post.updatedAt} key={post.id} publicId={post.publicId} id={post.id} title={post.title} description={post.content!} topic={post.topic || ""}/>
            ))}
        </div>
        {/* <PaginationControls /> */}
    </div>
    )
}
