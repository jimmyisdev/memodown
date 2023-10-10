"use client";
import React, { useCallback, useMemo } from "react";
import { AiFillCopy, AiFillDelete } from "react-icons/ai";
import { useDeleteNotizMutation } from "@/redux/features/notizSlice";
import EditNote from "./EditNote";
import { Notiz } from "../../../types";

export default function NoteRow({ data }: { data: Partial<Notiz> }) {
    const [deleteNotiz] = useDeleteNotizMutation()
    const { type = "", content = "", _id = "" } = data
    const porcessedContent = useMemo(() => content.length < 10 ? content : content.slice(0, 10) + "...", [content])
    const handleDeleteBtn = useCallback(() => deleteNotiz(_id), [deleteNotiz])
    const handleCopyBtn = async () => {
        if ('clipboard' in navigator) await navigator.clipboard.writeText(content);
        else return document.execCommand('copy', true, content);
    }
    return (
        <div className="flex flex-col mb-3">
            <div className="flex flex-row justify-between border-b-2 border-gray-900 hover:font-bold">
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
                    <EditNote data={data} />
                    <button className="w-full m-1 cursor-pointer hover:text-blue-900" onClick={handleDeleteBtn}><AiFillDelete /></button>
                    <button className="w-full m-1 cursor-pointer hover:text-blue-900" onClick={handleCopyBtn}><AiFillCopy /></button>
                </div>
            </div>
        </div>
    )
}