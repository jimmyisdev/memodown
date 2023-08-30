import { connect } from "@/dbConfig/dbConfig";
import Notiz from "@/models/notizModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose"

connect()

export async function GET(request: NextRequest) {
    try {
        const id = request.url.slice(request.url.lastIndexOf('/') + 1)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Notiz Id is invalid" }, { status: 400 })
        }
        const notiz = await Notiz.findById({ _id: id });
        if (!notiz) {
            return NextResponse.json({ error: "Notiz does not exist" }, { status: 400 })
        }
        return NextResponse.json({ data: [notiz] }, { status: 400 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const id = request.url.slice(request.url.lastIndexOf('/') + 1)
        const reqBody = await request.json()
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Notiz Id is invalid" }, { status: 400 })
        }
        const notiz = await Notiz.findOneAndUpdate(
            { _id: id },
            {
                ...reqBody,
            },
            { new: true }
        );
        if (!notiz) {
            return NextResponse.json({ error: "Notiz does not exist" }, { status: 400 })
        }
        return NextResponse.json({ data: [notiz] }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });

    }
}
export async function DELETE(request: NextRequest) {
    try {
        const id = request.url.slice(request.url.lastIndexOf('/') + 1)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Notiz Id is invalid" }, { status: 400 })
        }
        const notiz = await Notiz.findOneAndDelete({ _id: id });
        if (!notiz) {
            return NextResponse.json({ error: "Notiz does not exist" }, { status: 400 })
        }
        return NextResponse.json({ data: [] }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });

    }
}
