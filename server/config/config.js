import dotenv from 'dotenv';

dotenv.config();

const Environment = {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
    TEST: 'test',
};

export const SECRET_KEY = process.env.SECRET_KEY;
export const PASSWORD_SALT = process.env.PASSWORD_SALT;
export const JWT_TOKEN_EXPIRATION = process.env.JWT_TOKEN_EXPIRATION;


export const PORT = process.env.PORT || 4000;
export const isProduction = process.env.NODE_ENV === Environment.PRODUCTION || false;
export const isDevelopment = process.env.NODE_ENV === Environment.DEVELOPMENT || true;
export const isTest = process.env.NODE_ENV === Environment.TEST || false;


const DB_NAME = "bugtracker";
const TEST_DB_NAME = "test-bugtracker";

const DEVELOPMENT_DB_PORT = 27017;
const TEST_DB_PORT = 2737;

const PRODUCTION_CONNECTION = process.env.MONGO_DB_CONNECTION;
const DEVELOPMENT_CONNECTION = `mongodb://127.0.0.1:${DEVELOPMENT_DB_PORT}/${DB_NAME}`;
const TEST_CONNECTION = `mongodb://127.0.0.1:${TEST_DB_PORT}/${TEST_DB_NAME}`;

export const MONGO_DB_CONNECTION = isProduction ? PRODUCTION_CONNECTION : isDevelopment ? DEVELOPMENT_CONNECTION : TEST_CONNECTION;
export const CURRENT_ENVIRONMENT = process.env.NODE_ENV || Environment.DEVELOPMENT;