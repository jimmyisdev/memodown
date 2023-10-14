"use client";
import React, { useEffect, useState, useRef } from 'react'
import { toast } from "react-toastify";
import { AiOutlineUserAdd } from "react-icons/ai";
import { generateErrorMsg } from '@/helpers/handelError';
import { useAddFriendMutation } from '@/redux/features/friendSlice';

export default function AddFriend() {
    const [email, setEmail] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null);
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
        if (isSuccess && inputRef.current) {
            toast.success("You have successfully added a new friend!")
            setEmail('')
            inputRef.current.value = '';
        }
    }, [isSuccess])

    useEffect(() => {
        if (inputRef.current != null) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <section className="mb-5 ">
            <div className="flex flex-row justify-between align-middle ">
                <input className="p-4  border-transparent focus:outline-none " ref={inputRef} placeholder="Add friend email" onChange={(e) => setEmail(e.target.value)} />
                <button className=' font-medium text-center  cursor-pointer hover:text-blue-900 ease-linear transition-all duration-150' disabled={isAddLoading} onClick={handleAddBtn}>{isAddLoading ? "Loading " : <AiOutlineUserAdd />}</button>
            </div>
        </section>)
}
