import { getPosts } from '@/_actions/postActions'
import PostForm from '@/components/dashboard/PostForm'
import PostItem from '@/components/PostItem'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}
export default async function Admin({ searchParams }: Props) {
  const page = searchParams.page as string || "1";
  const { posts } = await getPosts({ pageNumber: parseInt(page) });
  return (
    <>
      <div className="!container flex flex-col items-center my-20 text-3xl font-extrabold gap-20">
        <PostForm type='new' />
        <div className="container grid gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-start">
          {posts
            .map(post =>
              <PostItem
                key={post.id}
                id={post.id}
                publicId={post.publicId}
                title={post.title}
                description={post.content}
                updatedAt={post.updatedAt}
              />)
            .slice(0, 8)
          }
        </div>
        <Button asChild variant="link" className="self-start text-xl ">
          <Link href={{ pathname: "/admin/posts", query: { page: "1" } }}>المزيد من الوظائف</Link>
        </Button>
      </div>
    </>
  )
}
