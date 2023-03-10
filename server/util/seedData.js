import * as Permissions from "./constants.js";

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
    }
];

export const DBRole = [
    {
        name: "Admin",
        permissions: [
            Permissions.MANAGE_TICKET,
            Permissions.MANAGE_PROJECT,
            Permissions.MANAGE_ADMIN_PAGE
        ]
    },
    {
        name: "Developer",
        permissions: [
            Permissions.MANAGE_TICKET,
            Permissions.MANAGE_PROJECT,
        ]
    },
    {
        name: "Submitter",
        permissions: [
            Permissions.MANAGE_TICKET,
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