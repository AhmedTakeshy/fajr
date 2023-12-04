import { MotionSection } from "@/lib/motionDev";
import { fadeIn } from "@/lib/variants";
import PostItem from "../PostItem";
import { getPosts } from "@/lib/actions";

export default async function Posts() {
  const posts:Post[] = await getPosts();

  return (
    <MotionSection id="jobs" variants={fadeIn("up", 0.5)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.7 }}
      className='container flex flex-col items-start justify-center my-10'>
      <h1 className='my-10 font-bold text-7xl'>الوظائف</h1>
      <div className="grid gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-center">
        {posts.map(post => !!post.published&&<PostItem key={post.id} id={post.id} publicId={post.publicId} title={post.title} description={post.content} updatedAt={post.updatedAt} />)}
      </div>
    </MotionSection>
  )
}
