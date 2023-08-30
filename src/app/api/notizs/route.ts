import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Notiz from "@/models/notizModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()
export async function GET(request: NextRequest) {
    try {
        const { id } = await getDataFromToken(request);
        const notizs = await Notiz.find({ createdBy: id }).sort({
            createdAt: -1,
        });
        return NextResponse.json({
            data: notizs
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { id } = await getDataFromToken(request);
        reqBody.createdBy = id;
        const notiz = await Notiz.create({
            ...reqBody
        })
        return NextResponse.json({ data: [notiz] }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}
