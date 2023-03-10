import Header from "@/app/components/Header";
import RestaurantCard from "@/app/components/RestaurantCard";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function fetchRestaurants() {
  const restaurants = await prisma.restaurant.findMany();
  return restaurants;
};

export default async function Home() {
    const restaurants = await fetchRestaurants()
    const restaurantsMarkup = restaurants.map((restaurant) => {
        return <h3>{restaurant.name}</h3>
    })

    return (<>
        <Header/>
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
            {restaurantsMarkup}
        </div>
    </>)
}
