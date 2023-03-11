import {RestaurantNavbar} from "@/app/restaurant/[slug]/components/RestaurantNavbar";
import {Title} from "@/app/restaurant/[slug]/components/Title";
import {Rating} from "@/app/restaurant/[slug]/components/Rating";
import {Description} from "@/app/restaurant/[slug]/components/Description";
import {Images} from "@/app/restaurant/[slug]/components/Images";
import {Reviews} from "@/app/restaurant/[slug]/components/Reviews";
import {ReservationCard} from "@/app/restaurant/[slug]/components/ReservationCard";
import {PrismaClient, Review} from "@prisma/client";

export const metadata = {
    title: 'Milestones Grill | Open Table',
    description: 'Milestones Grill | Open Table',
}

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
      select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    },
  });

  if(!restaurant) {
      throw new Error()
  }

  return restaurant;
};

export default async function RestaurantPage(
    {params}: {params: { slug: string } }
    ) {

    const restaurant = await fetchRestaurantBySlug(params.slug)

    return (
        <>
                    <div className="bg-white w-[70%] rounded p-3 shadow">
                        <RestaurantNavbar slug={params.slug}/>
                        <Title name={restaurant.name} />
                        <Rating reviews={restaurant.reviews}/>
                        <Description description={restaurant.description} />
                        <Images images={restaurant.images} />
                        <Reviews reviews={restaurant.reviews}/>
                    </div>
                    <div className="w-[27%] relative text-reg">
                        <ReservationCard/>
                    </div>
        </>
    )
}
