import dotenv from "dotenv";
import validators from "../utils/validators";

dotenv.config();

const { hasUndefinedValues } = validators;

const pg = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
    database: process.env.DB_SCHEMA as string,
};

if (hasUndefinedValues(pg)) throw new Error("Missing Postgres Envars");

const jwt = {
    secret: process.env.JWT_KEY as string,
    expiration: process.env.JWT_EXPIRATION as string,
};

if (hasUndefinedValues(jwt)) throw new Error("Missing JWT Envars");

//! add mailgun env
const mailgun = {
    to: process.env.MAILGUN_TO as string,
    domain: process.env.MAILGUN_DOMAIN as string,
    key: process.env.MAILGUN_API_DEY as string,
};

if (hasUndefinedValues(mailgun)) throw new Error("Missing Mailgun Envars");

const domain = {
    base: process.env.DOMAIN_BASE as string,
};

if (hasUndefinedValues(domain)) throw new Error("Missing Domain Envars");

// Get a twilio account up and running
const twilio = {
    gvoice: process.env.GVOICE_NUM as string,
    number: process.env.TWILIO_NUM as string,
    sid: process.env.TWILIO_SID as string,
    token: process.env.TWILIO_TOKEN as string,
};

if (hasUndefinedValues(twilio)) throw new Error("Missing Twilio Envars");

export default {
    pg,
    jwt,
    mailgun,
    domain,
    twilio,
};
