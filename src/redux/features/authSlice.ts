import {
    createEntityAdapter,
    createSelector
} from "@reduxjs/toolkit";

import { apiSlice } from "./apiSlice";
import { AuthState, User } from "../../../types";

type UserInfo = {
    email: string,
    id: string,
    username: string
}
type LoginParms = {
    email: string,
    password: string,
}

type LoginResponse = {
    data: UserInfo
}
const authAdapter = createEntityAdapter<UserInfo>()
const initialState = authAdapter.getInitialState({
    username: '',
    email: '',
    id: ''
})

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signup: builder.mutation({
            query: (data) => ({
                url: "users/signup",
                method: "POST",
                body: data
            })
        }),
        login: builder.mutation<LoginResponse, LoginParms>({
            query: data => ({
                url: "users/login",
                method: "POST",
                body: data
            }),
        }),
        logout: builder.query<{}, void>({
            query: () => ({
                url: "users/logout",
            })
        }),
        verify: builder.mutation({
            query: token => ({
                url: "users/verify",
                body: token
            })
        }),
        getUserInfo: builder.query<any, void>({
            query: () => 'users/me',
            providesTags: ["Auth"]
        }),
        changePassword: builder.mutation({
            query: data => ({
                url: "users/change_password",
                method: "PUT",
                body: data
            }),
        })
    }),
})


export const {
    useSignupMutation,
    useLoginMutation,
    useVerifyMutation,
    useLazyLogoutQuery,
    useGetUserInfoQuery,
    useChangePasswordMutation
} = authApiSlice


// export const selectUsersResult = authApiSlice.endpoints.login.select()

// export const selectUsersData = createSelector(
//     selectUsersResult,
//     state => state.data?.data,


//     () => {
//         // return data
//     }
//     // usersResult => usersResult.data
// )



// export const { } = authAdapter.getSelectors((state) => selectUsersData(state))


// export const { selectAll: selectAllUsers } =
//     authAdapter.getSelectors((state) => state)