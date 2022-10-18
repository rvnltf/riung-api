import db from "../../../config/riungDb.js";
import { BadRequest } from "../../../utils/errors.js";

const Content = db.content;

const addContent = async (req, res, next) => {
  try {
    if (req.userId) {
      const content = await Content.create({ ...req.body, userId: req.userId });
      if (!content) throw new BadRequest(`Invalid add data!`);
      content.save();
      res.status(200).send({
        success: true,
        message: "Data has been inserted.",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default addContent;
