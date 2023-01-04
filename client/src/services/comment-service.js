import axios from "axios";
import AuthService from "./auth-service";
import MiscellaneousService from "./miscellaneous-service";

const API = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT + "/comment" });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});

const fetchTicketComments = async (ticketId) => {
    try {
        const { data: { comments } } = await API.get(`/${ticketId}`);

        return comments.map(comment => {
            const userId = comment.userId;
            const username = MiscellaneousService.getUserFullName(userId);

            return { ...comment, username };
        });

    } catch (error) {
        console.log(error);
    }
};

const createTicketComment = async (ticketId, ticketData) => {
    try {
        await API.post(`/${ticketId}`, ticketData);
    } catch (error) {
        console.log(error);
    }
};

const CommentService = {
    fetchTicketComments,
    createTicketComment
};

export default CommentService;