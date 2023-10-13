"use client"
import ChangePassword from '@/components/auth/ChangePassword'
import LogoutBtn from '@/components/auth/LogoutBtn'
export default function GlobalSetting() {
    return (
        <div className='absolute bottom-2 w-screen flex flex-row justify-around border-t pt-2'>
            <LogoutBtn />
            <ChangePassword />
        </div>
    )
}


