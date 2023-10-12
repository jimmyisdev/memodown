"use client"
import moment from "moment";
import GlobalSetting from "@/components/shared/GlobalSetting"
import LoadingStatus from "@/components/shared/LoadingStatus"
import SharedLink from "@/components/shared/SharedLink"
import { useGetMessagesBySenderIdQuery } from "@/redux/features/messageSlice"

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params
    const { data, isLoading } = useGetMessagesBySenderIdQuery(id)
    return (
        <main className="flex min-h-screen flex-col items-center  p-24 " >
            <SharedLink hrefLink="/friend" btnText="Back" />
            <ul className='flex flex-col justify-center  my-3'>
                {isLoading ? <LoadingStatus /> : !data?.data.length && <h1>No message</h1>}
                {!isLoading && !!data?.data.length && data?.data.map((item: any) => {
                    return (
                        <div key={item._id} className='flex flex-row justify-between mb-3 w-96'>
                            <span>{item.content}</span>
                            <span className="text-gray-400">{moment(item.createdAt).format("YYYY-MM-DD HH:mm")}</span>
                        </div>
                    )
                })}
            </ul>
            <GlobalSetting />

        </main>
    )
}
