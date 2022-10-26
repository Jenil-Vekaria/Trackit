import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permissions: {
        type: [String],
        required: true
    }
});

export default mongoose.model("Role", RoleSchema);