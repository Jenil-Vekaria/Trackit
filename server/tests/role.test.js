import { generateAccessToken } from "./utils";
import * as permission from "../util/permissions";
import request from './app.test.js';
import User from "../models/user";
import Role from "../models/role";

const getUser = async (email) => {
    return await User.findOne({ email });
};

const getRole = async (name) => {
    return await Role.findOne({ name });
};

describe("Roles", () => {
    it("POST /role --> Admin can add role", async () => {
        const user = await getUser("james.smith@bugtracker.com");
        const token = generateAccessToken(user.email, user._id);

        const response = await request.post("/role")
            .set("x-access-token", token)
            .send({
                name: "custom role",
                permissions: [permission.ADD_COMMENT, permission.ADD_MEMBER_TO_PROJECT, permission.ADD_PROJECT]
            });

        expect(response.status).toEqual(200);

        //Verify the change
        const role = await Role.findOne({ name: "custom role" });

        expect(role.name).toEqual("custom role");
        expect(role.permissions).toEqual([permission.ADD_COMMENT, permission.ADD_MEMBER_TO_PROJECT, permission.ADD_PROJECT]);

    });

    it("POST /role --> Non-Admin cannot add role", async () => {
        const user = await getUser("maria.garcia@bugtracker.com");
        const token = generateAccessToken(user.email, user._id);

        const response = await request.post("/role")
            .set("x-access-token", token)
            .send({
                name: "custom role",
                permissions: [permission.ADD_COMMENT, permission.ADD_MEMBER_TO_PROJECT, permission.ADD_PROJECT]
            });

        expect(response.status).toEqual(403);
        expect(response.body.error).toEqual("Not authorized to add roles");

    });

    it("POST /role --> Cannot add duplicate role name", async () => {
        const user = await getUser("james.smith@bugtracker.com");
        const token = generateAccessToken(user.email, user._id);

        const response = await request.post("/role")
            .set("x-access-token", token)
            .send({
                name: "admin",
                permissions: [permission.ADD_COMMENT, permission.ADD_MEMBER_TO_PROJECT, permission.ADD_PROJECT]
            });

        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual("Role already exist");

    });


    it("PATCH /role --> Non-admin cannot modify roles", async () => {
        const user = await getUser("robert.smith@bugtracker.com");
        const token = generateAccessToken(user.email, user._id);

        const response = await request.patch("/role")
            .set("x-access-token", token)
            .send({
                name: "custom role",
                permission: [permission.ADD_MEMBER_TO_PROJECT, permission.ADD_COMMENT]
            });

        expect(response.status).toEqual(403);
        expect(response.body.error).toEqual("Not authorized to modify roles");
    });

    it("PATCH /role --> Admin can modify role", async () => {
        const user = await getUser("james.smith@bugtracker.com");
        const token = generateAccessToken(user.email, user._id);
        const role = await getRole("custom role");

        const response = await request.patch("/role")
            .set("x-access-token", token)
            .send({
                roleId: role._id,
                name: "sample role",
                permissions: [permission.ADD_TICKET]
            });

        expect(response.status).toEqual(200);

        //Verify the change
        const newRole = await Role.findOne({ name: "sample role" });

        expect(newRole.name).toEqual("sample role");
        expect(newRole.permissions).toEqual([permission.ADD_TICKET]);

    });

    it("PATCH /role --> Updating with invalid id", async () => {
        const user = await getUser("james.smith@bugtracker.com");
        const token = generateAccessToken(user.email, user._id);
        const role = await getRole("sample role");

        const response = await request.patch("/role")
            .set("x-access-token", token)
            .send({
                roleId: role._id + "abc",
                name: "sample role",
                permissions: [permission.ADD_TICKET]
            });

        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual("No roles found with that id");
    });


    it("DELETE /role --> Non-admin cannot delete roles", async () => {
        const user = await getUser("robert.smith@bugtracker.com");
        const token = generateAccessToken(user.email, user._id);

        const response = await request.delete("/role")
            .set("x-access-token", token)
            .send({
                name: "sample role"
            });

        expect(response.status).toEqual(403);
        expect(response.body.error).toEqual("Not authorized to delete roles");
    });

    it("DELETE /role --> Delete role with invalid id", async () => {
        const user = await getUser("james.smith@bugtracker.com");
        const token = generateAccessToken(user.email, user._id);
        const role = await getRole("sample role");

        const response = await request.delete("/role")
            .set("x-access-token", token)
            .send({ roleId: role._id + "abc" });

        expect(response.status).toEqual(404);
        expect(response.body.error).toEqual("No roles found with that id");

    });

    it("DELETE /role --> Admin can delete role", async () => {
        const user = await getUser("james.smith@bugtracker.com");
        const token = generateAccessToken(user.email, user._id);
        const role = await getRole("sample role");

        const response = await request.delete("/role")
            .set("x-access-token", token)
            .send({ roleId: role._id });

        expect(response.status).toEqual(200);

    });
});
