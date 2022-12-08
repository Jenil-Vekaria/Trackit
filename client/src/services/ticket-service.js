import axios from "axios";
import AuthService from "./auth-service";

const API = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT + "/ticket" });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});

const getUserTickets = async () => {
    const { id } = AuthService.getCurrentUser();

    try {
        const { data } = await API.get(`/user/${id}`);

        return data.tickets;
    } catch (error) {
        console.error(error);
    }
};

const getProjectTickets = async (projectId) => {
    try {
        const { data } = await API.get(`/project/${projectId}`);

        return data.tickets;
    } catch (error) {
        console.error(error);
    }
};

const getTicketInfo = async (ticketId) => {
    try {
        const { data } = await API.get(`/${ticketId}`);

        return data.ticket;
    } catch (error) {
        console.error(error);
    }
};

const createTicket = async (data, projectId) => {
    try {
        const response = await API.post(`/project/${projectId}`, data);

        return response.data.ticket;
    } catch (error) {
        console.error(error);
    }
};

const updateTicket = async (data, ticketId) => {
    try {
        const response = await API.post(`/${ticketId}`, data);

        return response.data.ticket;
    } catch (error) {
        console.error(error);
    }
};

const deleteTicket = async (ticketId) => {
    try {
        await API.delete(`/${ticketId}`);
    } catch (error) {
        console.error(error);
    }
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