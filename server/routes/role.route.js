import express from 'express';
import { getRoles, addRole, deleteRole, updateRole } from '../controllers/role.controller.js';
import { validateParamId, validateResource } from "../middleware/middleware.js";
import { createRoleSchema } from "../schema/validation.schema.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", validateResource(createRoleSchema), addRole);
router.patch("/:roleId", [validateResource(createRoleSchema), validateParamId("roleId")], updateRole);
router.delete("/:roleId", validateParamId("roleId"), deleteRole);

export default router;