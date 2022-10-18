import db from "../../../config/riungDb.js";
import { BadRequest, NotFound } from "../../../utils/errors.js";

const Comment = db.comment;
const Op = db.Sequelize.Op;

const updateViewer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await Comment.update(
      {
        view: req.body.view + 1,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!comment) throw new BadRequest(`Invalid update data!`);

    // res.status(200).send({
    //   success: true,
    //   message: "Comment is active successfully!",
    // });
  } catch (error) {
    next(error);
  }
};

export default updateViewer;
