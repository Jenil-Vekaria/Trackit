import useAuthStore from "@/hooks/useAuth";

const getUserTickets = () => {
    const userProfile = useAuthStore.getState().userProfile;
    return {
        method: "get",
        url: `/ticket/user/${userProfile._id}`
    };
};

const getProjectTickets = (projectId) => {
    return {
        method: "get",
        url: `/ticket/project/${projectId}`
    };
};

const getTicketInfo = (ticketId) => {
    return {
        method: "get",
        url: `/ticket/${ticketId}`
    };
};

const createTicket = (projectId, data) => {
    return {
        method: "post",
        url: `/ticket/project/${projectId}`,
        data
    };
};

const updateTicket = (projectId, data) => {
    return {
        method: "patch",
        url: `/ticket/project/${projectId}`,
        data
    };
};

const deleteTicket = (ticketId) => {
    return {
        method: "delete",
        url: `/ticket/${ticketId}`
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