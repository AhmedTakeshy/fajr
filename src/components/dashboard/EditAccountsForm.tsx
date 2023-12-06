"use client"
import Link from 'next/link'
import { FaRegTrashCan } from 'react-icons/fa6'
import { RxCrossCircled } from 'react-icons/rx'
import { buttonVariants } from '../ui/button'
import { useState } from 'react'
import SubmitButton from '../SubmitButton'
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from '../ui/alert-dialog'
import { deleteUser } from '@/_actions/userActions'
import { toast } from '../ui/use-toast'

type Props = {
    userId: number
}

export default function EditAccountsForm({ userId }: Props) {
    const [isPending, setIsPending] = useState<{ delete: boolean, edit: boolean }>({ delete: false, edit: false })
    const [open, setOpen] = useState<boolean>(false)

    const deleteAccountAction = async () => {
        setIsPending(prev => ({...prev, delete: true}))
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
        setIsPending(prev => ({...prev, delete: false}))
    }
    return (
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
    )
}