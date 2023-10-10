import React from 'react'
import Image from 'next/image'

export default function LoadingPage() {
    return (
        <main className='h-screen flex flex-col justify-center items-center'>
            <Image
                src="/md_logo.png"
                width={100}
                height={100}
                priority={false}
                alt="Logo" className='animate-spin' />
        </main>
    )
}
