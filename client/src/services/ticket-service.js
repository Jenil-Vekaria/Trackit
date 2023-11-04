import axios from "axios";
import AuthService from "./auth-service";
import { store } from "../store/store";
import { addTicket, setTicket, setTickets, removeTicket, clearTickets } from "../features/ticketSlice.js";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT + "/ticket" });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});

const getUserTickets = () => {
    const { _id } = AuthService.getCurrentUser();
    return `/ticket/user/${_id}`;
};

const getProjectTickets = (projectId) => {
    return `/ticket/project/${projectId}`;
};

const getTicketInfo = async (ticketId) => {
    return `/ticket/${ticketId}`;
};

const createTicket = (projectId) => {
    return {
        type: "post",
        url: `/ticket/project/${projectId}`
    };
};

const updateTicket = (projectId) => {
    return {
        type: "patch",
        url: `/ticket/project/${projectId}`
    };
};

const deleteTicket = async (ticketId) => {
    return {
        type: "delete",
        url: `/${ticketId}`
    };
};


const TicketService = {
    getProjectTickets,
    getTicketInfo,
    getUserTickets,
    createTicket,
    updateTicket,
    deleteTicket
};

export default TicketService;