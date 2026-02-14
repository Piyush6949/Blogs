'use server' 
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { redirect } from 'next/navigation' 
import { cache } from 'react';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session_id')?.value;
  const session = await decrypt(cookie);
 
  if (!session?.id) {
    redirect('/signin');
  }
 
  return { isAuth: true, userId: session.id }
})