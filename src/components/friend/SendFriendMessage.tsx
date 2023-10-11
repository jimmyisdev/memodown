import React, { useEffect, useState } from 'react'
import { AiOutlineSend } from "react-icons/ai";
import { useSendMessageMutation } from "@/redux/features/messageSlice";
import { toast } from 'react-toastify';

export default function SendFriendMessage({ sendTo = "" }: { sendTo: string }) {
    const [showModal, setShowModal] = useState(false);
    const [sendMessage, { isLoading, isError, isSuccess, reset }] = useSendMessageMutation()
    const [inputData, setInputData] = useState({
        sentTo: sendTo,
        content: ''
    })
    function handleOpenModalBtn() {
        handleOnChange("sentTo", sendTo)
        setShowModal(true)
    }
    async function handleConfirmBtn() {
        if (!!inputData.sentTo && !!inputData.content) await sendMessage(inputData)
        else return toast("Please input valid value")
    }
    function handleOnChange(name: string, val: string) {
        console.log(val)
        if (!val.length) return
        setInputData({
            ...inputData,
            [name]: val
        })
    }
    function handleCloseBtn() {
        setShowModal(false)
        setInputData({
            sentTo: '',
            content: ''
        })
        reset()
    }


    useEffect(() => {
        if (isError) {
            toast.error('Error occured!')
        }
    }, [isError])
    useEffect(() => {
        if (isSuccess) {
            toast.success('You have successfully sent message!')
            setShowModal(false)
        }
    }, [isSuccess])

    return (
        <>
            <button className='text-blue-900 font-medium text-center cursor-pointer' type="button" data-tooltip-target="create-note" onClick={handleOpenModalBtn}><AiOutlineSend /></button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl font-semibold text-center text-blue-900">
                                        Send to {sendTo}
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative  flex flex-col  p-3">
                                    <div className='w-auto flex flex-col justify-center'>

                                        <div className="flex flex-col justify-center items-center m-2 overflow-scroll">
                                            <textarea name="message" className='p-2 border-transparent focus:outline-none' id="message" cols={30} rows={10} placeholder="write down..." onChange={(e) => handleOnChange('content', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCloseBtn}
                                    >
                                        Close
                                    </button>
                                    <button className="text-blue-900 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" disabled={isLoading} onClick={handleConfirmBtn}>{isLoading ? "Loading " : "Send"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>)
}