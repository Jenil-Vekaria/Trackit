import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                return res.status(500).json({ error });
            }
            //Check if the user exists
            User.findOne({ _id: decoded.id }).then((user) => {
                if (user) {
                    req.user = user.toJSON();
                    return next();
                }
            }).catch((error) => {
                return res.status(403).json({ error: "User not found" });
            });

        });
    }
    else {
        return res.sendStatus(403);
    }
};


export const handleError = async (error, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        error: error.message
    });
};


export const routeNotFound = async (req, res) => {
    res.status(404).json({ error: "Route not found" });
};


export const validateResource = (resourceSchema) => {
    return (req, res, next) => {
        resourceSchema.validate(req.body)
            .then((valid) => {
                next();
            })
            .catch((err) => {
                res.status(400).json({ error: err.errors[0] });
            });
    };
};

export const validateParamId = (paramId) => {
    return (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params[paramId])) {
            return res.status(403).json({ message: `Invalid ${paramId}` });
        }

        next();
    };
}

