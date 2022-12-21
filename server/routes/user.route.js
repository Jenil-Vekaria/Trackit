import express from 'express';
import { getAllUsers, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/all", getAllUsers);
router.patch("/update", updateUser);

export default router;