"use client";

import React, {useState, createContext, useEffect} from "react";
import { getCookie } from "cookies-next";
import axios from "axios";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string;
}

interface State {
    loading: boolean;
    error: string | null;
    data: User | null;
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    error: null,
    data: null,
    setAuthState: () => {
    },
});

export default function AuthContext({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    const [authState, setAuthState] = useState<State>({
        loading: true,
        data: null,
        error: null,
    });

    const fetchUser = async () => {
        setAuthState({
            data: null,
            error: null,
            loading: true,
        });
        try {
            const jwt = getCookie("jwt");
            console.log(jwt)
            if (!jwt) {
                return setAuthState({
                    data: null,
                    error: null,
                    loading: false,
                });
            }

            const response = await axios.get("http://localhost:3000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

            setAuthState({
                data: response.data,
                error: null,
                loading: false,
            });
        } catch (error: any) {
            const errorMessage = error.response.data.errorMessage || error.message || error
            setAuthState({
                data: null,
                error: errorMessage,
                loading: false,
            });
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthenticationContext.Provider
            value={{
                ...authState,
                setAuthState,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}
