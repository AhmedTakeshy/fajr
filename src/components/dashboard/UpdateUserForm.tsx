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
import { SignUpFormSchema, signUpFormSchema } from "@/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import SubmitButton from "../SubmitButton";

type Props = {
    user: User
}

export default function UpdateUserForm({ user }: Props) {


    const [isPending, setIsPending] = useState(false)
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
            username: user.name || "",
            email: user.email || "",
            oldPassword: "",
            password: "",
            confirmPassword: "",
            role: user.role || "Admin",
        },
    })

    async function updateUserAction(data: any) {
        try {
            console.log("submitting")
            setIsPending(true)
            console.log("🚀 ~ file: UpdateUserForm.tsx:56 ~ updateUserAction ~ data", data)
            // const res = await updateUser(data)
            // if (res) {
            //     router.push("/admin/accounts")
            // }
            setIsPending(false)
        } catch (error) {
            console.error(error)
        }
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
                    <CardContent className="space-y-2">
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(updateUserAction)}>
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>أسم المستخدم</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} value={field.value} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>البريد الالكتروني</FormLabel>
                                            <FormControl>
                                                <Input type="email" {...field} value={field.value} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
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
                                <Button type="submit">حفظ</Button>
                                {/* <SubmitButton className="w-auto" pending={isPending} text="حفظ" /> */}
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
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
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
