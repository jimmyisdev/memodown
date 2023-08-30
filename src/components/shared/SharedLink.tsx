import Link from 'next/link'
import React from 'react'

export default function SharedLink({ hrefLink, btnText }: { hrefLink: string, btnText: string }) {
    return (
        <Link href={hrefLink} className="text-blue-900 font-medium text-center m-1">{btnText}</Link >
    )
}
