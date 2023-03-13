import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log(await request.json());

  return NextResponse.json({ name: 'hello' })
}