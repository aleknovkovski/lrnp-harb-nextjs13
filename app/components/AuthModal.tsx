'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const flip = (signinContent: string, signupContent: string) => {
        return isSignin ? signinContent : signupContent;
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
                            </div>
                        </header>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
