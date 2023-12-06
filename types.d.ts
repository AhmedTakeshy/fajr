type Post = {
    id: number;
    publicId: string;
    title: string;
    topic: string | null;
    content: string;
    image: string | null;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
}

type User = {
    id: number;
    name: string;
    role: $Enums.Role;
    email: string;
    updatedAt: Date;
    publicId: string;
    createdAt: Date;

}

// type ExtendedUser = User & {
//     role?: string | null | undefined;
// };

type ExtendedUser = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    role?: string | null | undefined;
} | undefined

