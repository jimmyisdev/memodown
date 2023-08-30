"use client";
import React, { useCallback, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useUpdateNotizMutation } from "@/redux/features/notizSlice";
import NotizTypeSelector from "./NotizTypeSelector";
import { Notiz } from "../../../types";
import Tooltip from "../shared/Tooltip";

export default function NotizDetail({ data }: { data: Partial<Notiz> }) {
    const [updateNotiz] = useUpdateNotizMutation()
    const { content, createdAt, type } = data;
    const [inputData, setInputData] = useState({
        content: content,
        type: type,
    })
    const handleUpdateBten = useCallback(async () => {
        const returnedTarget = await {
            ...data,
            ...inputData
        }
        await updateNotiz(returnedTarget)
    }, [updateNotiz, inputData])

    function handleOnChange(name: string, val: string) {
        if (!val.length) return
        setInputData({
            ...inputData,
            [name]: val
        })
    }
    return (
        <div className="w-full  bg-gray-100 ">
            <div className="flex flex-col m-2">
                <NotizTypeSelector valGetter={handleOnChange} defaultVal={type} />
            </div>
            <div className="flex flex-col justify-center items-center m-2 overflow-scroll">
                <textarea id="id" name="w3review" className='p-2' placeholder='Notiz Content' rows={5} cols={35} defaultValue={content} onChange={(e) => handleOnChange('content', e.target.value)} />
            </div>
            <div className="flex flex-flex justify-around items-center  m-2">
                <span >Created on {createdAt}</span>
                <Tooltip message="Edit Notiz">
                    <button className="cursor-pointer" onClick={handleUpdateBten}><AiFillEdit /></button>
                </Tooltip>
            </div>
        </div>
    )
}
