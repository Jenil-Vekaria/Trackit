import express from "express";
import { addAssignee, addProject, deleteProject, getUserProjects, removeAssignee, updateProject } from "../controllers/project.controller.js";
import { validateResource } from "../middleware/middleware.js";
import { createProjectSchema } from "../schema/project.schema.js";

const router = express.Router();

router.get("/", getUserProjects);
router.post("/", validateResource(createProjectSchema), addProject);
router.post("/addAssignee/:projectId", addAssignee);
router.patch("/:projectId", updateProject);
router.delete("/:projectId", deleteProject);
router.delete("/removeAssignee/:projectId", removeAssignee);

export default router;