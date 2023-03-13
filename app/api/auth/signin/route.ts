import {NextRequest, NextResponse} from "next/server";
import validator from "validator";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import * as jose from "jose";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const {email, password} = await request.json();

    const errors: string[] = [];
    const validationSchema = [
        {
            valid: validator.isEmail(email),
            errorMessage: "Email is invalid",
        },
        {
            valid: validator.isLength(password, {
                min: 1,
            }),
            errorMessage: "Password is invalid",
        },
    ];

    validationSchema.forEach((check) => {
        if (!check.valid) {
            errors.push(check.errorMessage);
        }
    });

    if (errors.length) {
        const data = {errorMessage: errors[0]}
        const json = JSON.stringify(data, null, 2)
        return new NextResponse(json, {
            status: 400, headers: {
                'content-type': 'application/json; charset=utf-8',
            }
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        const data = {errorMessage: "Email or password is invalid"}
        const json = JSON.stringify(data, null, 2)
        return new NextResponse(json, {
            status: 401, headers: {
                'content-type': 'application/json; charset=utf-8',
            }
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const data = {errorMessage: "Email or password is invalid"}
        const json = JSON.stringify(data, null, 2)
        return new NextResponse(json, {
            status: 401, headers: {
                'content-type': 'application/json; charset=utf-8',
            }
        });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const alg = "HS256";
    const token = await new jose.SignJWT({email: user.email})
        .setProtectedHeader({alg})
        .setExpirationTime("24h")
        .sign(secret);

    return NextResponse.json({user: user.email + " w jwt: " + token})
}