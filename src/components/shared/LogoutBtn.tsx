"use client"
import { useLogoutMutation } from '@/redux/features/authSlice'
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Tooltip from './Tooltip';

export default function LogoutBtn() {
    const router = useRouter();
    const [logout, { isLoading }] = useLogoutMutation()
    async function handleLogoutBtn() {
        await logout({})
        router.push("/login")
    }
    return (
        <Tooltip message='Logout'>
            <button className='mx-2  px-4 py-2 pointer-events-auto' disabled={isLoading} onClick={handleLogoutBtn}>{isLoading ? "Logging out..." : <FiLogOut />}</button>
        </Tooltip>
    )
}
