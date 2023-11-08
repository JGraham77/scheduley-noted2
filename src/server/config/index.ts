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

//! add mailgun env
const mailgun = {
    to: process.env.MAILGUN_TO,
    domain: process.env.MAILGUN_DOMAIN,
    key: process.env.MAILGUN_API_DEY,
};

const domain = {
    base: process.env.DOMAIN_BASE,
};

export default {
    pg,
    jwt,
    mailgun,
    domain,
};
