import express from "express";
import { checkDuplicate, rolesExisted } from "../utils/verifyUser.js";
import register from "../controllers/auth/register.js";
import login from "../controllers/auth/login.js";

const router = express.Router();

//Create User
router.post("/register", checkDuplicate, rolesExisted, register);
//Sign In
router.post("/login", login);

export default router;
