import useAuthStore from "@/hooks/useAuth";

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

const MiscellaneousService = {
    updateMyProfile,
    getUsers,
    createUser,
    getAllTicketType,
    createTicketType,
    updateTicketType,
    deleteTicketType,
    getRoles,
    updateUserProfile,
    createRole,
    updateRole,
    deleteRole
};

export default MiscellaneousService;
