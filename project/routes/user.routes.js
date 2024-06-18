import { Router } from "express";
import {
    createUser,
    loginUser,
    logoutUser
} from "../controller/user.controller.js";

const router = Router();

router.route("/login").post(loginUser)
router.route("/register").post(createUser)
router.route("/logout").get(logoutUser)

export default router;