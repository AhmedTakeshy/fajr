"use server"
import { signIn } from "next-auth/react";
import { SignInFormSchema, SignUpFormSchema, signInFormSchema, signUpFormSchema } from "./formSchemas";
import { prisma } from "./prisma";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";

export const subscribe = async (formData: FormData) => {
    const email = formData.get("email");
    console.log(email);
}


// sign-in
export async function signInAction(values: SignInFormSchema) {
    try {
        const result = await signInFormSchema.safeParseAsync(values)
        if (!result.success) {
            return { error: true, message: "خطأ في البيانات المدخلة", status: 401 }
        }
        const signInData = await signIn("credentials", {
            redirect: false,
            email: values.email.toLowerCase(),
            password: values.password,
        })
        if (signInData?.status === 200) {
            return { error: false, message: "تم تسجيل الدخول بنجاح", status: 200 }
        }

        if (signInData?.status === 401) {
            return { error: true, message: "خطأ في تسجيل الدخول", status: 401 }
        }
    } catch (error) {
        console.log(error);
        return { error: true, message: "خطأ في تسجيل الدخول", status: 401 }
    }
}

// sign-up
export async function signUpAction(values: SignUpFormSchema) {
    try {
        const result = await signUpFormSchema.safeParseAsync(values)
        if (!result.success) {
            return { error: true, message: "خطأ في البيانات المدخلة", status: 401 }
        }
        const { username, email, password, role} = result.data
        const existedUserEmail = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        const existedUserUsername = await prisma.user.findUnique({
            where: {
                name: username,
            }
        })
        if (existedUserEmail) {
            return { error: true, message: "يوجد مستخدم مع هذا الحساب بالفعل", status: 409 }
        }
        if (existedUserUsername) {
            return { error: true, message: "يوجد مستخدم مع هذا الاسم بالفعل", status: 409 }
        }
        const hashedPassword = await hash(password, 10)
        if (!existedUserEmail && !existedUserUsername) {
            const user = await prisma.user.create({
                data: {
                    name: username,
                    email: email.toLowerCase(),
                    password: hashedPassword,
                    role,
                }
            })
            const { email: userEmail } = user
            revalidatePath("/admin/accounts")
            return { error: false, message: `لفد تم إنشاء حساب بنجاح بهذا البريد الالكتروني  ${userEmail}`, status: 201 }
        }
    } catch (error) {
        console.log(error);
        return { error: true, message: "هناك شيئا خاطئ لم يتم إنشاء الحساب", status: 401 }
    }

}
