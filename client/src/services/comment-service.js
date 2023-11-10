const getTicketComments = (ticketId) => {
    return {
        url: `/comment/${ticketId}`,
        method: "get"
    };
};

const createTicketComment = (ticketId, ticketData) => {
    return {
        url: `/comment/${ticketId}`,
        method: "post",
        data: ticketData
    };

};

const updateTicketComment = (commentId, ticketData) => {
    return {
        url: `/comment/${commentId}`,
        method: "patch",
        data: ticketData
    };

};

const deleteTicketComment = (commentId) => {
    return {
        url: `/comment/${commentId}`,
        method: "delete"
    };
};

const CommentService = {
    getTicketComments,
    createTicketComment,
    updateTicketComment,
    deleteTicketComment,
};

export default CommentService;