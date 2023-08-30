import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
    error: unknown
): error is { message: string } {
    return (
        typeof error === 'object' &&
        error != null &&
        'message' in error &&
        typeof (error as any).message === 'string'
    )
}

export function generateErrorMsg(error: any) {
    if (isFetchBaseQueryError(error)) {
        const errorMsg: any = 'error' in error ? error.error : error?.data;
        const processed = String('error' in errorMsg ? errorMsg.error : errorMsg)
        return processed
    } else if (isErrorWithMessage(error)) {
        return error.message
    } else return "Error occured"
}