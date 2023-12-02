"use client"
import { FaRegTrashCan } from 'react-icons/fa6'
import SubmitButton from '../SubmitButton'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogHeader, AlertDialogFooter } from '../ui/alert-dialog'
import { buttonVariants } from '../ui/button'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { deletePost } from '@/lib/actions'
import { toast } from '../ui/use-toast'

type Props = {
    id: number
}

export default function TakeAction({ id }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<boolean>(false)
    const pathname = usePathname()
    const router = useRouter()



    async function deletePostAction() {
        setIsPending(true)
        try {
            const res = await deletePost(id)
            if (!res.error && res.status === 200) {
                toast({
                    title: "تم",
                    description: "تم مسح المنشور بنجاح",
                    duration: 3000,
                })
                router.replace("/admin/posts")
                setOpen(false)
            }
            else {
                toast({
                    title: "للاسف",
                    description: "حدث خطأ اثناء مسح المنشور",
                    duration: 3000,
                })
            }
        } catch (err) {
            toast({
                title: "للاسف",
                description: "حدث خطأ اثناء مسح المنشور",
                duration: 3000,
            })
        }
        setIsPending(false)
    }


    return (
        !!pathname.includes("admin")&&(<div className="flex items-center gap-4">
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger className={`${buttonVariants({ variant: "destructive" })}`}>مسح <FaRegTrashCan size={15} className="mr-1" /></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader className="!text-right">
                        <AlertDialogTitle>هل انت متاكد؟</AlertDialogTitle>
                        <AlertDialogDescription>
                            هذا الفعل لا يمكن التراجع عنه.
                            هذا الفعل سيمسح المنشور بشكل نهائي من جميع خوادمنا. وقواعد البيانات بشكل نهائي.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="!justify-start">
                        <AlertDialogCancel >إلغاء</AlertDialogCancel>
                        <SubmitButton pending={isPending} fn={deletePostAction} text="تاكيد" va="destructive" className="w-auto !mr-2" />
                        {/* <AlertDialogAction className={`${buttonVariants({ variant: "destructive" })} !mr-2`}>تاكيد</AlertDialogAction> */}
                        {/* <Button formAction={deletePostAction} variant="destructive" className={`!mr-2`} >تاكيد</Button> */}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <SubmitButton text="تعديل" className="w-auto bg-green-500 hover:bg-green-700" />
            <SubmitButton text="الغاء النشر" className="w-auto bg-blue-500 hover:bg-blue-700" />
        </div>)
    )
}