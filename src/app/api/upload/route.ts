import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import multer from "multer"
import Img from "@/models/imgModel";
// import Binary from "mo"

connect()

export async function POST(request: NextRequest) {
    // const { base64 } = request.body
    console.log(request, "up image")

    try {
        const data = await request.formData();

        // if (!request.file) {

        // }
        let imageUploadObject = {
            file: {
                // data: request?.file.buffer
                // contentType: request.body .
            },
            // fileName:
        }
        const uploadObject = new Img(imageUploadObject);
        const uploadProcess = await uploadObject.save();



        // if (!req.file) {
        //     res.json({
        //       success: false,
        //       message: "You must provide at least 1 file"
        //     });
        //   } else {
        //     let imageUploadObject = {
        //       file: {
        //         data: req.file.buffer,
        //         contentType: req.file.mimetype
        //       },
        //       fileName: req.body.fileName
        //     };
        //     const uploadObject = new Upload(imageUploadObject);
        //     // saving the object into the database
        //     const uploadProcess = await uploadObject.save();



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}