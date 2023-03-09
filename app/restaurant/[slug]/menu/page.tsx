import NavBar from "@/app/components/NavBar";
import {Header} from "@/app/restaurant/[slug]/components/Header";
import {RestaurantNavbar} from "@/app/restaurant/[slug]/components/RestaurantNavbar";
import {Menu} from "@/app/restaurant/[slug]/components/Menu";

export default function MenuPage() {
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                {/* NAVBAR */}
                <NavBar/>
                {/* NAVBAR */}
                {/* HEADER */}
                <Header/>
                {/* HEADER */}
                {/* DESCRIPTION PORTION */}
                <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                    <div className="bg-white w-[100%] rounded p-3 shadow">
                        {/* RESTAURANT NAVBAR */}
                        <RestaurantNavbar/>
                        {/* RESTAURANT NAVBAR */}
                        {/* MENU */}
                        <Menu/>
                        {/* MENU */}
                    </div>
                </div>
                {/* DESCRIPTION PORTION */}
            </main>
        </main>
    )
}
