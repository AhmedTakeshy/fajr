"use server"

import { PostFormSchema, SignUpFormSchema, SubscribeFormSchema, postFormSchema, signUpFormSchema, subscribeFormSchema } from "./formSchemas";
import { prisma } from "./prisma";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";

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

// USER
// sign-up
export async function signUp(values: SignUpFormSchema) {
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

export async function getUsers() {
    const users = await prisma.user.findMany({})
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
export async function getUserById(id: number) {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user
}


//POSTS

export async function createPost( values : PostFormSchema,email: string) {
    try {
        const result = await postFormSchema.safeParseAsync(values)
        if (!result.success) {
            return { error: true, message: "خطأ في البيانات المدخلة", status: 401 }
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        const data = result.data
        await prisma.post.create({
            data: {
                title: data.title,
                topic: data.topic,
                content: data.content,
                published: data.published,
                author: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })
        revalidatePath("/admin/posts")
        return { error: false, message: "تم إنشاء المقال بنجاح", status: 201 }
    } catch (error) {
        console.log(error);
        return { error: true, message: "هناك شيئا خاطئ لم يتم إنشاء المقال", status: 401 }
    }
    
}

export async function updatePost(id: number, values: PostFormSchema,email: string) {
    console.log("🚀 ~ file: actions.ts:130 ~ updatePost ~ (id: number, values::", id, values);
    
    try {
        const result = await postFormSchema.safeParseAsync(values)
        if (!result.success) {
            return { error: true, message: "خطأ في البيانات المدخلة", status: 401 }
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        const data = result.data
        await prisma.post.update({
            where: {
                id
            },
            data: {
                title: data.title,
                topic: data.topic,
                content: data.content,
                published: data.published,
                author: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })
        revalidatePath("/admin/posts")
        return { error: false, message: "تم تحديث المقال بنجاح", status: 200 }
    } catch (error) {
        console.log(error);
        return { error: true, message: "هناك شيئا خاطئ لم يتم تحديث المقال", status: 401 }
    }
}

export async function deletePost(id: number) {
    try {
        await prisma.post.delete({
            where: {
                id
            }
        })
        revalidatePath("/admin/posts")
        return { error: false, message: "تم حذف المقال بنجاح", status: 200 }
    } catch (error) {
        console.log(error);
        return { error: true, message: "هناك شيئا خاطئ لم يتم حذف المقال", status: 401 }
    }
}

export async function unPublishPost(id: number) {
    try {
        await prisma.post.update({
            where: {
                id
            },
            data: {
                published: false
            }
        })
        revalidatePath("/admin/posts")
        return { error: false, message: "تم إلغاء نشر المقال بنجاح", status: 200 }
    } catch (error) {
        console.log(error);
        return { error: true, message: "هناك شيئا خاطئ لم يتم إلغاء نشر المقال", status: 401 }
    }
}

export async function getPosts() {
    const posts = await prisma.post.findMany({
        where: {
            published: true
        },
        orderBy: {
            createdAt: "desc"
        },
    })
    return posts
}

export async function getPostById(id: number) {
    const post = await prisma.post.findUnique({
        where: {
            id
        }
    })
    return post
}