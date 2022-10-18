import db from "../../config/riungDb.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { BadRequest, NotFound } from "../../utils/errors.js";

const User = db.user;

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) throw new NotFound(`User not found!`);

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) throw new BadRequest(`Invalid Password!`);

    let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 86400,
    });

    if (!user.active)
      throw new BadRequest(`Your account has not been activated!`);

    const roles = await user.getRoles();

    res.status(200).send({
      success: true,
      data: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        roles: roles.map((role) => role.name),
        accessToken: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default login;
