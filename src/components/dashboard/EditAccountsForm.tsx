"use client"
import Link from 'next/link'
import { FaRegTrashCan } from 'react-icons/fa6'
import { RxCrossCircled } from 'react-icons/rx'
import { Button, buttonVariants } from "@/components/ui/button"
import { useState } from 'react'
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
import { TableRow, TableCell } from "@/components/ui/table"
import { useSession } from 'next-auth/react'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import * as z from "zod";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"


type Props = {
    userId: number
    users: User[]
    posts: Post[]
}

export const formSchema = z.object({
    username: z.string().min(3, { message: "يجب ان يكون الاسم اكثر من 3 حروف" }),
    email: z.string().email({ message: "يجب ان يكون البريد الالكتروني صحيح" }),
    role: z.enum(["Admin", "SuperAdmin"]),
})

export default function EditAccountsForm({ userId, users, posts }: Props) {
    const [isPending, setIsPending] = useState<{ delete: boolean, edit: boolean }>({ delete: false, edit: false })
    const [open, setOpen] = useState<boolean>(false)
    const [viewOnly, setViewOnly] = useState<boolean>(true)
    const { data: session } = useSession()
    const sessionUser: ExtendedUser = session?.user

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            role: "Admin",
        },
    })

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

    const editAccountAction = async (values: z.infer<typeof formSchema>) => {
        setViewOnly(prev => !prev)
    }

    return (
        !!users && users.map((user: User) => {
            const postUser = posts.filter(post => post.authorId === user.id)
            const authorized = sessionUser?.role === "SuperAdmin" && session?.user?.email !== user.email;
            return (
                <TableRow key={user.id}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(editAccountAction)}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell className="font-medium">
                                {viewOnly ? user.name : (
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="text" {...field} onChange={(e) => field.onChange(e)} value={user.name} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </TableCell>
                            <TableCell>
                                {viewOnly ? user.email : (
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="text" {...field} onChange={(e) => field.onChange(e)} value={user.email} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </TableCell>
                            <TableCell>
                                {viewOnly ? user.role : (
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem className="!mt-4">
                                                <FormControl>
                                                    <Select {...field} onValueChange={field.onChange} value={field.value} defaultValue={user.role}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="الصلاحيات" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Admin">جزئي الصلاحيات</SelectItem>
                                                            <SelectItem value="SuperAdmin">كامل الصلاحيات</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </TableCell>
                            <TableCell>{postUser.length}</TableCell>
                            {
                                authorized && <TableCell className="flex items-center justify-end gap-2">
                                    {
                                        Number(userId) === user.id ?
                                            <>
                                                <Link href="/admin/accounts/">
                                                    <RxCrossCircled size={25} className="hover:text-yellow-500 transition-colors duration-300" />
                                                </Link>
                                                <SubmitButton className="bg-green-500 hover:bg-green-700" text='تعديل' pending={isPending.edit} />
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
                                            <Button asChild>
                                                <Link href={{ pathname: `/admin/accounts/`, query: { id: user.id } }}>
                                                    اجراء تعديلات
                                                </Link>
                                            </Button>
                                    }
                                </TableCell>
                            }
                        </form>
                    </Form>
                </TableRow>
            )
        })
    )
}