import express from 'express';
import { getComments, createComment, updateComment, deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

//Add comment validation
router.get("/:ticketId", getComments);
router.post("/:ticketId", createComment);
router.patch("/:commentId", updateComment);
router.delete("/:commentId", deleteComment);

export default router;