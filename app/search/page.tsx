import {SearchSidebar} from "@/app/search/components/SearchSidebar";
import {RestaurantCard} from "@/app/search/components/RestaurantCard";
import {SearchBar} from "@/app/components/SearchBar";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function getRestaurantsByLocation(searchParams: { location?: any, cuisine?: any, price?: any }) {
    const select = {
        id: true,
        name: true,
        main_image: true,
        price: true,
        cuisine: true,
        location: true,
        slug: true,
    };

    const where: any = {};

    if (searchParams.location) {
        where.location = {
            name: {
                equals: searchParams.location.toLowerCase(),
            },
        };
    }
    if (searchParams.cuisine) {
        where.cuisine = {
            name: {
                equals: searchParams.cuisine.toLowerCase(),
            },
        };
    }
    if (searchParams.price) {
        where.price = {
            equals: searchParams.price,
        };
    }

    const restaurants = await prisma.restaurant.findMany({
        where: where,
        select: select
    });

    if (!restaurants) return
    else return restaurants
}

const fetchLocations = async () => {
    return prisma.location.findMany();
};

const fetchCuisines = async () => {
    return prisma.cuisine.findMany();
};

export const metadata = {
    title: 'Search | Open Table',
    description: 'Open Table Search Page',
}

export default async function SearchPage(props: any) {
    const restaurants = await getRestaurantsByLocation(props.searchParams)
    const locations = await fetchLocations();
    const cuisines = await fetchCuisines();

    let restaurantsMarkup;

    if (restaurants) {
        restaurantsMarkup = restaurants.map((restaurant: any) => {
            return <RestaurantCard restaurant={restaurant} key={restaurant.id}/>
        })
    }

    return (<>
        <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
            <SearchBar/>
        </div>
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
            {/* SEARCH SIDE BAR */}
            <SearchSidebar locations={locations} cuisines={cuisines} searchParams={props.searchParams}/>
            {/* SEARCH SIDE BAR */}
            <div className="w-5/6">
                {/* RESTAURANT CARD */}
                {restaurantsMarkup}
                {/* RESTAURANT CARD */}
            </div>
        </div>
    </>)
}
