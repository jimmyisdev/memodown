import React from 'react'
import { notizTypeSelection } from '@/helpers/const'

export default function NotizTypeSelector({ valGetter, defaultVal = "" }: { valGetter: (name: string, val: string) => void, defaultVal: string | undefined }) {
    return (
        <select name="type" id="type" onChange={(e) => valGetter('type', e.target.value)} defaultValue={defaultVal.length ? defaultVal : ''}>
            <option value="">Note Type</option>
            {notizTypeSelection.map((item) => {
                return <option key={item} value={item}>{item.toUpperCase()}</option>
            })}
        </select>)

}
