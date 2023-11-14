import twilio from "twilio";
import config from "../config";

const client = twilio(config.twilio.sid, config.twilio.token);

const sendText = (message: string, number: string) => {
    return client.messages.create({
        to: number,
        from: config.twilio.number,
        body: message,
    });
};

export default {
    sendText,
};
