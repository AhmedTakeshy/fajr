import JobItem from '@/components/main/JobItem'
import { getPosts } from '@/lib/actions'


export default async function Posts() {
    const posts = await getPosts()
    return (
        <div className="grid gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 place-items-center">
            <JobItem id={1} title="مطور ويب" description="الآن، كان أبحرت من نانتوكيت في البداية من على خط الموسم على اساس. لا المسعى ممكن داخل المستودع." img="/images/cat-01.jpg" />
        </div>
    )
}
