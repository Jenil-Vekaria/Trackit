import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    authorId: {
        type: mongoose.Types.ObjectId,
        required: true
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

export default mongoose.model("Project", ProjectSchema);