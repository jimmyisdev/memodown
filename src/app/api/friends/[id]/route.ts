import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect()
export async function DELETE(request: NextRequest) {
    try {
        const friendId = request.url.slice(request.url.lastIndexOf('/') + 1)
        const { id } = await getDataFromToken(request);
        const user = await User.findById({ _id: id })
        const partner = await User.findById({ _id: friendId })
        user.friendList.pull(friendId);
        partner.friendList.pull(id);
        await user.save();
        return NextResponse.json({
            data: []
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const friendId = request.url.slice(request.url.lastIndexOf('/') + 1)
        const friendInfo = await User.find({ _id: friendId }, 'username')
        const friendName = friendInfo[0].username
        return NextResponse.json({
            data: friendName
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

