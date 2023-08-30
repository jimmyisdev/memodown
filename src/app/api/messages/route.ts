import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Message from "@/models/messageModel";

connect()
export async function GET(request: NextRequest) {
    try {
        const { id } = await getDataFromToken(request);
        const messages = await Message.find({ sentTo: id }).sort({
            createdAt: -1,
        });
        return NextResponse.json({
            data: messages
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { id } = await getDataFromToken(request);
        const message = await Message.create({
            ...reqBody,
            sentBy: id,
        })
        return NextResponse.json({ data: [message] }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}
