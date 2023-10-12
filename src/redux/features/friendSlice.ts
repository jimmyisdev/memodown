import {
    createEntityAdapter,
} from "@reduxjs/toolkit";

import { apiSlice } from "./apiSlice";
import { AuthState, User } from "../../../types";

const friendAdapter = createEntityAdapter<AuthState>()
type FriendsResponse = {
    data: User[],
    error?: string
}
type FriendUserName = {
    data: string,
    error?: string
}

export const friendApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFriends: builder.query<FriendsResponse, void>({
            query: () => 'friends',
            providesTags: result =>
                result ?
                    [
                        ...result.data.map(({ _id }: { _id: string }) => ({ type: "Friends", id: _id } as const)),
                        { type: "Friends", id: "LIST" }
                    ] : [
                        { type: "Friends", id: "LIST" }
                    ]
        }),
        getFriendUserNameById: builder.query<FriendUserName, string>({
            query: (id) => ({
                url: `friends/${id}`,
                method: "GET",
            }),
        }),
        addFriend: builder.mutation<Partial<User>, string>({
            query: email => ({
                url: `friends`,
                method: "POST",
                body: {
                    email
                }
            }),
            invalidatesTags: [{ type: "Friends", id: "LIST" }]
        }),
        removeFriend: builder.mutation({
            query: (id) => ({
                url: `friends/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Friends", id }]
        }),
    }),
})


export const {
    useGetFriendsQuery,
    useAddFriendMutation,
    useRemoveFriendMutation,
    useGetFriendUserNameByIdQuery
} = friendApiSlice



export const useuseGetFriendsState = friendApiSlice.endpoints.getFriends.useQueryState;

