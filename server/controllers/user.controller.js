import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { _id: 1, firstName: 1, lastName: 1, email: 1, roleId: 1 })
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
        const existingEmailUser = await User.findOne({ email: userData.email });

        if (existingEmailUser && userData._id !== existingEmailUser._id.toString()) {
            return res.status(400).json({ message: "Email already exists, please try again" });
        }

        if (userData.password) {
            //Hash the password
            const hashedPassword = await bcrypt.hash(userData.password, +process.env.PASSWORD_SALT);
            userData.password = hashedPassword;
            delete userData.confirmPassword;
        }

        await User.findOneAndUpdate({ _id: userData._id }, userData);

        const user = await User.findOne({ _id: userData._id }, { _id: 1, firstName: 1, lastName: 1, email: 1, roleId: 1 }).populate({ path: "roleId" });;

        return res.json({ updatedUser: user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};
