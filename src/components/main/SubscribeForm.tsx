"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { subscribe } from "@/lib/actions";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

const formSchema = z.object({
    email: z.string().email({
        message: "من فضلك ادخل حساب الكرتوني صحيح",
    }),
})

export default function SubscribeForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
   
return (
    <Form {...form}>
        <form action={subscribe} method="get" className="flex flex-col items-center justify-center gap-2">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input dir="ltr" placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button size="lg" className="" >اشترك</Button>
        </form>
    </Form>
)
}
