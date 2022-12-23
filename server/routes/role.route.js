import express from 'express';
import { getRoles, addRole, deleteRole, updateRole } from '../controllers/role.controller.js';

const router = express.Router();

router.get("/", getRoles);
router.post("/", addRole);
router.patch("/:roleId", updateRole);
router.delete("/:roleId", deleteRole);

export default router;