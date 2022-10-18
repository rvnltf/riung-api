import db from "../../../config/riungDb.js";
import { BadRequest } from "../../../utils/errors.js";

const LikeContent = db.likeContent;

const likeContent = async (req, res, next) => {
  try {
    if (req.userId) {
      const like = await LikeContent.create({
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

export default likeContent;
