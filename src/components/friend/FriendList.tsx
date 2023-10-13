"use client"
import React from 'react'
import Link from 'next/link'
import { AiOutlineMessage } from "react-icons/ai";
import { User } from "../../../types";
import { useGetFriendsQuery } from '@/redux/features/friendSlice'
import RemoveFriend from '@/components/friend/RemoveFriend';
import LoadingStatus from '@/components/shared/LoadingStatus';
import SendFriendMessage from '@/components/friend/SendFriendMessage';

export default function FriendList() {
    const { data: friendsList, isLoading } = useGetFriendsQuery()
    return (
        <section className="w-96 h-92 ">
            {isLoading ? <LoadingStatus /> : !friendsList?.data?.length && (<h1>You do not have friend</h1>)}
            <div className="overflow-scroll p-2 h-64 ">
                {!isLoading && !!friendsList?.data?.length && friendsList.data.map((item: User) => {
                    return <li key={item._id} className=' flex flex-row justify-between align-middle mb-4 '>
                        <h1 className=' hover:font-bold ease-linear transition-all duration-250'>{item.username}</h1>
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
                                <SendFriendMessage friendId={item._id} friendName={item.username} />
                            </li>
                        </ul>
                    </li>
                }
                )}
            </div>
        </section >)
}
