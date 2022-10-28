import supertest from "supertest";
import app from "../app";
import request from './app.test.js';


describe("Authentication", () => {

    it("POST /auth/login - should return 200 status code", async () => {
        await request.post("/auth/login")
            .send({
                email: "robert.smith@bugtracker.com",
                password: "random"
            })
            .expect(200);
    });

    it("POST /auth/login - should return 400 status code - User not found", async () => {
        await request.post("/auth/login")
            .send({
                email: "bob@bugtracker.com",
                password: "random"
            })
            .expect(400);
    });

    it("POST /auth/login - should return 400 status code - Incorrect password", async () => {
        await request.post("/auth/login")
            .send({
                email: "james.smith@bugtracker.com",
                password: "randommm"
            })
            .expect(400);
    });

});
