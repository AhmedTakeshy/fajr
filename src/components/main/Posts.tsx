import { MotionSection } from "@/lib/motionDev";
import { fadeIn } from "@/lib/variants";
import PostItem from "../PostItem";
import { getPosts } from '@/_actions/postActions'
import { Button } from "../ui/button";
import Link from "next/link";




export default async function Posts() {
  const { posts } = await getPosts({ pageNumber: 1 });

  return (
    <MotionSection
      id="jobs"
      variants={fadeIn("up", 0.5)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.7 }}
      className='container flex flex-col items-start justify-center my-10'>
      {posts.length > 0 ? <h1 className='my-10 font-bold text-7xl'>الوظائف</h1> : <p className='my-10 text-5xl font-bold'>قريبا ستم نشر الوظائف</p>}
      <div className="grid gap-10 mb-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-start">
        {posts
          .map(post => !!post.published &&
            <PostItem
              key={post.id}
              topic={post.topic || ""}
              id={post.id}
              publicId={post.publicId}
              title={post.title}
              description={post.content}
              updatedAt={post.updatedAt}
            />)
          .slice(0, 8)
        }
      </div>
      <Button asChild variant="link" className="text-xl">
        <Link href={{ pathname: "/posts", query: { page: "1" } }}>المزيد من الوظائف</Link>
      </Button>
    </MotionSection>
  )
}
