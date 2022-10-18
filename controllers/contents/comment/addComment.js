import db from "../../../config/riungDb.js";
import { BadRequest } from "../../../utils/errors.js";

const Comment = db.comment;

const addComment = async (req, res, next) => {
  try {
    if (req.userId && req.body.contentId) {
      const comment = await Comment.create({ ...req.body, userId: req.userId });

      if (!comment) throw new BadRequest(`Invalid add data!`);

      comment.save();

      res.status(200).send({
        success: true,
        message: "Data has been inserted.",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default addComment;
