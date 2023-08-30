import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Message from "@/models/messageModel";

connect()

//id refers to the sender ID
export async function GET(request: NextRequest) {
    console.log("get frinet mesg")
    try {
        const friendId = request.url.slice(request.url.lastIndexOf('/') + 1)
        const { id } = await getDataFromToken(request);
        const messages = await Message.find({ sentTo: id, sentBy: friendId, deletedByReceiver: false }).sort({
            createdAt: -1,
        });
        return NextResponse.json({
            data: messages
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

//id refers to the message
export async function DELETE(request: NextRequest) {
    try {
        const messageId = request.url.slice(request.url.lastIndexOf('/') + 1)
        const { id } = await getDataFromToken(request);
        await Message.findOneAndUpdate({ _id: messageId, sentTo: id }, {
            deletedByReceiver: true
        }, { new: true });
        return NextResponse.json({ data: [] }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
