import PostForm from '@/components/dashboard/PostForm'
import { getPostById, getPosts } from '@/_actions/postActions'
import { prisma } from '@/lib/prisma'



export async function generateStaticParams() {
  const posts = await prisma.post.findMany({where:{published:true}})

  return posts.map((post) => ({
    id: `${post.publicId.slice(0, 10) + post.id + post.publicId.slice(-11)}`,
  }))
}


type Props = {
  params: {id: string}
}

export default async function page({ params}: Props) {
  const { id } = params
  const postId = id.slice(10, 11)
  const post = await getPostById(Number(postId))
  return (
    <div className="flex justify-center mt-12 max-w-[51rem] w-full mx-auto">
      <PostForm id={Number(postId)} type='edit' data={{title:post?.title!, topic:post?.topic!, published:post?.published!, content:post?.content!}} />
    </div>
  )
}
