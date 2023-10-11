"use client";
import React from "react";
import { useGetNotizsQuery } from "@/redux/features/notizSlice";
import { Notiz } from "../../../types";
import LoadingMsg from "../shared/LoadingMsg";
import NoteHead from "./NoteHead";
import NoteRow from "./NoteRow";

export default function NotizContainer() {
    const { data, isFetching } = useGetNotizsQuery()
    return (
        <div className="w-96 h-92  bg-blue-100">
            <NoteHead />
            <div className="overflow-scroll p-2 h-64 ">
                {isFetching ? <LoadingMsg /> : !data?.data?.length && (<span>No note</span>)}
                {!isFetching && !!data?.data?.length && data.data.map((item: Partial<Notiz>) => {
                    return <NoteRow key={item._id} data={item} />
                })}
            </div>
        </div>
    )
}