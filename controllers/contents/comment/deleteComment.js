import db from "../../../config/riungDb.js";
import { BadRequest, NotFound } from "../../../utils/errors.js";

const Comment = db.comment;
const Op = db.Sequelize.Op;

const deleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;

    const comment = await Comment.destroy({
      where: {
        id,
      },
    });

    if (!comment) throw new NotFound(`Data not found!`);

    res.status(200).send({
      success: true,
      message: "Data deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteComment;
