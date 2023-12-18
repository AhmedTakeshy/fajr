import PostDetails from '@/components/PostDetails';
import { getPostById, getPosts } from '@/_actions/postActions';
import { getUserById } from '@/_actions/userActions';


type Props = {
    params: { id: string }
}

export async function generateStaticParams() {
    const posts = await getPosts()

    return posts.map((post) => ({
        id: `${post.publicId.slice(0, 10) + post.id + post.publicId.slice(-11)}`,
    }))
}

export default async function postId({ params }: Props) {
    
    const { id } = params;
    const postId = id.slice(10, -11)
    const post = await getPostById(parseInt(postId))
    const user = await getUserById(post?.authorId!)
    return (
        <div className='container flex flex-col items-center justify-center mx-auto my-12'>
            <PostDetails 
            publicId={id} 
            authorName={user?.name} 
            key={post?.id} 
            updatedAt={post?.updatedAt.toISOString()} 
            id={post?.id!}
            title={post?.title!}
            topic={post?.topic || ""}
            description={post?.content!} />
        </div>
    )
}
