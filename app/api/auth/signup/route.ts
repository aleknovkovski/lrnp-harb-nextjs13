import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { firstName, lastName, email, phone, city, password } = await request.json();

  return NextResponse.json({ name: firstName + " " + lastName })
}