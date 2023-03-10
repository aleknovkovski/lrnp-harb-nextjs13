import {Header} from "@/app/restaurant/[slug]/components/Header";
import {RestaurantNavbar} from "@/app/restaurant/[slug]/components/RestaurantNavbar";
import {Menu} from "@/app/restaurant/[slug]/components/Menu";

export default function MenuPage(
    {params}: { params: { slug: string }}
) {
    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNavbar slug={params.slug} />
                <Menu/>
            </div>
        </>
    )
}
