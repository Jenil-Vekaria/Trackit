import mongoose from "mongoose";
import Role from "../models/role.model.js";
import * as permissionCheck from "../util/permissionCheck.js";
import { canPerformAction } from "../util/utils.js";

export const getRoles = async (req, res) => {
    try {
        //Get user permssion
        if (!canPerformAction(permissionCheck.canManageRole, req.user)) {
            return res.status(403).json({ error: "Not authorized to view roles" });
        }

        const roles = await Role.find({});

        return res.json({ roles });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const addRole = async (req, res) => {
    const { name, permissions } = req.body;

    try {
        //Get user permssion
        if (!canPerformAction(permissionCheck.canManageRole, req.user)) {
            return res.status(403).json({ error: "Not authorized to add roles" });
        }

        const exisitingRole = await Role.findOne({ name });

        if (exisitingRole) {
            return res.status(400).json({ error: "Role already exist" });
        }

        const role = await Role.create({ name, permissions });

        return res.json({ role });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteRole = async (req, res) => {
    const { roleId } = req.params;

    try {
        //Get user permssion
        if (!canPerformAction(permissionCheck.canManageRole, req.user)) {
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
    const { roleId } = req.params;
    const { name, permissions } = req.body;

    try {
        //Get user permissions
        if (!canPerformAction(permissionCheck.canManageProject, req.user)) {
            return res.status(403).json({ error: "Not authorized to modify roles" });
        }

        if (!mongoose.Types.ObjectId.isValid(roleId)) {
            return res.status(404).json({ error: "No roles found with that id" });
        }

        const updatedRole = await Role.findOneAndUpdate({ _id: roleId }, { name, permissions }, { new: true });

        return res.json({ updatedRole });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }

};