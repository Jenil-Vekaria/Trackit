import mongoose from "mongoose";
import Role from "../models/role.model.js";

export const getUserRole = async (roleId) => {

    try {
        const role = await Role.findOne({ _id: roleId });

        if (!role)
            throw "Role not found";

        return role;
    } catch (error) {
        console.error(error);
    }
};


export const canPerformAction = async (permissionCheck, user) => {
    const roleId = user.roleId;
    const roleObject = await getUserRole(roleId);

    return permissionCheck(roleObject.permissions);
};

export const validateObjectId = (id, message, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).json({ message });
    }
};
