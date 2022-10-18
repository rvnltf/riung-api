import express from "express";
import { verifyToken, isUser, isOwnerContent } from "../../utils/verifyAuth.js";
import { characterCount } from "../../utils/characterCount.js";
import addContent from "../../controllers/contents/content/addContent.js";
import getContent from "../../controllers/contents/content/getContent.js";
import getContentById from "../../controllers/contents/content/getContentById.js";
import updateViewer from "../../controllers/contents/content/updateViewer.js";
import updateContent from "../../controllers/contents/content/updateContent.js";
import deleteContent from "../../controllers/contents/content/deleteContent.js";
import likeContent from "../../controllers/contents/likes/likeContent.js";
import dislikeContent from "../../controllers/contents/likes/dislikeContent.js";

const router = express.Router();

//add content
router.post("/", verifyToken, isUser, characterCount, addContent);

//get content
router.get("/", verifyToken, getContent);

//get content by id
router.get("/:id", verifyToken, getContentById, isUser, updateViewer);

//update content by id
router.put("/:id", verifyToken, isUser, isOwnerContent, updateContent);

//update active content by id
router.delete("/:id", verifyToken, isUser, isOwnerContent, deleteContent);

//like content
router.post("/like", verifyToken, isUser, likeContent);

//dislike content
router.delete("/like/:id", verifyToken, isUser, dislikeContent);

//add events
export default router;
