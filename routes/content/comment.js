import express from "express";
import { verifyToken, isUser, isOwnerComment } from "../../utils/verifyAuth.js";
import { characterCount } from "../../utils/characterCount.js";
import addComment from "../../controllers/contents/comment/addComment.js";
import getCommentByContent from "../../controllers/contents/comment/getCommentByContent.js";
import updateComment from "../../controllers/contents/comment/updateComment.js";
import deleteComment from "../../controllers/contents/comment/deleteComment.js";
import getCommentByUser from "../../controllers/contents/comment/getCommentByUser.js";
import likeComment from "../../controllers/contents/likes/likeComment.js";
import dislikeComment from "../../controllers/contents/likes/dislikeComment.js";

const router = express.Router();

//add comment
router.post("/", verifyToken, isUser, characterCount, addComment);

//get comment by content
router.get("/byContent", verifyToken, getCommentByContent);

//get comment by user
router.get("/byUser", verifyToken, getCommentByUser);

//update comment by id
router.put("/:id", verifyToken, isUser, isOwnerComment, updateComment);

//update active comment by id
router.delete("/:id", verifyToken, isUser, isOwnerComment, deleteComment);

//like comment
router.post("/", verifyToken, isUser, likeComment);

//dislike comment
router.delete("/:id", verifyToken, isUser, dislikeComment);

export default router;
