import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const {email, password} = await request.json();

    return NextResponse.json({name: email + " with password: " + password})
}