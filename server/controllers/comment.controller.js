import mongoose from "mongoose";
import Comment from "../models/comment.model.js";
import { canPerformAction } from "../util/utils.js";
import * as permissionCheck from "../util/permissionCheck.js";

export const getComments = async (req, res) => {
    const { ticketId } = req.params;

    try {

        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(403).json({ message: "Invalid ticket id" });
        }

        const comments = await Comment.find({ ticketId }, { _id: 1, text: 1, userId: 1, updatedOn: 1, createdOn: 1 });

        return res.json({ comments });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const createComment = async (req, res) => {
    const { ticketId } = req.params;
    const { text } = req.body;

    try {

        if (!(await canPerformAction(permissionCheck.canManageComments, req.user))) {
            return res.status(403).json({ message: "Not authorized to comment" });
        }

        const userId = req.user._id;

        const newComment = await Comment.create({ ticketId, userId, text });

        return res.json({ comment: newComment });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;

    try {

        if (!(await canPerformAction(permissionCheck.canManageComments, req.user))) {
            return res.status(403).json({ message: "Not authorized to comment" });
        }

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(403).json({ message: "Invalid comment id" });
        }

        const updatedComment = await Comment.findOneAndUpdate({ _id: commentId }, { text, updatedOn: Date.now() });

        return res.json({ comment: updatedComment });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        if (!(await canPerformAction(permissionCheck.canManageComments, req.user))) {
            return res.status(403).json({ message: "Not authorized to comment" });
        }

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(403).json({ message: "Invalid comment id" });
        }

        await Comment.findOneAndDelete({ _id: commentId });

        return res.sendStatus(200);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};




