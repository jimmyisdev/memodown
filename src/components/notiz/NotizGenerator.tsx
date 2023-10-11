import { useCreateNotizMutation } from '@/redux/features/notizSlice';
import React, { useEffect, useState } from 'react'
import NotizTypeSelector from './NotizTypeSelector';
import { GrAddCircle } from "react-icons/gr";
import { toast } from 'react-toastify';
export default function NotizGenerator() {
    const [showModal, setShowModal] = useState(false);
    const [inputData, setInputData] = useState({
        type: '',
        content: ''
    })
    const [createNotiz, { isLoading, isError, isSuccess }] = useCreateNotizMutation()
    async function handleConfirmBtn() {
        if (!!inputData.type && !!inputData.content) await createNotiz(inputData)
        else return toast.warning("Input a valid value")
    }
    function handleOnChange(name: string, val: string) {
        if (!val.length) return
        setInputData({
            ...inputData,
            [name]: val
        })
    }
    function handleCloseBtn() {
        setShowModal(false)
        setInputData({
            type: '',
            content: ''
        })
    }

    useEffect(() => {
        if (isError) {
            toast.error('Error occured!')
        }
    }, [isError])
    useEffect(() => {
        if (isSuccess) {
            toast.success('You have created a new note!')
            setShowModal(false)
        }
    }, [isSuccess])

    return (
        <>
            <button className='mx-2  px-4 py-2 pointer-events-auto' type="button" data-tooltip-target="create-note" onClick={() => setShowModal(true)}><GrAddCircle /></button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-center p-5 rounded-t">
                                    <h3 className="text-xl font-semibold text-center text-blue-900">
                                        Add Note
                                    </h3>
                                </div>
                                <div className="relative  flex flex-col  p-3">
                                    <div className='w-auto flex flex-col justify-center'>
                                        <section className='my-1'>
                                            <NotizTypeSelector valGetter={handleOnChange} defaultVal='' />
                                        </section>
                                        <section className='my-1'>
                                            <textarea id="id" name="content" className='p-2 border-transparent focus:outline-none' onChange={(e) => handleOnChange('content', e.target.value)} placeholder='write down...' rows={10} cols={25} />
                                        </section>
                                    </div>
                                </div>
                                <div className="  flex flex-row justify-around border-t pt-2 ">
                                    <button
                                        className="text-red-500 background-transparent font-medium text-center  px-6 py-2 hover:font-bold ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCloseBtn}
                                    >
                                        CLOSE
                                    </button>
                                    <button className='text-blue-900 font-medium text-center  px-6 py-2 hover:font-bold ease-linear transition-all duration-150' disabled={isLoading} onClick={handleConfirmBtn}>{isLoading ? "LOADING..." : "CONFIRM"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>)
}
