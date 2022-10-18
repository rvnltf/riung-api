import express from "express";
import getAdmin from "../controllers/admin/getAdmin.js";
import { verifyToken, isAdmin } from "../utils/verifyAuth.js";

const router = express.Router();

//GET Content
router.get("/admin/:id", verifyToken, isAdmin, getAdmin);

//POST Content
router.post("/admin", verifyToken, isAdmin, (req, res, next) => {
  try {
    res.status(201).send({
      success: true,
      message: `admin page`,
      date: req.body,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
