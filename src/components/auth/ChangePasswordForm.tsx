"use client";
import { useChangePasswordMutation } from "@/redux/features/authSlice";
import { useState } from "react";

export default function ChangePasswordForm() {
    const [changePassword, { isLoading, isSuccess, isError, error, data }] = useChangePasswordMutation()

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
        if (inputData.password != inputData.passwordCheck) {
            return
        }
        await changePassword({ password: inputData.password })
        setInputData({
            password: '',
            passwordCheck: ''
        })
    }

    return (< div className="flex flex-col  p-3">
        <h1 className="text-center mb-5 text-blue-900">Change Password</h1>
        <input className="p-3 mb-3 border-b-2 border-blue-900" name="password" disabled={isLoading} placeholder="Input new password" onChange={(e) => handleOnChange('password', e.target.value)} />
        <input className="p-3 mb-3 border-b-2 border-blue-900" name="password" disabled={isLoading} placeholder="Input new password again" onChange={(e) => handleOnChange('passwordCheck', e.target.value)} />
        <button className='text-blue-900 font-medium text-center cursor-pointer' disabled={isLoading} onClick={handleConfirmBtn}>{isLoading ? "loading..." : "Confirm"}</button>
    </div>


    )
}