"use client"
import LoadingMsg from "@/components/shared/LoadingMsg"
import SharedLink from "@/components/shared/SharedLink"
import { useGetMessagesBySenderIdQuery } from "@/redux/features/messageSlice"

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params
    const { data, isLoading } = useGetMessagesBySenderIdQuery(id)

    return (
        <main className="flex min-h-screen flex-col items-center  p-24 " >
            <ul className='flex flex-col justify-center  my-3'>
                {isLoading ? <LoadingMsg /> : !data?.data.length && <h1>No message</h1>}
                {!isLoading && !!data?.data.length && data?.data.map((item: any) => {
                    return (
                        <div key={item._id} className='flex flex-row justify-between mb-3'>
                            <span>{item.content}</span>
                            <span>{item.createdAt}</span>
                        </div>
                    )
                })}
            </ul>
            <SharedLink hrefLink="/friend" btnText="Back" />
        </main>
    )
}
