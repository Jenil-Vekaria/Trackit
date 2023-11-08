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