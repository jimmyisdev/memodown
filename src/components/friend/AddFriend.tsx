"use client";

import { AiOutlineUserAdd } from "react-icons/ai";
import React, { useEffect, useState } from 'react'
import { generateErrorMsg } from '@/helpers/handelError';
import { useAddFriendMutation } from '@/redux/features/friendSlice';
import { toast } from "react-toastify";

export default function AddFriend() {
    const [email, setEmail] = useState('')
    const [addFriend, { isSuccess, isLoading: isAddLoading, isError }] = useAddFriendMutation()
    async function handleAddBtn() {
        if (email.length === 0) return toast.warning("Input valid email")
        try {
            if (email) await addFriend(email).unwrap()
            setEmail("")
        } catch (error) {
            const errorMsg = generateErrorMsg(error)
            toast.error(errorMsg)
        }
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("You have successfully added a new friend!")
            setEmail('')
        }
    }, [isSuccess])

    return (
        <section className="mb-5 ">
            <div className="flex flex-row justify-between align-middle ">
                <input className="p-4 mt-1 border-transparent focus:outline-none" placeholder="Add friend email" onChange={(e) => setEmail(e.target.value)} />
                <button className='text-blue-900 font-medium text-center m-1 cursor-pointer' disabled={isAddLoading} onClick={handleAddBtn}>{isAddLoading ? "Loading " : <AiOutlineUserAdd />}</button>
            </div>
        </section>)
}
