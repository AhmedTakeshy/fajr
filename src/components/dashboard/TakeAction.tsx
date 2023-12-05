"use client"
import { FaRegTrashCan } from 'react-icons/fa6'
import SubmitButton from '../SubmitButton'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogHeader, AlertDialogFooter } from '../ui/alert-dialog'
import { Button, buttonVariants } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { deletePost, unPublishPost } from '@/_actions/postActions'
import { toast } from '../ui/use-toast'
import Link from 'next/link'

type Props = {
    id: number
    publicId?: string
}

export default function TakeAction({ id, publicId }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<{
        delete: boolean,
        unPublish: boolean,
        edit: boolean
    }>({
        delete: false,
        unPublish: false,
        edit: false
    })
    const pathname = usePathname()
    const router = useRouter()



    async function deletePostAction() {
        setIsPending(prev => ({ ...prev, delete: true }))
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
        setIsPending(prev => ({ ...prev, delete: false }))
    }

    async function unPublishPostAction() {
        setIsPending(prev => ({ ...prev, unPublish: true }))
        try {
            const res = await unPublishPost(id)
            if (!res.error && res.status === 200) {
                toast({
                    title: "تم",
                    description: "تم إلغاء نشر المقال بنجاح",
                    duration: 3000,
                })
                router.replace("/admin/posts")
                setOpen(false)
            }
            else {
                toast({
                    title: "للاسف",
                    description: "حدث خطأ اثناء إلغاء نشر المقال بنجاح",
                    duration: 3000,
                })
            }
        } catch (err) {
            toast({
                title: "للاسف",
                description: "حدث خطأ اثناء إلغاء نشر المقال بنجاح",
                duration: 3000,
            })
        }
        setIsPending(prev => ({ ...prev, unPublish: false }))
    }


    return (
        !!pathname.includes("admin") && (<div className="flex items-center gap-4">
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
                        <SubmitButton pending={isPending.delete} fn={deletePostAction} text="تاكيد" va="destructive" className="w-auto !mr-2" />
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Button asChild className='bg-green-500 hover:bg-green-700'>
                <Link href={`/admin/posts/${publicId}/edit`} >تعديل</Link>
            </Button>
            <SubmitButton pending={isPending.unPublish} fn={unPublishPostAction} text="الغاء النشر" className="w-auto bg-blue-500 hover:bg-blue-700" />
            <Button asChild>
                <Link href="." className='bg-yellow-500 hover:bg-yellow-700'>الغاء</Link>
            </Button>
        </div>)
    )
}