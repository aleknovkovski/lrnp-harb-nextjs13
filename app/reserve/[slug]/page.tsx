import NavBar from "@/app/components/NavBar";
import {Header} from "@/app/reserve/[slug]/components/Header";
import {Form} from "@/app/reserve/[slug]/components/Form";

export default function ReservationPage() {
    return (
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                {/* NAVBAR */}
                <NavBar/>
                {/* NAVBAR END */}
                <article className="border-t h-screen">
                    <div className="py-9 w-3/5 m-auto">
                        {/* HEADER */}
                        <Header/>
                        {/* HEADER */}
                        {/* FORM */}
                        <Form/>
                    </div>
                </article>
            </main>
        </main>
    )
}
