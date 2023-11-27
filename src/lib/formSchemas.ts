import * as z from "zod";

export const signInFormSchema = z.object({
    email: z.string().trim().email({
        message: "Please enter a valid email.",
    }),
    password: z.string().trim().min(8, {
        message: "Password must be at least 8 characters.",
    })
})

export const signUpFormSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    role: z.enum(["Admin", "SuperAdmin"]),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    })
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
})

export type SignInFormSchema = z.infer<typeof signInFormSchema>
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>