import { Icon } from "@chakra-ui/react";
import * as BsIcons from "react-icons/bs";

export const TICKET_STATUS = ["Open", "In-Progress", "Done", "Archived"];

export const ADD_TICKET = "PERMISSION_ADD_TICKET";
export const ADD_PROJECT = "PERMISSION_ADD_PROJECT";
export const ADD_MEMBER_TO_PROJECT = "PERMISSION_ADD_MEMBER_TO_PROJECT";
export const ADD_COMMENT = "PERMISSION_ADD_COMMENT";
export const MANAGE_ROLE = "PERMISSION_MANAGE_ROLE";
export const UPDATE_USER_PROFILE = "PERMISSION_UPDATE_USER_PROFILE";

export const DEFINED_ROLES = ["Admin", "Project Manager", "Developer", "Submitter"];

export const BS_ICONS = Object.keys(BsIcons).map(icon => { return { name: icon, icon: <Icon key={icon} as={BsIcons[icon]} w={6} h={6} /> }; }); 