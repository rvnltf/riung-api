import db from "../../../config/riungDb.js";
import { BadRequest } from "../../../utils/errors.js";

const LikeComment = db.likeComment;

const likeComment = async (req, res, next) => {
  try {
    if (req.userId && req.body.commentId) {
      const like = await LikeComment.create({
        ...req.body,
        userId: req.userId,
      });

      if (!like) throw new BadRequest(`Invalid like content!`);

      like.save();

      res.status(200).send({
        success: true,
        message: "Data has been inserted.",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default likeComment;
