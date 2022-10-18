import db from "../../../config/riungDb.js";
import { BadRequest, NotFound } from "../../../utils/errors.js";

const Content = db.content;
const Op = db.Sequelize.Op;

const getContent = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.q || "";
    const offset = limit * page;
    const totalRow = await Content.count({
      where: {
        [Op.or]: [
          {
            content: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });
    const totalPage = Math.ceil(totalRow / limit);
    const result = await Content.findAll({
      where: {
        [Op.or]: [
          {
            content: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
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

export default getContent;
