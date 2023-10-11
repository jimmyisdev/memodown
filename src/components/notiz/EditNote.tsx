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
            <button className='w-full m-1  hover:text-blue-900 font-medium text-center cursor-pointer' type="button" data-tooltip-target="create-note" onClick={handleOpenModalBtn}><BsThreeDots /></button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl font-semibold text-center text-blue-900">
                                        Edit Note
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative  flex flex-col  p-3">
                                    <div className="w-full  bg-gray-100 ">
                                        <div className="flex flex-col m-2">
                                            <NotizTypeSelector valGetter={handleOnChange} defaultVal={type} />
                                        </div>
                                        <div className="flex flex-col justify-center items-center m-2 overflow-scroll">
                                            <textarea id="id" name="w3review" className='p-2 outline-none focus:outline-none' placeholder='Notiz Content' rows={5} cols={35} defaultValue={content} onChange={(e) => handleOnChange('content', e.target.value)} />
                                        </div>
                                        <div className="flex flex-flex justify-around items-center  m-2">
                                            <span >Created on {moment(createdAt).format()}</span>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCloseBtn}
                                    >
                                        Close
                                    </button>
                                    <button className="text-blue-900 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" disabled={isLoading} onClick={handleUpdateBtn}>{isLoading ? "Loading " : "Update"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>)
}