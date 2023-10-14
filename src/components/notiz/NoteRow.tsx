"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { Notiz } from "../../../types";
import { AiFillCopy, AiFillDelete } from "react-icons/ai";
import { useDeleteNotizMutation } from "@/redux/features/notizSlice";
import EditNote from "@/components/notiz/EditNote";
import { getExcerptedText } from "@/helpers/getExcerptedText";

export default function NoteRow({ data }: { data: Partial<Notiz> }) {
    const [deleteNotiz, { isError }] = useDeleteNotizMutation()
    const { type = "", content = "", _id = "" } = data
    const handleDeleteBtn = useCallback(() => deleteNotiz(_id), [deleteNotiz])
    const handleCopyBtn = async () => {
        if ('clipboard' in navigator) await navigator.clipboard.writeText(content);
        else document.execCommand('copy', true, content);
        return toast.info('You have successfully copied the note text!')
    }
    useEffect(() => {
        if (isError) {
            toast.error('Error occured!')
        }
    }, [isError])
    return (
        <div className="flex flex-col mb-3 ">
            <div className={`flex flex-row justify-between p-2 border-b-2 border-gray-900  hover:font-bold ease-linear transition-all duration-250`}>
                <div className="flex flex-col justify-center items-center w-20  ">
                    <span className={`w-full ${type}  ease-linear transition-all duration-250`} >
                        {type.toUpperCase()}
                    </span>
                </div>
                <div className="flex flex-col justify-center items-center  w-44 ">
                    <span className="w-full" >
                        {`${getExcerptedText(content, 10)}`}
                    </span>
                </div>
                <div className=" flex flex-row hover:font-medium">
                    <EditNote data={data} />
                    <button className="w-full m-1 cursor-pointer hover:text-blue-900 ease-linear transition-all duration-250" onClick={handleDeleteBtn}><AiFillDelete /></button>
                    <button className="w-full m-1 cursor-pointer hover:text-blue-900 ease-linear transition-all duration-250" onClick={handleCopyBtn}><AiFillCopy /></button>
                </div>
            </div>
        </div>
    )
}