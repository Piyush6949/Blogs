import type { NextRequest } from "next/server";
import type {Res} from "@/lib/types";


// get user using id
export async function GET(req : NextRequest , { params }: { params: Promise<{ id: number }> }){ 
    let id = (await params).id;
    let res : Res = {status : true , msg : "Successfully sent data of user"};
    res.msg = "Successfully sent data of user";
    res.status = true;
    res.response= {};
    return Response.json(res);
}