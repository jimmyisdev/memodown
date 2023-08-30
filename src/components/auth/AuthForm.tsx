"use client";
import { useState } from "react";

export default function AuthForm({ type = '', isLoading = false, handler }: { type: string, isLoading: boolean, handler: Function }) {
    const [inputData, setInputData] = useState({
        username: "",
        email: '',
        password: ''
    })
    function handleOnChange(name: string, val: string) {
        if (!val.length) return
        setInputData({
            ...inputData,
            [name]: val
        })
    }
    async function handleConfirmBtn() {
        await handler(inputData)
        setInputData({
            username: "",
            email: '',
            password: ''
        })
    }
    return (
        <div className="flex flex-col border border-cyan-950s p-4 mb-2">
            <h1>{isLoading ? "isLoading" : type.toUpperCase()}</h1>
            <div className="flex flex-col">
                {type.toLowerCase() === "signup" && <input className="p-4 mt-1" name="username" disabled={isLoading} placeholder="Input user name" onChange={(e) => handleOnChange('username', e.target.value)} />}
                <input className="p-4 mt-1" name="email" disabled={isLoading} placeholder="example@gmail.com" onChange={(e) => handleOnChange('email', e.target.value)} />
                <input className="p-4 mt-1" name="password" disabled={isLoading} placeholder="Input password" onChange={(e) => handleOnChange('password', e.target.value)} />
                <button className='text-blue-900 font-medium text-center m-3 cursor-pointer' disabled={isLoading} onClick={handleConfirmBtn}>{isLoading ? "isLoading" : "Confirm"}</button>
            </div>
        </div>

    )
}

