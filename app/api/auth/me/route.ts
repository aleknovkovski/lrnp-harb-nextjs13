import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {

    const bearerToken = request.headers.get("Authorization") as string;
    const token = bearerToken.split(" ")[1];

    return NextResponse.json({yourToken: token})
}