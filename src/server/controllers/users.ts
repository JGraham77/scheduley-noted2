import type { RequestHandler } from "express";
import db from "../db";
import utils from "../utils";
import { User } from "../types";

const change_mfa: RequestHandler = async (req, res, next) => {
    const { preference } = req.body as { preference: User["mfa_preference"] };
    const { id, email_verified, phone_verified } = req.user;

    if (!utils.validators.isString(preference) || !["email", "none", "phone"].includes(preference)) {
        return res
            .status(400)
            .json({ message: "Missing preference values or preference values may not be filled out." });
    }

    try {
        if (preference === "phone" && !phone_verified) {
            // ! TODO: Send SMS to verify phone
            return res.status(400).json({
                message:
                    "Cannot change MFA preference to SMS without verifying your phone, please check your phone for a new code to verify.",
            });
        }
        if (preference === "email" && !email_verified) {
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

export default {
    change_mfa,
};
