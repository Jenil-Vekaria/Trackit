import express from 'express';
import { getComments, createComment, updateComment, deleteComment } from "../controllers/comment.controller.js";
import { checkUserPermissions, validateParamId, validateResource } from "../middleware/middleware.js";
import { createCommentSchema } from "../schema/validation.schema.js";
import { canManageComments } from "../util/permissionCheck.js";
const router = express.Router();

//Add comment validation
router.get("/:ticketId", validateParamId("ticketId"), getComments);
router.post("/:ticketId",
    [checkUserPermissions("comment", canManageComments), validateResource(createCommentSchema), validateParamId("ticketId")],
    createComment);
router.patch("/:commentId",
    [checkUserPermissions("comment", canManageComments), validateResource(createCommentSchema), validateParamId("commentId")],
    updateComment);
router.delete("/:commentId",
    [checkUserPermissions("comment", canManageComments), validateParamId("commentId")],
    deleteComment);

export default router;