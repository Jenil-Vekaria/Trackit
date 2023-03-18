import { Icon } from "@chakra-ui/react";
import * as BsIcons from "react-icons/bs";

export const TICKET_STATUS = ["Open", "In-Progress", "Done", "Archived"];

export const MANAGE_TICKET = "PERMISSION_MANAGE_TICKET";
export const MANAGE_PROJECT = "PERMISSION_MANAGE_PROJECT";
export const MANAGE_ADMIN_PAGE = "PERMISSION_MANAGE_ADMIN_PAGE";

// export const ADD_COMMENT = "PERMISSION_ADD_COMMENT";
// export const MANAGE_ROLE = "PERMISSION_MANAGE_ROLE";
// export const UPDATE_USER_PROFILE = "PERMISSION_UPDATE_USER_PROFILE";

export const DEFINED_ROLES = ["Admin", "Project Manager", "Developer", "Submitter"];

export const BS_ICONS = Object.keys(BsIcons).map(icon => { return { name: icon, icon: <Icon key={icon} as={BsIcons[icon]} w={6} h={6} /> }; });

export const DEMO_LOGIN_INFO = [
    {
        email: "james.smith@bugtracker.com",
        password: "password",
        role: "Admin"
    },
    {
        email: "michael.smith@bugtracker.com",
        password: "password",
        role: "Developer"
    },
    {
        email: "robert.smith@bugtracker.com",
        password: "password",
        role: "Submitter"
    }
];