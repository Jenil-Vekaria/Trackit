import axios from "axios";
import AuthService from "./auth-service";
import { setRoles, setTicketType, setUser, setUsers } from "../features/miscellaneousSlice.js";
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
        const { _id, accessToken } = AuthService.getCurrentUser();

        if (updatedUser._id === _id) {
            updatedUser.accessToken = accessToken;
            store.dispatch(setLogin(updatedUser));
        }

        store.dispatch(setUser(updatedUser));

    } catch (error) {
        throw error;
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

const getUserInfo = (userId) => {
    const state = store.getState();
    const user = state.miscellaneous.users.filter(user => user._id === userId);

    return user[0];
};

const getUserFullName = (userId) => {
    const state = store.getState();
    const user = state.miscellaneous.users.filter(user => user._id === userId);

    return user[0].firstName + " " + user[0].lastName;
};

const getTicketTypeInfo = (ticketTypeId) => {
    const state = store.getState();
    const ticketType = state.miscellaneous.ticketType.filter(ticketType => ticketType._id === ticketTypeId);

    return ticketType[0];
};

const getRoleInfo = (roleId) => {
    const state = store.getState();
    const role = state.miscellaneous.roles.filter(role => role._id === roleId);

    return role[0];
};


const MiscellaneousService = {
    getTicketType,
    getUsers,
    getUserInfo,
    getUserFullName,
    getTicketTypeInfo,
    getRoles,
    getRoleInfo,
    updateUserProfile
};

export default MiscellaneousService;
