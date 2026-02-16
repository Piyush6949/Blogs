'use server'

import blogRepo from '@/repository/blogRepo'
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { redirect } from 'next/navigation';

const blog = new blogRepo();

export async function getDrafts() {
    const cookieStore = await cookies();
    const res = await decrypt(cookieStore.get('session_id')?.value);
    if (res == null) {
        redirect('/signin');
    }
    const userId = res.id;
    const drafts = await blog.getUserDrafts(userId);
    return drafts;
}

export async function getPublishedBlogs() {
    const cookieStore = await cookies();
    const res = await decrypt(cookieStore.get('session_id')?.value);
    if (res == null) {
        redirect('/signin');
    }
    const userId = res.id;
    const publishedBlogs = await blog.getUserPublishedBlogs(userId);
    return publishedBlogs;
}
