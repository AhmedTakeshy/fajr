"use client"
import { FaRegTrashCan } from 'react-icons/fa6'
import { buttonVariants } from "@/components/ui/button"
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
import { useRouter } from 'next/navigation'


type Props = {
    userId: number
    email: string
}


export default function DeleteUser({ userId,email }: Props) {
    const [isPending, setIsPending] = useState<{ delete: boolean, edit: boolean }>({ delete: false, edit: false })
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()

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
                router.push('/admin/accounts/')
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


    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className={`${buttonVariants({ variant: "destructive" })}`}>مسح <FaRegTrashCan size={15} className="mr-1" /></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="!text-right">
                    <AlertDialogTitle>هل انت متاكد؟</AlertDialogTitle>
                    <AlertDialogDescription>
                        هذا الفعل لا يمكن التراجع عنه.
                        هذا الفعل سيمسح هذا الحساب <span className='text-white underline'>{email}</span> بشكل نهائي من جميع خوادمنا. وقواعد البيانات بشكل نهائي.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="!justify-start">
                    <AlertDialogCancel >إلغاء</AlertDialogCancel>
                    <SubmitButton pending={isPending.delete} fn={deleteAccountAction} text="تاكيد" va="destructive" className="w-auto !mr-2" />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}