import dotenv from "dotenv";

dotenv.config();

const pg = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_SCHEMA,
};

const jwt = {
    secret: process.env.JWT_KEY,
    expiration: process.env.JWT_EXPIRATION,
};

export default {
    pg,
    jwt,
};
