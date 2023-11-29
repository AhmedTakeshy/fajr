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
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { SignInFormSchema, signInFormSchema } from "@/lib/formSchemas"
import SubmitButton from "../SubmitButton"
import { signIn } from "next-auth/react"




export function SignInForm() {

    const [isPending, setIsPending] = useState<boolean>(false) 
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter()
    const { toast } = useToast()


    const form = useForm<SignInFormSchema>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function signInCredentials(data: SignInFormSchema) {
        setIsPending(true)
        try {
            const result = await signInFormSchema.safeParseAsync(data)
            if (!result.success) {
                toast({
                    title: "للاسف",
                    description: "هناك شيئا خاطئ مع البريد الالكتروني او كلمة المرور",
                    duration: 5000,
                    variant: "destructive"
                })
                return
            }
            const values = result.data
            const signInData = await signIn("credentials", {
                redirect: false,
                email: values.email.toLowerCase(),
                password: values.password,
            })
            if (signInData?.status === 200) {
                toast({
                    title: "مرحبا بك",
                    description: "تم تسجيل الدخول بنجاح",
                    duration: 5000,
                    
                })
                router.replace("/admin")
            } else {
                console.log("🚀 ~ file: SignInForm.tsx:61 ~ signInCredentials ~ signInData:", signInData)
                toast({
                    title: "للاسف",
                    description: "هناك شيئا خاطئ مع البريد الالكتروني او كلمة المرور",
                    duration: 5000,
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "للاسف",
                description: "خطأ في تسجيل الدخول",
                duration: 5000,
                variant: "destructive"
            })
        }
        setIsPending(false)
    }

    return (
        <Form {...form} >
            <div className="w-full p-4 mb-4 space-y-2 border-2 rounded-md max-sm:max-w-xs border-slate-800 dark:border-slate-400">
                <form onSubmit={form.handleSubmit(signInCredentials)} className="">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>البريد الالكتروني</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@email.com" {...field} />
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
                                        <Input placeholder="*******" {...field} type={`${showPassword ? "text" : "password"}`} />
                                        {showPassword ?
                                            <PiEyeBold
                                                className={`hover:cursor-pointer absolute left-[10%] bottom-[28%]`}
                                                onClick={() => setShowPassword(false)} /> :
                                            <PiEyeClosedBold
                                                className={`hover:cursor-pointer absolute left-[10%] bottom-[28%]`} onClick={() => setShowPassword(true)} />
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitButton text="تسجيل الدخول" pending={isPending} />
                </form>
            </div>
        </Form>
    )
}
