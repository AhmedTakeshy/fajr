"use server"
import { PasswordSchema, SignUpFormSchema, UserUpdateSchema, passwordSchema, signUpFormSchema, userUpdateSchema } from "@/lib/formSchemas"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import bcrypt, { hash } from "bcrypt";

export async function signUp(values: SignUpFormSchema) {
    try {
        const result = await signUpFormSchema.safeParseAsync(values)
        if (!result.success) {
            return { error: true, message: "خطأ في البيانات المدخلة", status: 401 }
        }
        const { username, email, password, role } = result.data
        const existedUserEmail = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        if (existedUserEmail) {
            return { error: true, message: "يوجد مستخدم مع هذا الحساب بالفعل", status: 409 }
        }
        const hashedPassword = await hash(password, 10)
        if (!existedUserEmail) {
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

export async function getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            publicId: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }
    })
    return users
}


export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user
}
export async function getUserById(id: number):Promise<User> {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user as User
}

export async function deleteUser(id: number) {
    try {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
        revalidatePath("/admin/accounts")
        return { error: false, message: "تم حذف الحساب بنجاح", status: 200 }
    } catch (error) {
        console.log(error);
        return { error: true, message: "هناك شيئا خاطئ لم يتم حذف الحساب", status: 401 }
    }
}

export async function updateUser(values: UserUpdateSchema) {
    try {
        const result = await userUpdateSchema.safeParseAsync(values)
        if (!result.success) {
            return { error: true, message: "خطأ في البيانات المدخلة", status: 401 }
        }
        const { username, email, id, role } = result.data
        const res = await prisma.user.update({
            where: {
                id,
            },
            data: {
                name: username,
                email,
                role
            }
        })
            revalidatePath("/admin/accounts")
            return { error: false, message: `لفد تم تعديل بيانات الحساب بنجاح `, status: 200 }
    } catch (error) {
        console.log(error);
        return { error: true, message: "هناك شيئا خاطئ لم يتم تعديل الحساب", status: 401 }
    }
}

export async function updatePassword(values: PasswordSchema){
    try {
        const result = await passwordSchema.safeParseAsync(values)
        if (!result.success) {
            return { error: true, message: "خطأ في البيانات المدخلة", status: 401 }
        }
        const { currentPassword, newPassword, id } = result.data
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        const isMatch = await bcrypt.compare(currentPassword, user?.password!)
        if (!isMatch) {
            return { error: true, message: "كلمة السر الحالية غير صحيحة", status: 401 }
        }
        const hashedPassword = await hash(newPassword, 10)
        await prisma.user.update({
            where: {
                id
            },
            data: {
                password: hashedPassword
            }
        })
        revalidatePath("/admin/accounts")
        return { error: false, message: "تم تحديث كلمة السر بنجاح", status: 200 }
    } catch (error) {
        console.log(error);
        return { error: true, message: "هناك شيئا خاطئ لم يتم تحديث كلمة السر", status: 401 }
    }
}