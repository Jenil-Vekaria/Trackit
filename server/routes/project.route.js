import express from "express";
import { addProject, deleteProject, getUserProjects, updateProject, getProjectInfo, getProjectStat } from "../controllers/project.controller.js";
import { validateResource } from "../middleware/middleware.js";
import { createProjectSchema } from "../schema/project.schema.js";

const router = express.Router();

router.get("/", getUserProjects);
router.get("/stat/:projectId", getProjectStat);
router.get("/:projectId", getProjectInfo);
router.post("/", validateResource(createProjectSchema), addProject);
router.patch("/:projectId", validateResource(createProjectSchema), updateProject);
router.delete("/:projectId", deleteProject);

export default router;