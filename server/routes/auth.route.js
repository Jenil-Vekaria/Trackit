import express from 'express';
import { login } from '../controllers/auth.controller.js';
import { validateResource } from "../middleware/middleware.js";
import { loginSchema } from "../schema/validation.schema.js";

const router = express.Router();

router.post("/login", validateResource(loginSchema), login);

export default router;