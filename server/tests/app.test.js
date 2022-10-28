import supertest from "supertest";
import app from "../app";
import mongoose from "mongoose";
import User from "../models/user.js";
import Role from "../models/role";
import bcrypt from 'bcrypt';
import UserRole from "../models/userRole";

import { sampleRoles, sampleUsers } from "./data";


const request = supertest(app);

const seedDatabase = async () => {
    //Seed Role
    await Role.insertMany(sampleRoles);

    let index = 0;

    // //Seed user
    for (const user of sampleUsers) {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;
        const newUser = await User.create(user);

        let role;

        if (index == 0)
            role = await Role.findOne({ name: "admin" });
        else if (index == 1)
            role = await Role.findOne({ name: "project manager" });
        else if (index == 2)
            role = await Role.findOne({ name: "developer" });
        else
            role = await Role.findOne({ name: "submitter" });

        await UserRole.create({ userId: newUser._id, roleId: role._id });
        // console.log(`Created ${user.firstName} ${user.lastName} (${newUser._id}): ${role.name} (${role._id})`);
        index++;
    }


};

const removeAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections);

    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
};

//connect to mongoDB
beforeAll(async () => {
    const url = `mongodb://127.0.0.1/avengers`;
    await mongoose.connect(url, { useNewUrlParser: true });
    await seedDatabase();
});

afterAll(async () => {
    await removeAllCollections();
});

describe("run test", () => {
    it("test", () => { });
});

export default request;