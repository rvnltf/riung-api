import db from "../../../config/riungDb.js";
import { BadRequest, NotFound } from "../../../utils/errors.js";

const Content = db.content;
const Op = db.Sequelize.Op;

const updateContent = async (req, res, next) => {
  try {
    const id = req.params.id;

    const content = await Content.update(req.body, {
      where: {
        id,
      },
    });

    if (!content) throw new BadRequest(`Invalid update data!`);

    res.status(200).send({
      success: true,
      message: `Content has been updated!`,
    });
  } catch (error) {
    next(error);
  }
};

export default updateContent;
