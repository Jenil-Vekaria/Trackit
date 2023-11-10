import express from "express";
import { addProject, deleteProject, getUserProjects, updateProject, getProjectInfo, getProjectStat } from "../controllers/project.controller.js";
import { checkUserPermissions, validateParamId, validateResource } from "../middleware/middleware.js";
import { createProjectSchema } from "../schema/validation.schema.js";
import { Permissions } from "../util/utils.js";

const router = express.Router();

router.get("/", getUserProjects);
router.get("/stat/:projectId", [validateParamId("projectId")], getProjectStat);
router.get("/:projectId", validateParamId("projectId"), getProjectInfo);

router.post("/",
    [checkUserPermissions("projects", Permissions.canManageProjects), validateResource(createProjectSchema)],
    addProject);

router.patch("/:projectId",
    [checkUserPermissions("projects", Permissions.canManageProjects), validateResource(createProjectSchema), validateParamId("projectId")],
    updateProject);

router.delete("/:projectId",
    [checkUserPermissions("projects", Permissions.canManageProjects), validateParamId("projectId")],
    deleteProject);

export default router;