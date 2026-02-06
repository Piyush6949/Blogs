import type { NextRequest } from "next/server";
import type {Blog, response,User} from "@/lib/types";


// get most like blogs
export async function GET(req : NextRequest){ 
    let body = req.body;
    
    return Response.json({});
}