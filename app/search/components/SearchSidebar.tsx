import {Cuisine, Location, PRICE} from "@prisma/client";
import Link from "next/link";

export function SearchSidebar({
                                  locations,
                                  cuisines,
                                  searchParams
                              }: { locations: Location[], cuisines: Cuisine[], searchParams: { city?: string; cuisine?: string; price?: PRICE }; }) {
    console.log(searchParams)
    return <div className="w-1/5">
        <div className="border-b pb-4 flex flex-col">
            <h1 className="mb-2">Region</h1>
            {locations.map((location) => (
                <Link
                    className="font-light text-reg capitalize"
                    key={location.id}
                    href={{
                        pathname: "/search",
                        query: {
                            ...searchParams,
                            location: location.name,
                        },
                    }}
                >
                    {location.name}
                </Link>
            ))}
        </div>
        <div className="border-b pb-4 flex flex-col">
            <h1 className="mb-2">Cuisine</h1>
            {cuisines.map((cuisine) => (
                <Link
                    className="font-light text-reg capitalize"
                    key={cuisine.id}
                    href={{
                        pathname: "/search",
                        query: {
                            ...searchParams,
                            cuisine: cuisine.name,
                        },
                    }}
                >
                    {cuisine.name}
                </Link>
            ))}
        </div>
        <div className="mt-3 pb-4">
            <h1 className="mb-2">Price</h1>
            <div className="flex">
                <button className="border w-full text-reg font-light rounded-l p-2">
                    $
                </button>
                <button
                    className="border-r border-t border-b w-full text-reg font-light p-2"
                >
                    $$
                </button>
                <button
                    className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
                >
                    $$$
                </button>
            </div>
        </div>
    </div>;
}