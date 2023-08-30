import React from 'react'

type ErrorMsg = {
    error?: string
}

const ErrorMsg: React.FC<ErrorMsg> = ({ error = 'Error occured' }) => {
    return (
        <h1 className='text-red-500 m-2' > {error}</h1>
    )
}

export default ErrorMsg
