import db from "../../../config/riungDb.js";
import { NotFound } from "../../../utils/errors.js";

const LIkeComment = db.likeComment;

const dislikeComment = async (req, res, next) => {
  try {
    if (req.userId) {
      const id = req.params.id;

      const like = await LIkeComment.destroy({
        where: {
          id,
        },
      });

      if (!like) throw new NotFound(`Data not found!`);

      res.status(200).send({
        success: true,
        message: "Data deleted successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default dislikeComment;
