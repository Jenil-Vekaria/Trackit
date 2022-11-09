import mongoose from "mongoose";

/*
    0: Jame Smith - admin,
    1: Michael Smith - project manager,
    2: Robert Smith - developer,
    3: Maria Garcia - submitter
*/

const _ids = [];

for (let x = 0; x < 4; x++) {

    _ids.push(new mongoose.Types.ObjectId().toString());
}

export const sampleUsers = [
    {
        _id: _ids[0],
        firstName: "James",
        lastName: "Smith",
        email: "james.smith@bugtracker.com",
        password: "random"
    },
    {
        _id: _ids[1],
        firstName: "Michael",
        lastName: "Smith",
        email: "michael.smith@bugtracker.com",
        password: "random"
    },
    {
        _id: _ids[2],
        firstName: "Robert",
        lastName: "Smith",
        email: "robert.smith@bugtracker.com",
        password: "random"
    },
    {
        _id: _ids[3],
        firstName: "Maria",
        lastName: "Garcia",
        email: "maria.garcia@bugtracker.com",
        password: "random"
    }
];


export const sampleRoles = [
    {
        _id: new mongoose.Types.ObjectId().toString(),
        name: "admin",
        permissions: ["PERMISSION_ADD_TICKET", "PERMISSION_ADD_PROJECT", "PERMISSION_ADD_MEMBER_TO_PROJECT", "PERMISSION_ADD_COMMENT", "PERMISSION_MANAGE_ROLE", "PERMISSION_UPDATE_USER_PROFILE"]
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        name: "project manager",
        permissions: ["PERMISSION_ADD_TICKET", "PERMISSION_ADD_PROJECT", "PERMISSION_ADD_MEMBER_TO_PROJECT", "PERMISSION_ADD_COMMENT", "PERMISSION_MANAGE_ROLE"]
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        name: "developer",
        permissions: ["PERMISSION_ADD_TICKET", "PERMISSION_ADD_PROJECT", "PERMISSION_ADD_MEMBER_TO_PROJECT", "PERMISSION_ADD_COMMENT"]
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        name: "submitter",
        permissions: ["PERMISSION_ADD_TICKET", "PERMISSION_ADD_COMMENT"]
    },
];

/*
    Project 1: James Smith
    Project 2: James Smith
    Project 3: Michael Smith
    Project 4: Michael Smith
    Project 5: Michael Smith
    Project 6: Robert Smith
*/

export const projectPayload = [
    {
        _id: new mongoose.Types.ObjectId().toString(),
        title: "Sample project #1",
        description: "This is a sample project #1 description",
        authorId: _ids[0]
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        title: "Sample project #2",
        description: "This is a sample project #2 description",
        authorId: _ids[0]
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        title: "Sample project #3",
        description: "This is a sample project #3 description",
        authorId: _ids[1]
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        title: "Sample project #4",
        description: "This is a sample project #3 description",
        authorId: _ids[1]
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        title: "Sample project #5",
        description: "This is a sample project #3 description",
        authorId: _ids[1]
    },
    {
        _id: new mongoose.Types.ObjectId().toString(),
        title: "Sample project #6",
        description: "This is a sample project #3 description",
        authorId: _ids[2]
    },
];