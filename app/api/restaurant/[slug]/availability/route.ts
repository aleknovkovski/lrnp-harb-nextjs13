import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";
import {findAvailableTables} from "@/services/restaurant/findAvailableTables";

const prisma = new PrismaClient()

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

    const searchTimesWithTables = await findAvailableTables({slug, day, time})
    if(searchTimesWithTables instanceof NextResponse) {return} // this is if any of the NextResponse returns inside findAvailableTables are triggered

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
    })

    if(!restaurant) {
        return NextResponse.json({errorMessage: "Restaurant not found"}, {status: 404})
    }
    const availabilities = searchTimesWithTables.map(t => {
        const totalTableSeats =  t.tables.reduce((sum, table) => {
            return sum + table.seats
        }, 0);

        console.log(totalTableSeats)
        return {
            time: t.time,
            available: totalTableSeats >= parseInt(partySize)
        }
    }).filter(availability => {
        const timeAfterOpeningHour = new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restaurant.open_time}`)
        const timeBeforeClosingHour = new Date(`${day}T${availability.time}`) <= new Date(`${day}T${restaurant.close_time}`)

        return timeAfterOpeningHour && timeBeforeClosingHour
    })

    return NextResponse.json(availabilities)
}