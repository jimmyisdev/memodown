"use client"

import { useGetFriendsQuery } from '@/redux/features/friendSlice'
import React from 'react'
import Link from 'next/link'
import { User } from "../../../types";
import RemoveFriend from './RemoveFriend';
import LoadingMsg from '../shared/LoadingMsg';
import SendFriendMessage from './SendFriendMessage';
import { AiOutlineMessage } from "react-icons/ai";

export default function FriendList() {
    const { data: friendsList, isLoading } = useGetFriendsQuery()

    return (
        <section className="mb-5">
            {isLoading ? <LoadingMsg /> : !friendsList?.data?.length && (<h1>You do not have frient</h1>)}
            <ul>
                {!isLoading && !!friendsList?.data?.length && friendsList.data.map((item: User) => {
                    return <li key={item._id} className=' flex flex-row justify-between align-middle  font-extrabold mb-4 hover:text-blue-900 active:text-blue-900 focus:text-blue-900'>
                        {item.username}
                        <ul className='flex flex-row justify-end align-middle   w-40'>
                            <li className='mx-2'>
                                <Link className='text-blue-900 font-medium text-center cursor-pointer' href={`/friend/${item._id}`}>
                                    <AiOutlineMessage />
                                </Link>
                            </li>
                            <li className='mx-2'>
                                <RemoveFriend itemId={item._id} />
                            </li>
                            <li className='mx-2'>
                                <SendFriendMessage sendTo={item.username} />
                            </li>
                        </ul>
                    </li>
                }
                )}
            </ul>
        </section >)
}
