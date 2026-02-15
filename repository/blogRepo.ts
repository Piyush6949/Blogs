import prisma from '@/lib/db'
import type { JSONContent } from '@tiptap/core'



export default class blogRepo {
    async saveDraft(data: { title: string, content_json: JSONContent, id: number }) {
        try {
            if (data.title === "") {
                data.title = "Untitled Blog"
            }
            const blog = await prisma.blog.create({
                data: {
                    title: data.title,
                    content_json: data.content_json,
                    authorId: data.id,
                },
            });
            return blog;
        } catch (error) {
            throw error;
        }
    }

    async editDraft(data: { title: string, content_json: JSONContent, blogId: number }) {
        try {
            const blog = await prisma.blog.update({
                where: {
                    id: data.blogId
                },
                data: {
                    title: data.title,
                    content_json: data.content_json,
                },
            });
            return blog;
        } catch (error) {
            throw error;
        }
    }

    async getContent(blogId: number) {
        try {
            const blog = await prisma.blog.findUnique({
                where: {
                    id: blogId
                },
            });
            return blog;
        } catch (error) {
            throw error;
        }
    }

    async publish(data: { blogId: number, title: string }) {
        try {
            await prisma.blog.update({
                where: { id: data.blogId },
                data: {
                    title: data.title,
                    status: "published",
                },
            })
        } catch (error) {
            throw error;
        }
    }

    async getPublishedBlog(blogId: number) {
        try {
            const blog = await prisma.blog.findUnique({
                where: {
                    id: blogId,
                    status: "published"
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                        }
                    },
                    _count: {
                        select: {
                            likedBy: true,
                            favoritedBy: true,
                            comments: true,
                        }
                    },
                }
            });
            return blog;
        } catch (error) {
            throw error;
        }
    }

}