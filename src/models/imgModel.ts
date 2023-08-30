import mongoose from "mongoose";

const imgSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    file: {
        data: Buffer,
        contentType: String,
    },
    uploadTime: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        // type: mongoose.Types.ObjectId,
        // ref: "User",
        // required: [true, "Please provide user"],
    },
}, { timestamps: true })

const Img = mongoose.models.imgs || mongoose.model('imgs', imgSchema)

export default Img