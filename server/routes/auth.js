import express from 'express';
import { signup, login } from '../controllers/auth.js';
import { check } from 'express-validator';

const router = express.Router();

router.post("/signup", [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
    check("confirmPassword").not().isEmpty(),
    check("firstName", "Invalid first name").not().isEmpty(),
    check("lastName", "Invalid last name").not().isEmpty()
], signup);

router.post("/login", login);

export default router;