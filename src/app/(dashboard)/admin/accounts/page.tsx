import { getPosts } from "@/_actions/postActions"
import { getUsers } from "@/_actions/userActions"
import { SignUpForm } from "@/components/dashboard/SignupForm"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllSubscribers } from "@/lib/actions"
import { authOptions } from "@/lib/auth"
import { formattedDate } from "@/lib/helpers"
import { getServerSession } from "next-auth"
import Link from "next/link"
import EditAccountsForm from "@/components/dashboard/EditAccountsForm"


type Props = {
  params?: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function UsersTable({ params, searchParams }: Props) {
  const userId = searchParams?.id
  const users: User[] = await getUsers()
  const posts: Post[] = await getPosts()
  const session = await getServerSession(authOptions)
  const sessionUser: ExtendedUser = session?.user
  const subscribedUsers = await getAllSubscribers()

  return (
    <section className="container flex flex-col items-center justify-center gap-8 my-20 ">
      {sessionUser?.role === "SuperAdmin" ? <SignUpForm /> : null}
      <div className="w-full flex flex-col items-center text-3xl font-extrabold ">
        <Table dir="rtl">
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">الاسم</TableHead>
              <TableHead className="text-right">البريد الالكتروني</TableHead>
              <TableHead className="text-right">الصلاحيات</TableHead>
              <TableHead className="text-right">عدد المقالات</TableHead>
              {sessionUser?.role === "SuperAdmin" && <TableHead className="text-left">اجراءات</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            <EditAccountsForm userId={Number(userId)} users={users} posts={posts}/>
          </TableBody>
        </Table>
      </div>
      {subscribedUsers.length > 0 && (<div className="w-full fle flex-col justify-center items-center my-20 ">
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
