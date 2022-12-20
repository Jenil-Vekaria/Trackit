import axios from "axios";
import AuthService from "./auth-service";
import { setTicketType, setUsers } from "../features/miscellaneousSlice.js";
import { store } from "../app/store.js";

const API = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});


const getTicketType = async () => {
    try {
        const { data } = await API.get("/ticketType");
        store.dispatch(setTicketType(data.ticketType));
    } catch (error) {
        console.error(error);
    }
};


const getUsers = async () => {
    try {
        const { data } = await API.get("/user/all");
        const temp = [...data.users, ...data.users, ...data.users, ...data.users, ...data.users];
        store.dispatch(setUsers(temp));
    } catch (error) {
        console.error(error);
    }
};

const getUserFullName = (id) => {
    const state = store.getState();
    const userMapping = state.miscellaneous.userMapping;

    return userMapping[id] || "No Data";
};

const getTicketTypeInfo = (id) => {
    const state = store.getState();
    const ticketType = state.miscellaneous.ticketType;

    return ticketType[id];
};


const MiscellaneousService = {
    getTicketType,
    getUsers,
    getUserFullName,
    getTicketTypeInfo
};

export default MiscellaneousService;
