import express from 'express';
import { getComments, createComment, updateComment, deleteComment } from "../controllers/comment.controller.js";
import { checkUserPermissions, validateParamId, validateResource } from "../middleware/middleware.js";
import { createCommentSchema } from "../schema/validation.schema.js";
import { Permissions } from '../util/utils.js';
const router = express.Router();

//Add comment validation
router.get("/:ticketId", validateParamId("ticketId"), getComments);
router.post("/:ticketId",
    [checkUserPermissions("comment", Permissions.canManageTickets), validateResource(createCommentSchema), validateParamId("ticketId")],
    createComment);
router.patch("/:commentId",
    [checkUserPermissions("comment", Permissions.canManageTickets), validateResource(createCommentSchema), validateParamId("commentId")],
    updateComment);
router.delete("/:commentId",
    [checkUserPermissions("comment", Permissions.canManageTickets), validateParamId("commentId")],
    deleteComment);

export default router;