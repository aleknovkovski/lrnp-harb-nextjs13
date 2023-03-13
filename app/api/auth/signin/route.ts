import {NextRequest, NextResponse} from "next/server";
import validator from "validator";

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

    return NextResponse.json({name: email + " with password: " + password})
}