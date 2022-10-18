import express from "express";
import getInfoUser from "../controllers/auth/getInfo.js";
import updateAccount from "../controllers/auth/updateAccount.js";
import { verifyToken } from "../utils/verifyAuth.js";

const router = express.Router();

//GET User
router.get("/", verifyToken, getInfoUser);

//POST User
router.put("/", verifyToken, updateAccount);

export default router;
