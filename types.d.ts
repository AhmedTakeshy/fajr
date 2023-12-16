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

