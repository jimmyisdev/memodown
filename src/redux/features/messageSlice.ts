import { apiSlice } from "./apiSlice";
import { Message } from "../../../types";

type messageResponse = {
    data: Message[],
    error?: any
}

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMessages: builder.query<messageResponse, void>({
            query: () => ({
                url: "messages",
                method: "GET",
            }),
            providesTags: (result): any => {
                result ?
                    [
                        ...result.data.map(({ _id }: { _id: string }) => ({ type: "Messages", id: _id } as const)),
                        { type: "Messages", id: "LIST" }
                    ] : [
                        { type: "Messages", id: "LIST" }
                    ]
            }
        }),
        getMessagesBySenderId: builder.query<messageResponse, string>({
            query: id => ({
                url: `messages/${id}`,
                method: "GET",
            }),
            providesTags: ["Messages"]
        }),
        sendMessage: builder.mutation({
            query: body => ({
                url: `messages`,
                method: "POST",
                body
            }),
            invalidatesTags: [{ type: "Messages", id: "LIST" }]
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `messages/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Messages", id }]
        }),
    }),
})


export const {
    useGetMessagesQuery,
    useDeleteMessageMutation,
    useSendMessageMutation,
    useGetMessagesBySenderIdQuery
} = messageApiSlice