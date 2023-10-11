"use client"
import { useLogoutMutation } from '@/redux/features/authSlice'
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { toast } from "react-toastify";

export default function LogoutBtn() {
    const router = useRouter();
    const [logout, { isLoading, isSuccess, isError }] = useLogoutMutation()
    async function handleLogoutBtn() {
        await logout({})
        router.push("/login")
    }
    useEffect(() => {
        if (isSuccess) {
            toast.info('Logout Success!')
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.error('Error occured!')
        }
    }, [isError])

    return (
        <button className='mx-2  px-4 py-2 pointer-events-auto hover:text-blue-900' disabled={isLoading} onClick={handleLogoutBtn}>{isLoading ? "Logging out..." : <FiLogOut />}</button>
    )
}
