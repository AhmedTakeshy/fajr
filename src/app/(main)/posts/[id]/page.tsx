import PostDetails from '@/components/PostDetails'
import { getPostById, getPosts } from '@/lib/actions'
import { Metadata } from 'next'

type Props = {
  params: { id: string }

}


export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    id: `${post.publicId.slice(0, 10) + post.id + post.publicId.slice(10, 22)}`,
  }))
}


export async function generateMetadata({ params }: Props) {
  const { id } = params
  const postId = id.slice(10, 11)
  const post = await getPostById(BigInt(postId))
  const metadata: Metadata = {
    title: `${post?.title} | شركة فجر بغداد`,
    description: post?.content,
    keywords: post?.topic?.split(" ") ? post?.topic.split(" ") : post?.content.split(" "),
  }
  return metadata

}

export default async function postId({ params }: Props) {
  const { id } = params;
  const postId = id.slice(10, 11)
  const post = await getPostById(BigInt(+postId!))
  return (
    <div className='container flex flex-col items-center justify-center mx-auto my-12'>
      <PostDetails publicId={post?.publicId!} title={post?.title!} description={post?.content!} />
    </div>
  )
}
