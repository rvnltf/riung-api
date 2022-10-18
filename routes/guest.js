import express from "express";
const router = express.Router();

//GET Content
router.get("/getContent", (req, res) => {
  res.status(200).send({
    success: true,
    message: `this your content`,
  });
});

//POST Content
router.post("/postContent", (req, res, next) => {
  if (req.body) {
    res.status(201).send({
      success: true,
      message: `this your response`,
      data: req.body,
    });
  }
  next();
});

export default router;
