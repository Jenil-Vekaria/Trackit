import { generateAccessToken } from "./utils";
import request from './app.test.js';
import User from "../models/user.model";
import { projectPayload, sampleUsers } from "./data";
import Project from "../models/project.model";

const getUser = async (email) => {
    return await User.findOne({ email });
};

describe("Project", () => {

    describe("create project", () => {

        it("given user is not logged in --> should return a 403", async () => {
            const response = await request.post("/project").send(projectPayload[0]);

            expect(response.statusCode).toBe(403);
        });


        it("given invalid payload --> should return 403", async () => {
            const user = sampleUsers[0];
            const token = generateAccessToken(user.email, user._id);

            const response = await request.post("/project")
                .set("x-access-token", token)
                .send({});

            expect(response.statusCode).toEqual(400);
            expect(response.body.error).toEqual("project title required");
        });
    });

    describe("add project assignee", () => {

        it("given no projectId --> should return 404", async () => {
            const user = sampleUsers[0];
            const token = generateAccessToken(user.email, user._id);

            const response = await request.post("/project/addAssignee")
                .set("x-access-token", token)
                .send({
                    assigneeId: user._id
                });

            expect(response.statusCode).toEqual(404);
        });

        it("given projectId --> should return 200", async () => {
            const user = sampleUsers[0];
            const token = generateAccessToken(user.email, user._id);
            const project1 = projectPayload[0]._id;

            const response = await request.post(`/project/addAssignee/${project1}`)
                .set("x-access-token", token)
                .send({
                    assigneeId: sampleUsers[1]._id
                });

            expect(response.statusCode).toEqual(200);
        });

        it("given user is not the project author --> should return 403", async () => {
            const user = sampleUsers[1];
            const token = generateAccessToken(user.email, user._id);
            const project1 = projectPayload[0]._id;

            const response = await request.post(`/project/addAssignee/${project1}`)
                .set("x-access-token", token)
                .send({
                    assigneeId: user._id
                });

            expect(response.statusCode).toEqual(403);
        });
    });

    describe("remove project assignee", () => {
        it("given projectId --> should return 200", async () => {
            const user = sampleUsers[0];
            const token = generateAccessToken(user.email, user._id);
            const project1 = projectPayload[0]._id;

            const response = await request.delete(`/project/removeAssignee/${project1}`)
                .set("x-access-token", token)
                .send({
                    assigneeId: sampleUsers[1]._id
                });

            expect(response.statusCode).toEqual(200);
        });
    });

    describe("update project", () => {
        it("given projectId --> should return 200", async () => {
            const user = sampleUsers[0];
            const token = generateAccessToken(user.email, user._id);
            const project1 = projectPayload[0]._id;

            const response = await request.patch(`/project/${project1}`)
                .set("x-access-token", token)
                .send({
                    title: "Change project title #1",
                    description: "Sample project #1 description"
                });

            expect(response.statusCode).toEqual(200);

            //Verify
            const project = await Project.findOne({ _id: project1 });

            expect(project.title).toEqual("Change project title #1");
            expect(project.description).toEqual("Sample project #1 description");
        });
    });
});