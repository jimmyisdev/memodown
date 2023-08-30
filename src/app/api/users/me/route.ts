import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {
        const { id } = await getDataFromToken(request);

        //check if user exists
        const user = await User.findOne({ _id: id }, "_id username email")

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        const response = NextResponse.json({
            data: user
        }, { status: 200 })
        return response

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}