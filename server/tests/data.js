export const sampleUsers = [
    {
        firstName: "James",
        lastName: "Smith",
        email: "james.smith@bugtracker.com",
        password: "random"
    },
    {
        firstName: "Michael",
        lastName: "Smith",
        email: "michael.smith@bugtracker.com",
        password: "random"
    },
    {
        firstName: "Robert",
        lastName: "Smith",
        email: "robert.smith@bugtracker.com",
        password: "random"
    },
    {
        firstName: "Maria",
        lastName: "Garcia",
        email: "maria.garcia@bugtracker.com",
        password: "random"
    }
];


export const sampleRoles = [
    {
        name: "admin",
        permissions: ["PERMISSION_ADD_TICKET", "PERMISSION_ADD_PROJECT", "PERMISSION_ADD_MEMBER_TO_PROJECT", "PERMISSION_ADD_COMMENT", "PERMISSION_MANAGE_ROLE", "PERMISSION_UPDATE_USER_PROFILE"]
    },
    {
        name: "project manager",
        permissions: ["PERMISSION_ADD_TICKET", "PERMISSION_ADD_PROJECT", "PERMISSION_ADD_MEMBER_TO_PROJECT", "PERMISSION_ADD_COMMENT", "PERMISSION_MANAGE_ROLE"]
    },
    {
        name: "developer",
        permissions: ["PERMISSION_ADD_TICKET", "PERMISSION_ADD_PROJECT", "PERMISSION_ADD_MEMBER_TO_PROJECT", "PERMISSION_ADD_COMMENT"]
    },
    {
        name: "submitter",
        permissions: ["PERMISSION_ADD_TICKET", "PERMISSION_ADD_COMMENT"]
    },
];

export const projectPayload = [
    {
        title: "Sample project #1",
        description: "This is a sample project #1 description"
    },
    {
        title: "Sample project #2",
        description: "This is a sample project #2 description"
    },
    {
        title: "Sample project #3",
        description: "This is a sample project #3 description"
    },
];