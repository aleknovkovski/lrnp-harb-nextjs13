import {Header} from "@/app/reserve/[slug]/components/Header";
import {Form} from "@/app/reserve/[slug]/components/Form";
import {PrismaClient, Restaurant} from "@prisma/client";
import {notFound} from "next/navigation";

const prisma = new PrismaClient()

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {slug},
    });

    if (!restaurant) {notFound()}

    return restaurant;
};

export default async function ReservationPage(
    {params, searchParams}: {params: { slug: string }; searchParams: any }
) {
    const restaurant = await fetchRestaurantBySlug(params.slug)
    return (
        <>
            <article className="border-t h-screen">
                <div className="py-9 w-3/5 m-auto">
                    {/* HEADER */}
                    <Header
                        image={restaurant.main_image}
                        name={restaurant.name}
                        date={searchParams.date}
                        partySize={searchParams.partySize}
                    />
                    {/* HEADER */}
                    {/* FORM */}
                    <Form/>
                </div>
            </article>
        </>
    )
}
