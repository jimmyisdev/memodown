import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please provide content'],
    },
    sentBy: {
        type: String,
        ref: "users",
        required: [true, "Please provide sender"],
    },
    sentTo: {
        type: String,
        ref: "users",
        required: [true, "Please provide receiver"],
    },
    replyTo: {
        type: String,
        ref: "messages",
    },
    deletedBySender: {
        type: Boolean,
        default: false
    },
    deletedByReceiver: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Message = mongoose.models.messages || mongoose.model('messages', messageSchema)

export default Message