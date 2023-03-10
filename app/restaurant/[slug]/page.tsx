import {RestaurantNavbar} from "@/app/restaurant/[slug]/components/RestaurantNavbar";
import {Title} from "@/app/restaurant/[slug]/components/Title";
import {Rating} from "@/app/restaurant/[slug]/components/Rating";
import {Description} from "@/app/restaurant/[slug]/components/Description";
import {Images} from "@/app/restaurant/[slug]/components/Images";
import {Reviews} from "@/app/restaurant/[slug]/components/Reviews";
import {ReservationCard} from "@/app/restaurant/[slug]/components/ReservationCard";
import {PrismaClient} from "@prisma/client";

export const metadata = {
    title: 'Milestones Grill | Open Table',
    description: 'Milestones Grill | Open Table',
}

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  return restaurant;
};

export default async function RestaurantPage(
    {params}: {params: { slug: string } }
    ) {

    console.log(await fetchRestaurantBySlug(params.slug))

    return (
        <>
                    <div className="bg-white w-[70%] rounded p-3 shadow">
                        <RestaurantNavbar/>
                        <Title/>
                        <Rating/>
                        <Description/>
                        <Images/>
                        <Reviews/>
                    </div>
                    <div className="w-[27%] relative text-reg">
                        <ReservationCard/>
                    </div>
        </>
    )
}
