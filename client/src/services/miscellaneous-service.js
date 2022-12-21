import axios from "axios";
import AuthService from "./auth-service";
import { setRoles, setTicketType, setUsers } from "../features/miscellaneousSlice.js";
import { store } from "../app/store.js";
import { setLogin } from "../features/authSlice";

const API = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT });

API.interceptors.request.use((req) => {
    const { accessToken } = AuthService.getCurrentUser();

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});

const updateUserProfile = async (userData) => {
    try {
        const { data: { updatedUser } } = await API.patch("/user/update", userData);
        const { id, accessToken } = AuthService.getCurrentUser();

        if (updatedUser._id === id) {
            updatedUser.accessToken = accessToken;
            store.dispatch(setLogin(updatedUser));
        }

    } catch (error) {
        console.log(error);
    }
};

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
        store.dispatch(setUsers(data.users));
    } catch (error) {
        console.error(error);
    }
};

const getRoles = async () => {
    try {
        const { data } = await API.get("/role");
        store.dispatch(setRoles(data.roles));
    } catch (error) {
        console.error(error);
    }
};

const getUserFullName = (userId) => {
    const state = store.getState();
    const userMapping = state.miscellaneous.userMapping;

    return userMapping[userId] || "Unknown";
};

const getTicketTypeInfo = (id) => {
    const state = store.getState();
    const ticketType = state.miscellaneous.ticketType;

    return ticketType[id];
};

const getRoleInfo = (roleId) => {
    const state = store.getState();
    const roles = state.miscellaneous.roles;

    return roles.filter(role => role._id === roleId);
};


const MiscellaneousService = {
    getTicketType,
    getUsers,
    getUserFullName,
    getTicketTypeInfo,
    getRoles,
    getRoleInfo,
    updateUserProfile
};

export default MiscellaneousService;
