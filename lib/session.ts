import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

type SessionPayload = {
    id: number;
    username: string;
    password: string;
    createdat: string;
};


const secretKey = process.env.SECRET_KEY;

export async function createSession(result: object) {
    const cookieStore = await cookies();
    const token = await jwt.sign(result, secretKey!);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookieStore.set('session_id', token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
    return token;
}

export async function deleteSession(result: object) {
    const cookieStore = await cookies();
    cookieStore.delete('session_id');
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session_id', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function decrypt(data: undefined | string) {
    if (data == null) {
        return null;
    }
    const res = await jwt.verify(data, secretKey!) as SessionPayload;
    return res;
}

