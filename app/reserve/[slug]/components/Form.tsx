"use client"
import {useEffect, useState} from "react";
import * as React from "react";
import useReservation from "@/hooks/useReservation";
import {CircularProgress} from "@mui/material";

export function Form({date, partySize, slug}: {date: string; partySize: string; slug: string}) {

    const [inputs, setInputs] = useState({
        bookerFirstName: "",
        bookerLastName: "",
        bookerPhone: "",
        bookerEmail: "",
        bookerOccasion: "",
        bookerRequest: ""
    })

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const [disabled, setDisabled] = useState(true);
    const {error, loading, createReservation} = useReservation()
    const [day, time] = date.split("T")

    const handleClick = async () => {

        const booking = await createReservation({
            slug,
            partySize,
            day,
            time,
            bookerFirstName: inputs.bookerFirstName,
            bookerLastName: inputs.bookerLastName,
            bookerPhone: inputs.bookerPhone,
            bookerEmail: inputs.bookerEmail,
            bookerOccasion: inputs.bookerOccasion,
            bookerRequest: inputs.bookerRequest
        })
    }

    useEffect(() => {
        const isValidEmail = inputs.bookerEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

        if (
            inputs.bookerFirstName.length > 1 &&
            inputs.bookerLastName.length > 1 &&
            isValidEmail &&
            inputs.bookerPhone.length > 5
        ) {
            return setDisabled(false);
        }

        setDisabled(true);
    }, [inputs]);

    return <div className="mt-10 flex flex-wrap justify-between w-[660px]">
        <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            name="bookerFirstName"
            value={inputs.bookerFirstName}
            onChange={handleChangeInput}
        />
        <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            name="bookerLastName"
            value={inputs.bookerLastName}
            onChange={handleChangeInput}
        />
        <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            name="bookerPhone"
            value={inputs.bookerPhone}
            onChange={handleChangeInput}
        />
        <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            name="bookerEmail"
            value={inputs.bookerEmail}
            onChange={handleChangeInput}
        />
        <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            name="bookerOccasion"
            value={inputs.bookerOccasion}
            onChange={handleChangeInput}
        />
        <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            name="bookerRequest"
            value={inputs.bookerRequest}
            onChange={handleChangeInput}
        />
        <button
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            disabled={disabled || loading}
            onClick={handleClick}
        >
            {loading ? <CircularProgress color="inherit"/> : "Complete reservation"}
        </button>
        <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
        </p>
    </div>;
}