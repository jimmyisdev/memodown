import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import bcrypt from 'bcryptjs';

import { NextRequest, NextResponse } from "next/server";


connect()

export async function PUT(request: NextRequest) {
    try {
        console.log('change')
        const { id } = await getDataFromToken(request);
        const { password: newPassword } = await request.json()
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        const user = await User.findOneAndUpdate({ _id: id }, {
            password: hashedPassword
        }, { new: true })
        const response = NextResponse.json({
        }, { status: 200 })
        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}