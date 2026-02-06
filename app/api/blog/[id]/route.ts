import type { NextRequest } from "next/server";
import type {Blog, response,User} from "@/lib/types";


// get blog using id
export async function GET(req : NextRequest , { params }: { params: Promise<{ id: number }> }){ 
    let id = (await params).id;
    let data : Blog = {};
    data.authorId = 1;
    data.authorName = "Piyush";
    let res : response = {status : true , msg : "Successfully sent data of user"};
    res.response= data;
    return Response.json(res);
}