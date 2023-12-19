import { getPosts } from "@/_actions/postActions";
import PaginationControls from "@/components/PaginationControls";
import PostItem from "@/components/PostItem";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function page({searchParams}: Props) {
    const page = searchParams.page as string || "1";
    const { posts, metadata } = await getPosts({ pageNumber: parseInt(page), url: "/posts" });


    return (
        <section className="container flex flex-col items-center justify-start">
            <div className="grid gap-10 mx-auto my-20 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-start place-content-center">
                {posts.map(post => !!post.published &&
                    <PostItem
                        key={post.id}
                        id={post.id}
                        publicId={post.publicId}
                        title={post.title}
                        topic={post.topic || ""}
                        description={post.content}
                        updatedAt={post.updatedAt}
                    />)}
            </div>
            <PaginationControls metadata={metadata} pageNumber={page} />
        </section>
    )
}


