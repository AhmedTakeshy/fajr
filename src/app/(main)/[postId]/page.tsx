import PostDetails from '@/components/PostDetails'
import { getPostById, getPosts } from '@/lib/actions'
import { Metadata } from 'next'

type Props = {
  params:{
    postId:number
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    postId: post.id.toString(),
  }))
}


export async function generateMetaData({ params }: Props) {
  const { postId } = params
  
  const post = await getPostById(Number(postId))
  const metadata: Metadata = {
    title: post?.title,
    description: post?.content,
    keywords: `${post?.title}هذا المقال عن`,
  }
  return metadata
  
}

export default async function postId({params}:Props) {
  const { postId } = params
  const post = await getPostById(Number(postId))
  return (
    <div className='flex flex-col justify-center items-center my-12'>
      <PostDetails id={post?.id!} title={post?.title!} description={post?.content!} />
    </div>
  )
}
