import type { NextRequest } from "next/server";
import type {response,User} from "@/lib/types";


// get user using id
export async function GET(req : NextRequest , { params }: { params: Promise<{ id: number }> }){ 
    let id = (await params).id;
    let res : response = {status : true , msg : "Successfully sent data of user"};
    res.msg = "Successfully sent data of user";
    res.status = true;
    res.response= {};
    return Response.json(res);
}