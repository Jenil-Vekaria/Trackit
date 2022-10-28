import mongoose from "mongoose";
import Role from "../models/role.js";
import UserRole from "../models/userRole.js";
import * as permissionCheck from "../util/permissionCheck.js";
import { getUserRole } from "../util/utils.js";

export const addRole = async (req, res) => {
    const { name, permissions } = req.body;

    try {
        //Get user permssion
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canManageRole(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to add roles" });
        }

        const exisitingRole = await Role.findOne({ name });

        if (exisitingRole) {
            return res.status(400).json({ error: "Role already exist" });
        }

        await Role.create({ name, permissions });

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteRole = async (req, res) => {
    const { roleId } = req.body;

    try {
        //Get user permssion
        const userId = req.user._id;
        const userRole = await getUserRole(userId);


        if (!permissionCheck.canManageRole(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to delete roles" });
        }

        if (!mongoose.Types.ObjectId.isValid(roleId)) {
            return res.status(404).json({ error: "No roles found with that id" });
        }

        await Role.deleteOne({ _id: roleId });

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateRole = async (req, res) => {
    const { roleId, name, permissions } = req.body;

    try {
        //Get user permissions
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canManageRole(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to modify roles" });
        }

        if (!mongoose.Types.ObjectId.isValid(roleId)) {
            return res.status(404).json({ error: "No roles found with that id" });
        }

        await Role.findOneAndUpdate({ _id: roleId }, { name, permissions });

        return res.sendStatus(200);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }

};