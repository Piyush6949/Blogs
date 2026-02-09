import { Res } from "@/lib/types";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    cookieStore.delete('session_id');
    const res : Res = {status:true,msg: "successfully logged out"};
    return Response.json(res);
}