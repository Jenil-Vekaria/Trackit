import mongoose from "mongoose";

const ProjectAssigneeSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
});

export default mongoose.model("Project Assignee", ProjectAssigneeSchema);