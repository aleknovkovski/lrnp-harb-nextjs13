import './globals.css'
import NavBar from "@/app/components/NavBar";
import AuthContext from "@/app/context/AuthContext";
import "react-datepicker/dist/react-datepicker.css"

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
            <AuthContext>
                <main className="max-w-screen-2xl m-auto bg-white">
                    <NavBar/>
                    {children}
                </main>
            </AuthContext>
        </main>
        </body>
        </html>
    )
}
