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

const getUserTickets = async () => {
    const { _id } = AuthService.getCurrentUser();

    try {
        store.dispatch(clearTickets());
        const { data: { tickets } } = await API.get(`/user/${_id}`);
        store.dispatch(setTickets(tickets));

        return tickets;
    } catch (error) {
        console.error(error);
    }
};

const getProjectTickets = async (projectId) => {
    try {
        store.dispatch(clearTickets());
        const { data: { tickets } } = await API.get(`/project/${projectId}`);
        store.dispatch(setTickets(tickets));

        return tickets;
    } catch (error) {
        console.error(error);
        throw error.response.data.message;
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
        const { data: { ticket } } = await API.post(`/project/${projectId}`, data);

        store.dispatch(addTicket(ticket));
    } catch (error) {
        throw error.response.data.message;
    }
};

const updateTicket = async (data, projectId) => {
    try {
        const { data: { ticket } } = await API.patch(`/project/${projectId}`, data);
        store.dispatch(setTicket(ticket));

    } catch (error) {
        throw error.response.data.message;
    }
};

const deleteTicket = async (ticketId) => {
    try {
        await API.delete(`/${ticketId}`);

        store.dispatch(removeTicket({ ticketId }));
    } catch (error) {
        console.error(error);
        throw error.response.data.message;
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