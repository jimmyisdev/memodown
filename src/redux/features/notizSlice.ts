import {
    createEntityAdapter,
    createSelector
} from "@reduxjs/toolkit";

import { Notiz } from "../../../types";
import { apiSlice } from "./apiSlice";

const notizsAdapter = createEntityAdapter<Notiz>({
    selectId: (notiz) => notiz._id,
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
})

const initialState = notizsAdapter.getInitialState()

type NotizsResponse = {
    data: Notiz[],
    error?: string
}

export const extendedApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotizs: builder.query<NotizsResponse, void>({
            query: () => 'notizs',
            providesTags: (result) =>
                result ?
                    [
                        ...result.data.map(({ _id }: { _id: string }) => ({ type: "Notizs", id: _id } as const)),
                        { type: "Notizs", id: "LIST" }
                    ] : [
                        { type: "Notizs", id: "LIST" }
                    ]
        }),
        createNotiz: builder.mutation<NotizsResponse, Partial<Notiz>>({
            query: (body) => ({
                url: 'notizs',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: "Notizs", id: "LIST" }]
        }),
        updateNotiz: builder.mutation<NotizsResponse, Partial<Notiz>>({
            query: body => ({
                url: `notizs/${body._id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: (result, error, { _id }) => [{ type: "Notizs", _id }]
        }),
        deleteNotiz: builder.mutation<NotizsResponse, string>({
            query: (id) => ({
                url: `notizs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Notizs", id }]
        })
    })
})

export const {
    useCreateNotizMutation,
    useDeleteNotizMutation,
    useGetNotizsQuery,
    useUpdateNotizMutation
} = extendedApi

export const selectNotizsResult = extendedApi.endpoints.getNotizs.select()

const selectNotizsData = createSelector(
    selectNotizsResult,
    notizsResult => notizsResult.data
)