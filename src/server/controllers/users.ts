import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";
import db from "../db";
import config from "../config";
import utils from "../utils";
import { User } from "../types";
import { sendVerificationEmail } from "../services/mailer";
import sms from "../services/sms";

const change_mfa: RequestHandler = async (req, res, next) => {
    const { preference } = req.body as { preference: User["mfa_preference"] };
    const { id, email_verified, phone_verified } = req.user;

    if (!utils.validators.isString(preference) || !["email", "none", "phone"].includes(preference)) {
        return res
            .status(400)
            .json({ message: "Missing preference values or preference values may not be filled out." });
    }

    try {
        const [user] = await db.users.find_by("id", id);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        if (preference === "phone" && !phone_verified) {
            await sms.generateAuthCode(id, user.phone);
            return res.status(400).json({
                message:
                    "Cannot change MFA preference to SMS without verifying your phone, please check your phone for a new code to verify.",
            });
        }
        if (preference === "email" && !email_verified) {
            await sendVerificationEmail(user.email);
            return res.status(400).json({
                message:
                    "Cannot change MFA preference to email without verifying your email, please check your inbox for a new code to verify.",
            });
        }
        await db.users.update_mfa(preference, id);
        res.status(200).json({ message: "Successfully updated your MFA preference" + preference });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Could not change MFA preference at this time" });
    }
};

const verify: RequestHandler = async (req, res, next) => {
    const type = req.query.type;
    const token = req.query.token;

    if (!token || !type || typeof token !== "string" || typeof type !== "string") {
        return res.status(401).json({ message: "Missing auth information" });
    }

    try {
        const { email } = jwt.verify(token, config.jwt.secret) as { email: string };
        await db.users.verify(email);
        res.status(200).json({ message: "You are verified!!!" });
    } catch (error) {
        const { email } = jwt.decode(token) as { email: string };
        await sendVerificationEmail(email);
        res.status(401).json({ message: "Invalid toke, please check your email for a new link" });
    }
};

const verifyPhone: RequestHandler = async (req, res, next) => {
    const { code, email } = req.body;

    try {
        const [user] = await db.users.find_by("email", email);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const [dbCode] = await db.codes.getForUser(user.id, code);
        if (!dbCode) {
            await sms.generateAuthCode(user.id, user.phone);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { code: storedCode, expiration } = dbCode;

        if (storedCode != code || Date.now() > expiration) {
            await db.codes.deleteForUser(user.id);
            await sms.generateAuthCode(user.id, user.phone);
            return res
                .status(403)
                .json({ message: "Code was invalid or expired, please check your text messages for a new code" });
        }

        await db.users.verifyPhone(user.id);
        res.status(201).json({ message: "Successfully verified your phone!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to verify phone at this time" });
    }
};

export default {
    change_mfa,
    verify,
    verifyPhone,
};
