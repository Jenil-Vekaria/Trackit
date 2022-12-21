import User from "../models/user.model.js";
import { canPerformAction } from '../util/utils.js';
import * as permissionCheck from "../util/permissionCheck.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { _id: 1, firstName: 1, lastName: 1, email: 1, roleId: 1 });
        return res.json({ users });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const userData = req.body;

    try {

        if (!canPerformAction(permissionCheck.canUpdateUserProfile, req.user)) {
            return res.status(403).json({ message: "You do not have permission update user profile" });
        }

        //check if user exists
        const existingUser = await User.findOne({ _id: userData._id });

        if (!existingUser) {
            return res.status(400).json({ message: "No user found" });
        }

        await User.findOneAndUpdate({ _id: userData._id }, userData);

        return res.json({ updatedUser: userData });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
