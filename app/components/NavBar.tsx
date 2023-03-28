"use client"

import Link from "next/link";
import AuthModal from "@/app/components/AuthModal";
import {useContext} from "react";
import {AuthenticationContext} from "@/app/context/AuthContext";

export default function NavBar() {
    const {data} = useContext(AuthenticationContext)
    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="" className="font-bold text-gray-700 text-2xl">
                OpenTable
            </Link>
            <div>
                <div className="flex">
                    <AuthModal isSignin={true}/>
                    <AuthModal isSignin={false}/>
                </div>
            </div>
        </nav>
    )
}