import axios from "axios";
import AuthService from "./auth-service";
import MiscellaneousService from "./miscellaneous-service";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT + "/comment" });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});

const getTicketComments = async (ticketId) => {
    try {
        const { data: { comments } } = await API.get(`/${ticketId}`);

        return comments.map(comment => {
            const userId = comment.userId;
            const username = MiscellaneousService.getUserFullName(userId);

            return { ...comment, username };
        });

    } catch (error) {
        throw error.response.data.message;
    }
};

const createTicketComment = async (ticketId, ticketData) => {
    try {
        await API.post(`/${ticketId}`, ticketData);
    } catch (error) {
        throw error.response.data.message;
    }
};

const updateTicketComment = async (commentId, ticketData) => {
    try {
        await API.patch(`/${commentId}`, ticketData);
    } catch (error) {
        throw error.response.data.message;
    }
};

const deleteTicketComment = async (commentId) => {
    try {
        await API.delete(`/${commentId}`);
    } catch (error) {
        throw error.response.data.message;
    }
};

const CommentService = {
    getTicketComments,
    createTicketComment,
    updateTicketComment,
    deleteTicketComment,
};

export default CommentService;