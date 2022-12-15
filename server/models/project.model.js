import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: "String",
        default: "--No Project Description--"
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    assignees: {
        type: [mongoose.Types.ObjectId],
        required: true,
        default: []
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