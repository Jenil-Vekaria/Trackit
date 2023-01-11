import express from 'express';
import { getComments, createComment, updateComment, deleteComment } from "../controllers/comment.controller.js";
import { validateParamId, validateResource } from "../middleware/middleware.js";
import { createCommentSchema } from "../schema/validation.schema.js";

const router = express.Router();

//Add comment validation
router.get("/:ticketId", validateParamId("ticketId"), getComments);
router.post("/:ticketId", [validateResource(createCommentSchema), validateParamId("ticketId")], createComment);
router.patch("/:commentId", [validateResource(createCommentSchema), validateParamId("commentId")], updateComment);
router.delete("/:commentId", [validateParamId("commentId")], deleteComment);

export default router;