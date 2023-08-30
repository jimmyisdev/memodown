"use client"

import { ReactNode } from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { apiSlice } from './features/apiSlice'

export function ReduxProvider({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <ApiProvider api={apiSlice}>
                {children}
            </ApiProvider>
        </Provider>)
}