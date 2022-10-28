import jwt from "jsonwebtoken";

export const generateAccessToken = (email, id) => {
    return jwt.sign({ email, id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });
};
