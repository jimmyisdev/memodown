"use client";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
export default function MessageDetail({ text = '', time = '' }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button className=' hover:text-blue-900 font-medium text-center cursor-pointer ease-linear transition-all duration-250' type="button" data-tooltip-target="create-note" onClick={() => setShowModal(true)}><BsThreeDots /></button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-center justify-between  p-3 ">
                                    <h3 className="text-xl font-semibold text-center text-blue-900">
                                        Message
                                    </h3>
                                    <span className="text-gray-400">{time}</span>
                                </div>
                                <div className="relative  flex flex-col w-92 h-48">
                                    <span className="p-3">{text}</span>
                                </div>
                                <div className="flex flex-row justify-around pt-2 ">
                                    <button
                                        className="text-red-500 background-transparent font-medium text-center  px-6 py-2 hover:font-bold ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>)
}