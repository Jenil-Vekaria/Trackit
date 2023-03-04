export const ADD_TICKET = "PERMISSION_ADD_TICKET";
export const ADD_PROJECT = "PERMISSION_ADD_PROJECT";
export const ADD_MEMBER_TO_PROJECT = "PERMISSION_ADD_MEMBER_TO_PROJECT";
export const ADD_COMMENT = "PERMISSION_ADD_COMMENT";
export const MANAGE_ROLE = "PERMISSION_MANAGE_ROLE";
export const UPDATE_USER_PROFILE = "PERMISSION_UPDATE_USER_PROFILE";

const canManageTicket = (permissions) => permissions.includes(ADD_TICKET);
const canManageProject = (permissions) => permissions.includes(ADD_PROJECT);
const canManageProjectMember = (permissions) => permissions.includes(ADD_MEMBER_TO_PROJECT);
const canManageComments = (permissions) => permissions.includes(ADD_COMMENT);
const canManageRole = (permissions) => permissions.includes(MANAGE_ROLE);
const canUpdateUserProfile = (permissions) => permissions.includes(UPDATE_USER_PROFILE);

export const Permissions = {
    canManageTicket,
    canManageProject,
    canManageProjectMember,
    canManageComments,
    canManageRole,
    canUpdateUserProfile
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