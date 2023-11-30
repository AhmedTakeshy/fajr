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
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import {  useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { ImSpinner9 } from "react-icons/im"
import { PostFormSchema, postFormSchema } from '@/lib/formSchemas'
import { createPost } from '@/lib/actions'
import SubmitButton from '../SubmitButton'


// type Props = {
//     method: string;
//     data?: PostFormSchema;
// }

export default function PostForm() {
    const { data: session } = useSession()
    const [open, setOpen] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<boolean>(false)
    const router = useRouter()


    const formSchema = z.object({
        title: z.string().min(5, "من فضلك ادخل عنوان لا يقل عن 5 احروف"),
        content: z.string().min(10, "من فضلك ادخل محتوى لا يقل عن 10 احروف")
    })


    const form = useForm<PostFormSchema>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            title:  "",
            content: "",
        },
    })


    const SubmitAction = async (values: PostFormSchema) => {
        setIsPending(true)
        // let url = `/admin/posts/write`
        // if (method === "PUT") { url = `/api/post?id=${data?.id}`}        
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
                setOpen(false)
                form.reset()
                router.push("/admin/posts")
            }
            // if (res.status === 200) {
            //     toast({
            //         title: "تم بنجاح!",
            //         description: `تم تحديث المقال بنجاح`,
            //         duration: 3000,
            //     })
            //     router.replace(`/posts/${data?.id}`)
            // }
            setIsPending(false)
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
        
            // <Dialog open={open} onOpenChange={setOpen}>
            //     <DialogTrigger asChild>
            //         <Button variant="outline" className='w-3/4'>Write a post.</Button>
            //     </DialogTrigger>
            //     <DialogContent>
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
                                    {/* <FormField
                                        control={form.control}
                                        name="topic"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Topic</FormLabel>
                                                <FormControl>
                                                    <Input spellCheck placeholder="Maybe something creative" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>المحتوي</FormLabel>
                                                <FormControl>
                                                    <Textarea itemType="string" spellCheck={true} className='h-20' placeholder="اكتب تفاصيل المقال" {...field} />
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
                                        <SubmitButton pending={isPending} className="ml-2 text-gray-200 transition duration-500 bg-indigo-500 border border-indigo-500 hover:bg-transparent" text='انشر'/>
                                    </div>
                                </form>
                            </Form>
                        </div >
                    </div >
            //     </DialogContent>
            // </Dialog>
            // <div className='w-full mt-12 border-2 rounded-xl '>
            //     <div className="flex flex-col justify-start p-4 space-y-4 rounded-md shadow-lg ">
            //         <Form {...form}>
            //             <form className="space-y-3" onSubmit={form.handleSubmit(SubmitAction)}>
            //                 <FormField
            //                     control={form.control}
            //                     name="title"
            //                     render={({ field }) => (
            //                         <FormItem>
            //                             <FormLabel>Title</FormLabel>
            //                             <FormControl >
            //                                 <Input spellCheck placeholder="What do you feel?" {...field} />
            //                             </FormControl>
            //                             <FormMessage />
            //                         </FormItem>
            //                     )}
            //                 />
            //                 <FormField
            //                     control={form.control}
            //                     name="topic"
            //                     render={({ field }) => (
            //                         <FormItem>
            //                             <FormLabel>Topic</FormLabel>
            //                             <FormControl>
            //                                 <Input spellCheck placeholder="Maybe something create" {...field} />
            //                             </FormControl>
            //                             <FormMessage />
            //                         </FormItem>
            //                     )}
            //                 />
            //                 <FormField
            //                     control={form.control}
            //                     name="content"
            //                     render={({ field }) => (
            //                         <FormItem>
            //                             <FormLabel>Content</FormLabel>
            //                             <FormControl>
            //                                 <Textarea itemType="string" spellCheck={true} className='h-20' placeholder="A description can change the world...." {...field} />
            //                             </FormControl>
            //                             <FormMessage />
            //                         </FormItem>
            //                     )}
            //                 />
            //                 <div className="flex w-full m-2 text-gray-500">
            //                     <div className="relative inset-0 flex items-center justify-start w-2/4 gap-2 group">
            //                         <FcAddImage className="w-12 h-12 p-1 mr-2 cursor-pointer hover:text-gray-700" />
            //                         {/* <input hidden type="file" multiple onChange={changeHandler} x-ref="fileInput"/> */}
            //                         <p className='absolute transition-all duration-500 opacity-0 group-hover:opacity-100 left-10 group-hover:left-16'>Click here to upload images</p>
            //                     </div>
            //                     <div className={`ml-auto text-xs font-semibold  ${counter <= 500 ? "text-gray-400" : "text-red-500"}`}>{counter}/500</div>
            //                 </div>
            //                 <div className="flex justify-end buttons">
            //                     <Button disabled={isPending} type='submit' size="lg" className="ml-2 text-gray-200 transition duration-500 bg-green-500 border border-green-500 hover:bg-transparent">{isPending ? <ImSpinner9 className="ease-in-out animate-spin" size={25} /> : "Update"}</Button>
            //                 </div>
            //             </form>
            //         </Form>
            //     </div >
            // </div >
    )
}
