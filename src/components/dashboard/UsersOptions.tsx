"use client"
import Link from 'next/link'
import { FaRegTrashCan } from 'react-icons/fa6'
import { RxCrossCircled } from 'react-icons/rx'
import { Button, buttonVariants } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import SubmitButton from '../SubmitButton'
import {
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel
} from "@/components/ui/alert-dialog"
import { deleteUser } from '@/_actions/userActions'
import { toast } from "@/components/ui/use-toast"
import { useSession } from 'next-auth/react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'
import { SignUpForm } from './SignupForm'


type Props = {
    userId: number
    users: User[]
    posts: Post[]
    user?: User
}


export default function UsersTable({ userId, users, posts,user}: Props) {
    const [isPending, setIsPending] = useState<{ delete: boolean, edit: boolean }>({ delete: false, edit: false })
    const [open, setOpen] = useState<boolean>(false)
    const { data: session } = useSession()
    const sessionUser: ExtendedUser = session?.user
    const [editMode, setEditMode] = useState<boolean>(false)
    const [showForm, setShowForm] = useState<boolean>(false)

    const deleteAccountAction = async () => {
        setIsPending(prev => ({ ...prev, delete: true }))
        try {
            const res = await deleteUser(userId)
            if (!res.error && res.status === 200) {
                toast({
                    title: "تم",
                    description: res?.message,
                    duration: 3000,
                })
                setOpen(false)
            }
            else {
                toast({
                    title: "للاسف",
                    description: "حدث خطأ اثناء مسح الحساب",
                    duration: 3000,
                })
            }
        } catch (err) {
            toast({
                title: "للاسف",
                description: "حدث خطأ اثناء مسح الحساب",
                duration: 3000,
            })
        }
        setIsPending(prev => ({ ...prev, delete: false }))
    }

    // the userId need to be updated every time the user click on edit button

    return (
        <>
            <div className="flex flex-col items-center w-full text-3xl font-extrabold mb-20">
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
                            const loginUser = sessionUser?.role === "SuperAdmin" && session?.user?.email !== user.email;
                            return (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{posts.filter((post) => post.authorId === user.id).length}</TableCell>
                                    {loginUser && (
                                        <TableCell className="flex flex-row items-center justify-end gap-4"> {
                                                userId === user.id  ?
                                                    <>
                                                    <Link href="/admin/accounts/" onClick={() => setShowForm(false)}>
                                                            <RxCrossCircled size={25} className="transition-colors duration-300 hover:text-yellow-500" />
                                                        </Link>
                                                        <SubmitButton text='تعديل' fn={()=> setShowForm(true)} className="bg-green-500 hover:bg-green-700"/>
                                                        <AlertDialog open={open} onOpenChange={setOpen}>
                                                            <AlertDialogTrigger className={`${buttonVariants({ variant: "destructive" })}`}>مسح <FaRegTrashCan size={15} className="mr-1" /></AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader className="!text-right">
                                                                    <AlertDialogTitle>هل انت متاكد؟</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        هذا الفعل لا يمكن التراجع عنه.
                                                                        هذا الفعل سيمسح الحساب بشكل نهائي من جميع خوادمنا. وقواعد البيانات بشكل نهائي.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter className="!justify-start">
                                                                    <AlertDialogCancel >إلغاء</AlertDialogCancel>
                                                                    <SubmitButton pending={isPending.delete} fn={deleteAccountAction} text="تاكيد" va="destructive" className="w-auto !mr-2" />
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </>
                                                    :
                                                <Button  asChild>
                                                    <Link href={{ pathname: `/admin/accounts/` , query:{id:user.id}}}>اجراء تعديلات</Link>
                                                </Button>
                                            }
                                        </TableCell>
                                    )}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            {showForm && (<SignUpForm type='edit' userData={user} />)}
        </>
        
    )
}