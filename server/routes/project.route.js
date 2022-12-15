import express from "express";
import { addProject, deleteProject, getUserProjects, updateProject, getProjectInfo } from "../controllers/project.controller.js";
import { validateResource } from "../middleware/middleware.js";
import { addProjectAssigneeSchema, createProjectSchema } from "../schema/project.schema.js";

const router = express.Router();

router.get("/", getUserProjects);
router.get("/:projectId", getProjectInfo);
router.post("/", validateResource(createProjectSchema), addProject);
router.patch("/:projectId", validateResource(createProjectSchema), updateProject);
router.delete("/:projectId", deleteProject);

export default router;