import express from "express";
import mw from "../../middlewares/auth.mw";
import controllers from "../../controllers";

const router = express.Router();

router.post("/register", mw.register);
router.post("/login", mw.login);
router.put("/mfa", controllers.users.change_mfa);
router.get("/verify", controllers.users.verify);

export default router;
