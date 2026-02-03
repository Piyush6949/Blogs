import {type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function GET() : NextResponse{
    return NextResponse.json({"name" : "Piyush", age : 10});
}