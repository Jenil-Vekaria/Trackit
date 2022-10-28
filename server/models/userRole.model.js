import mongoose from "mongoose";

const UserRoleSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

export default mongoose.model("UserRole", UserRoleSchema);