"use client";
import { BsThreeDots } from "react-icons/bs";

import { useSendMessageMutation } from "@/redux/features/messageSlice";
import React, { useCallback, useEffect, useState } from "react";
import { useUpdateNotizMutation } from "@/redux/features/notizSlice";
import NotizTypeSelector from "./NotizTypeSelector";
import { Notiz } from "../../../types";
import moment from "moment";
import { toast } from "react-toastify";


export default function EditNote({ data }: { data: Partial<Notiz> }) {
    const [showModal, setShowModal] = useState(false);
    const [updateNotiz, { isError, isLoading, isSuccess, reset }] = useUpdateNotizMutation()
    const { content, createdAt, type } = data;
    const [inputData, setInputData] = useState({
        content: content,
        type: type,
    })
    const handleUpdateBtn = useCallback(async () => {
        const returnedTarget = await {
            ...data,
            ...inputData
        }
        await updateNotiz(returnedTarget)
    }, [updateNotiz, inputData])

    function handleOnChange(name: string, val: string) {
        if (!val.length) return
        setInputData({
            ...inputData,
            [name]: val
        })
    }
    function handleOpenModalBtn() {
        setShowModal(true)
    }
    function handleCloseBtn() {
        setShowModal(false)
        setInputData({
            type: '',
            content: ''
        })
        reset()
    }

    useEffect(() => {
        if (isError) {
            toast('Error occured!')
        }
    }, [isError])
    useEffect(() => {
        if (isSuccess) {
            toast('You have successfully updated your note!')
            setShowModal(false)
        }
    }, [isSuccess])

    return (
        <>
            <button className='w-full m-1  hover:text-blue-900 font-medium text-center cursor-pointer ease-linear transition-all duration-250' type="button" data-tooltip-target="create-note" onClick={handleOpenModalBtn}><BsThreeDots /></button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-center p-5 ">
                                    <h3 className="text-xl font-semibold text-center text-blue-900">
                                        Edit Note
                                    </h3>
                                </div>
                                <div className="relative  flex flex-col  p-3">
                                    <div className="w-full ">
                                        <div className="flex flex-col m-2">
                                            <NotizTypeSelector valGetter={handleOnChange} defaultVal={type} />
                                        </div>
                                        <div className="flex flex-col justify-center items-center m-2 overflow-scroll">
                                            <textarea id="id" name="w3review" className='p-2 outline-none focus:outline-none' placeholder='Notiz Content' rows={5} cols={35} defaultValue={content} onChange={(e) => handleOnChange('content', e.target.value)} />
                                        </div>
                                        <div className="flex flex-col  items-end  m-2 text-gray-400">
                                            <span >Created on {moment(createdAt).format("YYYY-MM-DD HH:mm")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-around pt-2 ">
                                    <button
                                        className="text-red-500 background-transparent font-medium text-center  px-6 py-2 hover:font-bold ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCloseBtn}
                                    >
                                        Close
                                    </button>
                                    <button className='text-blue-900 font-medium text-center  px-6 py-2 hover:font-bold ease-linear transition-all duration-150' disabled={isLoading} onClick={handleUpdateBtn}>{isLoading ? "Loading " : "Update"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>)
}