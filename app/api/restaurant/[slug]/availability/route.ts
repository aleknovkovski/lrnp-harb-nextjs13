import {NextRequest, NextResponse} from "next/server";
import {times} from "@/data";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug
    const searchParams = request.nextUrl.searchParams
    const day = searchParams.get('day')
    const time = searchParams.get('time')
    const partySize = searchParams.get('partySize')

    if(!day || !time || !partySize) {
        return NextResponse.json({errorMessage: "Missing parameters"}, {status: 400})
    }

    const searchTimes = times.find((t => {
        return t.time === time
    }))?.searchTimes

    return NextResponse.json({searchTimes})
}
