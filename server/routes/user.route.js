import express from 'express';
import { getAllUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/all", getAllUsers);

export default router;