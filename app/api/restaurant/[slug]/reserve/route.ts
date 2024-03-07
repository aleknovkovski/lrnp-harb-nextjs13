import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";
import {findAvailableTables} from "@/services/restaurant/findAvailableTables";

const prisma = new PrismaClient()

export async function POST(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug
    const {day, time, partySize, bookerEmail, bookerPhone, bookerFirstName, bookerLastName, bookerOccasion, bookerRequest} = await request.json()

    if(!day || !time || !partySize) {
        return NextResponse.json({errorMessage: "Missing parameters"}, {status: 400})
    }

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            open_time: true,
            close_time: true,
            tables: true,
            id: true
        }
    })

    if(!restaurant) {
        return NextResponse.json({errorMessage: "Restaurant not found"}, {status: 404})
    }

    if(
        new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
        new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {return NextResponse.json({errorMessage: "Restaurant not open at requested time"}, {status: 404})}

    const searchTimesWithTables = await findAvailableTables({day, time, restaurant})
    if(searchTimesWithTables instanceof NextResponse) {return} // this is if any of the NextResponse returns inside findAvailableTables are triggered

    const searchTimeWithTables = searchTimesWithTables.find((t)=> {
        return t.date.toISOString() === new Date(`${day}T${time}`).toISOString()
    })

    if (!searchTimeWithTables) {
        return NextResponse.json({errorMessage: "No availability, cannot book"}, {status: 400})
    }

    const tablesCount: {
        2: number[];
        4: number[];
    } = {
        2: [],
        4: []
    }

    searchTimeWithTables.tables.forEach((table)=> {
        if (table.seats === 2) {
            tablesCount[2].push(table.id);
        } else {
            tablesCount[4].push(table.id);
        }
    })

    const tablesToBook: number[] = [];
    let seatsRemaining = parseInt(partySize);

    while (seatsRemaining > 0) {
        if (seatsRemaining >= 3 && tablesCount[4].length > 0) {
            tablesToBook.push(tablesCount[4].pop()!);
            seatsRemaining -= 4;
        } else if (seatsRemaining <= 2) {
            if(tablesCount[2].length > 0){
                tablesToBook.push(tablesCount[2].pop()!);
                seatsRemaining -= seatsRemaining;
            } else {
                tablesToBook.push(tablesCount[4].pop()!);
                seatsRemaining -= 4;
            }
        }
    }

    const booking = await prisma.booking.create({
        data: {
            number_of_people: parseInt(partySize),
            booking_time: new Date(`${day}T${time}`),
            booker_email: bookerEmail,
            booker_phone: bookerPhone,
            booker_first_name: bookerFirstName,
            booker_last_name: bookerLastName,
            booker_occasion: bookerOccasion,
            booker_request: bookerRequest,
            restaurant_id: restaurant.id
        }
    })

    const bookingsOnTablesDates = tablesToBook.map((table_id) => {
        return {
            table_id,
            booking_id: booking.id
        }
    })

    await prisma.bookingsOnTables.createMany({
        data: bookingsOnTablesDates
    })

    return NextResponse.json({tablesCount, tablesToBook, booking})
}