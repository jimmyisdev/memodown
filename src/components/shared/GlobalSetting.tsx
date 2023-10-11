"use client"
import ChangePassword from '../auth/ChangePassword'
import LogoutBtn from '../auth/LogoutBtn'


export default function GlobalSetting() {
    return (
        <div className='absolute bottom-5 w-screen flex flex-row justify-around border-t pt-2'>
            <LogoutBtn />
            <ChangePassword />
        </div>
    )
}


