import express from 'express';
import { addRole } from '../controllers/role.js';

const router = express.Router();

router.post("/", addRole);

export default router;