import express from "express";
import { addAssignee, addProject, deleteProject, getUserProjects, removeAssignee, updateProject } from "../controllers/project.controller";
import { validateResource } from "../middleware/middleware";
import { createProjectSchema } from "../schema/project.schema";

const router = express.Router();

router.get("/", getUserProjects);
router.post("/", validateResource(createProjectSchema), addProject);
router.post("/:id/addAssignee", addAssignee);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);
router.delete("/:id/removeAssigneee", removeAssignee);

export default router;