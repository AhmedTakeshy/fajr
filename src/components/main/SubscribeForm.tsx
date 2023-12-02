"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { subscribe } from "@/lib/actions";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { SubscribeFormSchema, subscribeFormSchema } from "@/lib/formSchemas";
import { useToast } from "../ui/use-toast";
import SubmitButton from "../SubmitButton";

const formSchema = z.object({
    email: z.string().email({
        message: "من فضلك ادخل بريد الكرتوني صحيح",
    }),
})

export default function SubscribeForm() {
    const {toast} = useToast()

    const form = useForm<SubscribeFormSchema>({
        resolver: zodResolver(subscribeFormSchema),
        defaultValues: {
            email: "",
        },
    })

    async function handleSubmit(data: SubscribeFormSchema) {
        const result = await subscribeFormSchema.safeParseAsync(data)
        if (!result.success) {
            toast({
                title: "حدث خطأ",
                description: "من فضلك ادخل بريد الكرتوني صحيح",
                duration: 3000,
            })
            return
        }
        const res = await subscribe(result.data)
        if (!res?.error && res?.status === 201) {
            toast({
                title: "تم الاشتراك",
                description: "تم اشتراكك بنجاح",
                duration: 3000,
            })
            form.reset()
        } else {
            toast({
                title: "حدث خطأ",
                description: "من فضلك ادخل بريد الكرتوني صحيح",
                duration: 3000,
            })
        }
    }
   
return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} method="get" className="flex flex-col items-center justify-center gap-2">
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
            <SubmitButton className="w-auto"  sz="lg" text="اشتراك"/>
        </form>
    </Form>
)
}
