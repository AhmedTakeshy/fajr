import PostDetails from '@/components/PostDetails'
import { getPostById, getPosts } from '@/_actions/postActions'
import { Metadata } from 'next'


type Props = {
  params: { id: string }

}


export async function generateStaticParams() {
  const posts = await getPosts({ page: 1 })

  return posts.map((post) => ({
    id: `${post.publicId.slice(0, 10) + post.id + post.publicId.slice(-11)}`,
  }))
}


export async function generateMetadata({ params }: Props) {
  const { id } = params
  const postId = id.slice(10, -11)
  const post = await getPostById(parseInt(postId))
  const metadata: Metadata = {
    title: `${post?.title} | شركة فجر بغداد`,
    description: post?.content,
  }
  return metadata

}

export default async function postId({ params }: Props) {
  const { id } = params;
  const postId = id.slice(10, -11)
  const post = await getPostById(parseInt(postId))
  return (
    <div className='container flex flex-col items-center justify-center mx-auto my-12'>
      <PostDetails updatedAt={post?.updatedAt.toISOString()} id={post?.id!} title={post?.title!} description={post?.content!} topic={post.topic || ""}/>
    </div>
  )
}
