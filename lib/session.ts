import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

type SessionPayload = {
  id: number;
  username: string;
  password: string;
  createdat: string;
};


const secretKey = process.env.SECRET_KEY || "faslkjfaod;jfl;ajl;kjlkjkjdkjka;jdfkljklj";

export async function createSession(result : object) {
    const cookieStore = await cookies();
    const token = await jwt.sign(result, secretKey);
    cookieStore.set('session_id', token);
    return token;
}

export async function deleteSession(result : object) {
    const cookieStore = await cookies();
    cookieStore.delete('session_id');
}

export async function decrypt(data : undefined|string){
    if(data == null){
        return null;
    }
    const res = await jwt.verify(data,secretKey) as SessionPayload;
    return res;
}

export async function verifySession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_id")?.value;
  return session ?? null;
}
