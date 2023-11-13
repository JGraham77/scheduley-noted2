import Mailgun from "mailgun.js";
import FormData from "form-data";
import jwt from "jsonwebtoken";
import config from "../config";

interface MailProps {
    to: string;
    from: string;
    subject: string;
    body: string;
}

const { key, domain } = config.mailgun;

const mailgun = new Mailgun(FormData).client({
    username: "api",
    key,
});

const mailer = ({ to, from, subject, body }: MailProps) => {
    return mailgun.messages.create(domain, { to, from, subject, html: body });
};

export const sendVerificationEmail = (to: string) => {
    const token = jwt.sign({ email: to }, config.jwt.secret, { expiresIn: "10m" });
    return mailer({
        to,
        from: "<Auth> noreply@jgraham.com",
        subject: "Verify your account",
        body: `
            <h1>Verify your account by clicking <a href='${config.domain.base}/verify?type=verify%token=${token}'>here to verify</a></h1>
        `,
    });
};
