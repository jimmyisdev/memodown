"use client";
import React, { useEffect } from 'react'
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { useRemoveFriendMutation } from '@/redux/features/friendSlice'

export default function RemoveFriend({ itemId = "" }: { itemId?: string }) {
    const [removeFriend, { isLoading: isRemoveLoadin, isError, isSuccess }] = useRemoveFriendMutation()
    async function handleRemoveBtn(itemId: string) {
        if (itemId) await removeFriend(itemId)
    }
    useEffect(() => {
        if (isError) {
            toast('Error occured!')
        }
    }, [isError])
    useEffect(() => {
        if (isSuccess) {
            toast('You have successfully removed!')
        }
    }, [isSuccess])

    return (
        <button className='text-blue-900 font-medium text-center cursor-pointer' disabled={isRemoveLoadin} onClick={() => handleRemoveBtn(itemId)}><AiFillDelete /></button>
    )
}
