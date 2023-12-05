"use server"
import { SubscribeFormSchema, subscribeFormSchema } from "./formSchemas";
import { prisma } from "./prisma";

export const subscribe = async (values:SubscribeFormSchema) => {
    const result = await subscribeFormSchema.safeParseAsync(values)
    if (!result.success) {
        return { error: true, message: "خطأ في البيانات المدخلة", status: 401 }
    }
    const { email } = result.data
    const existedEmail = await prisma.emailNewsletterSubscription.findUnique({
        where: {
            email,
        }
    })
    if (existedEmail) {
        return { error: true, message: "تم التسجيل بهذا الحساب بالفعل", status: 409 }
    }
    if (!existedEmail) {
        await prisma.emailNewsletterSubscription.create({
            data: {
                email: email.toLowerCase(),
            }
        })
        return { error: false, message: "تم التسجيل بنجاح", status: 201 }
    }
}