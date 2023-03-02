import axios from "axios";
import AuthService from "./auth-service";
import { addRole, addTicketType, removeRole, removeTicketType, setRole, setRoles, setTicketType, setTicketTypes, setUser, setUsers } from "../features/miscellaneousSlice.js";
import { store } from "../app/store.js";
import { setLogin } from "../features/authSlice";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT });

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
        store.dispatch(setTicketTypes(data.ticketType));
    } catch (error) {
        console.error(error);
    }
};

const createTicketType = async (ticketData) => {
    try {
        const { data } = await API.post("/ticketType", ticketData);
        store.dispatch(addTicketType(data.ticketType));
    } catch (error) {
        throw error.response.data.message;
    }
};


const updateTicketType = async (ticketData) => {
    try {
        const { data } = await API.patch("/ticketType", ticketData);
        store.dispatch(setTicketType(data.ticketType));
    } catch (error) {
        throw error.response.data.message;
    }
};

const deleteTicketType = async (ticketName) => {
    try {
        await API.delete(`/ticketType/${ticketName}`);
        store.dispatch(removeTicketType(ticketName));
    } catch (error) {
        throw error.response.data.message;
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

const createRole = async (roleData) => {
    try {
        const { data } = await API.post("/role", roleData);
        store.dispatch(addRole(data.role));
    } catch (error) {
        console.error(error);
    }
};

const updateRole = async (roleData) => {
    try {
        const { data } = await API.patch(`/role/${roleData._id}`, roleData);

        store.dispatch(setRole(data.updatedRole));
    } catch (error) {
        console.error(error);
    }
};

const deleteRole = async (roleId) => {
    try {
        await API.delete(`/role/${roleId}`);

        store.dispatch(removeRole(roleId));
    } catch (error) {
        throw error.response.data.message;
    }
};

const fetchInitialData = async () => {
    try {
        await getTicketType();
        await getUsers();
        await getRoles();
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

    return role[0] || {};
};


const MiscellaneousService = {
    getTicketType,
    getUsers,
    getUserInfo,
    getUserFullName,
    getTicketTypeInfo,
    createTicketType,
    updateTicketType,
    deleteTicketType,
    getRoles,
    getRoleInfo,
    updateUserProfile,
    createRole,
    updateRole,
    deleteRole,
    fetchInitialData
};

export default MiscellaneousService;
