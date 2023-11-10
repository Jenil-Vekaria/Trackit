import express from 'express';
import { getAllUsers, updateUser, createUser } from '../controllers/user.controller.js';
import { validateResource } from '../middleware/middleware.js';
import { createUserSchema } from '../schema/validation.schema.js';

const router = express.Router();

router.get("/all", getAllUsers);
router.patch("/update", updateUser);
router.patch("/updateMyProfile", validateResource(createUserSchema), updateUser);
router.post("/create", validateResource(createUserSchema), createUser);

export default router;