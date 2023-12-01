"use client"
import { FcAddImage } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import {  useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import {  ChangeEvent, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from '../ui/use-toast'
import { usePathname, useRouter } from 'next/navigation'
import { PostFormSchema, postFormSchema } from '@/lib/formSchemas'
import { createPost } from '@/lib/actions'
import SubmitButton from '../SubmitButton'


// type Props = {
//     method: string;
//     data?: PostFormSchema;
// }

export default function PostForm() {
    const { data: session } = useSession()
    const [isPending, setIsPending] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()
    const pathname= usePathname()

    const autoResizeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e) {
            e.target.style.height = 'auto';
            e.target.style.width = 'auto';
            if (e.target.scrollHeight >= 716){
                e.target.style.width = `${e.target.scrollWidth}px`
            } else {
                e.target.style.height = `${e.target.scrollHeight}px`;
            }
        }
    };

    const form = useForm<PostFormSchema>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            title:  "",
            topic: "",
            content: "",
        },
    })


    const SubmitAction = async (values: PostFormSchema) => {
        setIsPending(true)     
        try {
            const result = await postFormSchema.safeParseAsync(values)
            if (!result.success) {
                toast({
                    title: "للاسف!",
                    description: "من فضلك ادخل البيانات بشكل صحيح",
                    duration: 3000,
                    variant: "destructive",
                })
                return
            }
            const res = await createPost(values, session?.user?.email!)
            if (res.status === 201 ) {
                toast({
                    title: "تم بنجاح!",
                    description: `تم انشاء المقال بنجاح`,
                    duration: 3000,
                })
                router.push("/admin/posts")
                form.reset()
            }
        } catch (error) {
            toast({
                title: "Oops!",
                description: "Something went wrong, please try again later.",
                duration: 3000,
                variant: "destructive",
            })
            setIsPending(false)
        }
    }
    return (
        pathname === "/admin" ? (
        <Dialog open={open} onOpenChange={()=>{setOpen(prev=> !prev); form.reset()}}>
            <DialogTrigger asChild>
                <Button size="lg" className='w-2/4 h-12 p-1 animate-animateBorder rounded-lg bg-gradient-to-tr from-[#00FFA3] to-[#DC1FFF] bg-[length:_400%_400%]'>
                    <span className={`bg-slate-900 w-full h-full rounded text-gray-200 inline-flex items-center justify-center `}>اكتب مقال</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className='w-full max-w-screen-md border-2 rounded-xl'>
                    <div className="flex flex-col justify-start p-4 space-y-4 rounded-md shadow-lg ">
                        <Form {...form}>
                            <form className="space-y-3" onSubmit={form.handleSubmit(SubmitAction)}>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>العنوان</FormLabel>
                                            <FormControl >
                                                <Input spellCheck placeholder="عنوان المقال" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="topic"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>الموضوع</FormLabel>
                                            <FormControl>
                                                <Input spellCheck placeholder="ما هو الموضوع اليوم؟؟" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>المحتوي</FormLabel>
                                            <FormControl>
                                                <Textarea itemType="string" spellCheck={true} className='min-h-[5rem] resize-none overflow-hidden break-all whitespace-pre-line' placeholder="اكتب تفاصيل المقال" {...field} onChange={(e) => { field.onChange(e); autoResizeTextarea(e) }} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex w-full m-2 text-gray-500">
                                    <div className="relative inset-0 flex items-center justify-start w-2/4 gap-2 group">
                                        <FcAddImage className="w-12 h-12 p-1 mr-2 cursor-pointer hover:text-gray-700" />
                                        {/* <input hidden type="file" multiple onChange={changeHandler} x-ref="fileInput"/> */}
                                        <p className='absolute transition-all duration-500 opacity-0 group-hover:opacity-100 left-10 group-hover:left-16'>اضغط هنا لاضافة صورة</p>
                                    </div>
                                </div>
                                <div className="flex justify-end buttons">
                                    <SubmitButton pending={isPending} className="ml-2 text-gray-200 transition duration-500 bg-indigo-500 border border-indigo-500 hover:bg-transparent" text='انشر' />
                                </div>
                            </form>
                        </Form>
                    </div >
                </div >
            </DialogContent>
        </Dialog>
        ) : (
        <div className='w-full max-w-screen-md border-2 rounded-xl'>
            <div className="flex flex-col justify-start p-4 space-y-4 rounded-md shadow-lg ">
                <Form {...form}>
                    <form className="space-y-3" onSubmit={form.handleSubmit(SubmitAction)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>العنوان</FormLabel>
                                    <FormControl >
                                        <Input spellCheck placeholder="عنوان المقال" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الموضوع</FormLabel>
                                    <FormControl>
                                        <Input spellCheck placeholder="ما هو الموضوع اليوم؟؟" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>المحتوي</FormLabel>
                                    <FormControl>
                                        <Textarea itemType="string" spellCheck={true} className='min-h-[5rem] resize-none overflow-hidden break-all whitespace-pre-line' placeholder="اكتب تفاصيل المقال" {...field} onChange={(e) => { field.onChange(e); autoResizeTextarea(e) }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex w-full m-2 text-gray-500">
                            <div className="relative inset-0 flex items-center justify-start w-2/4 gap-2 group">
                                <FcAddImage className="w-12 h-12 p-1 mr-2 cursor-pointer hover:text-gray-700" />
                                {/* <input hidden type="file" multiple onChange={changeHandler} x-ref="fileInput"/> */}
                                <p className='absolute transition-all duration-500 opacity-0 group-hover:opacity-100 left-10 group-hover:left-16'>اضغط هنا لاضافة صورة</p>
                            </div>
                        </div>
                        <div className="flex justify-end buttons">
                            <SubmitButton pending={isPending} className="ml-2 text-gray-200 transition duration-500 bg-indigo-500 border border-indigo-500 hover:bg-transparent" text='انشر' />
                        </div>
                    </form>
                </Form>
            </div >
        </div >
        )     
    )
}
