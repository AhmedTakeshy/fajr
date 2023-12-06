import { getPosts } from "@/_actions/postActions"
import { getUsers } from "@/_actions/userActions"
import { SignUpForm } from "@/components/dashboard/SignupForm"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllSubscribers } from "@/lib/actions"
import { authOptions } from "@/lib/auth"
import { formattedDate } from "@/lib/helpers"
import { getServerSession } from "next-auth"




export default async function UsersTable() {
  const users: User[] = await getUsers()
  const posts: Post[] = await getPosts()
  const session = await getServerSession(authOptions)
  const user: ExtendedUser = session?.user
  const subscribedUsers = await getAllSubscribers()

  return (
    <section className="container flex flex-col items-center justify-center gap-8 my-20 ">
      {user?.role === "SuperAdmin" ? <SignUpForm /> : null}
      <div className="w-full flex flex-col items-center text-3xl font-extrabold ">
        <Table dir="rtl">
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">الاسم</TableHead>
              <TableHead className="text-right">البريد الالكتروني</TableHead>
              <TableHead className="text-right">Role</TableHead>
              <TableHead className="text-right">عدد المقالات</TableHead>
              <TableHead className="text-right">اختيارات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const postUser = posts.filter(post => post.authorId === user.id)
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{postUser.length}</TableCell>
                  <TableCell >{user.publicId}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
     {subscribedUsers.length > 0&& (<div className="w-full fle flex-col justify-center items-center my-20 ">
        <h1 className="text-3xl font-extrabold self-start mb-8">الحسابات المشتركة</h1>
        <Table dir="rtl">
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">البريد الالكتروني</TableHead>
              <TableHead className="text-right">متي تم الاشتراك</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribedUsers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell>{subscriber.id}</TableCell>
                <TableCell className="font-medium">{subscriber.email}</TableCell>
                <TableCell>{formattedDate(subscriber.createdAt.toISOString())}</TableCell>
              </TableRow>
            )
            )}
          </TableBody>
        </Table>
      </div>)}
    </section>
  )
}
