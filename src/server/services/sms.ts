import twilio from "twilio";
import config from "../config";
import crypto from "crypto";
import db from "../db";
import { User } from "../types";

const client = twilio(config.twilio.sid, config.twilio.token);

const sendText = (message: string, number: string) => {
    return client.messages.create({
        to: number,
        from: config.twilio.number,
        body: message,
    });
};

const generateAuthCode = async (user_id: User["id"], number: string) => {
    const FIFTEEN_MINUTES = 1000 * 60 * 15;
    try {
        const code = crypto.randomInt(1e7);
        const issued = Date.now();
        const expiration = issued + FIFTEEN_MINUTES;
        await db.codes.deleteForUser(user_id);
        await db.codes.create({ user_id, code: code, issued, expiration });
        await sendText(`Here is your code: ${code}. \nWe will never call you and ask for this code.`, number);
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default {
    sendText,
    generateAuthCode,
};
