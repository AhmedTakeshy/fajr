"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
import { ImSpinner9 } from "react-icons/im"
import { signInAction } from "@/lib/actions"
import { useFormStatus } from "react-dom"
import { SignInFormSchema, signInFormSchema } from "@/lib/formSchemas"




export function SignInForm() {

    const {pending} = useFormStatus()
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

    async function signIn(formData: FormData) {
        try {
            const data = {
                email: formData.get("email"),
                password: formData.get("password")
            }
            const result = await signInFormSchema.safeParseAsync(data)
            if (!result.success) {
                // toast({
                //     title: "للاسف",
                //     description: "هناك شيئا خاطئ مع البريد الالكتروني او كلمة المرور",
                //     duration: 5000,
                // })
                return
            }
            const res = await signInAction(result.data)
            if (!res?.error && res?.status === 200) {
                toast({
                    title: "مرحبا بك",
                    description: "تم تسجيل الدخول بنجاح",
                    duration: 5000,
                })
                router.replace("/admin")
            } else {
                toast({
                    title: "للاسف",
                    description: "هناك شيئا خاطئ مع البريد الالكتروني او كلمة المرور",
                    duration: 5000,
                })
            }
        } catch (error) {
            toast({
                title: "للاسف",
                description: "هناك شيئا خاطئ مع البريد الالكتروني او كلمة المرور",
                duration: 5000,
            })
        }
    }

    return (
        <Form {...form} >
            <div className="w-full p-4 mb-4 space-y-2 border-2 rounded-md max-sm:max-w-xs border-slate-800 dark:border-slate-400">
                <form action={signIn} className="">
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
                    <Button disabled={pending} type="submit" className="w-full !mt-4">{pending ? <ImSpinner9 className="ease-in-out animate-spin" size={25} /> : "تسجيل الدخول"}</Button>
                </form>
            </div>
        </Form>
    )
}
