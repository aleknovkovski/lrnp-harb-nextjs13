import './globals.css'
import NavBar from "@/app/components/NavBar";

export const metadata = {
   title: 'Open Table',
   description: 'Open Table',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
                {/* NAVBAR */}
                <NavBar/>
                {children}
            </main>
        </main>
        </body>
        </html>
    )
}
