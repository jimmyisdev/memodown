import mongoose from "mongoose";

const notizSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Please provide type"],
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
    },
    createdBy: {
        type: String,
        ref: "users",
        required: [true, "Please provide user"],
    },
    isPublic: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Notiz = mongoose.models.notizs || mongoose.model('notizs', notizSchema)

export default Notiz