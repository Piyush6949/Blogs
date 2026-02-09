import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import UserService from "@/services/userService";
import type { Res } from "@/lib/types";
import {redirect} from "next/navigation";

const User = new UserService;

export async function POST(request: NextRequest) {
  let res: Res = { status: true, msg: "" };
  try {
    const formData = await request.formData()
    const username = formData.get('username')!.toString();
    const email = formData.get('email')!.toString();
    const password = formData.get("password")!.toString();
    const data = await User.createUser({ username, email, password });
    res.msg = "Successfully created an account";
    res.response = data;
    return NextResponse.redirect(new URL('/',request.url));
  } catch (error) {
    res.status = false;
    res.msg = "Something went wrong, not able to create an account";
    res.error = error;
    return Response.redirect(new URL('/signup',request.url));
  }
}

export async function GET(request: NextRequest) {
  let res: Res = { status: true, msg: "" };
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')!;
    const password = searchParams.get('password')!;
    const data = await User.searchUser({ email, password });
    res.msg = "Successfully logged in";
    res.response = data;
    return NextResponse.redirect(new URL('/',request.url));
  } catch (error) {
    res.status = false;
    console.log(error);
    res.msg = "Something went wrong, not able to login";
    res.error = error;
    return Response.redirect(new URL('/signin',request.url));
  }
}

