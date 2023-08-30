import { useGetMessagesBySenderIdQuery } from '@/redux/features/messageSlice'

export const preload = (id: string) => {
    // void evaluates the given expression and returns undefined
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void

    void useGetMessagesBySenderIdQuery(id)
}
export default function MessageItem({ id }: { id: string }) {
    // const result =  useGetMessagesBySenderIdQuery(id)
    // ...
}