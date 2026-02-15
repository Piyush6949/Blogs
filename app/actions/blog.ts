'use server'

import blogRepo from '@/repository/blogRepo'
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { redirect, RedirectType } from 'next/navigation';
import { JSONContent } from '@tiptap/react';
import { verifySession } from '@/lib/dal';

const blog = new blogRepo();

export async function save(content_json: JSONContent, title: string) {
  const cookieStore = await cookies();
  const res = await decrypt(cookieStore.get('session_id')?.value);
  if (res == null) {
    redirect('/signin');
  }
  const id = res.id;
  const data = await blog.saveDraft({ title, content_json, id });
  const blogId = data.id;
  redirect(`e/${blogId}`);
}

export async function publish(formData: FormData) {
  try {
    // await verifySession();
    const title = String(formData.get("title"));
    const blogId = Number(formData.get("blogId"))
    const tagsRaw = String(formData.get("tags") ?? "")
    const visibility = String(formData.get("visibility") ?? "public")

    // Convert comma-separated tags to array
    const tags = tagsRaw
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const res = await blog.publish({ blogId, title });
    redirect(`/create/e/${blogId}`)
  } catch (error) {
    console.error("Publish failed:", error)
    throw error
  }
}

export async function edit(content_json: JSONContent, title: string, id: string) {
  const blogId = Number(id);
  const res = await blog.editDraft({ title, content_json, blogId });
}


export async function getContent(id: string): Promise<JSONContent | null> {
  const cookieStore = await cookies();
  const user = await decrypt(cookieStore.get('session_id')?.value);
  const userId = user?.id;
  const blogId = Number(id);
  const res = await blog.getContent(blogId);

  if (userId != res?.authorId) {
    redirect('/not-found');
  }
  return res;
}

export async function getPublishedBlog(id: string) {
  const blogId = Number(id);
  const res = await blog.getPublishedBlog(blogId);
  return res;
}