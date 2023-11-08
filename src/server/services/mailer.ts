import Mailgun from "mailgun.js";
import FormData from "form-data";
import config from "../config";

interface MailProps {
    to: string;
    from: string;
    subject: string;
    body: string;
}

const { key, domain } = config.mailgun;

if (!key || !domain) throw new Error("Missing Mailgun API key");

const mailgun = new Mailgun(FormData).client({
    username: "api",
    key,
});

const mailer = ({ to, from, subject, body }: MailProps) => {
    return mailgun.messages.create(domain, { to, from, subject, html: body });
};

const sendVerificationEmail = ({ to }: MailProps) => {
    return mailer({
        to,
        from: "<Auth> noreply@jgraham.com",
        subject: "Verify your account",
        body: `
            <h1>Verify your account by clicking ${config.domain.base}/verify}</h1>
        `,
    });
};
