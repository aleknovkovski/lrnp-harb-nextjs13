import axios from "axios";

const useAuth = () => {
    async function signin({email, password}: { email: string; password: string; }) {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/signin",
                {
                    email,
                    password,
                }
            );
            console.log(response)
        } catch (error: any) {
            console.log(error)
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