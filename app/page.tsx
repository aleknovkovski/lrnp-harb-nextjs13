import Header from "@/app/components/Header";
import RestaurantCard from "@/app/components/RestaurantCard";

export default function Home() {
    return (
        <>
            {/* HEADER */}
            <Header/>
            {/* HEADER */}
            {/* CARDS */}
            <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
                {/* CARD */}
                <RestaurantCard/>
                {/* CARD */}
            </div>
            {/* CARDS */}
        </>
    )
}
