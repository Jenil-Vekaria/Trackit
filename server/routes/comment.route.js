import express from 'express';
import { getComments, createComment, updateComment, deleteComment } from "../controllers/comment.controller.js";
import { validateResource } from "../middleware/middleware.js";
import { createCommentSchema } from "../schema/validation.schema.js";

const router = express.Router();

//Add comment validation
router.get("/:ticketId", getComments);
router.post("/:ticketId", validateResource(createCommentSchema), createComment);
router.patch("/:commentId", validateResource(createCommentSchema), updateComment);
router.delete("/:commentId", deleteComment);

export default router;