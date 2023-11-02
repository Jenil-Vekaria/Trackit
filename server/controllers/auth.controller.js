import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Role from '../models/role.model.js';
import { validationResult } from "express-validator";
import * as Permissions from "../util/constants.js";
import mongoose, { Mongoose } from 'mongoose';
/*
    404 - Not found
    400 - Bad Request
    200 - OK
*/

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

        const accessToken = jwt.sign({ email: existingUser.email, id: existingUser._id, roleId: existingUser.roleId }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });

        return res.status(200).json({
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            _id: existingUser._id,
            roleId: existingUser.roleId,
            accessToken
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, roleId } = req.body;

    //Validating user input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const message = errors.array()[0].msg;
        return res.status(400).json({ message });
    }

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
        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword, roleId: new mongoose.Types.ObjectId(roleId) });

        const accessToken = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });

        return res.status(200).json({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            _id: newUser._id,
            roleId: newUser.roleId,
            accessToken
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

