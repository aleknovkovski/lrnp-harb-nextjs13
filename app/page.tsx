import Header from "@/app/components/Header";
import RestaurantCard from "@/app/components/RestaurantCard";
import {PrismaClient, Cuisine, Location, PRICE, Review} from "@prisma/client";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
}

const prisma = new PrismaClient();

async function fetchRestaurants(): Promise<RestaurantCardType[]> {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      slug: true,
      price: true,
      reviews: true,
    },
  });
  return restaurants;
}

export default async function Home() {
    const restaurants = await fetchRestaurants()
    const restaurantsMarkup = restaurants.map((restaurant) => {
        return <RestaurantCard restaurant={restaurant} />;
    })

    return (<>
        <Header/>
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
            {restaurantsMarkup}
        </div>
    </>)
}
