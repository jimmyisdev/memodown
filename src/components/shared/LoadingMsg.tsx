import React from 'react'

export default function LoadingMsg({ msg = "" }: { msg?: string }) {
    return (
        <h1 className='text-blue-900 text-3xl'>Loading {msg}.......</h1>
    )
}
