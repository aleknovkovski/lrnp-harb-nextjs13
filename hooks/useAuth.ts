import axios from "axios";
import {AuthenticationContext} from "@/app/context/AuthContext";
import {useContext} from "react";

const useAuth = () => {
    const {data, error, loading, setAuthState} = useContext(AuthenticationContext)

    async function signin({email, password}: { email: string; password: string; }) {
        setAuthState({
            data: null,
            error: null,
            loading: true,
        });
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/signin",
                {
                    email,
                    password,
                }
            );
            console.log(response)
            setAuthState({
                data: response.data,
                error: null,
                loading: false,
            });
        } catch (error: any) {
            const errorMessage = error.response.data.errorMessage
            console.log(errorMessage)
            setAuthState({
                data: null,
                error: errorMessage,
                loading: false,
            });
        }
    };

    async function signup() {
    };

    async function signout() {
    };


    return {
        signin,
        signup,
        signout,
    };
};

export default useAuth;