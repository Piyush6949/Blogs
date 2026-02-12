'use server'

import blogRepo from '@/repository/blogRepo'
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { redirect, RedirectType } from 'next/navigation';
import { JSONContent } from '@tiptap/react';

const blog = new blogRepo();

export async function save(content_json: JSONContent, title: string) {
  // try {
  //   const cookieStore = await cookies();
  //   const res = await decrypt(cookieStore.get('session_id')?.value);
  //   if (res == null) {
  //     redirect('/login');
  //   }
  //   const id = res.id;
  //   const data = await blog.saveDraft({ title, content_json, id });
  //   const blogId = data.id;
  //   redirect(`/e/${blogId}`);
  // } catch (error) {
  //   console.log(error);
  // }
  const cookieStore = await cookies();
  const res = await decrypt(cookieStore.get('session_id')?.value);
  if (res == null) {
    redirect('/login');
  }
  const id = res.id;
  const data = await blog.saveDraft({ title, content_json, id });
  const blogId = data.id;
  redirect(`e/${blogId}`);
}

export async function publish(content_json: JSONContent, title: string) {

}

export async function edit(content_json: JSONContent, title: string, id: string) {
  const blogId = Number(id);
  const res = await blog.editDraft({ title, content_json, blogId });
}

export async function getContent(id: string) : Promise<JSONContent | null>{
  const cookieStore = await cookies();
  const user = await decrypt(cookieStore.get('session_id')?.value);
  const userId = user?.id;
  const blogId = Number(id);
  const res = await blog.getContent(blogId);
  if(userId != res?.authorId){
    redirect('/not-found');
  }
  return res;
}