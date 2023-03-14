import {NextRequest, NextResponse} from "next/server";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<NextResponse> {

    const bearerToken = request.headers.get("Authorization") as string;
    const token = bearerToken.split(" ")[1];

    const payload = jwt.decode(token) as { email: string };

    if (!payload.email) {
        const data = {errorMessage: "Unauthorized request"}
        const json = JSON.stringify(data, null, 2)
        return new NextResponse(json, {
            status: 401, headers: {
                'content-type': 'application/json; charset=utf-8',
            }
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            city: true,
            phone: true,
        },
    });

    if (!user) {
        const data = {errorMessage: "User not found"}
        const json = JSON.stringify(data, null, 2)
        return new NextResponse(json, {
            status: 401, headers: {
                'content-type': 'application/json; charset=utf-8',
            }
        })
    }

    return NextResponse.json({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
    city: user.city,
  })
}