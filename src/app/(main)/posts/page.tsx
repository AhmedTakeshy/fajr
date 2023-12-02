import PostItem from "@/components/PostItem";
import { getPosts } from "@/lib/actions";


export default async function page() {
    const posts: Post[] = await getPosts();
    return (
        <div className="container grid gap-10 mx-auto my-20 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-center place-content-center">
            {posts.map(post => <PostItem key={post.id} id={post.id} publicId={post.publicId} title={post.title} description={post.content} updatedAt={post.updatedAt} />)}
        </div>
    )
}
