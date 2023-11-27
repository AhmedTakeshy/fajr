"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { useRouter } from "next/navigation"
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { ChangeEvent, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ImSpinner9 } from "react-icons/im"
import { SignUpFormSchema, signUpFormSchema } from "@/lib/formSchemas"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useFormStatus } from "react-dom"




export function SignUpForm() {
    const { toast } = useToast()

    const [showPassword, setShowPassword] = useState<{ password: boolean, confirmPassword: boolean }>
        ({
            password: false,
            confirmPassword: false
        });
    const {pending} = useFormStatus()
    const router = useRouter()



    const form = useForm<SignUpFormSchema>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "Admin",
        },
    })


    async function signUp(formData: FormData) {
        const data = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            role: formData.get("role"),
        }

        console.log(data)

    }
    return (
        <Form {...form} >
            <div className="w-full max-sm:max-w-xs p-4 mb-4  border-2 rounded-md border-slate-800 dark:border-slate-400">
                <form action={signUp} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>أسم المستخدم</FormLabel>
                                <FormControl>
                                    <Input placeholder="محمد احمد" {...field} />
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
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="الصلاحيات" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">جزئي الصلاحيات</SelectItem>
                                            <SelectItem value="super">كامل الصلاحيات</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={pending} type="submit" className="w-full !mt-4">{pending ? <ImSpinner9 className="ease-in-out animate-spin" size={25} /> : "إنشاء حساب"}</Button>
                </form>
            </div>
        </Form>
    )
}
