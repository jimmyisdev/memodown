"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "../../../types";
import { useGetFriendsQuery } from "@/redux/features/friendSlice";
import { useSendMessageMutation } from "@/redux/features/messageSlice";
import PageTopic from "@/components/shared/PageTopic";
import SharedLink from "@/components/shared/SharedLink";
import GlobalSetting from "@/components/shared/GlobalSetting";
import LoadingStatus from "@/components/shared/LoadingStatus";

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
        <main className="relative flex min-h-screen flex-col items-center  p-24 overflow-scroll">
            <SharedLink hrefLink="/" btnText="Back" />
            <PageTopic topicText="Send Message" />
            {isFetching && <LoadingStatus />}
            {
                !isFetching && (
                    <section className="flex flex-col">
                        <div>
                            <select name="sentTo" id="sentTo" onChange={(e) => handleOnChange('sentTo', e.target.value)}>
                                <option value="">To</option>
                                {!!friendsList?.data?.length && friendsList.data.map((item: Partial<User>) => {
                                    return <option key={`receiver_${item._id}`} value={item._id}>{item.username}</option>
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col justify-center items-center m-2 overflow-scroll">
                            <textarea name="message" className='p-2 border-transparent focus:outline-none' id="message" cols={30} rows={10} placeholder="write down..." onChange={(e) => handleOnChange('content', e.target.value)} />
                        </div>
                        <button className='hover:text-blue-900 hover:font-bold text-center m-1 ease-linear transition-all duration-150' disabled={isLoading} onClick={handleConfirmBtn}>{isLoading ? "Loading..." : "Send"}</button>
                    </section>
                )
            }
            <GlobalSetting />
        </main >
    )
}