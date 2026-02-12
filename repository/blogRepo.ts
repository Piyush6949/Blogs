import prisma from '@/lib/db'
import type { JSONContent } from '@tiptap/core'



export default class blogRepo {
    async saveDraft(data : {title: string, content_json: JSONContent, id: number}) {
        try {
            if(data.title === ""){
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

    async editDraft(data : {title: string, content_json: JSONContent, blogId: number}) {
        try {
            const blog = await prisma.blog.update({
                where:{
                    id : data.blogId
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

    async getContent(blogId : number){
        try {
            const blog = await prisma.blog.findUnique({
                where:{
                    id : blogId
                },
            });
            return blog;
        } catch (error) {
            throw error;
        }
    }
}