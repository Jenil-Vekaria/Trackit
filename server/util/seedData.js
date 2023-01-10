import * as Permissions from "./permissions.js";

export const DBUsers = [
    {
        firstName: "James",
        lastName: "Smith",
        email: "james.smith@bugtracker.com",
        password: "password"
    },
    {
        firstName: "Michael",
        lastName: "Smith",
        email: "michael.smith@bugtracker.com",
        password: "password"
    },
    {
        firstName: "Robert",
        lastName: "Smith",
        email: "robert.smith@bugtracker.com",
        password: "password"
    },
    {
        firstName: "Maria",
        lastName: "Garcia",
        email: "maria.garcia@bugtracker.com",
        password: "password"
    }
];

export const DBRole = [
    {
        name: "Admin",
        permissions: [
            Permissions.ADD_COMMENT,
            Permissions.ADD_MEMBER_TO_PROJECT,
            Permissions.ADD_PROJECT,
            Permissions.ADD_TICKET,
            Permissions.MANAGE_ROLE,
            Permissions.UPDATE_USER_PROFILE,
        ]
    },
    {
        name: "Developer",
        permissions: [
            Permissions.ADD_COMMENT,
            Permissions.ADD_PROJECT,
            Permissions.ADD_TICKET,
        ]
    },
    {
        name: "Project Manager",
        permissions: [
            Permissions.ADD_COMMENT,
            Permissions.ADD_MEMBER_TO_PROJECT,
            Permissions.ADD_PROJECT,
            Permissions.ADD_TICKET,
            Permissions.MANAGE_ROLE,
        ]
    },
    {
        name: "Submitter",
        permissions: [
            Permissions.ADD_COMMENT,
            Permissions.ADD_TICKET
        ]
    },
];

export const DBTicketType = [
    {
        name: "Feature",
        iconName: "BsPlusLg",
        colour: "#4ab577"
    },
    {
        name: "Bug",
        iconName: "BsBugFill",
        colour: "#e25555"
    },
    {
        name: "Documentation",
        iconName: "BsFileEarmarkText",
        colour: "#ED8936",
    },
    {
        name: "Support",
        iconName: "BsQuestion",
        colour: "#4299E1",
    }
];