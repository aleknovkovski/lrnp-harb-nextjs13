import {SearchSidebar} from "@/app/search/components/SearchSidebar";
import {RestaurantCard} from "@/app/search/components/RestaurantCard";
import {SearchBar} from "@/app/components/SearchBar";
import {PrismaClient, Restaurant} from "@prisma/client";

const prisma = new PrismaClient();

async function getRestaurantsByLocation(location: any) {
    const restaurants = await prisma.restaurant.findMany({
        where: {
            location: {name: location.toLowerCase()},
        }
    });

    if (!restaurants) return
    else return restaurants
}

export const metadata = {
    title: 'Search | Open Table',
    description: 'Open Table Search Page',
}

export default async function SearchPage(props: any) {
    const location = props.searchParams.location;
    const restaurants = await getRestaurantsByLocation(location)
    let restaurantsMarkup;

    if (restaurants) {
        restaurantsMarkup = restaurants.map((restaurant: any) => {
            return <RestaurantCard restaurant={restaurant}/>
        })
    }

    return (<>
        <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
            <SearchBar/>
        </div>
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
            {/* SEARCH SIDE BAR */}
            <SearchSidebar/>
            {/* SEARCH SIDE BAR */}
            <div className="w-5/6">
                {/* RESTAURANT CARD */}
                {restaurantsMarkup}
                {/* RESTAURANT CARD */}
            </div>
        </div>
    </>)
}
