"use client";

import { AiFillDelete } from "react-icons/ai";
import { useRemoveFriendMutation } from '@/redux/features/friendSlice'
import React from 'react'
import Tooltip from "../shared/Tooltip";

export default function RemoveFriend({ itemId = "" }: { itemId?: string }) {
    const [removeFriend, { isLoading: isRemoveLoadin }] = useRemoveFriendMutation()
    async function handleRemoveBtn(itemId: string) {
        if (itemId) await removeFriend(itemId)
    }
    return (
        <Tooltip message='Delete friend'>
            <button className='text-blue-900 font-medium text-center cursor-pointer' disabled={isRemoveLoadin} onClick={() => handleRemoveBtn(itemId)}><AiFillDelete /></button>
        </Tooltip>
    )
}
