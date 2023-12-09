import PostForm from '@/components/dashboard/PostForm'
import { getPostById } from '@/_actions/postActions'

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
