import db from "../../../config/riungDb.js";
import { BadRequest, NotFound } from "../../../utils/errors.js";

const Content = db.content;
const Op = db.Sequelize.Op;

const deleteContent = async (req, res, next) => {
  try {
    const id = req.params.id;

    const content = await Content.destroy({
      where: {
        id,
      },
    });

    if (!content) throw new NotFound(`Data not found!`);

    res.status(200).send({
      success: true,
      message: "Data deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteContent;
