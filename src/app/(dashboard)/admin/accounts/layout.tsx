import { getPosts } from "@/_actions/postActions"
import {  getUsers } from "@/_actions/userActions"
import { SignUpForm } from "@/components/dashboard/SignupForm"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllSubscribers } from "@/lib/actions"
import { authOptions } from "@/lib/auth"
import { formattedDate } from "@/lib/helpers"
import { getServerSession } from "next-auth"
import DeleteUser from "@/components/dashboard/DeleteUser"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { RxCrossCircled } from "react-icons/rx"


type Props = {
  children: React.ReactNode
}

export default async function UsersTable({ children }: Props) {
  const users: User[] = await getUsers()
  const posts: Post[] = await getPosts()

  const session = await getServerSession(authOptions)
  const sessionUser = session?.user
  const subscribedUsers = await getAllSubscribers()

  return (
    <section className="container flex flex-col items-center justify-center gap-8 my-20 ">
      {sessionUser?.role === "SuperAdmin" ? <SignUpForm /> : null}
      {children}
      <div className="flex flex-col items-center w-full mt-20 text-3xl font-extrabold">
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
            {users.map((user: User) => {
              const delAuthorized = sessionUser?.role === "SuperAdmin" && session?.user?.email !== user.email
              return (
                <TableRow
                  key={user.id}
                  // className={parseInt(userId!) === user.id ? "bg-muted/50" : ""}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{posts.filter((post) => post.authorId === user.id).length}</TableCell>
                  <TableCell className="flex flex-row items-center justify-end gap-4">
                    {/* <Link href="/admin/accounts/" >
                      <RxCrossCircled size={25} className="transition-colors duration-300 hover:text-yellow-500" />
                    </Link> */}
                    <Button asChild className="bg-green-500 hover:bg-green-700" >
                      <Link href={`/admin/accounts/${user.id}`}>تعديل</Link>
                    </Button>
                    {!!delAuthorized && <DeleteUser email={user.email} userId={user.id} />}
                  </TableCell>
                </TableRow>
              )
            }
            )}
          </TableBody>
        </Table>
      </div>
      {subscribedUsers.length > 0 && (
        <div className="flex-col items-center justify-center w-full my-20 fle ">
          <h1 className="self-start mb-8 text-3xl font-extrabold">اشتراك الحسابات</h1>
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
