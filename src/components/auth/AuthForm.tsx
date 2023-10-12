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
            <h1 className="text-xl font-medium text-center">{isLoading ? "isLoading" : type.toUpperCase()}</h1>
            <div className="flex flex-col">
                {type.toLowerCase() === "signup" && <input className="p-4 mt-1 border-transparent focus:outline-none" name="username" type="text" disabled={isLoading} placeholder="Input user name" onChange={(e) => handleOnChange('username', e.target.value)} />}
                <input className="p-4 mt-1 border-transparent focus:outline-none" name="email" type="email" disabled={isLoading} placeholder="example@gmail.com" onChange={(e) => handleOnChange('email', e.target.value)} />
                <input className="p-4 mt-1 border-transparent focus:outline-none" name="password" type="password" disabled={isLoading} placeholder="password" onChange={(e) => handleOnChange('password', e.target.value)} />
                <button className='hover:text-blue-900 font-medium text-center m-3 cursor-pointer' disabled={isLoading} onClick={handleConfirmBtn}>{isLoading ? "isLoading" : "Confirm"}</button>
            </div>
        </div>

    )
}

