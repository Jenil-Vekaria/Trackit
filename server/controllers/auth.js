import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { validationResult } from "express-validator";
/*
    404 - Not found
    400 - Bad Request
    200 - OK
*/
const SECERET_KEY = "bug-tracker";
const EXPIRATION = "1h";
const PASSWORD_SALT = 12;


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "The email or password you've entered doesn't match any account" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "The email or password you've entered is incorrect" });
        }

        const accessToken = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECERET_KEY, { expiresIn: EXPIRATION });

        return res.status(200).json({
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            id: existingUser._id,
            accessToken
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Login - Something went wrong" });
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    //Validating user input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const message = errors.array()[0].msg;
        console.log(message);
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
        const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT);

        //Create user in database
        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });

        const accessToken = jwt.sign({ email: newUser.email, id: newUser._id }, SECERET_KEY, { expiresIn: EXPIRATION });

        return res.status(200).json({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            id: newUser._id,
            accessToken
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Signup - Something went wrong" });
    }
};


