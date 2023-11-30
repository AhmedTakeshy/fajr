import PostDetails from '@/components/PostDetails'
import { getPostById, getPosts } from '@/lib/actions'
import { Metadata } from 'next'

 type Props = {
   params: { id: string }
   searchParams: { [key: string]: string | string[] | undefined }
 }


export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    postId: post.id.toString(),
  }))
}


export async function generateMetaData({ params,searchParams }: Props) {
  console.log("🚀 ~ file: page.tsx:21 ~ generateMetaData ~ params:", params)
  console.log("🚀 ~ file: page.tsx:21 ~ generateMetaData ~ searchParams:", searchParams)
  
  
  const post = await getPostById(BigInt(postId))
  const metadata: Metadata = {
    title: post?.title,
    description: post?.content,
    keywords: `${post?.title}هذا المقال عن`,
  }
  return metadata
  
}

export default async function postId({params}:Props) {
  const { postId } = params
  const post = await getPostById(BigInt(postId))
  return (
    <div className='flex flex-col items-center justify-center my-12'>
      <PostDetails id={post?.id!} title={post?.title!} description={post?.content!} />
    </div>
  )
}
