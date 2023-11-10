import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
    const excludeUser = req.query.excludeUser;

    try {
        let findCondition = {};

        if (excludeUser === "true") {
            const userId = req.user._id;
            findCondition = { _id: { $ne: userId } };
        }

        const users = await User.find(findCondition, { _id: 1, firstName: 1, lastName: 1, email: 1, roleId: 1 })
            .populate({ path: "roleId", select: { name: 1 } });
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

export const updateUser = async (req, res) => {
    const userData = req.body;

    try {
        //ensure email is not a duplicate
        let existingUser = await User.findOne({ email: userData.email, _id: { $ne: userData._id } });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists, please try again" });
        }

        let user = await User.findOne({ _id: userData._id });

        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.email = userData.email;
        user.roleId = userData.roleId;

        if (userData.password) {
            //Hash the password
            const hashedPassword = await bcrypt.hash(userData.password, +process.env.PASSWORD_SALT);
            user.password = hashedPassword;
        }

        let updatedUser = await user.save({ new: true });
        updatedUser = await updatedUser.populate([{ path: "roleId" }]);

        updatedUser = updatedUser.toJSON();
        delete updatedUser.password;

        return res.json(updatedUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, roleId } = req.body;

    try {
        //Search if user exists in database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email you've provided already exist" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password don't match" });
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, +process.env.PASSWORD_SALT);

        //Create user in database
        let newUser = await User.create({ firstName, lastName, email, password: hashedPassword, roleId: new mongoose.Types.ObjectId(roleId) });
        newUser = await newUser.populate([{ path: "roleId", select: { name: 1 } }]);

        newUser = newUser.toJSON();
        delete newUser.password;

        return res.json(newUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};
