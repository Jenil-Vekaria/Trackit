import express from "express";
import { addProject, deleteProject, getUserProjects, updateProject, getProjectInfo, getProjectStat } from "../controllers/project.controller.js";
import { validateParamId, validateResource } from "../middleware/middleware.js";
import { createProjectSchema } from "../schema/validation.schema.js";

const router = express.Router();

router.get("/", getUserProjects);
router.get("/stat/:projectId", validateParamId("projectId"), getProjectStat);
router.get("/:projectId", validateParamId("projectId"), getProjectInfo);
router.post("/", validateResource(createProjectSchema), addProject);
router.patch("/:projectId", [validateResource(createProjectSchema), validateParamId("projectId")], updateProject);
router.delete("/:projectId", validateParamId("projectId"), deleteProject);

export default router;