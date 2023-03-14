import {NextRequest, NextResponse} from "next/server";
import * as jose from "jose";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest): Promise<NextResponse> {

    const bearerToken = request.headers.get("Authorization") as string;
    const token = bearerToken.split(" ")[1];

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        await jose.jwtVerify(token, secret)
    } catch (err) {
        const data = {errorMessage: "Unauthorized request"}
        const json = JSON.stringify(data, null, 2)
        return new NextResponse(json, {
            status: 401, headers: {
                'content-type': 'application/json; charset=utf-8',
            }
        })
    }

    const payload = jwt.decode(token) as { email: string };

    return NextResponse.json({yourPayload: payload})
}