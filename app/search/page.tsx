import NavBar from "@/app/components/NavBar";
import {SearchSidebar} from "@/app/search/components/SearchSidebar";
import {RestaurantCard} from "@/app/search/components/RestaurantCard";
import {SearchBar} from "@/app/components/SearchBar";

export default function SearchPage() {
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                {/* NAVBAR */}
                <NavBar/>
                {/* HEADER */}
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
            </main>
        </main>
)
}
