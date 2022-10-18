import db from "../../../config/riungDb.js";
import { BadRequest, NotFound } from "../../../utils/errors.js";

const Content = db.content;
const Op = db.Sequelize.Op;

const getContentById = async (req, res, next) => {
  try {
    const content = await Content.findOne({
      where: {
        userId: req.userId,
      },
    });

    if (!content) throw new NotFound(`Data not found!`);

    req.body = content;

    res.status(200).send({
      success: true,
      data: content,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export default getContentById;
