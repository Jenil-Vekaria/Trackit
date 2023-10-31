import dotenv from 'dotenv';

dotenv.config();

const Environment = {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
};

export const SECRET_KEY = process.env.SECRET_KEY;
export const PASSWORD_SALT = process.env.PASSWORD_SALT;
export const JWT_TOKEN_EXPIRATION = process.env.JWT_TOKEN_EXPIRATION;


export const PORT = process.env.PORT || 5000;
export const isProduction = process.env.NODE_ENV === Environment.PRODUCTION || false;
export const isDevelopment = process.env.NODE_ENV === Environment.DEVELOPMENT || true;


const DEV_DB_NAME = "dev-bugtracker";
const DEV_DB_PORT = 27017;

const PROD_CONNECTION = process.env.MONGO_DB_CONNECTION;
const DEV_CONNECTION = `mongodb://127.0.0.1:${DEV_DB_PORT}/${DEV_DB_NAME}`;

export const MONGO_DB_CONNECTION = isProduction ? PROD_CONNECTION : DEV_CONNECTION;
export const CURRENT_ENVIRONMENT = process.env.NODE_ENV || Environment.DEVELOPMENT;