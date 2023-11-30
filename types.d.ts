type Post = {
    id: bigint;
    publicId: string;
    title: string;
    topic: string | null;
    content: string;
    image: string | null;
    published: boolean;
    authorId: bigint;
    createdAt: Date;
    updatedAt: Date;
}