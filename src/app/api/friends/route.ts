import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect()
export async function GET(request: NextRequest) {
    try {
        const { id } = await getDataFromToken(request);
        const userFriendList = await User.find({ _id: id }).select('friendList')
        const friendIds = userFriendList[0].friendList
        const friends = await User.find({
            _id: { $in: friendIds }
        }, "_id username")
        return NextResponse.json({
            data: friends
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(request: NextRequest) {
    try {
        //get friend email and check if friend exists
        const { email } = await request.json()
        const newFriend = await User.findOne({ email })
        if (!newFriend) {
            return NextResponse.json({ error: "Your friend has not joined" }, { status: 400 })
        }
        //get current user
        const { id } = await getDataFromToken(request);
        if (newFriend._id.toString() === id) {
            return NextResponse.json({ error: "You can not add yourself" }, { status: 400 });
        }
        const user = await User.findOne({ _id: id })
        if (user.friendList.includes(newFriend._id)) {
            return NextResponse.json({ error: "Already exist in friend list" }, { status: 400 });
        }
        user.friendList.push(newFriend._id)
        newFriend.friendList.push(id)
        await user.save();
        await newFriend.save();
        return NextResponse.json({ data: user.friendList }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}
