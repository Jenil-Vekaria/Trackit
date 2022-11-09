import express from 'express';
import { addRole, deleteRole, updateRole } from '../controllers/role.controller.js';

const router = express.Router();

router.post("/", addRole);
router.patch("/", updateRole);
router.delete("/", deleteRole);

export default router;