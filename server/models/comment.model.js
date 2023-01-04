import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    userId: {
        required: true,
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
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model("Comment", CommentSchema);