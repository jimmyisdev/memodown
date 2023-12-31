import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({}, {
            status: 200
        })
        response.cookies.set('token', '', { httpOnly: true })
        return response
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}