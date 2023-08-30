"use client"

import { useGetFriendsQuery } from '@/redux/features/friendSlice'
import React from 'react'
import Link from 'next/link'
import { User } from "../../../types";
import RemoveFriend from './RemoveFriend';
import LoadingMsg from '../shared/LoadingMsg';

export default function FriendList() {
    const { data: friendsList, isLoading } = useGetFriendsQuery()

    return (
        <section className="mb-5">
            {isLoading ? <LoadingMsg /> : !friendsList?.data?.length && (<h1>You do not have frient</h1>)}
            <ul>
                {!isLoading && !!friendsList?.data?.length && friendsList.data.map((item: Partial<User>) => {
                    return <li key={item._id} className='flex flex-row justify-between w-36 font-extrabold mb-4 hover:text-blue-900 active:text-blue-900 focus:text-blue-900'>
                        <Link href={`/friend/${item._id}`}>
                            {item.username}
                        </Link>
                        <RemoveFriend itemId={item._id} />
                    </li>
                }
                )}
            </ul>
        </section>)
}
