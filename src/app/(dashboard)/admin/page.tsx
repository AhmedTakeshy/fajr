import { getPosts } from '@/lib/actions'
import PostForm from '@/components/dashboard/PostForm'
import PostItem from '@/components/PostItem'


export default async function Admin() {
  const posts = await getPosts()
  return (
    <>
    <div className="!container flex flex-col items-center my-20 text-3xl font-extrabold ">
      <PostForm type='new'/>
    </div>
      <div className="container grid gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-center">
        {posts.map(post => <PostItem key={post.id} id={post.id} publicId={post.publicId} title={post.title} description={post.content} updatedAt={post.updatedAt} />)}
      </div>
    </>
  )
}
