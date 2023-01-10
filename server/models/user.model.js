import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: "Role",
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model("User", UserSchema);