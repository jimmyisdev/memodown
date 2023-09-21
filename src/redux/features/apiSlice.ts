import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "memodown.vercel.app/" }),
    tagTypes: ['Auth', "Notizs", 'Friends', "Messages"],
    endpoints: builder => ({})
})