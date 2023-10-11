"use client";

import PageTopic from "@/components/shared/PageTopic";
import SharedLink from "@/components/shared/SharedLink";
import { useGetFriendsQuery } from "@/redux/features/friendSlice";
import { User } from "../../../types";
import { useEffect, useState } from "react";
import { useSendMessageMutation } from "@/redux/features/messageSlice";
import GlobalSetting from "@/components/shared/GlobalSetting";
import { toast } from "react-toastify";
import LoadingMsg from "@/components/shared/LoadingMsg";

export default function Page() {
    const { data: friendsList, isFetching } = useGetFriendsQuery()
    const [sendMessage, { isLoading, isSuccess, isError }] = useSendMessageMutation()
    const [inputData, setInputData] = useState({
        sentTo: '',
        content: ''
    })
    async function handleConfirmBtn() {
        if (!!inputData.sentTo && !!inputData.content) await sendMessage(inputData)
        else return toast.error("Please input valid value!")
    }
    function handleOnChange(name: string, val: string) {
        if (!val.length) return
        setInputData({
            ...inputData,
            [name]: val
        })
    }

    useEffect(() => {
        if (isError) {
            toast.error('Error occured!')
        }
    }, [isError])
    useEffect(() => {
        if (isSuccess) {
            toast.success('You have successfully sent message!')
        }
    }, [isSuccess])

    return (
        <main className="flex min-h-screen flex-col items-center p-24 ">
            <SharedLink hrefLink="/" btnText="Back" />
            <PageTopic topicText="Message" />
            {isFetching && <LoadingMsg />}

            {
                !isFetching && (
                    <section className="flex flex-col">
                        <div>
                            <select name="sentTo" id="sentTo" onChange={(e) => handleOnChange('sentTo', e.target.value)}>
                                <option value="">Send To</option>
                                {!!friendsList?.data?.length && friendsList.data.map((item: Partial<User>) => {
                                    return <option key={`receiver_${item._id}`} value={item._id}>{item.username}</option>
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col justify-center items-center m-2 overflow-scroll">
                            <textarea name="message" className='p-2 border-transparent focus:outline-none' id="message" cols={30} rows={10} placeholder="write down..." onChange={(e) => handleOnChange('content', e.target.value)} />
                        </div>
                        <button className='hover:text-blue-900 font-medium text-center m-1 ' disabled={isLoading} onClick={handleConfirmBtn}>{isLoading ? "Loading..." : "Send"}</button>
                    </section>
                )
            }
            <GlobalSetting />
        </main >
    )
}