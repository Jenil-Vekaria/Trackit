import express from 'express';
import { getRoles, addRole, deleteRole, updateRole } from '../controllers/role.controller.js';
import { checkUserPermissions, validateParamId, validateResource } from "../middleware/middleware.js";
import { createRoleSchema } from "../schema/validation.schema.js";
import { Permissions } from '../util/utils.js';

const router = express.Router();

router.get("/", getRoles);
router.post("/", [checkUserPermissions("role", Permissions.canManageAdminPage), validateResource(createRoleSchema)], addRole);
router.patch("/:roleId", [checkUserPermissions("role", Permissions.canManageAdminPage), validateResource(createRoleSchema), validateParamId("roleId")], updateRole);
router.delete("/:roleId", [checkUserPermissions("role", Permissions.canManageAdminPage), validateParamId("roleId")], deleteRole);

export default router;