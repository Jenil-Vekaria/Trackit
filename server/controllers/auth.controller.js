import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email }).populate("roleId");

        if (!existingUser) {
            return res.status(400).json({ message: "Please provide a valid email address and password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Please provide a valid email address and password" });
        }

        const accessToken = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });

        return res.status(200).json({
            userProfile: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                _id: existingUser._id,
                roleId: existingUser.roleId,
            },
            accessToken
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

