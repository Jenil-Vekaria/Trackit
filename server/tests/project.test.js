import { generateAccessToken } from "./utils";
import request from './app.test.js';
import Project from "../models/project";
import ProjectAssignee from "../models/projectAssignee";
import User from "../models/user";
import { projectPayload } from "./data";

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
            const user = await getUser("james.smith@bugtracker.com");
            const token = generateAccessToken(user.email, user._id);

            const response = await request.post("/project")
                .set("x-access-token", token)
                .send({});

            expect(response.statusCode).toEqual(400);
            expect(response.body.error).toEqual("project title required");
        });

    });
});