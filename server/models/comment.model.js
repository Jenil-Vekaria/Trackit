import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    userId: {
        required: true,
        ref: "User",
        type: mongoose.Types.ObjectId
    },
    text: {
        required: true,
        type: String
    },
    ticketId: {
        required: true,
        type: mongoose.Types.ObjectId
    },
    createdOn: {
        required: true,
        type: Date
    },
    updatedOn: {
        required: true,
        type: Date
    }
});

export default mongoose.model("Comment", CommentSchema);