import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
    tagTypes: ['Auth', "Notizs", 'Friends', "Messages"],
    endpoints: builder => ({})
})