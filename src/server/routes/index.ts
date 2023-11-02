import express from "express";
import apiRouter from "./api";
import authRouter from "./auth";
import mw from "../middlewares/auth.mw";

const router = express.Router();

router.use("/api", mw.token_check, apiRouter);
router.use("/auth", authRouter);

export default router;
