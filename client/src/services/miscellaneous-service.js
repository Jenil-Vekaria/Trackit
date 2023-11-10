import axios from "axios";
import { addRole, addTicketType, removeRole, removeTicketType, setRole, setRoles, setTicketType, setTicketTypes } from "../features/miscellaneousSlice.js";
import { store } from "../store/store.js";
import useAuthStore from "@/hooks/useAuth";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT });

API.interceptors.request.use((req) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken)
        req.headers["x-access-token"] = accessToken;

    return req;
});


const updateUserProfile = (data) => {
    return {
        url: "/user/update",
        method: "patch",
        data
    };
};

const updateMyProfile = (data) => {
    return {
        url: "/user/updateMyProfile",
        method: "patch",
        data
    };
};

const getUsers = (query = "") => {
    return {
        method: "get",
        url: `/user/all${"?" + query}`
    };
};

const createUser = (data) => {
    return {
        method: "post",
        url: "/user/create",
        data
    };
};


const getAllTicketType = () => {
    return {
        url: "/ticketType",
        method: "get"
    };
};

const createTicketType = (data) => {
    return {
        url: "/ticketType",
        method: "post",
        data
    };
};


const updateTicketType = (data) => {
    return {
        url: `/ticketType`,
        method: "patch",
        data
    };
};

const deleteTicketType = (ticketTypeId) => {
    return {
        url: `/ticketType/${ticketTypeId}`,
        method: "delete"
    };
};

const getRoles = () => {
    return {
        url: "/role",
        method: "get"
    };
};

const createRole = (data) => {
    return {
        url: "/role",
        method: "post",
        data
    };
};

const updateRole = (data) => {
    return {
        url: `/role/${data._id}`,
        method: "patch",
        data
    };
};

const deleteRole = (roleId) => {
    return {
        url: `/role/${roleId}`,
        method: "delete"
    };
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
    getAllTicketType,
    getUsers,
    getUserInfo,
    createUser,
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
    updateMyProfile
};

export default MiscellaneousService;
