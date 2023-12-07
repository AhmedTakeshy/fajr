import { getPosts } from "@/_actions/postActions"
import { getUsers } from "@/_actions/userActions"
import { SignUpForm } from "@/components/dashboard/SignupForm"
import DataTable from "@/components/dashboard/UsersTable"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllSubscribers } from "@/lib/actions"
import { authOptions } from "@/lib/auth"
import { formattedDate } from "@/lib/helpers"
import { getServerSession } from "next-auth"
import {columns} from "@/components/dashboard/Columns"





type Props = {
  searchParams?: { [key: string]: string | undefined }
}

export default async function UsersTable({ searchParams }: Props) {
  const userId = searchParams?.id
  const users:User[] = await getUsers()
  const posts: Post[] = await getPosts()

  const session = await getServerSession(authOptions)
  const sessionUser: ExtendedUser = session?.user
  const subscribedUsers = await getAllSubscribers()

  return (
    <section className="container flex flex-col items-center justify-center gap-8 my-20 ">
      {sessionUser?.role === "SuperAdmin" ? <SignUpForm /> : null}
      <div className="flex flex-col items-center w-full text-3xl font-extrabold ">
        {/* <UsersTable users={users} posts={posts} userId={userId} /> */}
        <DataTable data={users} columns={columns} props={{userId,posts}} />
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
