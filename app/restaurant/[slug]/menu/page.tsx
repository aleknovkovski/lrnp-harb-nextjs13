import {Header} from "@/app/restaurant/[slug]/components/Header";
import {RestaurantNavbar} from "@/app/restaurant/[slug]/components/RestaurantNavbar";
import {Menu} from "@/app/restaurant/[slug]/components/Menu";

export default function MenuPage() {
    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                {/* RESTAURANT NAVBAR */}
                <RestaurantNavbar/>
                {/* RESTAURANT NAVBAR */}
                {/* MENU */}
                <Menu/>
                {/* MENU */}
            </div>
        </>
    )
}
