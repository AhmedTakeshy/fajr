"use client";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { PasswordSchema, SignUpFormSchema, UserUpdateSchema, passwordSchema, signUpFormSchema, userUpdateSchema } from "@/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import SubmitButton from "../SubmitButton";
import * as z from "zod";
import { toast } from "../ui/use-toast";
import { updatePassword, updateUser } from "@/_actions/userActions";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

type Props = {
    user: User
}

export default function UpdateUserForm({ user }: Props) {


    const [isPending, setIsPending] = useState<{ userBtn: boolean, passwordBtn: boolean }>({ userBtn: false, passwordBtn: false })
    const [showPassword, setShowPassword] = useState<{
        newPassword: boolean,
        confirmPassword: boolean,
        currentPassword: boolean,
    }>
        ({
            newPassword: false,
            confirmPassword: false,
            currentPassword: false,
        })

    const router = useRouter()


    const userUpdateForm = useForm<UserUpdateSchema>({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            id: user.id,
            username: user.name || "",
            email: user.email || "",
            role: user.role || "Admin",
        },
    })



    const passwordForm = useForm<PasswordSchema>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            id: user.id,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    async function updateUserAction(data: UserUpdateSchema) {
        setIsPending(prev => ({ ...prev, userBtn: true }))
        try {
            const result = await userUpdateSchema.safeParseAsync(data)
            if (!result.success) {
                toast({
                    title: "خطأ",
                    description: "الرجاء التأكد من البيانات المدخلة",
                    duration: 3000,
                    variant: "destructive",
                })
                return
            }
            const res = await updateUser(result.data)
            if (!res.error && res.status === 200) {
                toast({
                    title: "تم تحديث الحساب",
                    description: res.message,
                    duration: 3000,
                })
                router.replace("/admin/accounts")
            } else {
                toast({
                    title: "خطأ",
                    description: res.message,
                    duration: 3000,
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error(error)
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء تحديث الحساب",
                duration: 3000,
                variant: "destructive",
            })
        }
        setIsPending(prev => ({ ...prev, userBtn: false }))
    }


    async function changePassword(data: PasswordSchema) {
        setIsPending(prev => ({ ...prev, passwordBtn: true }))
        try {
            const result = await passwordSchema.safeParseAsync(data)
            if (!result.success) {
                toast({
                    title: "خطأ",
                    description: "الرجاء التأكد من البيانات المدخلة",
                    duration: 3000,
                    variant: "destructive",
                })
                return
            }
            const res = await updatePassword(result.data)
            if (!res.error && res.status === 200) {
                toast({
                    title: "تم تحديث كلمة السر",
                    description: res.message,
                    duration: 3000,
                })
                router.replace("/admin/accounts")
            } else {
                toast({
                    title: "خطأ",
                    description: res.message,
                    duration: 3000,
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error(error)
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء تحديث كلمة السر",
                duration: 3000,
                variant: "destructive",
            })
        }
        setIsPending(prev => ({ ...prev, passwordBtn: false }))
    }

    return (
        <Tabs defaultValue="account" className="w-[400px]" dir="rtl">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">الحساب</TabsTrigger>
                <TabsTrigger value="password">كلمة السر</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>الحساب</CardTitle>
                        <CardDescription>
                            يمكنك تغيير اسم المستخدم والبريد الالكتروني من هنا.
                            <br />
                            اضغط حفظ بعد الانتهاء.
                        </CardDescription>
                    </CardHeader>
                    <Form {...userUpdateForm} >
                        <form onSubmit={userUpdateForm.handleSubmit(updateUserAction)}>
                            <CardContent className="space-y-2">
                                <FormField
                                    control={userUpdateForm.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>أسم المستخدم</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={userUpdateForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>البريد الالكتروني</FormLabel>
                                            <FormControl>
                                                <Input type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={userUpdateForm.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormControl>
                                                <Select {...field} onValueChange={field.onChange}>
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
                            </CardContent>
                            <CardFooter>
                                <SubmitButton className="w-auto" pending={isPending.userBtn} text="حفظ" />
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>كلمة السر</CardTitle>
                        <CardDescription>
                            يمكنك تغيير كلمة السر من هنا.
                            <br />
                            اضغط حفظ بعد الانتهاء.
                        </CardDescription>
                    </CardHeader>
                    <Form {...passwordForm} >
                        <form onSubmit={passwordForm.handleSubmit(changePassword)}>
                            <CardContent className="space-y-2">
                                <FormField
                                    control={passwordForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>كلمة السر</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input placeholder="*******" {...field} type={`${showPassword.currentPassword ? "text" : "password"}`} />
                                                    {showPassword.currentPassword ?
                                                        <PiEyeBold
                                                            className={`hover:cursor-pointer absolute left-[10%] bottom-[28%]`}
                                                            onClick={() => setShowPassword(prevState => ({ ...prevState, currentPassword: false }))} /> :
                                                        <PiEyeClosedBold
                                                            className={`hover:cursor-pointer absolute left-[10%] bottom-[28%]`} onClick={() => setShowPassword(prevState => ({ ...prevState, currentPassword: true }))} />
                                                    }
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={passwordForm.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>كلمة السر الجديدة</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input placeholder="*******" {...field} type={`${showPassword.newPassword ? "text" : "password"}`} />
                                                    {showPassword.newPassword ?
                                                        <PiEyeBold
                                                            className={`hover:cursor-pointer absolute left-[10%] bottom-[28%]`}
                                                            onClick={() => setShowPassword(prevState => ({ ...prevState, newPassword: false }))} /> :
                                                        <PiEyeClosedBold
                                                            className={`hover:cursor-pointer absolute left-[10%] bottom-[28%]`} onClick={() => setShowPassword(prevState => ({ ...prevState, newPassword: true }))} />
                                                    }
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={passwordForm.control}
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
                            </CardContent>
                            <CardFooter>
                                <SubmitButton className="w-auto" pending={isPending.passwordBtn} text="حفظ" />
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
