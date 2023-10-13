"use client"
import moment from "moment";
import GlobalSetting from "@/components/shared/GlobalSetting"
import LoadingStatus from "@/components/shared/LoadingStatus"
import SharedLink from "@/components/shared/SharedLink"
import { useGetMessagesBySenderIdQuery } from "@/redux/features/messageSlice"
import { useGetFriendUserNameByIdQuery } from "@/redux/features/friendSlice";
import MessageDetail from "@/components/friend/MessageDetail";
import { getExcerptedText } from "@/helpers/getExcerptedText";

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params
    const { data, isLoading } = useGetMessagesBySenderIdQuery(id)
    const { data: friendNameData, isLoading: isLoadingFriendName } = useGetFriendUserNameByIdQuery(id)
    return (
        <main className="relative flex min-h-screen flex-col items-center   p-24 overflow-scroll">
            <SharedLink hrefLink="/friend" btnText="Back" />
            {isLoadingFriendName && <LoadingStatus />}
            {!isLoadingFriendName && !isLoading && (
                !data?.data.length && <h1 className="mt-3">You have not received a message from {friendNameData?.data}</h1>)}
            {!isLoadingFriendName && <h1 className="mt-3 font-bold">Messages from {friendNameData?.data}</h1>}
            <ul className='flex flex-col justify-center  my-3'>
                {!isLoading && !!data?.data.length && data?.data.map((item: any) => {
                    return (
                        <li key={item._id} className='flex flex-row justify-between mb-3 w-96 hover:font-bold ease-linear transition-all duration-150'>
                            <span>{getExcerptedText(item.content)}</span>
                            <MessageDetail text={item.content} time={String(moment(item.createdAt).format("YYYY-MM-DD HH:mm"))} />
                        </li>
                    )
                })}
            </ul>
            <GlobalSetting />
        </main>
    )
}
