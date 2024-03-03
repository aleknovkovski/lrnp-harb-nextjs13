"use client"

import {partySize, times} from "@/data";
import DatePicker from "react-datepicker"
import {useState} from "react";

export function ReservationCard({openTime, closeTime}:{openTime:string; closeTime:string}) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

    const handleChangeDate = (date: Date | null) => {
        if(date) {
            return setSelectedDate(date)
        } else {
            return setSelectedDate(null)
        }
    }

    const filterTimeslotsByOpenHours = () => {
        const qualifiedTimeSlots: typeof times = [];

        let isInWorkingHours = false;

        times.forEach(time => {
            if(time.time === openTime) {
                isInWorkingHours = true;
            }

            if(isInWorkingHours) {
                qualifiedTimeSlots.push(time)
            }

            if(time.time === closeTime) {
                isInWorkingHours = false;
            }
        })

        return qualifiedTimeSlots
    }

    return <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
            <label htmlFor="">Party size</label>
            <select name="" className="py-3 border-b font-light" id="">
                {partySize.map((size)=> {
                    return <option key={size.value} value={size.value}>{size.label}</option>
                })}
            </select>
        </div>
        <div className="flex justify-between">
            <div className="flex flex-col w-[48%]">
                <label htmlFor="">Date</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleChangeDate}
                    className="py-r border-b font-light text-reg w-28"
                    wrapperClassName="w-[48%]"
                    dateFormat="MMMM d"
                />
            </div>
            <div className="flex flex-col w-[48%]">
                <label htmlFor="">Time</label>
                <select name="" id="" className="py-3 border-b font-light">
                    {filterTimeslotsByOpenHours().map((time)=>
                        <option key={time.time} value={time.time}>{time.displayTime}</option>
                    )}
                </select>
            </div>
        </div>
        <div className="mt-5">
            <button
                className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
            >
                Find a Time
            </button>
        </div>
    </div>;
}