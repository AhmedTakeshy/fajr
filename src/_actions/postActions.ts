"use server"
import { PostFormSchema, postFormSchema } from "@/lib/formSchemas"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createPost(values: PostFormSchema, email: string) {
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

export async function updatePost(id: number, values: PostFormSchema, email: string) {
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

export async function getPosts(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
    })
    return posts
}

export async function getPostById(id: number): Promise<Post> {
    const post = await prisma.post.findUnique({
        where: {
            id
        }
    })
    return post as Post
}