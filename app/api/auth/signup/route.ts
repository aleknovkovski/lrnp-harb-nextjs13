import {NextRequest, NextResponse} from "next/server";
import validator from "validator";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<NextResponse> {
    const {firstName, lastName, email, phone, city, password} = await request.json();

    const errors: string[] = [];

    const validationSchema = [
        {
            valid: validator.isLength(firstName, {
                min: 1,
                max: 20,
            }),
            errorMessage: "First name is invalid",
        },
        {
            valid: validator.isLength(lastName, {
                min: 1,
                max: 20,
            }),
            errorMessage: "Last name is invalid",
        },
        {
            valid: validator.isEmail(email),
            errorMessage: "Email is invalid",
        },
        {
            valid: validator.isMobilePhone(phone),
            errorMessage: "Phone number is invalid",
        },
        {
            valid: validator.isLength(city, {min: 1}),
            errorMessage: "City is invalid",
        },
        {
            valid: validator.isStrongPassword(password),
            errorMessage: "Password is not strong enough",
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

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (userWithEmail) {
        const data = {errorMessage: "Email is associated with another account"}
        const json = JSON.stringify(data, null, 2)
        return new NextResponse(json, {
            status: 400, headers: {
                'content-type': 'application/json; charset=utf-8',
            }
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            password: hashedPassword,
            city,
            phone,
            email,
        },
    });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const alg = "HS256";
    const token = await new jose.SignJWT({email: user.email})
        .setProtectedHeader({alg})
        .setExpirationTime("24h")
        .sign(secret);

    const userObj = {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        city: user.city,
    }

    return NextResponse.json(userObj, {
            status: 200, headers: {
                'Set-Cookie': `jwt=${token}; Max-Age=8640; Path=/`
            }
        }
    );
}