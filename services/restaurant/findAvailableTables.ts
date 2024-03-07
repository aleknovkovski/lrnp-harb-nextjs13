import {times} from "@/data";
import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const findAvailableTables = async ({slug, day, time} : {
    slug: string,
    day: string,
    time:string
})  => {
    const searchTimes = times.find((t => {
        return t.time === time
    }))?.searchTimes

    if(!searchTimes) {
        return NextResponse.json({errorMessage: "Time not found"}, {status: 400})
    }

    const bookings = await prisma.booking.findMany({
        where: {
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length-1]}`)
            },
        },
        select: {
            number_of_people: true,
            booking_time: true,
            tables: true
        }
    })

    const bookedTables: {[key: string]: {[key: number]: true}} = {}

    bookings.forEach(booking => {
        bookedTables[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
            return {
                ...obj,
                [table.table_id]: true
            }
        }, {})
    })

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            tables: true,
            open_time: true,
            close_time: true
        }
    })

    if(!restaurant) {
        return NextResponse.json({errorMessage: "Restaurant not found"}, {status: 404})
    }

    const allTables = restaurant.tables

    const searchTimesWithTables = searchTimes.map(searchTime => {
        return {
            date: new Date(`${day}T${searchTime}`),
            time: searchTime,
            tables: allTables
        }
    })

    searchTimesWithTables.forEach(t => {
        t.tables = t.tables.filter(table => {
            const booking = bookedTables[t.date.toISOString()]
            return !booking || !booking[table.id]
        })
    })

    return searchTimesWithTables
}