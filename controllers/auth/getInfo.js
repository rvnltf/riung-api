import db from "../../config/riungDb.js";
import { NotFound } from "../../utils/errors.js";

const User = db.user;

const getInfoUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!user) throw new NotFound(`Data not found!`);

    req.body = user;

    res.status(200).send({
      success: true,
      data: user,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export default getInfoUser;
