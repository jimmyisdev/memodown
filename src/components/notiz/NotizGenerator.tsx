import { useCreateNotizMutation } from '@/redux/features/notizSlice';
import React, { useState } from 'react'
import { AiOutlineUpCircle, AiOutlineDownCircle } from "react-icons/ai";
import NotizTypeSelector from './NotizTypeSelector';
import ErrorMsg from '../shared/ErrorMsg';

export default function NotizGenerator() {
    const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)
    const [inputData, setInputData] = useState({
        type: '',
        content: ''
    })
    const [createNotiz, { isLoading, isError }] = useCreateNotizMutation()
    async function handleConfirmBtn() {
        if (!!inputData.type && !!inputData.content) await createNotiz(inputData)
    }
    function handleOnChange(name: string, val: string) {
        if (!val.length) return
        setInputData({
            ...inputData,
            [name]: val
        })
    }

    return (
        <>
            {
                isGeneratorOpen && (<>
                    <div className='w-auto flex flex-col justify-center'>
                        <section className='my-1'>
                            <NotizTypeSelector valGetter={handleOnChange} defaultVal='' />
                        </section>
                        <section className='my-1'>
                            <textarea id="id" name="content" className='p-2' onChange={(e) => handleOnChange('content', e.target.value)} placeholder='想先寫下來...' rows={10} cols={25} />
                        </section>
                        {isError && <ErrorMsg />}
                        <button className='text-blue-900 font-medium text-center m-1 ' disabled={isLoading} onClick={handleConfirmBtn}>{isLoading ? "Loading " : "Confirm"}</button>
                    </div>
                </>)
            }
            <button className='cursor-pointer' onClick={() => setIsGeneratorOpen(!isGeneratorOpen)}>{isGeneratorOpen ? <AiOutlineUpCircle /> : <AiOutlineDownCircle />}</button>
        </>)
}
