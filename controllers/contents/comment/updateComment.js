import db from "../../../config/riungDb.js";
import { BadRequest, NotFound } from "../../../utils/errors.js";

const Comment = db.comment;
const Op = db.Sequelize.Op;

const updateComment = async (req, res, next) => {
  try {
    const id = req.params.id;

    const comment = await Comment.update(req.body, {
      where: {
        id,
      },
    });

    if (!comment) throw new BadRequest(`Invalid update data!`);

    res.status(200).send({
      success: true,
      message: `Comment has been updated!`,
    });
  } catch (error) {
    next(error);
  }
};

export default updateComment;
