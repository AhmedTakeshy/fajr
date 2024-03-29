import * as z from "zod";


export const subscribeFormSchema = z.object({
    email: z.string().email({
        message: "من فضلك ادخل بريد الكرتوني صحيح",
    }),
})

export const signInFormSchema = z.object({
    email: z.string().trim().email({
        message: "من فضلك ادخل بريد الكرتوني صحيح",
    }),
    password: z.string().trim().min(8, {
        message: "كلمة السر يجب ان لا تقل عن 8 حروف",
    })
})

export const signUpFormSchema = z.object({
    username: z.string().min(3, {
        message: "اسم المستخدم يجب ان لا يقل عن 3 حروف",
    }),
    email: z.string().email({
        message: "من فضلك ادخل بريد الكرتوني صحيح",
    }),
    role: z.enum(["Admin", "SuperAdmin"]),
    password: z.string().min(8, {
        message: "كلمة السر يجب ان لا تقل عن 8 حروف",
    }),
    confirmPassword: z.string().min(8, {
        message: "كلمة السر يجب ان لا تقل عن 8 حروف",
    })
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "كلمة السر غير متطابقة",
})

export const postFormSchema = z.object({
    title: z.string().min(3, {
        message: "عنوان المقال يجب ان لا يقل عن 3 حروف",
    }),
    topic: z.string().optional(),
    content: z.string().min(3, {
        message: "محتوى المقال يجب ان لا يقل عن 3 حروف",
    }),
    published: z.boolean().default(true),
    
})

export const userUpdateSchema = z.object({
    id: z.number().int().positive(),
    username: z.string().min(3, { message: "اسم المستخدم يجب ان يكون اكثر من 3 احرف" }),
    email: z.string().email({ message: "البريد الالكتروني غير صحيح" }),
    role: z.enum(["Admin", "SuperAdmin"]),
})

export const passwordSchema = z.object({
    id: z.number().int().positive(),
    currentPassword: z.string().min(8, { message: "كلمة السر يجب ان تكون اكثر من 8 احرف" }),
    newPassword: z.string().min(8, { message: "كلمة السر يجب ان تكون اكثر من 8 احرف" }),
    confirmPassword: z.string().min(8, { message: "كلمة السر يجب ان تكون اكثر من 8 احرف" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "كلمة السر غير متطابقة",
})


export type SubscribeFormSchema = z.infer<typeof subscribeFormSchema>

export type SignInFormSchema = z.infer<typeof signInFormSchema>
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>

export type PostFormSchema = z.infer<typeof postFormSchema>

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>
export type PasswordSchema = z.infer<typeof passwordSchema>