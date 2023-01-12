import express from "express";
import { addProject, deleteProject, getUserProjects, updateProject, getProjectInfo, getProjectStat } from "../controllers/project.controller.js";
import { checkUserPermissions, validateParamId, validateResource } from "../middleware/middleware.js";
import { createProjectSchema } from "../schema/validation.schema.js";
import { canManageProject } from "../util/permissionCheck.js";

const router = express.Router();

router.get("/", getUserProjects);
router.get("/stat/:projectId", validateParamId("projectId"), getProjectStat);
router.get("/:projectId", validateParamId("projectId"), getProjectInfo);

router.post("/",
    [checkUserPermissions("projects", canManageProject), validateResource(createProjectSchema)],
    addProject);

router.patch("/:projectId",
    [checkUserPermissions("projects", canManageProject), validateResource(createProjectSchema), validateParamId("projectId")],
    updateProject);

router.delete("/:projectId",
    [checkUserPermissions("projects", canManageProject), validateParamId("projectId")],
    deleteProject);

export default router;