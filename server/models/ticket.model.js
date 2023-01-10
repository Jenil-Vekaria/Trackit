import mongoose from "mongoose";

const TicketSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: mongoose.Types.ObjectId,
        ref: "TicketType",
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["Open", "In-Progress", "Done", "Archived"],
        default: "Open"
    },
    estimatedTime: {
        type: Number,
        required: true
    },
    estimatedTimeUnit: {
        type: String,
        enum: ["h", "d"],
        default: "h"
    },
    tags: {
        type: [String],
        default: []
    },
    assignees: {
        type: [mongoose.Types.ObjectId],
        ref: "User"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
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

export default mongoose.model("Ticket", TicketSchema);