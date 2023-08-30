import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://memodown.vercel.app/api/" }),
    tagTypes: ['Auth', "Notizs", 'Friends', "Messages"],
    endpoints: builder => ({})
})