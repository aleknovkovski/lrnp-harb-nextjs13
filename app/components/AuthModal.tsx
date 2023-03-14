'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthModalInputs from "@/app/components/AuthModalInputs";
import {useContext, useEffect, useState} from "react";
import useAuth from "@/hooks/useAuth";
import {AuthenticationContext} from "@/app/context/AuthContext";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AuthModal({isSignin}: { isSignin: boolean }) {
   const {error, setAuthState, loading} = useContext(AuthenticationContext)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {signin} = useAuth()

    const flip = (signinContent: string, signupContent: string) => {
        return isSignin ? signinContent : signupContent;
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        password: "",
    });

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const isValidEmail = inputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

        if (isSignin) {
            if (inputs.password.length > 3 && isValidEmail) {
                return setDisabled(false);
            }
        } else {
            if (
                inputs.firstName.length > 1 &&
                inputs.lastName.length > 1 &&
                isValidEmail &&
                inputs.password.length > 3 &&
                inputs.city.length > 1 &&
                inputs.phone.length > 5
            ) {
                return setDisabled(false);
            }
        }

        setDisabled(true);
    }, [inputs]);

    const handleClick = () => {
        if (isSignin) {
            signin({email: inputs.email, password: inputs.password});
        }
    };

    return (
        <div>
            <button
                className={`
                ${flip("bg-blue-400 text-white", "")} border p-1 px-4 rounded mr-3
                `}
                onClick={handleOpen}
            >
                {flip("Sign in", "Sign up")}
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="p-2 h-[80vh]">
                        <header>
                            <p>{loading ? "loading" : "not loading"}</p>
                            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                                <p className="text-sm">
                                    {flip("Sign In", "Create Account")}
                                </p>
                            </div>
                            <div className="m-auto">
                                <h2 className="text-2xl font-light text-center">
                                    {flip(
                                        "Log Into Your Account",
                                        "Create Your OpenTable Account"
                                    )}
                                </h2>
                                <AuthModalInputs inputs={inputs} handleChangeInput={handleChangeInput}
                                                 isSignin={isSignin}/>
                                <button
                                    className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                                    disabled={disabled}
                                    onClick={handleClick}
                                >
                                    {flip("Sign In", "Create Account")}

                                </button>
                            </div>
                        </header>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
