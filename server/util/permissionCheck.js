import * as permissions from './permissions.js';

export const canManageTicket = (permissionSet) => permissionSet.includes(permissions.ADD_TICKET);
export const canManageProject = (permissionSet) => permissionSet.includes(permissions.ADD_PROJECT);
export const canManageProjectMember = (permissionSet) => permissionSet.includes(permissions.ADD_MEMBER_TO_PROJECT);
export const canManageComments = (permissionSet) => permissionSet.includes(permissions.ADD_COMMENT);
export const canManageRole = (permissionSet) => permissionSet.includes(permissions.MANAGE_ROLE);
export const canUpdateUserProfile = (permissionSet) => permissionSet.includes(permissions.UPDATE_USER_PROFILE);