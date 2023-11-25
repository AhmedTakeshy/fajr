"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from 'next/image'
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
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ImSpinner9 } from "react-icons/im"



const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })
})
export function SignInForm() {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter()
    const { toast } = useToast()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        const signInData = await signIn("credentials", {
            redirect: false,
            email: values.email.toLowerCase(),
            password: values.password,
        })
        if (signInData?.status === 200) {
            toast({
                title: "Welcome back!",
                description: "You have successfully logged in.",
                duration: 3000,
            })
            setIsSubmitting(false)
            router.refresh()
            router.replace("/")
        }
        if (signInData?.status === 401) {
            toast({
                title: "Oops!",
                description: "Email or password is incorrect.",
                variant: "destructive",
                duration: 3000,
            })
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form} >
            <div className="w-full p-4 mb-4 space-y-2 border-2 rounded-md max-sm:max-w-xs border-slate-800 dark:border-slate-400">
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="*******" {...field} type={`${showPassword ? "text" : "password"}`} />
                                        {showPassword ?
                                            <PiEyeBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`}
                                                onClick={() => setShowPassword(false)} /> :
                                            <PiEyeClosedBold
                                                className={`hover:cursor-pointer absolute right-[10%] bottom-[28%]`} onClick={() => setShowPassword(true)} />
                                        }
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full !mt-4">{isSubmitting ? <ImSpinner9 className="ease-in-out animate-spin" size={25} /> : "Sign In"}</Button>
                </form>
            </div>
        </Form>
    )
}
