import { useCreateNotizMutation } from '@/redux/features/notizSlice';
import React, { useEffect, useState } from 'react'
import NotizTypeSelector from './NotizTypeSelector';
import ErrorMsg from '../shared/ErrorMsg';
import { GrAddCircle } from "react-icons/gr";

export default function NotizGenerator() {
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [inputData, setInputData] = useState({
        type: '',
        content: ''
    })
    const [createNotiz, { isLoading, isError, isSuccess }] = useCreateNotizMutation()
    async function handleConfirmBtn() {
        if (inputData.content.length === 0 || inputData.type.length === 0) return setErrorMsg("Input a valid value")

        if (!!inputData.type && !!inputData.content) await createNotiz(inputData)
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
        setErrorMsg('')
        setInputData({
            type: '',
            content: ''
        })
    }
    useEffect(() => {
        if (isError) {
            setErrorMsg("Error from the server")
        }
    }, [isError])

    return (
        <>
            <button className='mx-2  px-4 py-2 pointer-events-auto' type="button" data-tooltip-target="create-note" onClick={() => setShowModal(true)}><GrAddCircle /></button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl font-semibold text-center text-blue-900">
                                        Add new note
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative  flex flex-col  p-3">
                                    <div className='w-auto flex flex-col justify-center'>
                                        <section className='my-1'>
                                            <NotizTypeSelector valGetter={handleOnChange} defaultVal='' />
                                        </section>
                                        <section className='my-1'>
                                            <textarea id="id" name="content" className='p-2' onChange={(e) => handleOnChange('content', e.target.value)} placeholder='想先寫下來...' rows={10} cols={25} />
                                        </section>
                                        {isError && <ErrorMsg />}
                                    </div>
                                    {!!errorMsg.length && <span className="text-red-500">{errorMsg}</span>}
                                    {isSuccess && <span className="text-blue-900">You have created a new note</span>}
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleCloseBtn}
                                    >
                                        Close
                                    </button>
                                    <button className='text-blue-900 font-medium text-center m-1 ' disabled={isLoading} onClick={handleConfirmBtn}>{isLoading ? "Loading " : "Confirm"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>)
}
