"use client";
import React from "react";
import { useGetNotizsQuery } from "@/redux/features/notizSlice";
import { Notiz } from "../../../types";
import LoadingStatus from "../shared/LoadingStatus";
import NoteHead from "./NoteHead";
import NoteRow from "./NoteRow";

export default function NotizContainer() {
    const { data, isFetching } = useGetNotizsQuery()
    return (
        <div className="w-80 h-92  ">
            <NoteHead />
            <div className="overflow-scroll p-2 h-64 ">
                {isFetching ? <LoadingStatus /> : !data?.data?.length && (<span>You do not have a note</span>)}
                {!isFetching && !!data?.data?.length && data.data.map((item: Partial<Notiz>) => {
                    return <NoteRow key={item._id} data={item} />
                })}
            </div>
        </div>
    )
}