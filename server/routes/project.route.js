import express from "express";
import { addAssignee, addProject, deleteProject, getUserProjects, removeAssignee, updateProject } from "../controllers/project.controller.js";
import { validateResource } from "../middleware/middleware.js";
import { addProjectAssigneeSchema, createProjectSchema } from "../schema/project.schema.js";

const router = express.Router();

router.get("/", getUserProjects);
router.post("/", validateResource(createProjectSchema), addProject);
router.post("/addAssignee/:projectId", validateResource(addProjectAssigneeSchema), addAssignee);
router.patch("/:projectId", validateResource(createProjectSchema), updateProject);
router.delete("/:projectId", deleteProject);
router.delete("/removeAssignee/:projectId", removeAssignee);

export default router;