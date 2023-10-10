"use client"
import ChangePassword from './ChangePassword'
import LogoutBtn from './LogoutBtn'


export default function GlobalSetting() {
    return (
        <div className='absolute bottom-5 w-screen flex flex-row justify-around'>
            <LogoutBtn />
            <ChangePassword />
        </div>
    )
}


