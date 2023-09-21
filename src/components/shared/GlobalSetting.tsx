"use client"
import ChangePassword from '../auth/ChangePassword'
import LogoutBtn from './LogoutBtn'


export default function GlobalSetting() {

    return (
        <div className='relative  w-60'>
            <div className='p-2 flex flex-row justify-around'>
                <LogoutBtn />
                <ChangePassword />
            </div>
        </div>
    )
}


