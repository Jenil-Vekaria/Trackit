import * as Constants from "./Constants.js";

const canManageTickets = (permissionsList) => permissionsList.includes(Constants.MANAGE_TICKET);
const canManageProjects = (permissionsList) => permissionsList.includes(Constants.MANAGE_PROJECT);
const canManageAdminPage = (permissionsList) => permissionsList.includes(Constants.MANAGE_ADMIN_PAGE);

export const Permissions = {
    canManageTickets,
    canManageProjects,
    canManageAdminPage
};

export const hexToRgb = (hex, opacity) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) {
        return `rgba(0, 0, 0, ${opacity})`;
    }

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};