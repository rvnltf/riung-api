import db from "../../../config/riungDb.js";
import { BadRequest, NotFound } from "../../../utils/errors.js";

const Comment = db.comment;

const getCommentByUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = limit * page;
    const totalRow = await Comment.count({
      where: {
        userId: req.userId,
      },
    });

    const totalPage = Math.ceil(totalRow / limit);
    const result = await Comment.findAll({
      where: {
        userId: req.userId,
      },
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    if (!result) throw new NotFound(`Data not found!`);

    res.status(200).send({
      success: true,
      page,
      limit,
      totalRow,
      totalPage,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default getCommentByUser;
