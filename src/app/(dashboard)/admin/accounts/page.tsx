import { getPosts } from "@/_actions/postActions"
import { getUsers } from "@/_actions/userActions"
import { SignUpForm } from "@/components/dashboard/SignupForm"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"




export default async function UsersTable() {
  const users:User[] =  await getUsers()
  const posts:Post[] = await getPosts()
  return (
    <div className="container grid gap-8 my-20 text-3xl font-extrabold place-items-start ">
      <SignUpForm />
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
            return (<TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{postUser.length}</TableCell>
              <TableCell >{user.publicId}</TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </div>
  )
}
