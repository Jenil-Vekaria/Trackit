import Comment from "../models/comment.model.js";

export const getComments = async (req, res) => {
    const { ticketId } = req.params;

    try {
        const comments = await Comment.find({ ticketId }, { _id: 1, text: 1, userId: 1, updatedOn: 1, createdOn: 1 })
            .populate([
                { path: "userId", select: { firstName: 1, lastName: 1 } }
            ])
            .sort({ createdOn: "desc" });

        return res.json(comments);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

export const createComment = async (req, res) => {
    const { ticketId } = req.params;
    const { text } = req.body;

    try {
        const userId = req.user._id;

        let newComment = await Comment.create({ ticketId, userId, text, createdOn: Date.now(), updatedOn: Date.now() });
        newComment = await newComment.populate([
            { path: "userId", select: { firstName: 1, lastName: 1 } }
        ]);
        return res.json(newComment);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;

    try {

        let updatedComment = await Comment.findOneAndUpdate({ _id: commentId }, { text, updatedOn: Date.now() });
        updatedComment = await updatedComment.populate([
            { path: "userId", select: { firstName: 1, lastName: 1 } }
        ]);
        return res.json(updatedComment);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        await Comment.deleteOne({ _id: commentId });

        return res.sendStatus(200);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};




