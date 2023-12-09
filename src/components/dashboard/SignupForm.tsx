"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { SignUpFormSchema, signUpFormSchema } from "@/lib/formSchemas"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SubmitButton from "../SubmitButton"
import { signUp } from "@/_actions/userActions"
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog"
import { LuUserPlus } from "react-icons/lu"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export function SignUpForm() {
    const { toast } = useToast()
    const [isPending, setIsPending] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<{
        password: boolean,
        confirmPassword: boolean
    }>
        ({
            password: false,
            confirmPassword: false,
        })
    const router = useRouter()
    const form = useForm<SignUpFormSchema>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            username: "",
            email:  "",
            password: "",
            confirmPassword: "",
            role: "Admin",
        },
    })

    async function signUpAction(data: SignUpFormSchema) {
        setIsPending(true)
        try {
            const result = await signUpFormSchema.safeParseAsync(data)
            if (!result.success) {
                toast({
                    title: "للاسف",
                    description: "هناك شيئا خاطئ مع ادخال البيانات",
                    duration: 5000,
                    variant: "destructive"
                })
                return
            }

                const res = await signUp(result.data)
            
            if (!res?.error && res?.status === 201 ) {
                toast({
                    title: "مرحبا بك",
                    description: res?.message,
                    duration: 5000,
                })
                form.reset()
                router.replace("/admin/accounts/")
                setOpen(false)
            } else {
                toast({
                    title: "للاسف",
                    description: res?.message,
                    duration: 5000,
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "للاسف",
                description: "هناك شيئا خاطئ لم يتم إنشاء الحساب",
                duration: 5000,
                variant: "destructive"
            })
        }
        setIsPending(false)
    }
    return (
            <Dialog open={open} onOpenChange={() => { setOpen(prev => !prev); }}>
                <DialogTrigger asChild className="self-start">
                    <Button size="lg" className=' h-12 p-1 animate-animateBorder rounded-lg bg-gradient-to-tr from-[#00FFA3] to-[#DC1FFF] bg-[length:_400%_400%]'>
                        <span className={`dark:bg-slate-900 bg-gray-300 w-full h-full rounded dark:text-gray-200 text-slate-800 inline-flex items-center justify-center p-1`}>انشء حساب جديد<LuUserPlus size={20} className="mr-2" /></span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="flex items-center justify-center w-full max-w-lg">
                    <Form {...form} >
                        <div className='w-full max-w-screen-md border-2 rounded-xl'>
                            <div className="flex flex-col justify-start p-4 space-y-4 rounded-md shadow-lg ">
                                <form
                                    onSubmit={form.handleSubmit(signUpAction)}
                                    className="space-y-3"
                                    >
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>أسم المستخدم</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="محمد احمد" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>البريد الالكتروني</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="example@email.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>كلمة السر</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input placeholder="*******" {...field} type={`${showPassword.password ? "text" : "password"}`} />
                                                        {showPassword.password ?
                                                            <PiEyeBold
                                                                className={`hover:cursor-pointer absolute left-[10%] bottom-[28%]`}
                                                                onClick={() => setShowPassword(prevState => ({ ...prevState, password: false }))} /> :
                                                            <PiEyeClosedBold
                                                                className={`hover:cursor-pointer absolute left-[10%] bottom-[28%]`} onClick={() => setShowPassword(prevState => ({ ...prevState, password: true }))} />
                                                        }
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>تاكيد كلمة السر</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input placeholder="*******" {...field} type={`${showPassword.confirmPassword ? "text" : "password"}`} />
                                                        {showPassword.confirmPassword ?
                                                            <PiEyeBold
                                                                className={`hover:cursor-pointer absolute left-[10%] bottom-[28%]`}
                                                                onClick={() => setShowPassword(prevState => ({ ...prevState, confirmPassword: false }))} /> :
                                                            <PiEyeClosedBold
                                                                className={`hover:cursor-pointer absolute left-[10%] bottom-[28%]`} onClick={() => setShowPassword(prevState => ({ ...prevState, confirmPassword: true }))} />}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem className="!mt-4">
                                                <FormControl>
                                                    <Select {...field} onValueChange={field.onChange} value={field.value}>
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
                                    <SubmitButton pending={isPending} text="إنشاء حساب" />
                                </form>
                            </div>
                        </div>
                    </Form>
                </DialogContent>
            </Dialog>
    )
}
