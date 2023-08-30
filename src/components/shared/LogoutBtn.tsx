import { useLazyLogoutQuery } from '@/redux/features/authSlice'
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
    const router = useRouter();
    const [trigger, { isFetching }] = useLazyLogoutQuery()
    async function handleLogoutBtn() {
        await trigger()
        router.push("/")
    }
    return (
        <button className='pointer-events-auto' disabled={isFetching} onClick={handleLogoutBtn}>{isFetching ? "Logging out..." : <FiLogOut />}</button>
    )
}
