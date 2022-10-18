import db from "../../config/riungDb.js";
import { BadRequest, NotFound } from "../../utils/errors.js";

const User = db.user;

const updateAccount = async (req, res, next) => {
  try {
    if (req.body.password) throw new BadRequest(`Invalid update data!`);

    const user = await User.update(req.body, {
      where: {
        id: req.userId,
      },
    });

    if (!user) throw new BadRequest(`Invalid update data!`);

    res.status(200).send({
      success: true,
      message: `User has been updated!`,
    });
  } catch (error) {
    next(error);
  }
};

export default updateAccount;
