import React from 'react'

export default function PageTopic({ topicText }: { topicText: string }) {
    return (
        <h1 className='m-2 text-center text-xl text-blue-900 font-bold'>{topicText}</h1>
    )
}
