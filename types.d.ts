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