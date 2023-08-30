"use client"
import { useState } from 'react'
import ChangePasswordForm from '../auth/ChangePasswordForm'
import LogoutBtn from './LogoutBtn'
import { MdPassword } from "react-icons/md";


export default function GlobalSetting() {
    const [changePasswordOpen, setChangePasswordOpen] = useState(false)
    function handleChangePasswordBtn() {
        setChangePasswordOpen(!changePasswordOpen)
    }


    return (
        <div className='relative  w-60'>
            <div className='p-2 flex flex-row justify-around'>
                <LogoutBtn />
                <button className='mx-2 pointer-events-auto' data-tooltip-target="change-password" onClick={handleChangePasswordBtn}><MdPassword /></button>
            </div>
            <div className='absolute top-8 flex flex-col justify-center items-center w-60'>
                {changePasswordOpen && <ChangePasswordForm />}
            </div>
        </div>
    )
}
