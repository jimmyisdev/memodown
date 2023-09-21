"use client";
import React, { useCallback, useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiFillCopy, AiFillDelete } from "react-icons/ai";
import { useDeleteNotizMutation, useGetNotizsQuery } from "@/redux/features/notizSlice";
import NotizDetail from "./NotizDetail";
import { Notiz } from "../../../types";
import LoadingMsg from "../shared/LoadingMsg";
import Tooltip from "../shared/Tooltip";

export default function NotizContainer() {
    const { data, isFetching } = useGetNotizsQuery()

    return (
        <div className="p-1  w-96 h-92 overflow-scroll ">
            <NotizHead />
            <div className="overflow-scroll p-2">
                {isFetching ? <LoadingMsg /> : !data?.data?.length && (<span>No note</span>)}
                {!isFetching && !!data?.data?.length && data.data.map((item: Partial<Notiz>) => {
                    return <NotizRow key={item._id} data={item} />
                })}
            </div>
        </div>
    )
}

function NotizHead() {
    return (
        <div className="flex flex-row justify-between bg-blue-900 text-slate-100">
            <div className="flex flex-col justify-center items-center w-16 p-2 ">
                <span className="w-full">Type</span>
            </div>
            <div className="w-52 p-2">
                <span className="w-full">Excerpt</span>
            </div>
            <div className="w-18 p-2">
                <span className="w-full">Actions</span>
            </div>
        </div>
    )
}


function NotizRow({ data }: any) {
    const [showDetail, setShowDetail] = useState(false)
    const [deleteNotiz] = useDeleteNotizMutation()
    const { type, content, _id } = data
    const porcessedContent = useMemo(() => content.length < 10 ? content : content.slice(0, 10) + "...", [content])
    const handleDetailBtn = () => setShowDetail(!showDetail)
    const handleDeleteBtn = useCallback(() => deleteNotiz(_id), [deleteNotiz])
    const handleCopyBtn = async () => {
        if ('clipboard' in navigator) await navigator.clipboard.writeText(content);
        else return document.execCommand('copy', true, content);
    }
    return (
        <div className="flex flex-col mb-3">
            <div className="flex flex-row justify-between border-b-2 border-gray-900">
                <div className="flex flex-col justify-center items-center w-16 p-2 ">
                    <span className="w-full">
                        {type.toUpperCase()}
                    </span>
                </div>
                <div className="flex flex-col justify-center items-center  w-52 p-2 ">
                    <span className="w-full">
                        {`${porcessedContent}`}
                    </span>
                </div>
                <div className="w-18 p-2 flex flex-row ">
                    {/* <Tooltip message="See Details"> */}
                    <button className="w-full m-1 cursor-pointer" onClick={handleDetailBtn}><BsThreeDots /></button>
                    {/* </Tooltip> */}
                    {/* <Tooltip message="Delete Notiz"> */}
                    <button className="w-full m-1 cursor-pointer" onClick={handleDeleteBtn}><AiFillDelete /></button>
                    {/* </Tooltip> */}
                    {/* <Tooltip message="Copy Notiz Text"> */}
                    <button className="w-full m-1 cursor-pointer" onClick={handleCopyBtn}><AiFillCopy /></button>
                    {/* </Tooltip> */}
                </div>
            </div>
            {
                showDetail && (<NotizDetail data={data} />)
            }
        </div>
    )
}