import {SearchSidebar} from "@/app/search/components/SearchSidebar";
import {RestaurantCard} from "@/app/search/components/RestaurantCard";
import {SearchBar} from "@/app/components/SearchBar";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

async function getRestaurantsByLocation(location: any) {
   const locationObj = await prisma.location.findFirst({
       where: {name: location}
   });
   if(!locationObj) {return}

   if (locationObj.id) {
       const restaurants = await prisma.restaurant.findMany({
           where: {location_id: locationObj.id}
       });
       if (restaurants.length > 0) {
           return restaurants
       }
   }
}

export const metadata = {
   title: 'Search | Open Table',
   description: 'Open Table Search Page',
}

export default async function SearchPage(props: any) {
    const location = props.searchParams.location;
    const res = await getRestaurantsByLocation(location)
    if (res) {
        console.log(res)
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
                <RestaurantCard/>
                {/* RESTAURANT CARD */}
            </div>
        </div>
    </>)
}
