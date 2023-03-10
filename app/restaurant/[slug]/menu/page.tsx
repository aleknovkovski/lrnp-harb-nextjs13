import {Header} from "@/app/restaurant/[slug]/components/Header";
import {RestaurantNavbar} from "@/app/restaurant/[slug]/components/RestaurantNavbar";
import {Menu} from "@/app/restaurant/[slug]/components/Menu";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {

  const restaurant = await prisma.restaurant.findFirst({
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant.items;
};

export default async function MenuPage(
    {params}: { params: { slug: string }}
) {
    const menu = await fetchRestaurantMenu(params.slug);
    console.log(menu)

    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNavbar slug={params.slug} />
                <Menu/>
            </div>
        </>
    )
}
