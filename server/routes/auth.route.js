import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { validateResource } from "../middleware/middleware.js";
import { signupSchema, loginSchema } from "../schema/validation.schema.js";

const router = express.Router();

router.post("/signup", validateResource(signupSchema), signup);
router.post("/login", validateResource(loginSchema), login);

export default router;