import User from "../models/user.model.js";
import { canPerformAction } from '../util/utils.js';
import * as permissionCheck from "../util/permissionCheck.js";
import bcrypt from 'bcrypt';

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

        if (userData.password) {
            //Hash the password
            const hashedPassword = await bcrypt.hash(userData.password, +process.env.PASSWORD_SALT);
            userData.password = hashedPassword;
            delete userData.confirmPassword;
        }

        await User.findOneAndUpdate({ _id: userData._id }, userData);

        const user = await User.find({ _id: userData._id }, { _id: 1, firstName: 1, lastName: 1, email: 1, roleId: 1 });

        return res.json({ updatedUser: user });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
