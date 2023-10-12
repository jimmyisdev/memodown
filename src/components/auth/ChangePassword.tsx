"use client";
import { useChangePasswordMutation } from "@/redux/features/authSlice";
import { useEffect, useState } from "react";
import { MdPassword } from "react-icons/md";
import { toast } from "react-toastify";

export default function ChangePassword() {
    const [changePassword, { isLoading, isSuccess, isError }] = useChangePasswordMutation()
    const [showModal, setShowModal] = useState(false);
    const [inputData, setInputData] = useState({
        password: '',
        passwordCheck: ''
    })
    function handleOnChange(name: string, val: string) {
        if (!val.length) return
        setInputData({
            ...inputData,
            [name]: val
        })
    }

    async function handleConfirmBtn() {
        if (inputData.password.length === 0 || inputData.passwordCheck.length === 0) return toast.warning("Input a valid value")
        if (inputData.password != inputData.passwordCheck) return toast.warning("New password should be the same in both input fields")
        await changePassword({ password: inputData.password })
        setInputData({
            password: '',
            passwordCheck: ''
        })
    }
    function handleCloseBtn() {
        setShowModal(false)
        setInputData({
            password: '',
            passwordCheck: ''
        })
    }
    function handlOpenBtn() {
        setShowModal(true)
    }
    useEffect(() => {
        if (isError) {
            toast.error('Error from the server!')
        }
    }, [isError])
    useEffect(() => {
        if (isSuccess) {
            toast.success('You have successfully updated your new password!')
            setShowModal(false)
        }
    }, [isSuccess])



    return (
        <>
            <button className='mx-2  px-4 py-2 pointer-events-auto  hover:text-blue-900   ease-linear transition-all duration-250' type="button" data-tooltip-target="change-password" onClick={handlOpenBtn}><MdPassword /></button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-center p-5">
                                    <h3 className="text-xl font-semibold text-center text-blue-900">
                                        Change Password
                                    </h3>
                                </div>
                                <div className="relative  flex flex-col  p-3">
                                    <input className="p-3 mb-3 border-b-2 border-blue-900 border-transparent focus:outline-none" name="password" disabled={isLoading} type="password" placeholder="Input new password" onChange={(e) => handleOnChange('password', e.target.value)} />
                                    <input className="p-3 mb-3 border-b-2 border-blue-900 border-transparent focus:outline-none" name="password" disabled={isLoading} type="password" placeholder="Input new password again" onChange={(e) => handleOnChange('passwordCheck', e.target.value)} />
                                </div>
                                <div className="flex items-center  p-6  rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCloseBtn}
                                    >
                                        Close
                                    </button>
                                    <button type="button" className='bg-blue-900  active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-white  text-center cursor-pointer' disabled={isLoading} onClick={handleConfirmBtn}>{isLoading ? "Loading..." : "Confirm"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}