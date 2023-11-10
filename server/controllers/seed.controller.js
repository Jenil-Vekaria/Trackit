import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import TicketType from "../models/ticketType.model.js";
import mongoose from "mongoose";
import { DBTicketType, DBRole, DBUsers } from "../seed/seedData.js";
import bcrypt from 'bcrypt';

const getHashedPassword = async () => {
    const hasedPasswordPromises = DBUsers.map(user => bcrypt.hash(user.password, +process.env.PASSWORD_SALT));

    return Promise.all(hasedPasswordPromises);
};

const seedUsers = async (role, hashedPasswords) => {
    const usersPromises = DBUsers.map((user, index) => {
        return User.create({ ...user, password: hashedPasswords[index], roleId: role[index]._id });
    });

    return usersPromises;
};

const populate = async () => {
    try {
        await Promise.all([
            TicketType.create(DBTicketType),
            Role.create(DBRole)
        ]).then(async ([_, role]) => {
            const hashedPasswords = await getHashedPassword();
            await seedUsers(role, hashedPasswords);
        });

    } catch (error) {
        throw error;
    }
};
export const seedDatabase = async () => {
    try {
        if (mongoose.connection?.readyState === 1) {
            console.log('❌ Clearing database...');
            mongoose.connection.dropDatabase();
        }

        console.log('🌱 Seeding database...');


        setTimeout(() => {
            console.log('✅ Seeding successful');
        }, 10000);
    } catch (error) {
        return console.log(error);
    }
};